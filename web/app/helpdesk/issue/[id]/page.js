import MakeGetRequest from "@/Utils/MakeGetRequest";
import EditProblem from "@/components/EditForm/EditProblem";
import React from "react";

async function page({ params }) {
  const problemData = await MakeGetRequest(
    `${process.env.issueEndPoint}/${params.id}`
  );

  return <EditProblem data={problemData} />;
}

export default page;
