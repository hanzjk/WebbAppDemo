import React, { useEffect, useState } from 'react';
import { getBooks } from './api';

function App() {
  const [signedIn, setSignedIn] = useState(false);
  const [data, setData] = useState('');

  useEffect(() => {
    getReadingList();
  }, []);

  async function getReadingList() {
   
      getBooks()
        .then((res) => {
          setData(res.data);
        })
        .catch((e) => {
          console.log(e);
        });
    
  }

  
  return (
    <div className="App">
      <body className="App-header">
     
        <p>Recievd Response</p>
        <p>{data}</p>
       
      </body>
    </div>
  );
}

export default App;
