import React from 'react';
import oauth from 'axios-oauth-client';
import axios from 'axios';

function Greetings({ posts }) {
  return (
    <div>
      <p>API URL: {process.env.API_URL}</p>
      <div>{posts}</div>
    </div>
  );
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

const response = await axios.get(`${process.env.API_URL}/greeting`, {
  headers: {
    'Authorization': `Bearer ${accessToken}`
  }
});

  const posts = response.data;
  const postsString = JSON.stringify(posts);

  // Pass data to the page via props
  return { props: { posts: postsString } };
}

export default Greetings;
