import { RiTiktokLine } from "react-icons/ri";
import { AiFillInstagram } from "react-icons/ai";
import { FaXTwitter } from "react-icons/fa6";
import { FiYoutube } from "react-icons/fi";
import { ImFacebook2 } from "react-icons/im";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className=" w-[100vw] h-[55vh] bg-cyan-20 flex flex-col items-center">
      <div>
        <Link
          to="/login"
          onClick={() => window.location.reload()}
          class="relative mt-5 items-center justify-center inline-block p-4 px-5 py-3 overflow-hidden font-medium text-indigo-600 rounded-lg shadow-2xl group"
        >
          <span class="absolute top-0 left-0 w-40 h-40 -mt-10 -ml-3 transition-all duration-700 bg-slate-5 rounded-full blur-md ease"></span>
          <span class="absolute inset-0 w-full h-full transition duration-700 group-hover:rotate-180 ease">
            <span class="absolute bottom-0 left-0 w-24 h-24 -ml-10 bg-red-600 rounded-full blur-md"></span>
            <span class="absolute bottom-0 right-0 w-24 h-24 -mr-10 bg-cyan-400 rounded-full blur-md"></span>
          </span>
          <span class="relative text-[1vw] text-white font-bold">
            Sign In For More Access
          </span>
        </Link>
      </div>
      <div className="  w-[25vw] h-[12vh] relative  rounded-lg border-2 border-zinc-700 flex flex-col items-center justify-center mt-10">
        <h1 className="mb-4">
          <span className=" text-yellow-400 font-bold text-[1.2vw]">
            Follow CINEOUT on Social
          </span>
        </h1>
        <div className="text-red-600 flex ml-5">
          <Link to="https://www.tiktok.com/about">
            <RiTiktokLine className=" text-[1.5vw] mr-10 text-white hover:text-lime-500" />
          </Link>
          <Link to="https://www.instagram.com/">
            {" "}
            <AiFillInstagram className=" text-[1.5vw] mr-10 text-white hover:text-pink-600" />
          </Link>
          <Link to="https://twitter.com/?lang=en">
            {" "}
            <FaXTwitter className=" text-[1.5vw] mr-10 text-white hover:text-blue-500" />
          </Link>
          <Link to="https://www.youtube.com/">
            {" "}
            <FiYoutube className=" text-[1.5vw] mr-10 text-white hover:text-red-600" />
          </Link>
          <Link to="https://www.facebook.com/">
            {" "}
            <ImFacebook2 className=" text-[1.5vw] mr-10 text-white hover:text-indigo-600" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
