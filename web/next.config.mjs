/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/dpms",
  // env: {
  //   basePath: "/helpdesk/",
  //   hostName: "172.18.0.178",
  //   portNo: "5432",
  //   databaseName: "MSRDC_Helpdesk",
  //   userName: "msrdchd",
  //   password: "msrdchd@123",
  //   apiBaseUrl: "http://localhost:19695",
  //   addCategory: "/helpdesk/category/add",
  //   addIssue: "/helpdesk/issue/add",
  //   addStatus: "/helpdesk/status/add",
  //   addTicketType: "/helpdesk/ticket_type/add",
  //   addPriority: "/helpdesk/priority/add",
  //   addRole: "/helpdesk/role/add",
  //   addContractor: "/helpdesk/contractor/add",
  //   addDesignation: "/helpdesk/designation/add",
  //   addUser: "/helpdesk/all_user/add",
  //   addTicket: "/helpdesk/support_ticket/add",
  //   addEscalationMatrix:"/helpdesk/escalation_matrix/add",
  //   viewUserDetail: "/helpdesk/all_user",
  //   viewIssueDetail: "/helpdesk/issue",
  //   viewContractorDetail: "/helpdesk/contractor",
  //   viewStatusDetail: "/helpdesk/status",
  //   viewDesignationDetail: "/helpdesk/designation",
  //   viewTicketTypeDetail: "/helpdesk/ticket_type",
  //   viewPriorityDetail: "/helpdesk/priority",
  //   viewRoleDetail: "/helpdesk/role",
  //   viewEscalationMatrixDetails:"/helpdesk/escalation_matrix",
  //   viewTicketDetail: "/helpdesk/support_ticket",
  //   authEndPoint: "http://localhost:19695/API/Auth",
  //   issueEndPoint: "http://localhost:19695/API/Problem",
  //   contractorEndPoint: "http://localhost:19695/API/Contractor",
  //   userEndPoint: "http://localhost:19695/API/User",
  //   statusEndPoint: "http://localhost:19695/API/Status",
  //   roleEndPoint: "http://localhost:19695/API/Role",
  //   designationEndPoint: "http://localhost:19695/API/Designation",
  //   loginUserEndPoint: "http://localhost:19695/API/Auth/login",
  //   signUpUserEndPoint: "http://localhost:19695/API/Auth/signup",
  //   userEndPoint: "http://localhost:19695/API/User/all",
  //   pendingUserEndPoint: "http://localhost:19695/API/User/pending",
  //   addUserEndPoint: "http://localhost:19695/API/User",
  //   typeEndPoint: "http://localhost:19695/API/Type",
  //   priorityEndPoint: "http://localhost:19695/API/Priority",
  //   allUserRoleEndPoint: "http://localhost:19695/API/User/all_user_role",
  //   activeUserRoleEndPoint: "http://localhost:19695/API/User/active",
  //   agentUserRoleEndPoint: "http://localhost:19695/API/User/agent",
  //   allRoleEndPoint: "http://localhost:19695/API/Role/",
  //   ticketEndPoint: "http://localhost:19695/API/Ticket",
  //   escalationMatrixEndPoint:"http://localhost:19695/API/EscalationMatrix"
  // },

  env: {
    basePath: "/helpdesk/",
    hostName: "172.18.0.178",
    portNo: "5432",
    databaseName: "MSRDC_Helpdesk",
    userName: "msrdchd",
    password: "msrdchd@123",
    apiBaseUrl: "https://dpmsportal.ceinsys.com/hd_api",
    addCategory: "/helpdesk/category/add",
    addIssue: "/helpdesk/issue/add",
    addStatus: "/helpdesk/status/add",
    addTicketType: "/helpdesk/ticket_type/add",
    addPriority: "/helpdesk/priority/add",
    addRole: "/helpdesk/role/add",
    addContractor: "/helpdesk/contractor/add",
    addDesignation: "/helpdesk/designation/add",
    addUser: "/helpdesk/all_user/add",
    addTicket: "/helpdesk/support_ticket/add",
    addEscalationMatrix:"/helpdesk/escalation_matrix/add",
    viewUserDetail: "/helpdesk/all_user",
    viewIssueDetail: "/helpdesk/issue",
    viewContractorDetail: "/helpdesk/contractor",
    viewStatusDetail: "/helpdesk/status",
    viewDesignationDetail: "/helpdesk/designation",
    viewTicketTypeDetail: "/helpdesk/ticket_type",
    viewPriorityDetail: "/helpdesk/priority",
    viewRoleDetail: "/helpdesk/role",
    viewEscalationMatrixDetails:"/helpdesk/escalation_matrix",
    viewTicketDetail: "/helpdesk/support_ticket",
    authEndPoint: "https://dpmsportal.ceinsys.com/hd_api/API/Auth",
    issueEndPoint: "https://dpmsportal.ceinsys.com/hd_api/API/Problem",
    contractorEndPoint: "https://dpmsportal.ceinsys.com/hd_api/API/Contractor",
    userEndPoint: "https://dpmsportal.ceinsys.com/hd_api/API/User",
    statusEndPoint: "https://dpmsportal.ceinsys.com/hd_api/API/Status",
    roleEndPoint: "https://dpmsportal.ceinsys.com/hd_api/API/Role",
    designationEndPoint: "https://dpmsportal.ceinsys.com/hd_api/API/Designation",
    loginUserEndPoint: "https://dpmsportal.ceinsys.com/hd_api/API/Auth/login",
    signUpUserEndPoint: "https://dpmsportal.ceinsys.com/hd_api/API/Auth/signup",
    userEndPoint: "https://dpmsportal.ceinsys.com/hd_api/API/User/all",
    pendingUserEndPoint: "https://dpmsportal.ceinsys.com/hd_api/API/User/pending",
    addUserEndPoint: "https://dpmsportal.ceinsys.com/hd_api/API/User",
    typeEndPoint: "https://dpmsportal.ceinsys.com/hd_api/API/Type",
    priorityEndPoint: "https://dpmsportal.ceinsys.com/hd_api/API/Priority",
    allUserRoleEndPoint: "https://dpmsportal.ceinsys.com/hd_api/API/User/all_user_role",
    activeUserRoleEndPoint: "https://dpmsportal.ceinsys.com/hd_api/API/User/active",
    agentUserRoleEndPoint: "https://dpmsportal.ceinsys.com/hd_api/API/User/agent",
    allRoleEndPoint: "https://dpmsportal.ceinsys.com/hd_api/API/Role/",
    ticketEndPoint: "https://dpmsportal.ceinsys.com/hd_api/API/Ticket",
    escalationMatrixEndPoint:"https://dpmsportal.ceinsys.com/hd_api/API/EscalationMatrix"
  },



 
};

export default nextConfig;

//   pendingUserEndPoint: "http://172.18.0.177/HelpdeskAPI/API/User/pending",
// ticketEndPoint: "http://172.18.0.177/HelpdeskAPI/API/Ticket",
//viewTicketDetail: "/helpdesk/support_ticket",
//
//
