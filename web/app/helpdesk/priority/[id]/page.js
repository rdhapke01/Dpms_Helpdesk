import MakeGetRequest from "@/Utils/MakeGetRequest";
import EditPriority from "@/components/EditForm/EditPriority";
import React from "react";

async function page({ params }) {
  const priorityData = await MakeGetRequest(
    `${process.env.priorityEndPoint}/${params.id}`
  );
  return <EditPriority data={priorityData} />;
}

export default page;
