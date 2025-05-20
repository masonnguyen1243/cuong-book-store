import { useDispatch } from "react-redux";
import { IoMdClose } from "react-icons/io";
import { deleteCart, fetchCart } from "~/redux/slice/cartSlice";
import { toast } from "react-toastify";

const CartContent = ({ cart, userId }) => {
  const dispatch = useDispatch();

  const handleRemoveFromCart = (bookId) => {
    toast.promise(dispatch(deleteCart({ bookId, userId })), { pending: "Loading" }).then((res) => {
      if (!res.error) {
        toast.success("Remove successfully!");
        dispatch(fetchCart({ userId }));
      }
    });
  };

  return (
    <div className="flex flex-col gap-5 px-4 py-4">
      {cart?.data?.books?.map((book, index) => (
        <div key={index} className="flex justify-between">
          <div className="flex items-center">
            <img src={book.image} alt={book.name} className="h-16 w-16" />
            <div className="ml-2">
              <p className="font-medium">{book.name}</p>
              <div className="flex gap-1 font-medium text-gray-700">
                {book.discountPrice ? (
                  <p>
                    {book.quantity} x ${book.discountPrice}
                  </p>
                ) : (
                  <p>
                    {book.quantity} x ${book.price}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div onClick={() => handleRemoveFromCart(book.bookId)} className="cursor-pointer hover:text-red-400">
            <IoMdClose className="h-6 w-6" />
          </div>
        </div>
      ))}
    </div>
  );
};
export default CartContent;
