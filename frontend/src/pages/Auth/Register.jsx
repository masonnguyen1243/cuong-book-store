import { useForm } from "react-hook-form";
import {
  EMAIL_RULE,
  EMAIL_RULE_MESSAGE,
  FIELD_REQUIRED_MESSAGE,
  PASSWORD_RULE,
  PASSWORD_RULE_MESSAGE,
} from "~/utils/validators";
import FieldErrorAlert from "~/components/Form/FieldErrorAlert";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { registerUser } from "~/redux/slice/authSlice";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleRegister = (data) => {
    const { name, email, password } = data;

    toast
      .promise(dispatch(registerUser({ name, email, password })), {
        pending: "Loading...",
      })
      .then((res) => {
        if (!res.error) {
          navigate("/login");
          toast.success("Registration successfully! Please check your email");
          reset();
        }
      });
  };
  return (
    <div className="flex h-screen items-center justify-center bg-slate-100">
      <div className="w-[550px] rounded-lg bg-white px-[72px] py-12 shadow-lg">
        <h1 className="mx-11 mb-8 text-[28px] font-semibold">Create an account</h1>
        <form onSubmit={handleSubmit(handleRegister)}>
          <div className="grid gap-2">
            <label htmlFor="name" className="text-[16px] font-medium text-[#344054]">
              Name
            </label>
            <input
              type="text"
              {...register("name", {
                required: FIELD_REQUIRED_MESSAGE,
              })}
              placeholder="Enter your name..."
              className="rounded-md border-2 border-[#D0D5DD] px-4 py-3 outline-none focus-within:border-[#D1E9FF]"
            />
          </div>

          <div className="mt-4 grid gap-2">
            <label htmlFor="email" className="text-[16px] font-medium text-[#344054]">
              Email
            </label>
            <input
              type="email"
              {...register("email", {
                required: FIELD_REQUIRED_MESSAGE,
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
                required: FIELD_REQUIRED_MESSAGE,
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
            Register now
          </button>
        </form>

        <p className="mt-6 text-center text-sm">
          Already have an account?
          <Link to={"/login"} className="pl-1 text-blue-500 underline">
            Login
          </Link>
        </p>

        <div className="mt-3 text-center text-sm">
          <Link to={"/"} className="pl-1 text-center text-blue-500 underline">
            Home
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Register;
