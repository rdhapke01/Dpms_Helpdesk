import MakeGetRequest from '@/Utils/MakeGetRequest';
import StatusForm from '@/components/AddForm/StatusForm'
import React from 'react'

async function page() {
  const url = `${process.env.typeEndPoint}`;
  let typeData = await MakeGetRequest(url);

  return (
    <StatusForm 
    typeData={typeData}
    />
  )
}

export default page