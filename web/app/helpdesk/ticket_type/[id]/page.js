import MakeGetRequest from "@/Utils/MakeGetRequest";
import EditTicketType from "@/components/EditForm/EditTicketType";
import React from "react";

async function page({ params }) {
  const ticketTypeData = await MakeGetRequest(
    `${process.env.typeEndPoint}/${params.id}`
  );

  console.log(ticketTypeData);
  return <EditTicketType data={ticketTypeData} />;
}

export default page;
