import MakeGetRequest from "@/Utils/MakeGetRequest";
import AddUserForm from "@/components/AddForm/AddUserForm";
import React from "react";

async function Page() {
  const designationUrl = `${process.env.apiBaseUrl}/API/Auth/designation`;
  const designationData = await MakeGetRequest(designationUrl);
  const contractorUrl = `${process.env.apiBaseUrl}/API/Auth/contractor`;
  const contractorData = await MakeGetRequest(contractorUrl);
  const roleData = await MakeGetRequest(process.env.allRoleEndPoint);

  return (
    <AddUserForm
      contractorOptions={contractorData}
      designationOptions={designationData}
      roleOptions={roleData}
    />
  );
}

export default Page;
