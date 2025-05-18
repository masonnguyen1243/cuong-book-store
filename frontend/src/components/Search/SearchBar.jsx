import { useState } from "react";
import { IoIosSearch, IoMdClose } from "react-icons/io";

const SearchBar = ({ openSearchBar, setOpenSearchBar }) => {
  const [searchValue, serSearchValue] = useState("");

  console.log(searchValue);

  return (
    <section
      className={`flex w-full items-center justify-center transition-all duration-300 ${openSearchBar ? "absolute left-0 top-0 z-50 h-24 w-full bg-white" : "w-auto"}`}
    >
      {openSearchBar && (
        <div className="relative w-72 md:w-full">
          <div className="container relative mx-auto">
            <form className="flex w-full items-center justify-center">
              <div className="w-full">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchValue}
                  onChange={(e) => serSearchValue(e.target.value)}
                  className="w-full rounded-lg bg-gray-100 px-4 py-2 pr-12 placeholder:text-gray-700 focus:outline-none"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 transform text-gray-600 hover:text-gray-800"
                >
                  <IoIosSearch className="h-6 w-6" />
                </button>
              </div>
            </form>
          </div>
          <button
            onClick={() => setOpenSearchBar(false)}
            className="absolute right-2 top-1/2 hidden -translate-y-1/2 md:block"
          >
            <IoMdClose className="h-6 w-6" />
          </button>
        </div>
      )}
    </section>
  );
};
export default SearchBar;
