import { useEffect } from "react";
import BookGrid from "~/components/Books/BookGrid";
import { useDispatch, useSelector } from "react-redux";
import { getAllBooks } from "~/redux/slice/bookSlice";
import NewRelease from "~/components/Books/NewRelease";

const Books = () => {
  const dispatch = useDispatch();
  const { books } = useSelector((state) => state.book);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    dispatch(getAllBooks());
  }, [dispatch]);
  return (
    <div className="container mx-auto pb-[40px]">
      <div className="mb-[140px] mt-[60px] flex flex-col items-center justify-center">
        <h1 className="mb-8 text-[88px] font-medium">Books</h1>
        <p className="w-[460px] text-center text-gray-800">
          Porttitor in nibh id aliquet quam aliquam aliquet pulvinar integer dolor quis elementum, dui cursus nisi, nunc
          viverra nulla fringilla.
        </p>
      </div>

      <NewRelease />

      <div className="flex flex-col items-center p-4">
        <p className="mb-10 mt-[200px] w-full text-center text-[32px] font-semibold">More Books</p>
        <BookGrid books={books} />
      </div>
    </div>
  );
};
export default Books;
