import NewRelease from "~/components/Books/NewRelease";
import BestSellers from "~/components/Books/BestSellers";
import Biography from "./Biography";
import Achievement from "./Achievement";

const Home = () => {
  return (
    <div>
      <NewRelease />
      <Biography />
      <Achievement />
      <BestSellers />
    </div>
  );
};
export default Home;
