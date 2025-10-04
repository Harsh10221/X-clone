import React, { useEffect, useState } from "react";
import SearchBar from "../../../components/SearchBar";
import {
  ArrowLeftIcon,
  XCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MiniUserProfile from "../../../components/MiniUserProfile";

function Search() {
  const navigate = useNavigate();
  const [searchTerm, setsearchTerm] = useState("");
  const [results, setResults] = useState(null);
  const [isError, setIsError] = useState(null);
  const [isLodading, setIsLodading] = useState(false);

  console.log("this is input ", results);

  useEffect(() => {
    const deDouncingFn = setTimeout(() => {
      setResults(null);
      setIsError(null);
      if (searchTerm) {
        axios
          .get(`https://x-clone-on81.onrender.com/find-user/${searchTerm}`)
          .then((response) => setResults(response.data))
          .catch(
            (err) => setIsError(err.response.data)
            //  console.log("❌ Error:", err.message)
          );
      }
    }, 1000);

    return () => clearTimeout(deDouncingFn);
  }, [searchTerm]);

  const handleBackToHome = () => {
    navigate("/home");
  };

  const handleTheUserInputFromChild = (input) => {
    setsearchTerm(input);
    console.log("THis is user input ser", input);
  };

  return (
    <div className="h-full  w-full flex flex-col">
      <div className="w-full h-auto flex items-center justify-between p-3">
        <ArrowLeftIcon
          onClick={handleBackToHome}
          className="text-white  w-5 h-5"
        />
        <SearchBar
          handleTheUserInputFromChild={handleTheUserInputFromChild}
          width={"90%"}
        />
      </div>

      <div className=" flex-1  w-full ">
        {results?.success ? (
          results?.results?.map((item) => <MiniUserProfile item={item} />)
        ) : (
          <div className="w-full h-full flex items-start justify-center text-white ">
            {isError?.message}
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;
