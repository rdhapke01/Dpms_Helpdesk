import MakeGetRequest from "@/Utils/MakeGetRequest";
import EditTicket from "@/components/EditForm/EditTicket";
import React from "react";

async function page({ params }) {
  // const ticketData = await MakeGetRequest(
  //   `${process.env.ticketEndPoint}/${params.id}`
  // );
  // const problemData = await MakeGetRequest(process.env.problemEndPoint);
  // const priorityData = await MakeGetRequest(process.env.priorityEndPoint);
  // const userData = await MakeGetRequest(process.env.allUserRoleEndPoint);
  // const typeData = await MakeGetRequest(process.env.typeEndPoint);
  // const statusData = await MakeGetRequest(process.env.statusEndPoint);

  // const problemList = problemData.map((data) => {
  //   return { id: data.id, name: data.name };
  // });
  // const priorityList = priorityData.map((data) => {
  //   return { id: data.id, name: data.name };
  // });
  // const userList = userData.map((data) => {
  //   return {
  //     id: data.id,
  //     name: `${data.first_Name} ${data.last_Name}`,
  //     email: data.email,
  //     mobile_Number: data.mobile_Number,
  //   };
  // });
  // const typeList = typeData.map((data) => {
  //   return { id: data.id, name: data.name };
  // });

  // const statusList = statusData.map((data) => {
  //   return {
  //     id: data.id,
  //     name: `
  //   ${typeList.filter((typeData) => typeData.id == data.type_Id)[0].name}
  //   ${data.status_Name}`,
  //   };
  // });
  return (
    <EditTicket
      // data={ticketData}
      // problemOptions={problemList}
      // priorityOptions={priorityList}
      // userOptions={userList}
      // typeOptions={typeList}
      // statusOptions={statusList}
    />
  );
}

export default page;
