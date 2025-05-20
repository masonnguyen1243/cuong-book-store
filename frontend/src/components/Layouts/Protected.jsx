import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "~/components/Common/Header";
import Footer from "~/components/Common/Footer";

const Protected = () => {
  const { user } = useSelector((state) => state.auth);

  if (!user) {
    return <Navigate to={"/login"} replace={true} />;
  }

  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
export default Protected;
