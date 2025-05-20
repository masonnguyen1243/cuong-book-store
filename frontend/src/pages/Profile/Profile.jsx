import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { logoutUser } from "~/redux/slice/authSlice";
import { useNavigate } from "react-router-dom";
import { clearCart } from "~/redux/slice/cartSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    toast
      .promise(dispatch(logoutUser()), {
        pending: "Loading...",
      })
      .then((res) => {
        if (!res.error) {
          navigate("/login");
          toast.success("Logged out successfully!");
          dispatch(clearCart());
        }
      });
  };

  return (
    <div className="flex min-h-screen flex-col">
      <div className="container mx-auto flex-grow p-4 sm:p-6">
        <div className="flex flex-col space-y-6 md:flex-row md:space-x-6 md:space-y-0">
          {/* Left */}
          <div className="h-full w-full rounded-lg p-6 shadow-md md:w-1/3 lg:w-1/4">
            <h1 className="mb-4 text-2xl font-bold md:text-3xl">{user?.data?.user?.name}</h1>
            <p className="mb-4 text-lg text-gray-600">{user?.data?.user?.email}</p>
            <button onClick={handleLogout} className="w-full rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600">
              Logout
            </button>
          </div>

          {/* Right */}
          <div className="w-full md:w-2/3 lg:w-3/4">{/* <MyOrders /> */}</div>
        </div>
      </div>
    </div>
  );
};
export default Profile;
