import MakeGetRequest from "@/Utils/MakeGetRequest";
import EditStatus from "@/components/EditForm/EditStatus";
import React from "react";

async function page({ params }) {
  const statusData = await MakeGetRequest(
    `${process.env.statusEndPoint}/${params.id}`
  );

  const typeData = await MakeGetRequest(process.env.typeEndPoint);
  return <EditStatus data={statusData} />;
}

export default page;
