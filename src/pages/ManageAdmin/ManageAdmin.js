import * as React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { Card } from "@mui/material";
import Users from "./Users";
import DataAvailability from "./DataAvailability/DataAvailability";
import Overview from "layouts/profile";
import ManageUsers from "./ManageUsers.js/ManageUsers";
// import ActualPr from "./ActualPr";
// import InverterWakeup from "./InverterWakeup";
// import TrendLine from "./Trendline/TrendLine";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

export default function ManageAdmin() {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <>
      {/* <DashboardLayout> */}
      {/* <DashboardNavbar /> */}
      {/* <Box sx={{ bgcolor: "background.paper", width: 500 }}> */}
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Sites" {...a11yProps(0)} />
          <Tab label="Inverters" {...a11yProps(1)} />
          <Tab label="Inv-Scb" {...a11yProps(2)} />
          <Tab label="Users" {...a11yProps(3)} />
          <Tab label="Data Availability" {...a11yProps(4)} />
          <Tab label="Logs" {...a11yProps(5)} />
          <Tab label="Remote Config" {...a11yProps(6)} />
          <Tab label="SLD" {...a11yProps(7)} />
          <Tab label="Server Logs" {...a11yProps(8)} />
          <Tab label="Tags Mapping" {...a11yProps(9)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <Users />
          {/* <Overview /> */}
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          {/* <InverterWakeup /> */}
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          {/* <TrendLine /> */}
        </TabPanel>
        <TabPanel value={value} index={3} dir={theme.direction}>
          <ManageUsers />
        </TabPanel>
        <TabPanel value={value} index={4} dir={theme.direction}>
          <DataAvailability />
        </TabPanel>
        <TabPanel value={value} index={5} dir={theme.direction}></TabPanel>
        <TabPanel value={value} index={6} dir={theme.direction}></TabPanel>
        <TabPanel value={value} index={7} dir={theme.direction}></TabPanel>
        <TabPanel value={value} index={8} dir={theme.direction}></TabPanel>
        <TabPanel value={value} index={9} dir={theme.direction}></TabPanel>
      </SwipeableViews>
      {/* </Box> */}
      {/* </DashboardLayout> */}
    </>
  );
}
