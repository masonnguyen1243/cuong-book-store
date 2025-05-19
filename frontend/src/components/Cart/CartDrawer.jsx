import { IoMdClose } from "react-icons/io";
import CartContent from "./CartContent";
import { useSelector } from "react-redux";

const CartDrawer = ({ openCart, setOpenCart }) => {
  const { user } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);
  const userId = user ? user?.data?.user?._id : null;

  return (
    <section
      className={`fixed right-0 top-0 z-50 h-full w-1/2 transform bg-white shadow-lg transition-transform duration-300 md:w-1/3 ${openCart ? "translate-x-0" : "translate-x-full"}`}
    >
      <div className="flex items-center border-b p-4">
        <p className="select-none font-medium">Shopping Cart</p>
        <div onClick={() => setOpenCart(false)}>
          <IoMdClose className="absolute right-2 top-4 h-6 w-6 cursor-pointer hover:text-red-400" />
        </div>
      </div>

      {cart && cart?.data?.books?.length > 0 ? (
        <CartContent cart={cart} userId={userId} />
      ) : (
        <p className="flex h-screen items-center justify-center">Your cart is empty.</p>
      )}

      <div className="absolute bottom-[100px] flex w-full items-center justify-between border-y p-4">
        <p>Subtotal: </p>
        <p className="text-center">${cart?.data?.totalPrice}</p>
      </div>

      <div className="absolute bottom-0 mb-4 w-full p-4">
        {cart && cart?.data?.books?.length > 0 && (
          <button className="w-full rounded-md border border-main py-4 text-main transition-all duration-300 hover:bg-main hover:text-white">
            Checkout
          </button>
        )}
      </div>
    </section>
  );
};
export default CartDrawer;
