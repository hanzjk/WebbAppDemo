import React, { useEffect, useState } from 'react';
import { getBooks } from './api';
import Cookies from 'js-cookie';
import { BasicUserInfo, useAuthContext } from "@asgardeo/auth-react";

function App() {
  const [signedIn, setSignedIn] = useState(false);
  const [data, setData] = useState('');

  const [user, setUser] = useState(null);
  const {
    signIn,
    signOut,
    getAccessToken,
    isAuthenticated,
    getBasicUserInfo,
    state,
  } = useAuthContext();
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));



  useEffect(() => {
    async function signInCheck() {
      await sleep(2000);
      const isSignedIn = await isAuthenticated();
      console.log("isSignedIn", isSignedIn);
      setSignedIn(isSignedIn);
      return isSignedIn;
    }
    signInCheck().then((res) => {
      if (res) {
        getReadingList();
        getUser();
      } else {
        console.log("User has not signed in");
      }
    });
  }, []);

  async function getUser() {
    const userResponse = await getBasicUserInfo();
    setUser(userResponse);
  }

  const handleSignIn = async () => {
    console.log("SIGN IN")
    signIn()
      .then(() => {
        console.log("SIGNIN SUCCESS")

        setSignedIn(true);
      })
      .catch((e) => {
        console.log(e);
      });
  };



  useEffect(() => {
    getReadingList();
  }, [signedIn]);

  async function getReadingList() {
   if (signedIn){
    const accessToken = await getAccessToken();
    console.log(accessToken);
    getBooks(accessToken)
    .then((res) => {
      setData(res.data);
    })
    .catch((e) => {
      console.log(e);
    });
   }
     
    
  }

  if (!signedIn) {
    return (
      <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height:'100px',
      }}
    >
        <button
        className="float-right bg-black bg-opacity-20 p-2 rounded-md text-sm my-3 font-medium text-white"
        onClick={handleSignIn}
      >
        Login
      </button>
      </div>
    
    );
  }



  return (
    <div className="App">
      <body className="App-header">
      {user && (
              <a href="#" className="font-bold text-xl text-[#36d1dc]">
                {user?.orgName}
              </a>
            )}
        <p>Received Response</p>
        <p>{data}</p>
       

        <button
              className="float-right bg-[#5b86e5] p-2 rounded-md text-sm my-3 font-medium text-white"
                onClick={() => signOut()}
            >
              Logout
        </button>
      </body>
    </div>
  );
}

export default App;
