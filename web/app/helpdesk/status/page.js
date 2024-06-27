import MakeGetRequest from "@/Utils/MakeGetRequest";
import TableComponent from "@/components/TableComponent";
import React from "react";

async function page() {
  let url = `${process.env.statusEndPoint}`;
  let statusData = await MakeGetRequest(url);
  // url = `${process.env.typeEndPoint}`;
  // let typeData = await MakeGetRequest(url);
  // statusData = statusData.map((row) => {
  //   let ticket_type =
  //     typeData.filter((data) => data.id == row.type_Id)[0]?.name || "";
  //   return { ...row, ticket_type };
  // });
  return (
    <div>
      <TableComponent
        title="Status"
        tableData={statusData}
        canAdd={true}
        addUrl={process.env.addStatus}
        showColumnName={["id", "status_Name"]}
        showAction={true}
        viewUrl={process.env.viewStatusDetail}
        deleteUrl={url}
      />
    </div>
  );
}

export default page;
