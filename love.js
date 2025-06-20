const User = require("../models/User");
const Course = require("../models/Course");
const mailSender = require("../utils/mailSender");
const{instance}= require("../config/razorpay");
const{courseEnrollmentEmail} = require("../mail/templates/courseEnrollmentEmail");
const mongoose = require("mongoose");
const crypto =  require("crypto")

const {paymentSuccessEmail} = require("../mail/templates/paymentSuccessEmail")

const CourseProgress = require("../models/CourseProgress")

// 1.capture payments  and intiate the razorpay order 


exports.capturePayment = async(req,res) => {

    const {courses} = req.body
    const userId = req.user.id;

    if(courses.length === 0)
    {
        return res.json({success:false, message:"please provide course Id"})
    }

    //for calculating the total amount for multiple courses

    let total_amount = 0;

    for(const course_id of courses)
    {
       let course 
        try {
            
            // find course  by its id

            course = await Course.findById(course_id);

            //if not find then return error
            if(!course)
            {
                return res.status(500).json({success:false, message:error.message})
            }

            //check user already enrolled in the course or not
            const uid = new mongoose.Types.ObjectId(userId); // user id is stored as a string in the request (req.user.id), but it needs to be matched with the ObjectId data type used in the MongoDB database.
            if(course.studentsEnrolled.includes(uid))
            {
                return res.status(200).json({success:false, message:"Student is already Enrolled"})
            }

            //add  the price of the course to the total amount 
            total_amount+=course.price

        }catch(error)
        {
            console.log(error)
            return res.status(590).json({success:false, message:error.message})
        }
    }



    // 2.create options

    const options = {
        amount : total_amount *100,
        currency:"INR",
        receipt: Math.random(Date.now()).toString(),
    }

    //3. intiate the payment 
    try {
        const paymentResponse = await instance.orders.create(options)
        console.log(paymentResponse)
        res.json({
          success: true,
          data: paymentResponse,
        })
    }catch(error)
    {
        console.log(error)
        return res.status(500).json({success:false, message:"Could not intiate order"})
    }
}


// verify the payments 

exports.verifyPayment = async (req,res) => {
    const razorpay_order_id = req.body?.razorpay_order_id
    const razorpay_payment_id = req.body?.razorpay_payment_id
    const razorpay_signature = req.body?.razorpay_signature
    const courses = req.body?.courses

    const userId = req.user.id;
    if (
        !razorpay_order_id ||
        !razorpay_payment_id ||
        !razorpay_signature ||
        !courses ||
        !userId
      ) {
        return res.status(200).json({ success: false, message: "Payment Failed" })
      }

      let body = razorpay_order_id + "|" + razorpay_payment_id

      const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(body.toString())
      .digest("hex")

      // expected signature matches with razorpay_signature then enroll student into course
      if (expectedSignature === razorpay_signature) {
        await enrollStudents(courses, userId, res)
         
        return res.status(200).json({ success: true, message: "Payment Verified" , })
      }

      //else payment failed
      return res.status(200).json({ success: false, message: "Payment Failed" })



}


// send payment successfull email 

exports.sendPaymentSuccessEmail = async (req,res) => {

    const { orderId, paymentId, amount } = req.body
    const userId = req.user.id

    if (!orderId || !paymentId || !amount || !userId) {
        return res
          .status(400)
          .json({ success: false, message: "Please provide all the details" })
      }

      try {

        //find enrolled student by using useid
         const enrolledStudent = await User.findById(userId);

         //send mail by using mailsender 
         await mailSender(
            enrolledStudent.email,
            `Payment Received`,
            paymentSuccessEmail(
              `${enrolledStudent.firstName} ${enrolledStudent.lastName}`,
              amount / 100,
              orderId,
              paymentId
            )
          )

      }catch(error)
      {
        console.log(error)
        return res.status(500).json({success:false , message:"could not send mail"})
      }
}


//function for enrolling student  into the course 

const enrollStudents = async (courses, userId, res) => {
  if (!courses || !userId) {
    return res
      .status(400)
      .json({ success: false, message: "Please Provide Course ID and User ID" })
  }

  for (const courseId of courses) {
    try {
      // Find the course and enroll the student in it
      const enrolledCourse = await Course.findOneAndUpdate(
        { _id: courseId },
        { $push: { studentsEnrolled: userId } },
        { new: true }
      )

      if (!enrolledCourse) {
        return res
          .status(500)
          .json({ success: false, error: "Course not found" })
      }
     // console.log("Updated course after adding students inside the course: ", enrolledCourse)
  

      // when user make payment then intialize progress with completed lecture array empty 
  
      const courseProgress = await CourseProgress.create({
        courseId: courseId,
        userId: userId,
        completedVideos: [],
      });
      // Find the student and add the course to their list of enrolled courses and aslo add course progress 
      let enrolledStudent = await User.findByIdAndUpdate(
        userId,
        {
          $push: {
            courses: courseId,
            courseProgress: courseProgress._id,
          },
        },
        { new: true }
      ).populate({
        path: "courseProgress",
        // populate: [
        //   {
        //     path: "userId",
        //     model: "User",
        //   },
        //   {
        //     path: "courseId",
        //     model: "Course",
        //   },
        //   {
        //     path:"completedVideos",
        //     model:"SubSection"
        //   }
        // ],
      }).exec()
    
      enrolledStudent = enrolledStudent.toObject()


      console.log(" updated Enrolled students in user schema (payment.js)*****************: ", enrolledStudent)

      // Send an email notification to the enrolled student
      const emailResponse = await mailSender(
        enrolledStudent.email,
        `Successfully Enrolled into ${enrolledCourse.courseName}`,
        courseEnrollmentEmail(
          enrolledCourse.courseName,
          `${enrolledStudent.firstName} ${enrolledStudent.lastName}`
        )
      )

      console.log("Email sent successfully: ", emailResponse.response)
    } catch (error) {
      console.log(error)
      return res.status(400).json({ success: false, error: error.message })
    }
  }
}
























//capture the payment and intialize the order

// exports.capturePayment = async(req,res)=>{
//     try{ 

//     //fetch data-courseid,user id
//     const{courseId} = req.body;
//     const userId = req.user.id;
//     //valididate courseid
//     if(!courseId)
//     {
//         return res.status(401).json({
//             success:false,
//             message:'Please provide valid course ID',
//         });
//     }
//     //validate course detail

//     let course;

//     try{
         
//         course = await Course.findById(courseId);
//         if(!course)
//         {
//             return res.status(401).json({
//                 success:false,
//                 message:'Could not find the course',
//             })
//         }

//         //check user is already enrolled in the course or not
//         // we have user id in the form of string we need to convert it into object id because on course schema in studetenrooled section uid -->object id

//         const uid = new mongoose.Types.ObjectId(userId);

//         if(course.studentsEnrolled.includes(uid))
//         {
//             return res.status(200).json({
//                 success:true,
//                 message:'Student is already enrolled',
//             })
//         }
        

//     }catch(error)
//     {
//         return res.status(500).json({
//             success:false,
//             message:error.message
//         })
//     }



//     //create order
//     const amount = course.price;
//     const currency = "INR";

//     const options = {
//         amount:amount*100,
//         currency,
//         receipt:Math.random(Date.now().toString()),
//         notes:{
//             courseId:courseId,
//             userId:userId,
            
//         }
//     }

//     try{
       
//         //intiate payment using razorpay
//         const paymentResponse = await instance.orders.create(options);
//         console.log(paymentResponse);

//         return res.status(200).json({
//             success:true,
//             courseName:course.courseName,
//             courseDescription:course.courseDescription,
//             thumbnail: course.thumbnail,
//             orderId: paymentResponse.id,
//             currency:paymentResponse.currency,
//             amount:paymentResponse.amount,
//         })
//     }catch(error)
//     {   
//         console.log(error)
//         return res.status(500).json({
//             success:false,
//             message:"Somenthing went worng while intiating payment with razorpay"
//         })
//     }

//     }catch(error)
//     {
//         return res.status(500).json({
//             success:false,
//             message:"Somenthing went wrong while processing payment"
//         })
//     }

// }


//for verifyinfing signature 

// exports.verifySignature = async(req,res) => {
//     const webhookSecret = "123456789";

//     const signature = req.body["x-razorpay-signature"];

//     // encrypt our webhooksecret to math with signature
//     const shaSum = crypto.createHmac("sha256",webhookSecret);
//     shaSum.update(JSON.stringify(req.body));
//     const digest = shaSum.digest("hex");

//     if(signature === digest)
//     {
//         console.log("Payment is Authorised");

//         const{courseId,userId} = req.body.payload.payment.entity.notes;

//         try{
//             //payment is successfull --> next --> find the course and enroll user into course

//             const enrolledCourse  =await Course.findOneAndUpdate({_id:courseId},{
//                 $push :{
//                     studentsEnrolled:userId
//                 }
//             },{new:true})

//             if(!enrolledCourse)
//             {
//                 return res.status(404).json({
//                     success:false,
//                     message:"Course not found"
//                 })
//             }

//          //add students into the course 

//          const enrolledStudent = await User.findOneAndUpdate({_id:userId},{
//             $push : {
//                 courses:courseId
//             }
//          },{new:true})

//          //send confirmation mail
//          //mail mai template attach karana hai
//          const emailResponse = await mailSender(enrolledStudent.email,"Welocome from StudyNotion ","Congratultion you are onboard into new studyNotion course" );
//          return res.status(200).json({
//             success:true,
//             message:"Signature Validation and Course added successfull"
//          })
//         }catch(error)
//         { 
//             console.log(error)
//             return res.status(500).json({
//                 success:false,
//                 message:"Somenthing went wrong while verifying signature and course additon"
                
//             })
//         }
//     }else{
//         return res.status(500).json({
//             success:false,
//             message:"Signature is not match or invalid request"
//         })
//     }
// }

