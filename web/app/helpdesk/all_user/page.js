import MakeGetRequest from "@/Utils/MakeGetRequest";
import TableComponent from "@/components/TableComponent";
import React from "react";

async function page() {
  let data = await MakeGetRequest(process.env.activeUserRoleEndPoint);
  let roleData = await MakeGetRequest(process.env.roleEndPoint);

  data = data.map((user) => {
   
    return {
      id: user.id,
      first_Name: user.first_Name,

      last_Name: user.last_Name,
      role:  roleData.filter((role) => role.id == user.role_Id)[0]?.name ?? "-",
      email: user.email,
      mobile_Number: user.mobile_Number,
    };
  });

  return (
    <div>
      <TableComponent
        title="All User"
        tableData={data}
        canAdd={true}
        addUrl={process.env.addUser}
        showColumnName={[
          "id",
          "first_Name",
          "last_Name",
          "role",
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
