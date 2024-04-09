import { Button, Card, Grid } from "@mui/material";
import MDButton from "components/MDButton";
import { useMaterialUIController } from "context";
import { UserContext } from "context/UserContext";
import Datepick from "pages/Component/Dateselector/Datepick";
import MultiDropdown from "pages/Component/dropdown/MultiDropdown";
import SingleDropdown from "pages/Component/dropdown/SingleDropdown";
import React, { useContext, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
// import { makeStyles } from "@mui/material/styles";
// import { useTheme } from "@mui/material/styles";

// const useStyles = makeStyles((theme) => ({
//   header: {
//     backgroundColor: "linear-gradient(195deg, #49a3f1, #1A73E8)",
//     color: "white",
//   },
// }));
let SitesBlockInverters = [
  {
    name: "ASPL",
    blocks: [
      {
        name: "B01",
        inverters: [
          {
            name: "I02",
          },
          {
            name: "I01",
          },
          {
            name: "I03",
          },
          {
            name: "I04",
          },
        ],
      },
      {
        name: "B02",
        inverters: [
          {
            name: "I03",
          },
          {
            name: "I04",
          },
          {
            name: "I02",
          },
          {
            name: "I01",
          },
        ],
      },
      {
        name: "B03",
        inverters: [
          {
            name: "I03",
          },
          {
            name: "I04",
          },
          {
            name: "I02",
          },
          {
            name: "I01",
          },
        ],
      },
      {
        name: "B04",
        inverters: [
          {
            name: "I03",
          },
          {
            name: "I04",
          },
          {
            name: "I02",
          },
          {
            name: "I01",
          },
        ],
      },
      {
        name: "B05",
        inverters: [
          {
            name: "I03",
          },
          {
            name: "I04",
          },
          {
            name: "I02",
          },
          {
            name: "I01",
          },
        ],
      },
      {
        name: "B06",
        inverters: [
          {
            name: "I03",
          },
          {
            name: "I04",
          },
          {
            name: "I02",
          },
          {
            name: "I01",
          },
        ],
      },
      {
        name: "B07",
        inverters: [
          {
            name: "I03",
          },
          {
            name: "I04",
          },
          {
            name: "I02",
          },
          {
            name: "I01",
          },
        ],
      },
    ],
  },
];

let clippingLossData = [
  {
    timestamp: "1712169036",
    BlockInv: "B02I03",
    active_power: 0,
    mod_temp_data: "20.60",
    amb_data: "23.00",
    product_ofdc: "0.00",
    ac_capacity: "1000",
    gti_value: 0,
    clipping_instance: "no",
    PRvalue: null,
    "pr%": "NaN",
    ac_model_power_1: 0,
    ac_model_power_2: 0,
    loss_power: "0.00",
    clipping_loss: "NaN",
  },
  {
    timestamp: "1712169337",
    BlockInv: "B02I03",
    active_power: 0,
    mod_temp_data: "20.53",
    amb_data: "23.00",
    product_ofdc: "0.00",
    ac_capacity: "1000",
    gti_value: 0,
    clipping_instance: "no",
    PRvalue: null,
    "pr%": "NaN",
    ac_model_power_1: 0,
    ac_model_power_2: 0,
    loss_power: "0.00",
    clipping_loss: "NaN",
  },
  {
    timestamp: "1712169637",
    BlockInv: "B02I03",
    active_power: 0,
    mod_temp_data: "20.66",
    amb_data: "23.00",
    product_ofdc: "0.00",
    ac_capacity: "1000",
    gti_value: 0,
    clipping_instance: "no",
    PRvalue: null,
    "pr%": "NaN",
    ac_model_power_1: 0,
    ac_model_power_2: 0,
    loss_power: "0.00",
    clipping_loss: "NaN",
  },
  {
    timestamp: "1712169938",
    BlockInv: "B02I03",
    active_power: 0,
    mod_temp_data: "20.49",
    amb_data: "23.00",
    product_ofdc: "0.00",
    ac_capacity: "1000",
    gti_value: 0,
    clipping_instance: "no",
    PRvalue: null,
    "pr%": "NaN",
    ac_model_power_1: 0,
    ac_model_power_2: 0,
    loss_power: "0.00",
    clipping_loss: "NaN",
  },
  {
    timestamp: "1712170239",
    BlockInv: "B02I03",
    active_power: 0,
    mod_temp_data: "20.53",
    amb_data: "23.00",
    product_ofdc: "0.00",
    ac_capacity: "1000",
    gti_value: 0,
    clipping_instance: "no",
    PRvalue: null,
    "pr%": "NaN",
    ac_model_power_1: 0,
    ac_model_power_2: 0,
    loss_power: "0.00",
    clipping_loss: "NaN",
  },
  {
    timestamp: "1712170539",
    BlockInv: "B02I03",
    active_power: 0,
    mod_temp_data: "20.72",
    amb_data: "23.00",
    product_ofdc: "0.00",
    ac_capacity: "1000",
    gti_value: 0,
    clipping_instance: "no",
    PRvalue: null,
    "pr%": "NaN",
    ac_model_power_1: 0,
    ac_model_power_2: 0,
    loss_power: "0.00",
    clipping_loss: "NaN",
  },
  {
    timestamp: "1712170840",
    BlockInv: "B02I03",
    active_power: 0,
    mod_temp_data: "20.98",
    amb_data: "23.00",
    product_ofdc: "0.02",
    ac_capacity: "1000",
    gti_value: 0.02,
    clipping_instance: "no",
    PRvalue: 0,
    "pr%": "0.00",
    ac_model_power_1: 0,
    ac_model_power_2: 0,
    loss_power: "0.00",
    clipping_loss: "NaN",
  },
  {
    timestamp: "1712171141",
    BlockInv: "B02I03",
    active_power: 0,
    mod_temp_data: "21.27",
    amb_data: "23.00",
    product_ofdc: "0.00",
    ac_capacity: "1000",
    gti_value: 0,
    clipping_instance: "no",
    PRvalue: null,
    "pr%": "NaN",
    ac_model_power_1: 0,
    ac_model_power_2: 0,
    loss_power: "0.00",
    clipping_loss: "NaN",
  },
];

const columns = [
  { field: "timestamp", headerName: "Timestamp", width: 150 },
  { field: "BlockInv", headerName: "BlockInv", width: 150 },
  { field: "active_power", headerName: "Active Power", width: 150 },
  { field: "mod_temp_data", headerName: "Module Temp Data", width: 180 },
  { field: "amb_data", headerName: "Ambient Data", width: 150 },
  { field: "product_ofdc", headerName: "Product of DC", width: 150 },
  { field: "ac_capacity", headerName: "AC Capacity", width: 150 },
  { field: "gti_value", headerName: "GTI Value", width: 150 },
  { field: "clipping_instance", headerName: "Clipping Instance", width: 180 },
  { field: "PRvalue", headerName: "PR Value", width: 150 },
  { field: "pr%", headerName: "PR Percentage", width: 150 },
  { field: "ac_model_power_1", headerName: "AC Model Power 1", width: 180 },
  { field: "ac_model_power_2", headerName: "AC Model Power 2", width: 180 },
  { field: "loss_power", headerName: "Loss Power", width: 150 },
  { field: "clipping_loss", headerName: "Clipping Loss", width: 150 },
];

export default function ClippingLoss() {
  const { getclippingloss } = useContext(UserContext);
  // const classes = useStyles();
  // const theme = useTheme();

  // Check if theme is loaded to avoid errors during server-side rendering
  // if (!theme) {
  //   return null;
  // }
  const [controller, dispatch, authMenu] = useMaterialUIController();

  const { miniSidenav, transparentSidenav, whiteSidenav, darkMode, sidenavColor } = controller;

  const [selectedSite, setSelectedSite] = useState("ASPL");

  const [selectedBlocks, setSelectedBlocks] = useState(
    SitesBlockInverters[0].blocks.map((block) => block.name)
  );
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

    setSelectedSite(value);

    setSelectedBlocks(
      SitesBlockInverters.find((site) => site.name === value).blocks.map((block) => block.name)
    );
  };

  const handleBlocksChange = (event) => {
    let value = event.target.value;

    if (value[value.length - 1] === "all") {
      setSelectedBlocks(
        selectedBlocks.length ===
          SitesBlockInverters.find((site) => site.name === selectedSite).blocks.length
          ? []
          : SitesBlockInverters.find((site) => site.name === selectedSite).blocks.map(
              (block) => block.name
            )
      );
      return;
    }

    setSelectedBlocks(value);
  };

  //api
  const getClippingLoss = () => {
    let data = {
      site: selectedSite,
      block: selectedBlocks,
      startTime: Math.floor(fromDate.getTime() / 1000),
      endTime: Math.floor(toDate.getTime() / 1000),
    };
    getclippingloss(
      data,
      (apiRes) => {
        console.log(apiRes, "apiRes414");
        // setTrendLineGraph(apiRes?.data);
      },
      (apiErr) => {
        console.log(apiErr, "apiErr");
      }
    );
  };

  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        spacing={1}
      >
        <Grid item>
          <SingleDropdown
            label={"Site"}
            items={["ASPL"]}
            handleChange={handleSitesChange}
            selectedItem={selectedSite}
          />
        </Grid>
        <Grid item>
          <MultiDropdown
            label={"Block"}
            items={
              SitesBlockInverters.find((site) => site.name === selectedSite)
                ? SitesBlockInverters.find((site) => site.name === selectedSite).blocks.map(
                    (block) => block.name
                  )
                : []
            }
            handleChange={handleBlocksChange}
            selectedItems={selectedBlocks}
          />
        </Grid>
        {/* <Grid item style={{ marginLeft: "1rem" }}>
          <MultiDropdown
            label={"Inverter"}
            items={getInverterOptions()}
            handleChange={handleInvertersChange}
            selectedItems={selectedInverters}
          />
        </Grid> */}
        <Grid item>
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
            // size="small"
            // style={{
            //   // paddingInline: "1.5rem",
            //   // marginTop: "-0.6rem",
            //   fontSize: "14px",
            //   height: "2rem",
            // }}
            color={sidenavColor}
            fullWidth
            onClick={getClippingLoss}
            // disabled={disabledViewBtn}
          >
            {/* {disabledViewBtn ? "Loading" : "View"} */}
            View
          </MDButton>
        </Grid>
      </Grid>
      {clippingLossData && (
        <Grid container marginTop={1}>
          <Card elevation={6}>
            <DataGrid
              rows={clippingLossData}
              columns={columns}
              pageSize={4}
              rowsPerPageOptions={[5, 10, 20]}
              // checkboxSelection
              disableSelectionOnClick
              getRowId={(row) => row.timestamp} // Assuming `timestamp` is unique for each row
              // classes={{ header: classes.header }}
            />
          </Card>
        </Grid>
      )}
    </>
  );
}
