import { useForm } from "react-hook-form";
import { EMAIL_RULE, EMAIL_RULE_MESSAGE, PASSWORD_RULE, PASSWORD_RULE_MESSAGE } from "~/utils/validators";
import FieldErrorAlert from "~/components/Form/FieldErrorAlert";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { loginUser } from "~/redux/slice/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleLogin = (data) => {
    const { email, password } = data;

    toast
      .promise(dispatch(loginUser({ email, password })), {
        pending: "Loading",
      })
      .then((res) => {
        if (!res.error) {
          navigate("/");
          toast.success("Login successfully!");
          reset();
        }
      });
  };

  return (
    <div className="flex h-screen items-center justify-center bg-slate-200">
      <div className="w-[550px] rounded-lg bg-white px-[72px] py-12">
        <h1 className="mx-11 mb-8 text-[28px] font-semibold">Login to your account</h1>
        <form onSubmit={handleSubmit(handleLogin)}>
          <div className="grid gap-2">
            <label htmlFor="email" className="text-[16px] font-medium text-[#344054]">
              Email
            </label>
            <input
              type="email"
              {...register("email", {
                required: true,
                pattern: {
                  value: EMAIL_RULE,
                  message: EMAIL_RULE_MESSAGE,
                },
              })}
              placeholder="Enter your email..."
              className="rounded-md border-2 border-[#D0D5DD] px-4 py-3 outline-none focus-within:border-[#D1E9FF]"
            />
            <FieldErrorAlert errors={errors} fieldName={"email"} />
          </div>

          <div className="relative mt-4 grid gap-2">
            <label htmlFor="password" className="text-[16px] font-medium text-[#344054]">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              {...register("password", {
                required: true,
                pattern: {
                  value: PASSWORD_RULE,
                  message: PASSWORD_RULE_MESSAGE,
                },
              })}
              placeholder="Enter your password..."
              className="rounded-md border-2 border-[#D0D5DD] px-4 py-3 outline-none focus-within:border-[#D1E9FF]"
            />
            <FieldErrorAlert errors={errors} fieldName={"password"} />

            <div
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-[50%] translate-y-[50%] cursor-pointer select-none"
            >
              {!showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
            </div>
          </div>

          <button
            type="submit"
            className="mt-7 w-full rounded-lg bg-[#1570EF] p-4 font-semibold text-[#FCFCFD] hover:opacity-90"
          >
            Login now
          </button>
        </form>

        <p className="mt-6 text-center text-sm">
          Don't have an account?
          <Link to={"/register"} className="pl-1 text-blue-500 underline">
            Register
          </Link>
        </p>
        <div className="mt-3 text-center text-sm">
          <Link to={"/"} className="pl-1 text-center text-blue-500 underline">
            Forgot password?
          </Link>
        </div>
        <div className="mt-3 text-center text-sm">
          <Link to={"/"} className="pl-1 text-center text-blue-500 underline">
            Home
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Login;
