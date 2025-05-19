import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBestSellers } from "~/redux/slice/bookSlice";
import { Link } from "react-router-dom";

const BestSellers = () => {
  const dispatch = useDispatch();
  const { bestSellers } = useSelector((state) => state.book);

  useEffect(() => {
    dispatch(getBestSellers());
  }, [dispatch]);

  return (
    <section className="container mx-auto">
      <div className="text-center">
        <h2 className="pt-[200px] text-[48px] font-medium">Best Selling Books</h2>
        <div className="flex justify-center">
          <p className="mt-4 w-[500px] text-gray-700">
            Vulputate vulputate eget cursus nam ultricies mauris, malesuada elementum lacus arcu, sit dolor ipsum, ac
            felis, egestas vel tortor eget aenean.
          </p>
        </div>
      </div>
      <div className="mt-12 grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
        {bestSellers?.data?.map((book, index) => (
          <Link key={index} to={`/book/${book._id}`} className="">
            <img src={book.image} alt={book.name} className="h-[500px] cursor-pointer rounded object-contain" />
            <p className="my-2 text-xs text-gray-500">{book.category}</p>
            <p className="font-medium">{book.name}</p>
            {book.discountPrice ? (
              <p>
                <span className="text-gray-400 line-through">${book.price}</span> ${book.discountPrice}
              </p>
            ) : (
              <p className="mt-1 text-sm text-[#565a61]">${book.price}</p>
            )}
          </Link>
        ))}
      </div>

      <div className="my-[100px] flex justify-center">
        <Link
          to={`/books`}
          className="rounded-md border border-main px-[23px] py-[15px] text-main transition-all duration-300 hover:bg-main hover:text-white"
        >
          Shop All Book
        </Link>
      </div>
    </section>
  );
};
export default BestSellers;
