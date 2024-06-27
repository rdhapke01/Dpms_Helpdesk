import MakeGetRequest from "@/Utils/MakeGetRequest";
import EditDesignation from "@/components/EditForm/EditDesignation";
import React from "react";

async function page({ params }) {
  const designationData = await MakeGetRequest(
    `${process.env.designationEndPoint}/${params.id}`
  );

  return <EditDesignation data={designationData} />;
}

export default page;
