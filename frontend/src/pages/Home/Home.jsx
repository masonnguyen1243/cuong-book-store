import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "~/redux/slice/authSlice";
import { toast } from "react-toastify";

const Home = () => {
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
    <div>
      Home
      <button className="ml-3 cursor-pointer rounded bg-green-300 p-2" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};
export default Home;
