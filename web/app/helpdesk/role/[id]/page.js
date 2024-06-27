import MakeGetRequest from "@/Utils/MakeGetRequest";
import EditRole from "@/components/EditForm/EditRole";
import React from "react";

async function page({ params }) {
  const roleData = await MakeGetRequest(
    `${process.env.roleEndPoint}/${params.id}`
  );

  return <EditRole data={roleData} />;
}

export default page;
