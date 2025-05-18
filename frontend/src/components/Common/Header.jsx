import { NavLink } from "react-router-dom";
import { IoIosSearch, IoMdMenu } from "react-icons/io";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import MobileNav from "./MobileNav";
import { useState } from "react";
import SearchBar from "../Search/SearchBar";
import CartDrawer from "../Cart/CartDrawer";

const Header = () => {
  const [openMobileNav, setOpenMobileNav] = useState(false);
  const [openSearchBar, setOpenSearchBar] = useState(false);
  const [openCart, setOpenCart] = useState(false);

  return (
    <section className="container mx-auto flex h-[104px] items-center justify-between">
      {/* Logo */}
      <div>
        <img
          src="https://websitedemos.net/book-store-02/wp-content/uploads/sites/834/2021/04/site-logo.svg"
          alt="logo"
        />
      </div>

      {/* Nav */}
      <div className="hidden md:block">
        <ul className="flex items-center justify-center gap-6">
          <li>
            <NavLink
              to={"/"}
              className={({ isActive }) => (isActive ? "font-medium text-black" : "font-medium text-[#565a61]")}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/books"}
              className={({ isActive }) => (isActive ? "font-medium text-black" : "font-medium text-[#565a61]")}
            >
              Books
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/about"}
              className={({ isActive }) => (isActive ? "font-medium text-black" : "font-medium text-[#565a61]")}
            >
              About Author
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/blog"}
              className={({ isActive }) => (isActive ? "font-medium text-black" : "font-medium text-[#565a61]")}
            >
              Blog
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/contact"}
              className={({ isActive }) => (isActive ? "font-medium text-black" : "font-medium text-[#565a61]")}
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
            <IoIosSearch size={24} className="cursor-pointer" />
          </div>
          <div onClick={() => setOpenCart(!openCart)}>
            <FaShoppingCart size={24} className="cursor-pointer" />
          </div>
          <div>
            <FaUser size={24} className="cursor-pointer" />
          </div>
          <div onClick={() => setOpenMobileNav(!openMobileNav)} className="block md:hidden">
            <IoMdMenu size={24} className="cursor-pointer" />
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
