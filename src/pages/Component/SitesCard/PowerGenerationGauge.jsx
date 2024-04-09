import C3Chart from "react-c3js";
// import "./style.css";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { Card, Divider, Icon } from "@mui/material";

export default function PowerGenerationGauge({ totalExport, maxValue }) {
  const [totalExportNum, setTotalExportNum] = useState([]);

  console.log(totalExportNum, "TotalExportNUM", totalExport);

  useEffect(() => {
    let value = Number(totalExport) && Number(totalExport) !== -111 ? Number(totalExport) : 0;
    if (value !== totalExport) {
      setTotalExportNum(value);
    }
  }, [totalExport]);
  // const location = useLocation();
  // let dayGeneration = data?.DayGeneration;
  // let capacity = location?.state?.capacity;
  return (
    <Card sx={{ height: "100%" }}>
      <MDBox padding="1rem">
        {/* <MDBox display="flex" pt={1} px={2}> */}
        <MDTypography variant="h4" color="text">
          Power Generation
        </MDTypography>

        {/* <Grid item style={{ height: "parent" }}> */}
        <C3Chart
          data={{
            columns: [["Current Export", totalExport]],
            type: "gauge",
          }}
          gauge={{
            label: {
              format: function (value) {
                return value + " MW";
              },
              show: true,
            },
            min: 0,
            max: maxValue,
            width: 45,
          }}
          color={{
            pattern: ["#4caf50"],
          }}
          size={{
            height: 220,
          }}
        />
        {/* <MDBox pt={3} pb={1} px={1}>
          <MDTypography variant="h6" textTransform="capitalize">
            Day
          </MDTypography>
          <MDTypography component="div" variant="button" color="text" fontWeight="light">
            Description
          </MDTypography>
          <Divider />
          <MDBox display="flex" alignItems="center">
            <MDTypography variant="button" color="text" lineHeight={1} sx={{ mt: 0.15, mr: 0.5 }}>
              <Icon>schedule</Icon>
            </MDTypography>
            <MDTypography variant="button" color="text" fontWeight="light">
              Date
            </MDTypography>
          </MDBox>
        </MDBox> */}
        {/* </Grid> */}
      </MDBox>
    </Card>
  );
}

{
  /* <Card sx={{ height: "100%" }}>
  <MDBox padding="1rem">
    {useMemo(
      () => (
        <MDBox
          variant="gradient"
          bgColor={color}
          borderRadius="lg"
          coloredShadow={color}
          py={2}
          pr={0.5}
          mt={-5}
          height="12.5rem"
        >
          <Line data={data} options={options} redraw />
        </MDBox>
      ),
      [chart, color]
    )}
    <MDBox pt={3} pb={1} px={1}>
      <MDTypography variant="h6" textTransform="capitalize">
        {title}
      </MDTypography>
      <MDTypography component="div" variant="button" color="text" fontWeight="light">
        {description}
      </MDTypography>
      <Divider />
      <MDBox display="flex" alignItems="center">
        <MDTypography variant="button" color="text" lineHeight={1} sx={{ mt: 0.15, mr: 0.5 }}>
          <Icon>schedule</Icon>
        </MDTypography>
        <MDTypography variant="button" color="text" fontWeight="light">
          {date}
        </MDTypography>
      </MDBox>
    </MDBox>
  </MDBox>
</Card>; */
}
