
// import React from "react";
// import styles from "@/css/MenuItems.module.css"; // Import your CSS file

// import Link from "next/link";

// const basePath = "/helpdesk/";
// const itemRenderer = (item) => (
//   <a className={`${styles.flex} ${styles["align-items-center"]} ${styles["p-menuitem-link"]}`}>
//     {item.url ? (
//       <Link href={item?.url}>
//         <span className={`${styles["p-menuitem-text"]}`}>{item.label}</span>
//       </Link>
//     ) : (
//       <span className={`${styles["mx-2"]}`}>{item.label}</span>
//     )}
//   </a>
// );
// export const MenuItems = [
//     {
//       label: "Dashboard",
//       // icon: "pi pi-search",
//       url: `${basePath}`,
//     },
//     {
//       label: "Master Data",
//       // icon: "pi pi-search",
//       items: [
//         {
//           label: "Category List",
//           template: itemRenderer,
//           url: `${basePath}category`,
//         },
//         {
//           label: "Customer List",
//           template: itemRenderer,
//           url: `${basePath}customer`,
//         },
//         {
//           label: "Status List",
//           template: itemRenderer,
//           url: `${basePath}status`,
//         },
//         {
//           label: "Email Template",
//           template: itemRenderer,
//           url: `${basePath}email-template`,
//         },
//         {
//           label: "Type List",
//           template: itemRenderer,
//           url: `${basePath}type`,
//         },
//         {
//           label: "Priority List",
//           template: itemRenderer,
//           url: `${basePath}priority`,
//         },
//       ],
//     },
//     {
//       label: "Employee Module",
//       // icon: "pi pi-palette",
//       items: [
//         {
//           label: "Department List",
//           template: itemRenderer,
//           url: `${basePath}department`,
//         },
//         {
//           label: "Designation List",
//           template: itemRenderer,
//           url: `${basePath}designation`,
//         },
//         {
//           label: "Employee List",
//           template: itemRenderer,
//           url: `${basePath}employee`,
//         },
//         {
//           label: "Leave Approval",
//           template: itemRenderer,
//           url: `${basePath}leave-approval`,
//         },
//         {
//           label: "Leave Management",
//           template: itemRenderer,
//           url: `${basePath}leave-management`,
//         },
//         {
//           label: "Holiday List",
//           template: itemRenderer,
//           url: `${basePath}holiday`,
//         },
//       ],
//     },
//     {
//       label: "Admin",
//       // icon: "pi pi-search",
//       items: [
//         {
//           label: "All User List",
//           template: itemRenderer,
//           url: `${basePath}all-users`,
//         },
//         {
//           label: "Pending User List",
//           template: itemRenderer,
//           url: `${basePath}pending-users`,
//         },
//       ],
//     },
//     {
//       label: "Support Ticket",
//       // icon: "pi pi-search",
//       items: [
//         {
//           label: "Support List",
//           template: itemRenderer,
//           url: `${basePath}support-list`,
//         },
//         {
//           label: "My Support Ticket",
//           template: itemRenderer,
//           url: `${basePath}my-support-ticket`,
//         },
//         {
//           label: "Approve Support List",
//           template: itemRenderer,
//           url: `${basePath}approve-support-list`,
//         },
//         {
//           label: "Company Ticket",
//           template: itemRenderer,
//           url: `${basePath}company-ticket`,
//         },
//       ],
//     },
//     {
//       label: "Agent",
//       // icon: "pi pi-search",
//       items: [
//         {
//           label: "Agent Ticket",
//           template: itemRenderer,
//           url: `${basePath}my-support-ticket`,
//         },
//       ],
//     },
//     {
//       label: "Report",
//       // icon: "pi pi-search",
//       items: [
//         {
//           label: "Monthly Report",
//           template: itemRenderer,
//           url: `${basePath}monthly-report`,
//         },
//         {
//           label: "Category Monthly Report",
//           template: itemRenderer,
//           url: `${basePath}category-monthly-report`,
//         },
//         {
//           label: "Agent Monthly Report",
//           template: itemRenderer,
//           url: `${basePath}agent-monthly-report`,
//         },
//         {
//           label: "Stack Holder Monthly Report",
//           template: itemRenderer,
//           url: `${basePath}stack-holder-monthly-report`,
//         },
//         {
//           label: "Yearly Report",
//           template: itemRenderer,
//           url: `${basePath}yearly-report`,
//         },
//         {
//           label: "Ticket Report",
//           template: itemRenderer,
//           url: `${basePath}ticket-report`,
//         },
//         {
//           label: "Ticket Aging Report",
//           template: itemRenderer,
//           url: `${basePath}ticket-aging-report`,
//         },
//       ],
//     },
//   ];

  import React from "react";
import styles from "@/css/MenuItems.module.css"; // Import your CSS file
import Link from "next/link";



const MenuItems = () => {
  const itemRenderer = (item) => (
    <a className={`${styles.flex} ${styles["align-items-center"]} ${styles["p-menuitem-link"]}`}>
      {item.url ? (
        <Link href={item?.url}>
          <span className={`${styles["mx-2"]}`}>{item.label}</span>
        </Link>
      ) : (
        <span className={`${styles["mx-2"]}`}>{item.label}</span>
      )}
    </a>
  );

  return (
    <ul className={styles.menu}>
      {menuItems.map((menuItem, index) => (
        <li key={index}>
          <span>{menuItem.label}</span>
          {menuItem.items && (
            <ul className={styles.submenu}>
              {menuItem.items.map((subMenuItem, subIndex) => (
                <li key={subIndex}>
                  {subMenuItem.template ? (
                    subMenuItem.template(subMenuItem)
                  ) : (
                    <a href={subMenuItem.url}>{subMenuItem.label}</a>
                  )}
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
};

export default MenuItems;
