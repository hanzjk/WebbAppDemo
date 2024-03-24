import "./App.css";
import Todo from "./components/Todo";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { LoginButton,LogutButton } from "./components/TodoList/styles";
import {  useAuthContext } from "@asgardeo/auth-react";

function App() {
  const {
    signIn,
    signOut,
    getAccessToken,
    isAuthenticated,
    getBasicUserInfo,
    state,
  } = useAuthContext();

  const [signedIn, setSignedIn] = useState(false);
  const [user, setUser] = useState(null);


  const handleSignIn = async () => {
    
    sessionStorage.setItem("isSigningIn", "true"); // Set flag before signing in
     signIn()
      .then(() => {
        console.log("s");
        setSignedIn(true);
      })
      .catch((e) => {
        console.log(e);
        sessionStorage.removeItem("isSigningIn"); // Clean up on error

      });
  };


  useEffect(() => {
    // Check if the user was in the process of signing in
    const isSigningIn = sessionStorage.getItem("isSigningIn");
    if (isSigningIn) {
      setSignedIn(true);
      sessionStorage.removeItem("isSigningIn"); // Clean up
    }
  }, []);


  useEffect(() => {
    if (Cookies.get("userinfo")) {
      // We are here after a login
      const userInfoCookie = Cookies.get("userinfo");
      sessionStorage.setItem("userInfo", userInfoCookie);
      Cookies.remove("userinfo");
      var userInfo = JSON.parse(atob(userInfoCookie));
      setSignedIn(true);
      setUser(userInfo);
    } else if (sessionStorage.getItem("userInfo")) {
      // We have already logged in
      var userInfo = JSON.parse(atob(sessionStorage.getItem("userInfo")));
      setSignedIn(true);
      setUser(userInfo);
    } else {
      console.log("User is not signed in");
    }
  }, []);


  
  return (
    <>
      {!signedIn && (
        <div style={{marginTop:"20%",marginLeft:"35%"}}>
        <LoginButton
          className="float-right bg-black bg-opacity-20 p-2 rounded-md text-sm my-3 font-medium text-white"
          // onClick={() => {
          //   window.location.href = "/auth/login";
          // }}
          onClick={handleSignIn}
        >
          Login
        </LoginButton>
      </div>
      )}
  {
    signedIn && (
      <div className="App">
      <LogutButton
        className="float-right bg-[#5b86e5] p-2 rounded-md text-sm my-3 font-medium text-white"
        onClick={() => {
          sessionStorage.removeItem("userInfo");
          signOut()
        }}
      >
        Logout
      </LogutButton>

      <Todo />
    </div>
    )
  }
   
    </>
  );
}

export default App;
