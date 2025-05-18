import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "~/components/Common/Header";
import Footer from "~/components/Common/Footer";

const Protected = () => {
  const { user } = useSelector((state) => state.auth);

  if (!user) {
    return <Navigate to={"/login"} replace={true} />;
  }

  console.log(user);

  return (
    <div>
      <Header />
      <main className="h-screen">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
export default Protected;
