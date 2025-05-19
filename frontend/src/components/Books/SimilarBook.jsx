import { Link } from "react-router-dom";

const SimilarBook = ({ similarBooks }) => {
  return (
    <div className="">
      <h1 className="mb-10 mt-[200px] text-[48px] font-semibold">Related products</h1>
      <section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {similarBooks?.data?.map((book, index) => (
          <Link key={index} to={`/book/${book._id}`}>
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
    </div>
  );
};
export default SimilarBook;
