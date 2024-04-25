import React from 'react'
import oauth from 'axios-oauth-client'
import axios from 'axios';

function Greetings({ posts }) {
  return (
    <div>
      <h1>{process.env.API_URL}</h1>
      <h1>{process.env.TEST_VAR}</h1>

      <ul>
        {posts}
      </ul>
    </div>
  )
}

// This function gets called at request time
export async function getServerSideProps() {
  // Fetch data from external API
  const getClientCredentials = oauth.clientCredentials(
    axios.create(),
    process.env.TOKEN_URL,
    process.env.CONSUMER_KEY,
    process.env.CONSUMER_SECRET
  );
  const auth = await getClientCredentials();
  const accessToken = auth.access_token;

  const response = await axios.get(process.env.API_URL+'/greeting', {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
});

  const posts = await response.data

  // Pass data to the page via props
  return { props: { posts } }
}

export default Greetings
