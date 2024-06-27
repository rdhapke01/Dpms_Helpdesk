import MakeGetRequest from "@/Utils/MakeGetRequest";
import TableComponent from "@/components/TableComponent";
import React from "react";

async function page() {
  const url = `${process.env.designationEndPoint}`;
   let data = null;
data = await MakeGetRequest(url);
  return (
    <div>
      <TableComponent
        title="Designation"
        tableData={data}
        canAdd={true}
        addUrl={process.env.addDesignation}
        showColumnName={["id", "designation_Name"]}
        showAction={true}
        viewUrl={process.env.viewDesignationDetail}
        deleteUrl={process.env.designationEndPoint}
      />
    </div>
  );
}

export default page;
