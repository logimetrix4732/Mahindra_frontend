import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import React, { useState } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import BarChartInv from "./BarChartInv-Eff";
import { Card } from "@mui/material";

export default function InverterEfficiency() {
  const [data, setData] = useState([{}]);
  return (
    <>
      {/* <DashboardLayout> */}
      {/* <DashboardNavbar /> */}
      <Card style={{ marginTop: "2rem" }}>
        <BarChartInv data={data} />
      </Card>
      {/* </DashboardLayout> */}
    </>
  );
}
