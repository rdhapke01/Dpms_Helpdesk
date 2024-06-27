import MakeGetRequest from "@/Utils/MakeGetRequest";
import EditUser from "@/components/EditForm/EditUser";
import React from "react";

async function page({ params }) {
  const designationUrl = `${process.env.apiBaseUrl}/API/Auth/designation`;
  const designationData = await MakeGetRequest(designationUrl);
  const contractorUrl = `${process.env.apiBaseUrl}/API/Auth/contractor`;
  const contractorData = await MakeGetRequest(contractorUrl);
  const userData = await MakeGetRequest(
    `${process.env.addUserEndPoint}/${params.id}`
  );

  const roleData = await MakeGetRequest(process.env.allRoleEndPoint);
  // console.log(userData);
  return (
    <EditUser
      contractorOptions={contractorData}
      designationOptions={designationData}
      data={userData}
      roleData={roleData}
    />
  );
}

export default page;
