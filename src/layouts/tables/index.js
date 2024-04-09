/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import { useNavigate } from "react-router-dom";

// Data
import authorsTableData from "layouts/tables/data/authorsTableData";
import projectsTableData from "layouts/tables/data/projectsTableData";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "context/UserContext";

function Dashboard() {
  const { columns, rows } = authorsTableData();
  // Destructure useContext variables
  // const { dashboard } = useContext(UserContext);
  const [tableData, setTableData] = useState([]);
  const navigate = useNavigate();

  const { columns: pColumns, rows: pRows } = projectsTableData();
  // const { dashboard } = useContext(UserContext);
  // const [tableData, setTableData] = useState([]);

  const headCells = [
    // { id: "Sites", label: "Sites" },
    // { id: "Capacity", label: "Capacity" },
    // { id: "Network", label: "Network" },
    // { id: "Status", label: "Status" },
    // // { id: "Last_Event", label: "Last Event" },
    // // { id: "Power_Generation", label: "Power Generation" },
    // { id: "GHI", label: "GHI" },
    // { id: "GTI", label: "GTI" },
    // { id: "Module Temp", label: "Module Temp" },
    { Header: "author", accessor: "author", width: "45%", align: "left" },
    { Header: "function", accessor: "function", align: "left" },
    { Header: "status", accessor: "status", align: "center" },
    { Header: "employed", accessor: "employed", align: "center" },
    { Header: "action", accessor: "action", align: "center" },
  ];
  // useEffect(() => {
  //   getDashboardTable();
  // }, []);
  // const getDashboardTable = () => {
  //   console.log("DAshboard api hitttt");
  //   dashboard(
  //     {},
  //     (apiRes) => {
  //       console.log(apiRes, "res22");
  //       setTableData(apiRes?.data);
  //     },
  //     (apiErr) => {
  //       console.log(apiErr, "apiRes");
  //     }
  //   );
  // };
  const handleSiteClick = (row) => {
    // setSitestatusBar(row);
    const { email } = row.value.props;
    console.log(email, "SiteData");
    navigate(`/dashboard/${email}`);

    // history.push(`/dashboard/${email}`);
    // setSelectedSiteFromChild(row);
    // setNotesite(row.name);
    // getNotemsg();
  };

  // useEffect(() => {
  //   getDashboardTable();
  // }, []);
  //dashboard table
  // const getDashboardTable = () => {
  //   console.log("DAshboard api hitttt");
  //   dashboard(
  //     {},
  //     (apiRes) => {
  //       console.log(apiRes, "res22");
  //       setTableData(apiRes?.data);
  //     },
  //     (apiErr) => {
  //       console.log(apiErr, "apiRes");
  //     }
  //   );
  // };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  {/* Authors Table */}
                  Site Table
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  // tableData={tableData}
                  // headCells={headCells}
                  handleSiteClickInParent={handleSiteClick}
                  table={{ tableData, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Projects Table
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns: pColumns, rows: pRows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
