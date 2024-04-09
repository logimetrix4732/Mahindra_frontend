import { Grid } from "@mui/material";
import { UserContext } from "context/UserContext";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import ProgressBarChart from "pages/Component/ProgressBar/ProgressBar";
import SitesTable from "pages/Component/SitesTable/SitesTable";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Sites() {
  const headCells = [
    { id: "Sites", label: "Sites" },
    { id: "Capacity", label: "Capacity" },
    { id: "Network", label: "Network" },
    { id: "Status", label: "Status" },
    // { id: "Last_Event", label: "Last Event" },
    // { id: "Power_Generation", label: "Power Generation" },
    { id: "GHI", label: "GHI" },
    { id: "GTI", label: "GTI" },
    { id: "Module Temp", label: "Module Temp" },
  ];
  const navigate = useNavigate();

  const { dashboard } = useContext(UserContext);
  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    getDashboardTable();
  }, []);
  //dashboard table
  const getDashboardTable = () => {
    console.log("DAshboard api hitttt");
    dashboard(
      {},
      (apiRes) => {
        console.log(apiRes, "res22");
        setTableData(apiRes?.data);
      },
      (apiErr) => {
        console.log(apiErr, "apiRes");
      }
    );
  };

  const handleSiteClick = (row) => {
    // setSitestatusBar(row);
    // const { email } = row.value.props;
    // setSitestatusBar(row);
    // console.log(row, "SiteData");
    navigate(`/dashboard/${row.site}`);

    // history.push(`/dashboard/${email}`);
    // setSelectedSiteFromChild(row);
    // setNotesite(row.name);
    // getNotemsg();
  };
  return (
    <>
      {/* <DashboardLayout> */}
      {/* <DashboardNavbar /> */}

      <ProgressBarChart />
      <Grid style={{ marginTop: "1rem" }}>
        <SitesTable
          tableData={tableData}
          headCells={headCells}
          handleSiteClickInParent={handleSiteClick}
        />
      </Grid>
      {/* </DashboardLayout> */}
    </>
  );
}
