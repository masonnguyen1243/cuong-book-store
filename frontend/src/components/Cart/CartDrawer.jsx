import { IoMdClose } from "react-icons/io";

const CartDrawer = ({ openCart, setOpenCart }) => {
  return (
    <section
      className={`fixed right-0 top-0 z-50 h-full w-1/2 transform bg-white shadow-lg transition-transform duration-300 md:w-1/3 ${openCart ? "translate-x-0" : "translate-x-full"}`}
    >
      <div className="flex items-center border-b p-4">
        <p className="font-medium">Shopping Cart</p>
        <div onClick={() => setOpenCart(false)}>
          <IoMdClose className="absolute right-2 top-4 h-6 w-6 cursor-pointer hover:text-red-400" />
        </div>
      </div>

      <div className="absolute bottom-0 mb-4 w-full p-4">
        <button className="w-full rounded-md border border-[#5f4fca] py-4 text-[#5f4fca] transition-all duration-300 hover:bg-[#5f4fca] hover:text-white">
          Checkout
        </button>
      </div>
    </section>
  );
};
export default CartDrawer;
