import { Card, Grid } from "@mui/material";
import MDButton from "components/MDButton";
import { useMaterialUIController } from "context";
import Dateselector from "pages/Component/Dateselector/Dateselector";
import SingleDropdown from "pages/Component/dropdown/SingleDropdown";
import React, { useContext, useEffect, useState } from "react";
import DataAvailabilityBarChart from "./DataAvailabilityBarChart";
import { Switch } from "@material-ui/core";
import Datepick from "pages/Component/Dateselector/Datepick";
import { UserContext } from "context/UserContext";

const chartData = [{ siteName: "ASPL", Percentage: 25, count: 20 }];
export default function DataAvailability() {
  const { getDataAvail } = useContext(UserContext);
  const [controller, dispatch, authMenu] = useMaterialUIController();
  const [selectedSite, setSelectedSite] = useState(["ASPL"]);
  const handleSitesChange = (event) => {
    let value = event.target.value;

    setSelectedSite([value]);
  };
  const { miniSidenav, transparentSidenav, whiteSidenav, darkMode, sidenavColor } = controller;
  const [enableBarChartScroll, setEnableBarChartScroll] = useState(false);

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
  const [barChartData, setBarChartData] = useState([]);
  useEffect(() => {
    let dataWithColors = barChartData.map((element) => {
      return {
        ...element,
        color: Number(element.Percentage) < 95 ? "#EC7063" : "#48C9B0",
      };
    });

    setBarChartData(dataWithColors);
  }, [barChartData]);

  const getDataAvailability = () => {
    let data = {
      // block: selectedBlock,
      fromDate: 1712050141,
      endDate: 1712050172,
    };
    console.log("Api hitt Data Availability");
    getDataAvail(
      data,
      (apiRes) => {
        console.log(apiRes.data, "DataAvailability");
        setBarChartData(apiRes?.data);
        // formatInverterValues(apiRes?.data);
      },
      (apiErr) => {
        console.log(apiErr, "apiResDataGrid");
      }
    );
  };

  return (
    <>
      <Grid container spacing={1}>
        <Grid item>
          <SingleDropdown
            label={"Site"}
            items={selectedSite}
            handleChange={handleSitesChange}
            selectedItem={selectedSite[0]}
          />
        </Grid>
        <Grid item>
          {/* <Dateselector
            startLabel={"Start Date"}
            endLabel={"End Date"}
            fromDate={fromDate}
            setFromDate={setFromDate}
            toDate={toDate}
            setToDate={setToDate}
          /> */}
          <Datepick
            startLabel={"Start Date"}
            endLabel={"End Date"}
            fromDate={fromDate}
            setFromDate={setFromDate}
            toDate={toDate}
            setToDate={setToDate}
          />
        </Grid>
        <Grid item>
          <MDButton
            variant="outlined"
            // style={{ height: "39px" }}
            component="a"
            // href="https://www.creative-tim.com/product/material-dashboard-pro-react"
            // target="_blank"
            // rel="noreferrer"
            // variant="gradient"
            color={sidenavColor}
            fullWidth
            onClick={() => getDataAvailability()}
          >
            VIEW
          </MDButton>
        </Grid>
      </Grid>
      {barChartData.length > 0 && (
        <Grid container style={{ marginTop: ".25rem" }}>
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
            {/* <Grid
              container
              justify="flex-end"
              alignItems="center"
                style={{ paddingInline: "2rem", marginBottom: ".5rem" }}
            >
              <Grid item>
                <span>Scroll:</span>
                <Switch
                  checked={enableBarChartScroll}
                  onChange={() => setEnableBarChartScroll((prevState) => !prevState)}
                  color="primary"
                  name="scrollSwitch"
                />
              </Grid>
            </Grid> */}
            <DataAvailabilityBarChart
              chartData={barChartData}
              enableScroll={enableBarChartScroll}
            />
          </Card>
        </Grid>
      )}
    </>
  );
}
