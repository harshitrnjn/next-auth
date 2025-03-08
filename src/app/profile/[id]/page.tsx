import React from 'react'

const page = ({params}:any) => {

  return (
    <div>
      <h1>Explore</h1>
      <p>{params.id}</p>
    </div>
  )
}

export default page
