import React from "react";
import { useLocation, useParams } from "react-router-dom";

const SearchDataDetailsMenu = () => {
  const { id } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const q = searchParams.get("q");
  return (
    <div className=" w-[100vw] h-[100vh] bg-red-300">SearchDataDetailsMenu</div>
  );
};

export default SearchDataDetailsMenu;
