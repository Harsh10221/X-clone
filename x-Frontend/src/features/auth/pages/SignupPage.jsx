import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Stage2 from "../components/Stage2";
import Stage1 from "../components/Stage1";
import Stage3 from "../components/Stage3";
import axios from "axios";
import Stage4 from "../components/Stage4";
import Stage5 from "../components/Stage5";
import { useNavigate } from "react-router-dom";
import { useResponsive } from "../hooks/useResponsive";

function SignupPage({ handleAccountCreate }) {
  const methods = useForm();

  // console.log("this is handlecreate ",handleAccountCreate)

  const { isMobile } = useResponsive();

  const navigate = useNavigate();

  const [stage, setStage] = useState(1);
  const [fullDetails, setFullDetails] = useState(null);
  const [eligible, setEligible] = useState(false);
  const [error, setError] = useState("");
  const [iserror, setisError] = useState(true);

  const [iserrorStage2, setIserrorStage2] = useState(false);
  const [errorMsgStage2, setErrorMsgStage2] = useState("");

  const [dataFromChild, setdataFromChild] = useState({});
  const [stage5Error, setstage5Error] = useState("");

  //Stage1

  const getOtp = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/v1/users/generate-otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: methods.getValues().email }),
        }
      );
    } catch (error) {
      console.log("Error while generating otp ", error);
    }
  };

  const handleDataFromChild = (childData) => {
    // console.log("i am running handel data child", childData);
    if (childData?.day) {
      setEligible(true);
    }
    setdataFromChild(childData);
  };

  const handleUserExistError = () => {
    // console.log("There was a error on the user exist", error);

    setTimeout(() => {
      setisError(false);
    }, 2000);
  };

  const handlebtnClick = async () => {
    // console.log("this is get values",methods.getValues());
    // console.log("This is value from watch",watch("email"))

    const arr = Object.values(dataFromChild).filter((value) => value == "");

    if (!(arr.length == 0)) {
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:8000/api/v1/users/check-email",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Tell the server we're sending JSON
          },
          body: JSON.stringify({ email: methods.getValues().email }),
        }
      );
      const result = await response.json();
      console.log("this is result", result);

      if (result.message.includes("Email is already registered")) {
        // console.log(result.message)
        setisError(true);
        setError(result.message);
      } else {
        // setStage(2);
        // console.log("I am from else ")
        handleNextStage();
        getOtp();

        setEligible(false);
      }
    } catch (error) {
      throw error;
    }

    if (!dataFromChild?.day) {
      return console.log("returned");
    }

    console.log(fullDetails);
  };

  //stage2

  const verifyOtp = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/users/check-otp",
        {
          email: methods.getValues().email,
          otp: methods.getValues().otp,
        }
      );

      if (
        response.data.message.includes("Your verification was successfully")
      ) {
        console.log("Authentication successfull");
        setStage(3);
      }
    } catch (error) {
      if (error.response.data.message.includes("Otp didnt match")) {
        console.log("Otp didnt match");
      }
      if (error.response.data.message.includes("Your Otp was expired")) {
        console.log("Your Otp was expired");
      }
      setIserrorStage2(true);
      setErrorMsgStage2(error.response.data.message);
    }
  };

  //Stage 3

  //Stage5

  const checkUsernamevalid = async () => {
    try {
      console.log("this is from sigup page", methods.getValues());
      const response = await axios.post(
        "http://localhost:8000/api/v1/users/check-username",
        {
          userName: methods.getValues().userName,
        }
      );

      console.log("this is response", response);
    } catch (error) {
      setstage5Error(error.response.data.message);
      console.error("This is error", error);
      return error.response.data.message;
    }
  };

  //  No stage related
  const onFinalSubmit = async (data) => {
    // console.log("I am entered")

    if (stage == 1) {
      handlebtnClick();
      console.log(data);
    }

    // console.log("THis is data ", data);
    if (stage == 2) {
      verifyOtp();
    }
    // console.log("THis is stage ", stage);
    if (stage == 3 || stage == 4) {
      // console.log("THis is stage ", stage);
      // console.log("i am from 3or 4")
      handleNextStage();
    }

    // console.log("This is the final before stage 5", finalData);

    if (!(stage == 5)) {
      return;
    }

    const response = await checkUsernamevalid();

    console.log("this is resopnse form check username ", response);

    if (response) {
      console.log(
        " i am returened because of stage5error is present",
        stage5Error
      );
      return;
    }

    delete data.otp;

    const finalData = { ...data, ...dataFromChild };

    console.log("This is the final before stage 5", finalData);

    const dataToUpload = new FormData();

    for (const key in finalData) {
      if (finalData[key] instanceof FileList) {
        console.log("This is indide loop ", key);
        dataToUpload.append(key, finalData[key][0]);
      } else {
        dataToUpload.append(key, finalData[key]);
      }
    }

    try {
      const registerResponse = await axios.post(
        "http://localhost:8000/api/v1/users/register",
        dataToUpload
      );

      if (registerResponse.status) {
        navigate("/login");
      }
    } catch (error) {
      console.log("error while registring");
    }

    // console.log("This is register respone", registerResponse);
  };

  const handleNextStage = () => {
    // let currentData = getValues();
    setStage((prev) => prev + 1);

    // console.log("This is the current data", currentData);
  };

  return (
    <FormProvider {...methods}>
      <form
        className="md:h-4/5 md:w-2/5 md:bg-black md:rounded-xl h-full w-full"
        onSubmit={methods.handleSubmit(onFinalSubmit)}
      >
        <div className=" p-5 md:p-0  w-full h-full">
          {stage == 1 && (
            <Stage1
              handleAccountCreate={handleAccountCreate}
              getOtp={getOtp}
              error={error}
              eligible={eligible}
              handleDataFromChild={handleDataFromChild}
              handleUserExistError={handleUserExistError}
              handlebtnClick={handlebtnClick}
              iserror={iserror}
              handleNextStage={handleNextStage}
              setStage={setStage}
              fullDetails={fullDetails}
              setFullDetails={setFullDetails}
            />
          )}

          {stage == 2 && (
            <Stage2
              // initialData={getValues()}
              // register={register}
              // errors={errors}
              errorMsgStage2={errorMsgStage2}
              iserrorStage2={iserrorStage2}
              setIserrorStage2={setIserrorStage2}
              getOtp={getOtp}
              verifyOtp={verifyOtp}
              eligible={eligible}
              email={fullDetails?.email}
            />
          )}

          {stage == 3 && <Stage3 />}

          {stage == 4 && <Stage4 />}

          {stage == 5 && (
            <Stage5
              setstage5Error={setstage5Error}
              stage5Error={stage5Error}
              checkUsernamevalid={checkUsernamevalid}
            />
          )}
        </div>
      </form>
    </FormProvider>
  );
}

export default SignupPage;
