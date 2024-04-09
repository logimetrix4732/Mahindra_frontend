import React from "react";
import UsersTable from "./UsersTable";

const usersTableData = [
  // { id: "5b9a212807", firstname: "Sumit", lastname: "Verma" },

  // { id: "5b9a212807", firstname: "Fakhir", lastname: "Farooqi" },
  {
    action_by: "Disable_cron",
    alerttype: null,
    email: "sumit@gmail.com",
    employeerole: null,
    firstname: "Sumit",
    id: "5b9a212807",
    lastname: "Verma",
    locations: ["ASPL"],
    menu: ["sites", "inverterEfficiency", "analytics", "performance", "csv", "alerts"],
    notificationtype: null,
    password: "$2b$10$7JJrcrElRqWxdEVXa.9eD.P/7ax.17NQEGenRa4WPv8uAX1R7zXa.",
    role: "user",
    status: "Inactice",
    timestamp: "1712047081",
  },
  {
    action_by: "Disable_cron",
    alerttype: null,
    email: "fakhir@gmail.com",
    employeerole: null,
    firstname: "Fakhir",
    id: "5b9a212807",
    lastname: "Farooqi",
    locations: ["ASPL"],
    menu: ["sites", "inverterEfficiency", "analytics", "performance", "csv", "alerts"],
    notificationtype: null,
    password: "$2b$10$7JJrcrElRqWxdEVXa.9eD.P/7ax.17NQEGenRa4WPv8uAX1R7zXa.",
    role: "user",
    status: "Inactice",
    timestamp: "1712047081",
  },
];

export default function ManageUsers() {
  return (
    <>
      <UsersTable usersTableData={usersTableData} />
    </>
  );
}
