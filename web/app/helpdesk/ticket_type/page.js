import MakeGetRequest from "@/Utils/MakeGetRequest";
import TableComponent from "@/components/TableComponent";
import React from "react";

async function page() { 
 const data = await MakeGetRequest(process.env.typeEndPoint)
  return (
    <div>
      <TableComponent
        title="Ticket Type"
        tableData={data}
        canAdd={true}
        addUrl={process.env.addTicketType}
        showColumnName={["id", "name"]}
        showAction={true}
        viewUrl={process.env.viewTicketTypeDetail}
        deleteUrl={process.env.typeEndPoint}
      />
    </div>
  );
}

export default page;
