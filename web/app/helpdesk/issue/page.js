import MakeGetRequest from "@/Utils/MakeGetRequest";
import TableComponent from "@/components/TableComponent";
import React from "react";

async function page() {
  const url = `${process.env.issueEndPoint}`;

  const issueData = await MakeGetRequest(url);
  return (
      <TableComponent
        title="Issue"
        tableData={issueData}
        canAdd={true}
        addUrl={process.env.addIssue}
        showColumnName={["id", "name"]}
        showAction={true}
        viewUrl={process.env.viewIssueDetail}
        deleteUrl={process.env.issueEndPoint}
      />
  );
}

export default page;
