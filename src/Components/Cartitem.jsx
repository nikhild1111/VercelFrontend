
import {AiFillDelete} from "react-icons/ai"
import { useDispatch } from "react-redux";
import { remove } from "../redux/Slices/CartSlice";
import { toast } from "react-hot-toast";

const CartItem = ({item, itemIndex}) => {
  const dispatch = useDispatch();

  const removeFromCart = () => {
    dispatch(remove(item.id));
    toast.success("Item Removed");
  }

  return (
   < div className='p-2 space-y-10 space-x-5 w-[390px]'>
<div className='flex flex-col item-center justify-between md:hover:scale-110 transition duration-300 ease-in gap-3 p-4 mt-10 ml-5 rounded-xl outline h-[376px]'>
<div><p className='text-gray-700 font-semibold text-lg truncate w-40 mt-1 mx-auto'>{item.title}</p></div>
<div>
  <p className='w-40 text-gray-400 font-normal text-[10px] mx-auto'>{item.description.split(" ").slice(0,10).join(" ")+"..."}</p>
</div>
<div className='h-[180px]'>
  <img src={item.image} className='h-full w-full'></img>     </div>
<div className='flex justify-between gap-12 items-center w-full mt-5'>
  <div>
      <p className='text-green-600 font-semibold'>${item.price}</p>
  </div>
  <div className="text-red-800  bg-red-200 group hover:bg-red-400 transition-transform duration-300 cursor-pointer rounded-full p-3 mr-3"
            onClick={removeFromCart}>
              <AiFillDelete/>
            </div>

</div>
</div>
</div>
  );
};

export default CartItem;
