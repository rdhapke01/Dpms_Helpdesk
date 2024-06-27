import MakeGetRequest from "@/Utils/MakeGetRequest";
import TableComponent from "@/components/TableComponent";
import React from "react";

async function page() {
  const url = `${process.env.roleEndPoint}`;
 
  let data = await MakeGetRequest(url);
  return (
    <div>
      <TableComponent
        title="Role"
        tableData={data}
        canAdd={true}
        addUrl={process.env.addRole}
        showColumnName={["id", "name"]}
        showAction={true}
        viewUrl={process.env.viewRoleDetail}
        deleteUrl={process.env.roleEndPoint}

      />
    </div>
  );
}

export default page;
