import { Outlet } from "react-router-dom";
import Header from "~/components/Common/Header";
import Footer from "~/components/Common/Footer";

const UserLayouts = () => {
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
export default UserLayouts;
