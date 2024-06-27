import MakeGetRequest from "@/Utils/MakeGetRequest";
import SignUpForm from "@/components/SignUpForm";
import React from "react";

async function page() {
  const contractorUrl = `${process.env.authEndPoint}/contractor`;

  const contractorData = await MakeGetRequest(contractorUrl);
  const designationUrl = `${process.env.authEndPoint}/designation`;
  const designationData = await MakeGetRequest(designationUrl);
  return (
    <SignUpForm
      contractorOptions={contractorData}
      designationOptions={designationData}
    />
  );
}

export default page;
