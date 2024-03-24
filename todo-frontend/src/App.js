import "./App.css";
import Todo from "./components/Todo";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { LoginButton,LogutButton } from "./components/TodoList/styles";
function App() {
  const [signedIn, setSignedIn] = useState(true);
  const [user, setUser] = useState(null);

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

  if (!signedIn) {
    return (
      <div style={{marginTop:"20%",marginLeft:"35%"}}>
        <LoginButton
          className="float-right bg-black bg-opacity-20 p-2 rounded-md text-sm my-3 font-medium text-white"
          onClick={() => {
            window.location.href = "/auth/login";
          }}
        >
          Login
        </LoginButton>
      </div>
    );
  }

  return (
    <div className="App">
      <LogutButton
        className="float-right bg-[#5b86e5] p-2 rounded-md text-sm my-3 font-medium text-white"
        onClick={() => {
          sessionStorage.removeItem("userInfo");
          window.location.href = `/auth/logout?session_hint=${Cookies.get(
            "session_hint"
          )}`;
        }}
      >
        Logout
      </LogutButton>

      <Todo />
    </div>
  );
}

export default App;
