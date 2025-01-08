import React, { useEffect, useState } from 'react';
import { getBooks } from './api';
import Cookies from 'js-cookie';
import { BasicUserInfo, useAuthContext } from "@asgardeo/auth-react";
import oauth from 'axios-oauth-client'
import axios from 'axios';

 function App() {



 
  const [signedIn, setSignedIn] = useState(false);
  const [data, setData] = useState('');
  const [token, setToken] = useState('');

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
    
  async function initializeUserSession() {
    const isUserSignedIn = await signInCheck();
    if (isUserSignedIn) {
      await getTokenForChoreo();
      getReadingList(token);
      getUser();
    } else {
      console.log("User has not signed in");
    }
  }

  initializeUserSession();
  }, []);

  async function getUser() {
    const userResponse = await getBasicUserInfo();
    setUser(userResponse);
  }

  const handleSignIn = async () => {
    console.log("SIGN IN")
    signIn()
      .then(() => {
        setSignedIn(true);
      })
      .catch((e) => {
        console.log(e);
      });
  };


  const getTokenForChoreo=async()=>{
    console.log("get token for choreo")
    getAccessToken()
    .then((token) => {
      console.log(token)
      setToken(token)
    })
    .catch((e) => {
      console.log(e);
    });
  }


  useEffect( () => {

    async function fetchData() {
      if(signedIn) {
      await getTokenForChoreo();
      getReadingList(token);
      }
    }
    fetchData();

  
  }, [signedIn]);

  async function getReadingList(token) {
   if (signedIn){
    getBooks(token)
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
             <p>{window.configs.apiUrl}</p>
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
