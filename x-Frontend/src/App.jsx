import { useState } from "react";
import { Routes,Route } from "react-router-dom";
import StartPage from "./features/auth/pages/StartPage";
import InputBox from "./features/auth/components/InputBox";
import ErrorMessage from "./utils/ErrorMessage";
import AnimatedComponent from "./utils/ErrorAnimatedComponent";
import LoginPage from "./features/auth/pages/LoginPage";
import SignupPage from "./features/auth/pages/SignupPage";
import MobileNav from "./features/profile/components/MobileNav";
import Profile from "./features/profile/pages/Profile";
import TweetCard from "./components/TweetCard";
import { TagIcon } from "@heroicons/react/20/solid";
import TabBar from "./components/TabBar";
import Home from "./features/Home/Pages/Home";
import SearchBar from "./components/SearchBar";
import Layout from "./features/Home/components/Layout";
import HomeCenter from "./features/Home/components/HomeCenter";
import MobileHomeCenter from "./features/Home/components/MobileHomeCenter";
import PostTweetCard from "./components/PostTweetCard";
import ProtectedRoute from "./components/ProtectedRoute";
import Search from "./features/Home/components/Search";

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

{/* <Route path="/test" element={<SearchBar/>}/> */}



<Route  element={<ProtectedRoute/>}>

<Route path="/home" element={<Layout/>}>

<Route path="profile" element={<Profile/>}/>
<Route index element={<Home/>}/>

</Route>


{/* <Route path="/profile/:userId" element={<Profile/>}/> */}
<Route path="/profile/:username" element={<Profile/>}/>

<Route path="/post" element={<PostTweetCard/>}/>
<Route path="/post/comment/:postId" element={<PostTweetCard/>}/>

<Route path="/search" element={<Search/>}/>

</Route>
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
