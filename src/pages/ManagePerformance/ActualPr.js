import { Card, Grid } from "@mui/material";
import MDButton from "components/MDButton";
import Datepick from "pages/Component/Dateselector/Datepick";
import Dateselector from "pages/Component/Dateselector/Dateselector";
import SingleDropdown from "pages/Component/dropdown/SingleDropdown";
import React, { useState } from "react";
import { useMaterialUIController } from "context";
import CustomBarChart from "./CustomBarChart";
import StartDatePicker from "pages/Component/Dateselector/StartDatePicker";
import EndDatePicker from "pages/Component/Dateselector/EndDatePicker";

const barChartData = [{ site: "ASPL", plantPr: "24.449", prBudget: 5 }];

export default function ActualPr() {
  const [controller, dispatch, authMenu] = useMaterialUIController();
  const { miniSidenav, transparentSidenav, whiteSidenav, darkMode, sidenavColor } = controller;
  const [selectedSite, setSelectedSite] = useState(["ASPL"]);
  const [selectedParameter, setSelectedParameter] = useState(["PR"]);
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

  const handleSitesChange = (event) => {
    let value = event.target.value;

    setSelectedSite([value]);
  };
  const handleParameter = (event) => {
    let value = event.target.value;

    setSelectedParameter([value]);
  };

  return (
    <>
      <Grid container>
        <Grid container spacing={1}>
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

          <Grid item>
            <SingleDropdown
              label={"Parameter"}
              items={selectedParameter}
              handleChange={handleParameter}
              selectedItem={selectedParameter[0]}
            />
          </Grid>
          <Grid item>
            <MDButton
              variant="outlined"
              // style={{ height: "39px" }}
              component="a"
              target="_blank"
              rel="noreferrer"
              // variant="gradient"
              color={sidenavColor}
              // color={"info"}
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

        <Grid container style={{ marginTop: ".25rem" }}>
          {barChartData && (
            <Card
              elevation={6}
              style={{
                width: "100%",
                height: "410px",
                marginTop: "1rem",
                paddingTop: ".5rem",
                //   paddingBottom: "3.5rem",
              }}
            >
              <CustomBarChart chartData={barChartData} />
            </Card>
          )}
        </Grid>
      </Grid>
    </>
  );
}
