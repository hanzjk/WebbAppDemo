import React, { useEffect, useState } from 'react';
import { getBooks } from './api';
import Cookies from 'js-cookie';

function App() {
  const [signedIn, setSignedIn] = useState(false);
  const [data, setData] = useState('');

  const [user, setUser] = useState(null);

  useEffect(() => {
    if (Cookies.get('userinfo')) {
      // We are here after a login
      const userInfoCookie = Cookies.get('userinfo')
      sessionStorage.setItem("userInfo", userInfoCookie);
      Cookies.remove('userinfo');
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


  useEffect(() => {
    getReadingList();
  }, [signedIn]);

  async function getReadingList() {
   if (signedIn){
    getBooks()
    .then((res) => {
      setData(res.data);
    })
    .catch((e) => {
      console.log(e);
    });
   }
     
    
  }

  if (signedIn) {
    return (
      <button
        className="float-right bg-black bg-opacity-20 p-2 rounded-md text-sm my-3 font-medium text-white"
        onClick={() => { window.location.href = "/auth/login" }}
      >
        Login
      </button>
    );
  }



  return (
    <div className="App">
      <body className="App-header">
     
        <p>Recievd Response</p>
        <p>{data}</p>
       

        <button
              className="float-right bg-[#5b86e5] p-2 rounded-md text-sm my-3 font-medium text-white"
              onClick={() => {
                sessionStorage.removeItem("userInfo");
                window.location.href = `/auth/logout?session_hint=${Cookies.get('session_hint')}`;
              }}
            >
              Logout
            </button>
      </body>
    </div>
  );
}

export default App;
