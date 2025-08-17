import React, { useState } from "react";
import LoginStage1 from "../components/LoginStage1";
import LoginStage2 from "../components/LoginStage2";
import { FormProvider, useForm } from "react-hook-form";
import axios from "axios";

function LoginPage({handleAccountLogin}) {
  const methods = useForm();

  const [stage, setstage] = useState(1);
  const [iserrorStage1, setIsErrorStage1] = useState(false);
  const [errorMsgStage1, setErrorMsgStage1] = useState("");
  const [iserrorStage2, setIsErrorStage2] = useState(false);
  const [errorMsgStage2, setErrorMsgStage2] = useState("");

  const checkUserExist = async (emailorUsername) => {
    const response = await axios.get(
      "http://localhost:8000/api/v1/users/check-userexist",
      {
        params: { emailorUsername },
      }
    );

    console.log("This is response", response);

    if (response.data.exists) {
      setstage(2);
    } else {
      setIsErrorStage1(true);
      setErrorMsgStage1(response.data.message);
    }
  };

  const checkUserPassword = async (password, emailorUsername) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/users/check-password",
        {
          password,
          emailorUsername,
        }
      );

      console.log("This is response", response);

      if (response.status == 200) {
        setstage(3);
      }
    } catch (error) {
      if (error.response) {
        console.log("This is errror", error.response.data.message);
        setErrorMsgStage2(error.response.data.message);
        setIsErrorStage2(true);
      } else {
        console.log("An unexpected errror occured", error.message);
      }
    }
  };

  const onFinalSubmit = (data) => {
    if (stage == 1) {
      checkUserExist(data?.emailorUsername);
      return;
    }
    if (stage == 2) {
      checkUserPassword(data.password, data.emailorUsername);
    }

    console.log("This is form data", data);
  };

  return (
    <FormProvider {...methods}>
      <form
        className=" md:h-4/5 md:w-2/5 md:bg-black md:rounded-xl h-full w-full"
        onSubmit={methods.handleSubmit(onFinalSubmit)}
      >
        {stage == 1 && (
          <LoginStage1
          handleAccountLogin={handleAccountLogin}
            setErrorMsgStage1={setErrorMsgStage1}
            setIsErrorStage1={setIsErrorStage1}
            iserrorStage1={iserrorStage1}
            errorMsgStage1={errorMsgStage1}
          />
        )}

        {stage == 2 && (
          <LoginStage2
            iserrorStage2={iserrorStage2}
            setIsErrorStage2={setIsErrorStage2}
            setErrorMsgStage2={setErrorMsgStage2}
            errorMsgStage2={errorMsgStage2}
          />
        )}

        {stage == 3 && <h1 className="text-white">Hello mate</h1>}
      </form>
    </FormProvider>
  );
}

export default LoginPage;
