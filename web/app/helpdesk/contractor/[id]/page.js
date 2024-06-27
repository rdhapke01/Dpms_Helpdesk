import MakeGetRequest from "@/Utils/MakeGetRequest";
import EditContractor from "@/components/EditForm/EditContractor";
import React from "react";

async function page({ params }) {
  const contracorData = await MakeGetRequest(
    `${process.env.contractorEndPoint}/${params.id}`
  );

  console.log(contracorData);
  return (
    <EditContractor
    
      data={contracorData}
    />
  );
}

export default page;
