import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentBook, getSimilarBook } from "~/redux/slice/bookSlice";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import BookGrid from "./BookGrid";

const BookDetails = () => {
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentBook, similarBooks } = useSelector((state) => state.book);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    dispatch(getCurrentBook({ id }));

    dispatch(getSimilarBook({ id }));
  }, [dispatch, id]);

  const handleQuantityChange = (action) => {
    if (action === "plus") {
      setQuantity((prev) => prev + 1);
    }

    if (action === "minus" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = () => {
    toast.success("Add to cart");
  };
  return (
    <div className="mt-[60px] p-4">
      {currentBook && (
        <section className="container mx-auto">
          {/* Top */}
          <div className="flex flex-col justify-between md:flex-row">
            {/* image */}
            <div className="mb-4 flex justify-center md:w-1/2">
              <img
                src={currentBook.data.image}
                alt={currentBook.data.name}
                className="h-[1020px] w-[680px] object-cover md:h-[737px] md:w-[500px]"
              />
            </div>
            {/* Details */}
            <div className="ml-10 md:w-1/2 lg:ml-0">
              <p>{currentBook.data.category}</p>
              <p className="my-[13px] text-[26px]">{currentBook.data.name}</p>
              {currentBook.data.discountPrice ? (
                <p className="text-[24px]">
                  <span className="text-gray-500 line-through">${currentBook.data.price}</span> $
                  {currentBook.data.discountPrice}
                </p>
              ) : (
                <p className="text-[24px]">${currentBook.data.price}</p>
              )}
              <p className="mt-[13px] tracking-wide">{currentBook.data.description}</p>

              <div className="my-6 flex items-center gap-6 border-b-2 pb-5">
                <p className="text-gray-700">Quantity: </p>
                <div className="mt-2 flex items-center space-x-4">
                  <button
                    onClick={() => handleQuantityChange("minus")}
                    className="rounded bg-gray-200 px-2 py-1 text-lg"
                  >
                    -
                  </button>
                  <span className="text-lg">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange("plus")}
                    className="rounded bg-gray-200 px-2 py-1 text-lg"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="w-[226px] rounded border border-main px-5 py-1.5 text-main transition-all duration-300 hover:bg-main hover:text-white"
                >
                  Add to cart
                </button>
              </div>

              <div>
                <span className="mr-6 text-xs text-gray-800">Category: {currentBook.data.category}</span>
                <span className="text-xs text-gray-800">
                  Tags: {currentBook.data.tags[0]}, {currentBook.data.tags[1]}, {currentBook.data.tags[2]}
                </span>
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="mt-[200px]">
            <h1 className="mb-10 mt-[200px] text-[48px] font-semibold">Related products</h1>
            <BookGrid books={similarBooks} />
          </div>
        </section>
      )}
    </div>
  );
};
export default BookDetails;
