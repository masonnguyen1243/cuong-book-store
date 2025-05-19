import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getNewArrivals } from "~/redux/slice/bookSlice";

const NewRelease = () => {
  const dispatch = useDispatch();
  const { newArrivals } = useSelector((state) => state.book);

  useEffect(() => {
    dispatch(getNewArrivals());
  }, [dispatch]);

  return (
    <section className="container mx-auto mt-6">
      {newArrivals?.data?.map((book, index) => (
        <div
          key={index}
          className="flex flex-col-reverse items-center justify-center md:flex-row md:items-start md:justify-between"
        >
          <div className="w-1/2">
            <p className="text-xs font-bold uppercase tracking-wider text-main">New release</p>
            <p className="text-[64px] md:text-[88px]">{book.name}</p>
            <p>{book.description}</p>
            <div className="mt-8 flex items-center gap-4">
              <Link
                to={`/book/${book._id}`}
                className="rounded-md border border-main bg-main px-[21px] py-[13px] text-white hover:opacity-90"
              >
                Buy Now
              </Link>
              <button className="rounded-md border border-main px-[21px] py-[13px] text-main transition-all duration-300 hover:bg-main hover:text-white">
                Read Sample
              </button>
            </div>
          </div>
          <div className="flex w-1/2 justify-center">
            <img src={book.image} alt={book.name} className="h-[600px] w-[400px] object-contain" />
          </div>
        </div>
      ))}
    </section>
  );
};
export default NewRelease;
