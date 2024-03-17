import React, { useState, useEffect } from 'react';
import './App.css';
import { useMsal } from '@azure/msal-react';

function App() {
  const { instance, accounts } = useMsal();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [apiResponse, setApiResponse] = useState('');

  useEffect(() => {
    if (accounts.length > 0) {
      setIsLoggedIn(true);
      setUserName(accounts[0].name); // Assuming the first account is the user's account
      acquireTokenAndCallAPI(); // Acquire token and call API after successful login
    }
  }, [accounts]);

  const handleLogin = (loginType) => {
    if (loginType === 'popup') {
      instance.loginPopup().catch(e => {
        console.error(e);
      });
    } else if (loginType === 'redirect') {
      instance.loginRedirect().catch(e => {
        console.error(e);
      });
    }
  };

  const handleLogout = () => {
    instance.logoutPopup().then(() => {
      setIsLoggedIn(false);
      setUserName('');
      setApiResponse('');
    }).catch(e => {
      console.error(e);
    });
  };

  const acquireTokenAndCallAPI = () => {
    const request = {
      // Replace "User.Read" with the scopes required by your API
      account: accounts[0]
    };

    instance.acquireTokenSilent(request)
      .then(response => {
        console.log(response.accessToken)

        // Call your API with the acquired token
        callAPI(response.accessToken);
      })
      .catch(error => {
        console.error(error);
        // If silent token acquisition fails, you may need to acquire a token interactively
      });
  };

  const callAPI = (token) => {
    const apiURL = 'https://114531ee-70da-468b-aafc-00dc439baac2-dev.e1-us-east-azure.choreoapis.dev/atze/backendservice/hello-88e/v1.0/greeting';

    fetch(apiURL, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      setApiResponse(JSON.stringify(data));
    })
    .catch(error => {
      console.error('Error calling API:', error);
    });
  };

  return (
    <div className="App">
      {!isLoggedIn ? (
        <button onClick={() => handleLogin('popup')}>Sign In</button>
      ) : (
        <>
          <div>Welcome, {userName}</div>
          <button onClick={handleLogout}>Logout</button>
          <p>API Response: {apiResponse}</p>
        </>
      )}
    </div>
  );
}

export default App;
