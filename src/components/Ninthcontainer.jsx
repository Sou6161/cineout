import { FaEye } from "react-icons/fa";

const Ninthcontainer = () => {
  return (
    <>
      <div className="w-[100vw] h-[7vh] bg-red-300 ">
        <div className=" text-[2vw] text-red-600 bg-red-30 font-semibold ml-14">
          Recently Viewed
          <span className=" inline-block text-[1.6vw]  text-yellow-400 relative top-[.4vh] right-[17vw]">
            {" "}
            <FaEye />
          </span>
        </div>
      </div>
      <div className=" w-[100vw] h-[50vh] bg-yellow-600 mb-10">
        <div>

        </div>
      </div>
    </>
  );
};

export default Ninthcontainer;
