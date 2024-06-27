import MakeGetRequest from "@/Utils/MakeGetRequest";
import TableComponent from "@/components/TableComponent";
import React from "react";

async function page() {
  const url = `${process.env.priorityEndPoint}`;
  let data = null;

  data = await MakeGetRequest(url);

  return (
    <div>
      <TableComponent
        title="Priority"
        tableData={data}
        canAdd={true}
        addUrl={process.env.addPriority}
        showColumnName={["id", "name"]} //, "response_Time", "resolution_Time"]}
        showAction={true}
        viewUrl={process.env.viewPriorityDetail}
        deleteUrl={process.env.priorityEndPoint}
      />
    </div>
  );
}

export default page;
