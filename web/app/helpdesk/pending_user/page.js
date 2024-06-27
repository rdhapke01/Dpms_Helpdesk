import MakeGetRequest from "@/Utils/MakeGetRequest";
import TableComponent from "@/components/TableComponent";
import React from "react";

async function page() {
  const url = `${process.env.pendingUserEndPoint}`;

  let data = null;

  data = await MakeGetRequest(url);
  return (
    <div>
      <TableComponent
        title="Pending User"
        tableData={data}
        canAdd={false}
        canExport={false}
        addUrl={process.env.addUser}
        showColumnName={[
          "id",
          "first_Name",
          "last_Name",
          "email",
          "mobile_Number",
        ]}
        showAction={true}
        viewUrl={process.env.viewUserDetail}
      />
    </div>
  );
}

export default page;
