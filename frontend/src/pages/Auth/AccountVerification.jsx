import { useEffect } from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { verifyAccount } from "~/redux/slice/authSlice";
import { toast } from "react-toastify";

const AccountVerification = () => {
  const dispatch = useDispatch();

  let [searchParams] = useSearchParams();

  const { email, token } = Object.fromEntries([...searchParams]);

  useEffect(() => {
    dispatch(verifyAccount({ email, token }));
    toast.success("Verification successfully! Please login to enjoy our service!");
  }, [email, token]);

  if (!email || !token) {
    return <Navigate to={"/404"} />;
  }

  return <Navigate to={"/login"} />;
};
export default AccountVerification;
