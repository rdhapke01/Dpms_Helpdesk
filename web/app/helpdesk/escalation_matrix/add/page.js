import MakeGetRequest from "@/Utils/MakeGetRequest";
import AddEscalationMatrixForm from "@/components/AddForm/AddEscalationMatricxForm";
import React from "react";

async function page() {
  let priorityData = await MakeGetRequest(process.env.priorityEndPoint);
  let ticketTypeData = await MakeGetRequest(process.env.typeEndPoint);
  return (
    <AddEscalationMatrixForm
      priorityData={priorityData}
      ticketTypeData={ticketTypeData}
    />
  );
}

export default page;
