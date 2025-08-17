import { useState } from "react";
import { Routes,Route } from "react-router-dom";
import StartPage from "./features/auth/pages/StartPage";
import InputBox from "./features/auth/components/InputBox";
import ErrorMessage from "./utils/ErrorMessage";
import AnimatedComponent from "./utils/ErrorAnimatedComponent";
import LoginPage from "./features/auth/pages/LoginPage";
import SignupPage from "./features/auth/pages/SignupPage";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="bg-black h-screen w-screen ">
      {/* <StartPage/> */}
      {/* <LoginPage/> */}

<Routes>
<Route path="/" element={<StartPage/>}/>

<Route path="/login" element={<LoginPage/>}/>
<Route path="/signup" element={<SignupPage/>}/>


</Routes>


        {/* <AnimatedComponent
          show={true} 
          duration={500}
          blur={true}
          className=" border border-blue-500/100 
                  bg-blue-500/20  "
        >
          {"Message This message is for testing"}
        </AnimatedComponent> */}

     
    </div>
  );
}

export default App;
