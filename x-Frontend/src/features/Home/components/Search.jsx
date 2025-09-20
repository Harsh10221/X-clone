import React, { useEffect, useState } from "react";
import SearchBar from "../../../components/SearchBar";
import {
  ArrowLeftIcon,
  XCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import MiniUserProfile from "../../../components/MiniUserProfile";

function Search() {
  const navigate = useNavigate();
  const [searchTerm, setsearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [isLodading, setIsLodading] = useState(false);

  // console.log("this is input ", results);

  useEffect(() => {
    const deDouncingFn = setTimeout(() => {
      if (searchTerm) {
        axios
          .get(`http://localhost:8000/api/v1/users/find-user/${searchTerm}`)
          .then((response) => setResults(response.data.results))
          .catch((err) => console.log("❌ Error:", err.message));
      }
    }, 1000);

    return () => clearTimeout(deDouncingFn);
  }, [searchTerm]);

  const handleBackToHome = () => {
    navigate("/home");
  };

  const handleTheUserInputFromChild = (input) => {
    setsearchTerm(input);
  };

  return (
    //  <form onSubmit={handleSubmit(onSubmit)}>
    <div className="h-full w-full flex flex-col">
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
        {results.map((item) => (
          // <div className="w- " >
            
            <MiniUserProfile item={item}/>
          // </div>
          // <div className="text-white w-full bg-red-500 mb-5 p-5 " >hello</div>
        ))}
      </div>
    </div>
    // </form>
  );
}

export default Search;
