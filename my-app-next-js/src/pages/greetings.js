import React from 'react'

function Greetings({ posts }) {
  return (
    <div>
      <h1>{process.env.NEXT_PUBLIC_API_URL}</h1>
      <ul>
        {posts}
      </ul>
    </div>
  )
}

// This function gets called at request time
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(process.env.API_URL+'/greeting')
  const posts = await res.text()

  // Pass data to the page via props
  return { props: { posts } }
}

export default Greetings
