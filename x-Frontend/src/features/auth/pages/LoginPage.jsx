import React, { useEffect, useState } from "react";
import LoginStage1 from "../components/LoginStage1";
import LoginStage2 from "../components/LoginStage2";
import { FormProvider, useForm } from "react-hook-form";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../../Slices/userSlice"; // Adjust the path as needed
import { useNavigate } from "react-router-dom";
// import { userSlice } from "../../Slices/userSlice";
// import {loginSuccess} from "../Slice/userSlice.js"

function LoginPage({ handleAccountLogin }) {
  const methods = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [stage, setstage] = useState(1);
  const [iserrorStage1, setIsErrorStage1] = useState(false);
  const [errorMsgStage1, setErrorMsgStage1] = useState("");
  const [iserrorStage2, setIsErrorStage2] = useState(false);
  const [errorMsgStage2, setErrorMsgStage2] = useState("");
  // const userInfo = useSelector((state)=>state.loginSuccess?.userData)
  const isUserLogin = useSelector((state) => state.user.isAuthenticated);

  // console.log("This is userinfo",userInfo)

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
        },{
          withCredentials:true
        }
      );

      console.log("This is response", response);
      dispatch(loginSuccess(response.data.userData));

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

  useEffect(() => {
    if (isUserLogin) {
      navigate("/home");
    }
  }, [isUserLogin]);

  // if (isUserLogin) {
  //   navigate('/home')
  // }

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
      </form>
    </FormProvider>
  );
}

export default LoginPage;
