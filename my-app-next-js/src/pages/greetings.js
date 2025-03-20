import React from "react";
import oauth from "axios-oauth-client";
import axios from "axios";

function Greetings({ posts }) {
  return (
    <div>
      <p>Envs are printed in console</p>
      <div>{posts}</div>
    </div>
  );
}

// This function gets called at request time
export async function getServerSideProps() {
  
  
  // Fetch data from external API
  const getClientCredentials = oauth.clientCredentials(
    axios.create(),
    process.env.CHOREO_HIH_TOKENURL,
    process.env.CHOREO_HIH_CONSUMERKEY,
    process.env.CHOREO_HIH_CONSUMERSECRET
  );
  const auth = await getClientCredentials();
  const accessToken = auth.access_token;




  const response = await axios.get(`${process.env.CHOREO_HIH_SERVICEURL}/greeting`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const posts = response.data;
  const postsString = JSON.stringify(posts);

  // Pass data to the page via props
  return { props: { posts: postsString } };
}

export default Greetings;
