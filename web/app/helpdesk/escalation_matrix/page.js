import MakeGetRequest from "@/Utils/MakeGetRequest";
import TableComponent from "@/components/TableComponent";
import React from "react";

async function page() {
  const url = `${process.env.escalationMatrixEndPoint}`;
  let data = await MakeGetRequest(url);
  let priorityData = await MakeGetRequest(process.env.priorityEndPoint);
  let ticketTypeData = await MakeGetRequest(process.env.typeEndPoint);
    data = data.map((row) => {
      row.priority =
        priorityData.filter((priority) => priority.id == row.priority)[0]
          ?.name ?? "";
      row.ticket_Type =
        ticketTypeData.filter((type) => type.id == row.ticket_Type)[0]?.name ??
        "";
      return row;
    });
  return (
    <div>
      <TableComponent
        title="Escalation Matrics"
        tableData={data}
        canAdd={true}
        addUrl={process.env.addEscalationMatrix}
        showColumnName={[
          "id",
          "priority",
          "ticket_Type",
          "response_Time",
          "resolution_Time",
        ]}
        showAction={true}
        viewUrl={process.env.viewEscalationMatrixDetails}
        deleteUrl={process.env.escalationMatrixEndPoint}
      />
    </div>
  );
}

export default page;
