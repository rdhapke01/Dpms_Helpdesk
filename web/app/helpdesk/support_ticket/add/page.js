import MakeGetRequest from "@/Utils/MakeGetRequest";
import TicketForm from "@/components/AddForm/TicketForm";
import React from "react";

async function page() {
  const problemData = await MakeGetRequest(process.env.issueEndPoint);
  const priorityData = await MakeGetRequest(process.env.priorityEndPoint);
  // const userData = await MakeGetRequest(process.env.agentUserRoleEndPoint);
  const userData = await MakeGetRequest(process.env.activeUserRoleEndPoint);
  const typeData = await MakeGetRequest(process.env.typeEndPoint);
  const statusData = await MakeGetRequest(process.env.statusEndPoint);

  const problemList = problemData.map((data) => {
    return { id: data.id, name: data.name };
  });
  const priorityList = priorityData.map((data) => {
    return { id: data.id, name: data.name };
  });
  const userList = userData.map((data) => {
    return {
      id: data.id,
      name: `${data.first_Name} ${data.last_Name}`,
      email: data.email,
      mobile_Number: data.mobile_Number,
    };
  });
  const typeList = typeData.map((data) => {
    return { id: data.id, name: data.name };
  });

  const statusList = [];

  return (
    <TicketForm
      problemOptions={problemList}
      priorityOptions={priorityList}
      userOptions={userList}
      typeOptions={typeList}
      statusOptions={statusData}
    />
  );
}

export default page;
