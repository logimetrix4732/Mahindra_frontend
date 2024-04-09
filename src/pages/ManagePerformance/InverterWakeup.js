import { Grid } from "@mui/material";
import MDButton from "components/MDButton";
import { useMaterialUIController } from "context";
import Dateselector from "pages/Component/Dateselector/Dateselector";
import SingleDropdown from "pages/Component/dropdown/SingleDropdown";
import React, { useState } from "react";

export default function InverterWakeup() {
  const [controller, dispatch, authMenu] = useMaterialUIController();
  const { miniSidenav, transparentSidenav, whiteSidenav, darkMode, sidenavColor } = controller;
  const [selectedSite, setSelectedSite] = useState(["ASPL"]);
  const handleSitesChange = (event) => {
    let value = event.target.value;

    setSelectedSite([value]);
  };
  const [fromDate, setFromDate] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    date.setHours(0, 0, 1, 0);
    return date;
  });
  const [toDate, setToDate] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    date.setHours(23, 59, 59, 0);
    return date;
  });
  return (
    <>
      <Grid container spacing={1} flexDirection="row">
        <Grid item>
          <SingleDropdown
            label={"Site"}
            items={selectedSite}
            handleChange={handleSitesChange}
            selectedItem={selectedSite[0]}
          />
        </Grid>
        {/* <Grid item>
          <Dateselector
            startLabel={"Start Date"}
            endLabel={"End Date"}
            fromDate={fromDate}
            setFromDate={setFromDate}
            toDate={toDate}
            setToDate={setToDate}
          />
        </Grid> */}
        {/* <Grid item>
          <StartDatePicker
            startLabel={"Start Date"}
            // endLabel={"End Date"}
            fromDate={fromDate}
            setFromDate={setFromDate}
            // toDate={toDate}
            // setToDate={setToDate}
          />
        </Grid> */}
        {/* <Grid item>
          <EndDatePicker
            // startLabel={"Start Date"}
            endLabel={"End Date"}
            // fromDate={fromDate}
            // setFromDate={setFromDate}
            toDate={toDate}
            setToDate={setToDate}
          />
        </Grid> */}

        {/* <Grid item>
          <SingleDropdown
            label={"Parameter"}
            items={selectedParameter}
            handleChange={handleParameter}
            selectedItem={selectedParameter[0]}
          />
        </Grid> */}
        <Grid item>
          <MDButton
            variant="outlined"
            // style={{ height: "39px" }}
            component="a"
            target="_blank"
            rel="noreferrer"
            // variant="gradient"
            color={sidenavColor}
            fullWidth
            // onClick={() => getTrendlineGraph()}
          >
            VIEW
          </MDButton>
        </Grid>

        {/* <CustomBarChart
            chartData={barChartData}
            enableScroll={enableBarChartScroll}
            siteName={selectedSite}
          /> */}
      </Grid>
    </>
  );
}
