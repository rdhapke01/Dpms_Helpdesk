import MakeGetRequest from "@/Utils/MakeGetRequest";
import EditEscalationMatricxForm from "@/components/EditForm/EditEscalationForm";
import React from "react";

async function page({ params }) {
  let priorityData = await MakeGetRequest(process.env.priorityEndPoint);
  let ticketTypeData = await MakeGetRequest(process.env.typeEndPoint);
  let matrixData = await MakeGetRequest(
    `${process.env.escalationMatrixEndPoint}/${params.id}`
  );

  return (
    <EditEscalationMatricxForm
      priorityData={priorityData}
      ticketTypeData={ticketTypeData}
      data={matrixData}
    />
  );
}

export default page;
