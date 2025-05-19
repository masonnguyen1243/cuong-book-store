import { Link } from "react-router-dom";

const BookGrid = ({ books }) => {
  return (
    <section className="mb-4 grid select-none grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
      {books?.data?.map((book, index) => (
        <Link key={index} to={`/book/${book._id}`} className="block">
          <div className="">
            <div className="">
              <img src={book.image} alt={book.name} className="w-full" />
            </div>
            <div className="">
              <p className="my-2 text-xs text-gray-500">{book.category}</p>
              <p className="font-medium">{book.name}</p>
              {book.discountPrice ? (
                <p>
                  <span className="text-sm text-gray-400 line-through">${book.price}</span> ${book.discountPrice}
                </p>
              ) : (
                <p className="mt-1 text-sm text-[#565a61]">${book.price}</p>
              )}
            </div>
          </div>
        </Link>
      ))}
    </section>
  );
};
export default BookGrid;
