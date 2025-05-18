import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNewArrivals } from "~/redux/slice/bookSlice";

const NewRelease = () => {
  const dispatch = useDispatch();
  const { newArrivals } = useSelector((state) => state.book);

  console.log(newArrivals);

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
            <p className="text-main text-xs font-bold uppercase tracking-wider">New release</p>
            <p className="text-[64px] md:text-[88px]">{book.name}</p>
            <p>{book.description}</p>
            <div className="mt-8 flex items-center gap-4">
              <button className="bg-main border-main rounded-md border px-[21px] py-[13px] text-white hover:opacity-90">
                Buy Now
              </button>
              <button className="border-main text-main hover:bg-main rounded-md border px-[21px] py-[13px] transition-all duration-300 hover:text-white">
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
