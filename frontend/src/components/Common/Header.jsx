import { Link, NavLink } from "react-router-dom";
import { IoIosSearch, IoMdMenu } from "react-icons/io";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import MobileNav from "./MobileNav";
import { useState } from "react";
import SearchBar from "../Search/SearchBar";
import CartDrawer from "../Cart/CartDrawer";
import { useSelector } from "react-redux";

const Header = () => {
  const [openMobileNav, setOpenMobileNav] = useState(false);
  const [openSearchBar, setOpenSearchBar] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const { cart } = useSelector((state) => state.cart);

  return (
    <section className="container mx-auto flex h-[104px] items-center justify-between">
      {/* Logo */}
      <Link to={"/"}>
        <img
          src="https://websitedemos.net/book-store-02/wp-content/uploads/sites/834/2021/04/site-logo.svg"
          alt="logo"
          className="w-[200px] md:w-full"
        />
      </Link>

      {/* Nav */}
      <div className="hidden md:block">
        <ul className="flex select-none items-center justify-center gap-6">
          <li>
            <NavLink
              to={"/"}
              className={({ isActive }) => (isActive ? "font-semibold text-main" : "font-semibold text-[#565a61]")}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/books"}
              className={({ isActive }) => (isActive ? "font-semibold text-main" : "font-semibold text-[#565a61]")}
            >
              Books
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/about"}
              className={({ isActive }) => (isActive ? "font-semibold text-main" : "font-semibold text-[#565a61]")}
            >
              About Author
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/blog"}
              className={({ isActive }) => (isActive ? "font-semibold text-main" : "font-semibold text-[#565a61]")}
            >
              Blog
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/contact"}
              className={({ isActive }) => (isActive ? "font-semibold text-main" : "font-semibold text-[#565a61]")}
            >
              Contact
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Icons */}
      <div>
        <div className="flex items-center justify-center gap-4">
          <div onClick={() => setOpenSearchBar(!openSearchBar)}>
            <IoIosSearch color="#5f4fca" size={24} className="cursor-pointer" />
          </div>
          <div onClick={() => setOpenCart(!openCart)} className="relative">
            <FaShoppingCart color="#5f4fca" size={24} className="cursor-pointer" />
          </div>
          {cart?.data?.books?.length > 0 ? (
            <div className="absolute right-16 top-8 flex h-2 w-2 items-center justify-center rounded-full bg-red-500 p-3 text-white">
              {cart?.data?.books?.length}
            </div>
          ) : (
            <div className="absolute right-16 top-8 flex h-2 w-2 items-center justify-center rounded-full bg-red-500 p-3 text-white">
              0
            </div>
          )}
          <Link to={"/profile"}>
            <FaUser size={24} color="#5f4fca" className="cursor-pointer" />
          </Link>
          <div onClick={() => setOpenMobileNav(!openMobileNav)} className="block md:hidden">
            <IoMdMenu size={24} color="#5f4fca" className="cursor-pointer" />
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <MobileNav openMobileNav={openMobileNav} setOpenMobileNav={setOpenMobileNav} />

      {/* SearchBar */}
      <SearchBar openSearchBar={openSearchBar} setOpenSearchBar={setOpenSearchBar} />

      {/* Cart */}
      <CartDrawer openCart={openCart} setOpenCart={setOpenCart} />
    </section>
  );
};
export default Header;
