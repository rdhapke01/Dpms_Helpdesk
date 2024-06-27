import MakeGetRequest from "@/Utils/MakeGetRequest";
import TableComponent from "@/components/TableComponent";
import React from "react";

async function page() {

  const url = `${process.env.ticketEndPoint}`;
  let data = await MakeGetRequest(url);
    // console.log(data);
    data = data.map(row=>{
      return{id:row.id,subject:row.subject,requester_Email:row.requester_Email}
    })

  return (
    <div>
      <TableComponent
        title="Support Ticket"
        tableData={data}
        canAdd={true}
        addUrl={process.env.addTicket}
        showColumnName={["id", "subject","description", "requester_Email"]}
        showAction={true}
        viewUrl={process.env.viewTicketDetail}
        deleteUrl={process.env.ticketEndPoint}
      />
    </div>
  );
}

export default page;
