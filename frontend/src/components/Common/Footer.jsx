import { Link } from "react-router-dom";
import { FaInstagram, FaFacebook, FaYoutube, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <section className="bg-[#25262c]">
      {/* Top */}
      <div className="container mx-auto px-10 pb-16 pt-[104px]">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div>
            <img
              src="https://websitedemos.net/book-store-02/wp-content/uploads/sites/834/2021/04/site-logo-white.svg"
              alt="logo"
              className="w-[300px] md:w-full"
            />
          </div>
          <div>
            <ul className="flex flex-col items-center gap-6 font-medium text-white md:flex-row">
              <li>
                <Link to={"/"}>Home</Link>
              </li>
              <li>
                <Link to={"/books"}>Books</Link>
              </li>
              <li>
                <Link to={"/about"}>About Author</Link>
              </li>
              <li>
                <Link to={"/blog"}>Blog</Link>
              </li>
              <li>
                <Link to={"/contact"}>Contact</Link>
              </li>
            </ul>
          </div>
          <div className="flex items-center justify-center gap-6">
            <div>
              <FaInstagram color="white" size={20} />
            </div>
            <div>
              <FaFacebook color="white" size={20} />
            </div>
            <div>
              <FaYoutube color="white" size={20} />
            </div>
            <div>
              <FaTwitter color="white" size={20} />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="flex items-center justify-center py-5 text-sm text-white">
        <p>Copyright © {new Date().getFullYear()} Cuong Book Store | Powered by Mason Nguyen</p>
      </div>
    </section>
  );
};
export default Footer;
