import React, { useEffect, useState } from 'react';
import { getBooks } from './api';
import Cookies from 'js-cookie';
import { BasicUserInfo, useAuthContext } from "@asgardeo/auth-react";
import oauth from 'axios-oauth-client'
import axios from 'axios';

 function App() {


 const tokenUrl=window?.configs?.tokenUrl;
 const consumerKey=window?.configs?.consumerKey;
 const consumerSecret=window?.configs?.consumerSecret;

 
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
    getIDToken,
    state,
  } = useAuthContext();
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

 async function fetchToken() {
  const getClientCredentials = oauth.clientCredentials(
    axios.create(),
    tokenUrl,
    consumerKey,
    consumerSecret
  );
  const auth = await getClientCredentials();
  setToken(auth.access_token);
}


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
      await getIDTokenForChoreo();
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


  const getIDTokenForChoreo=async()=>{
    console.log("get token for choreo")
    getIDToken()
    .then((idToken) => {
      console.log(idToken)
      setToken(idToken)
    })
    .catch((e) => {
      console.log(e);
    });
  }


  useEffect( () => {

    async function fetchData() {
      if(signedIn) {
      await getIDTokenForChoreo();
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
