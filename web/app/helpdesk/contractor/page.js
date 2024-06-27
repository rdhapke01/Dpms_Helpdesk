import MakeGetRequest from "@/Utils/MakeGetRequest";
import TableComponent from "@/components/TableComponent";
import React from "react";

async function page() {
  let data = await MakeGetRequest(process.env.contractorEndPoint);
  if (data) {
    data = data.map((row) => {
      return {
        id: row.id,
        name: `${row.first_Name} ${row.last_Name}`,
        email: row.email,
        establish_Date: new Date(row.establish_Date).toLocaleDateString(),
      };
    });
  } else data = null;
  return (
    <div>
      <TableComponent
        title="Contractor"
        tableData={data}
        canAdd={true}
        addUrl={process.env.addContractor}
        showColumnName={[
          "id",
          "name",
          "company_Name",
          "email",
          "mobile_Number",
          "establish_Date",
        ]}
        showAction={true}
        viewUrl={process.env.viewContractorDetail}
        deleteUrl={process.env.contractorEndPoint}
      />
    </div>
  );
}

export default page;
