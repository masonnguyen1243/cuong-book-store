import { NavLink } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { useDispatch } from "react-redux";
import { logoutUser } from "~/redux/slice/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const MobileNav = ({ openMobileNav, setOpenMobileNav }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    toast
      .promise(dispatch(logoutUser()), {
        pending: "Loading",
      })
      .then((res) => {
        if (!res.error) {
          navigate("/login");
          toast.success("Logged out successfully!");
        }
      });
  };
  return (
    <section
      className={`fixed right-0 top-0 z-50 flex h-full w-1/2 transform flex-col bg-white shadow-lg transition-transform duration-300 ${openMobileNav ? "translate-x-0" : "translate-x-full"}`}
    >
      <div onClick={() => setOpenMobileNav(false)} className="absolute left-4 top-4 cursor-pointer hover:text-red-400">
        <IoMdClose size={30} />
      </div>
      <div className="mt-16 p-4">
        <ul onClick={() => setOpenMobileNav(false)} className="flex flex-col gap-4">
          <li>
            <NavLink to={"/"}>Home</NavLink>
          </li>
          <li>
            <NavLink to={"/books"}>Books</NavLink>
          </li>
          <li>
            <NavLink to={"/about"}>About Author</NavLink>
          </li>
          <li>
            <NavLink to={"/blog"}>Blog</NavLink>
          </li>
          <li>
            <NavLink to={"/contact"}>Contact</NavLink>
          </li>
          <li>
            <button onClick={handleLogout} className="rounded bg-red-500 px-2 py-1 text-white">
              Logout
            </button>
          </li>
        </ul>
      </div>
    </section>
  );
};
export default MobileNav;
