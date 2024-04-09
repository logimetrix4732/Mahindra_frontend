import React, { useContext, useEffect, useState } from "react";
// import Head from "../layout/head/Head";
// import { DatePicker, Space } from "antd";
import { Autocomplete, Button, Grid, TextField } from "@mui/material";
// import SystemLineChart from "../components/SystemInfoPages/SystemLineChart";
// import { UserContext } from "../context/UserContext";
import TrendLineGraph from "./TrendLineGraph";
import SingleDropdown from "pages/Component/dropdown/SingleDropdown";
import MultiDropdown from "pages/Component/dropdown/MultiDropdown";
import { CategoryParameters } from "pages/Component/data/TrendlineCatParam";
import Dateselector from "pages/Component/Dateselector/Dateselector";
import MDButton from "components/MDButton";
import { useMaterialUIController } from "context";
import { UserContext } from "context/UserContext";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import Datepick from "pages/Component/Dateselector/Datepick";
// import {
//   CategoryParameters,
//   DatePicker,
//   Dateselector,
//   MuiDatePicker,
//   MultiDropdown,
//   SingleDropdown,
// } from "../components/Component";
// import dayjs from "dayjs";

const TrendLine = () => {
  const { gettrendline } = useContext(UserContext);
  const [controller, dispatch, authMenu] = useMaterialUIController();
  const { miniSidenav, transparentSidenav, whiteSidenav, darkMode, sidenavColor } = controller;
  const [trendLineGraph, setTrendLineGraph] = useState();
  const [chartYAlign, setChartYAlign] = useState({ leftY: 4, rightY: 4 });

  console.log(trendLineGraph, "TrendlineData30");
  const [selectedSite, setSelectedSite] = useState(["ASPL"]);
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

  const [trendline, setTrendline] = useState({
    site: "ASPL",
    start_date: "",
    end_date: "",
    Y1_Cat: "",
    Y1_Param: [],
    Y2_Cat: "",
    Y2_Param: "",
  });

  const [selectedDate, setSelectedDate] = useState({
    start_date: new Date(),
    end_date: new Date(),
  });
  // const [fromDate, setFromDate] = useState(() => {
  //   const date = new Date();
  //   date.setDate(date.getDate() - 1);
  //   date.setHours(0, 0, 1, 0);
  //   return date;
  // });
  // const [toDate, setToDate] = useState(() => {
  //   const date = new Date();
  //   date.setDate(date.getDate() - 1);
  //   date.setHours(23, 59, 59, 0);
  //   return date;
  // });

  console.log(selectedDate, "trendline");
  const handleChange = (event) => {
    const { name, value } = event.target;
    setTrendline((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const handleDateChange = (event) => {
    const { name, value } = event.target;
    setSelectedDate((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
    // setDate(date);
  };
  // const y1CategoryParameters = [
  //   {
  //     category: "WMS",
  //     parameters: [
  //       "Humidity Instant",
  //       "Wind Speed Instant",
  //       "Wind Dir Instant",
  //       "Rain",
  //       "GHI Instant",
  //       "GHI Instant2",
  //       "GTI Instant",
  //       "GTI Instant2",
  //       "Mod. Temp Instant",
  //       "Mod. Temp Instant2",
  //       "Mod. Temp 2 Instant",
  //       "Amb. Temp Instant",
  //     ],
  //   },
  //   {
  //     category: "Plant",
  //     parameters: [
  //       "PA Instant",
  //       "GA Instant",
  //       "Plant PR Instant",
  //       "Day Generation Cumulative (KWH)",
  //       "Power Generation Instant (MW)",
  //       "Peak Power",
  //       "Revenue",
  //     ],
  //   },
  //   {
  //     category: "Inverter",
  //     parameters: [
  //       "L1 I",
  //       "L2 I",
  //       "L3 I",
  //       "L1 V",
  //       "L2 V",
  //       "L3 V",
  //       "Frequency",
  //       "DC I",
  //       "DC V",
  //       "Active Power",
  //       "DC Power",
  //       "Reactive Power",
  //       "PF",
  //       "Cab Temp",
  //       "IGBT Temp",
  //       "DC Energy",
  //     ],
  //   },
  //   {
  //     category: "Inv Scb",
  //     parameters: [
  //       "S1",
  //       "S2",
  //       "S3",
  //       "S4",
  //       "S5",
  //       "S6",
  //       "S7",
  //       "S8",
  //       "S9",
  //       "S10",
  //       "S11",
  //       "S12",
  //       "S12",
  //       "S13",
  //       "S14",
  //       "S15",
  //       "S16",
  //       "S17",
  //       "S18",
  //       "S19",
  //       "S20",
  //       "S21",
  //       "S22",
  //       "S23",
  //       "S24",
  //       "S25",
  //       "S26",
  //       "S27",
  //       "S28",
  //       "S29",
  //       "S30",
  //       "S31",
  //       "S32",
  //     ],
  //   },
  //   {
  //     category: "Inv Slots",
  //     parameters: [
  //       "S1 L1 I",
  //       "S1 L3 I",
  //       "S1 L1 V",
  //       "S1 L2 V",
  //       "S1 L3 V",
  //       "S1 DC I",
  //       "S1 DC V",
  //       "S1 Active Power",
  //       "S1 PF",
  //       "S1 DC Power",
  //       "S1 IGBT Temp",
  //       "S1 CAB Temp",
  //       "S2 L1 I",
  //       "S2 L2 I",
  //       "S2 L3 I",
  //       "S2 L1 V",
  //       "S2 L2 V",
  //       "S2 L3 V",
  //       "S2 DC I",
  //       "S2 DC V",
  //       "S2 Active Power",
  //       "S2 DC Power",
  //       "S2 PF",
  //       "S2 IGBT Temp",
  //       "S2 CAB Temp",
  //       "S3 L1 I",
  //       "S3 L2 I",
  //       "S3 L3 I",
  //       "S3 L1 V",
  //       "S3 L2 V",
  //       "S3 L3 V",
  //       "S3 DC I",
  //       "S3 DC V",
  //       "S3 Active Power",
  //       "S3 DC Power",
  //       "S3 PF",
  //       "S3 IGBT Temp",
  //       "S3 CAB Temp",
  //       "S4 L1 I",
  //       "S4 L2 I",
  //       "S4 L3 I",
  //       "S4 L1 V",
  //       "S4 L2 V",
  //       "S4 L3 V",
  //       "S4 DC I",
  //       "S4 DC V",
  //       "S4 Active Power",
  //       "S4 DC Power",
  //       "S4 IGBT Temp",
  //       "S4 CAB Temp",
  //       "S1 + S2 Peak Active Power",
  //       "S3 + S4 Peak Active Power",
  //     ],
  //   },
  //   {
  //     category: "Calculated",
  //     parameters: ["Inv Efficiency", "Calculated PR"],
  //   },
  // ];

  // const [selectedCategory, setSelectedCategory] = useState("");
  // const [selectedParameter, setSelectedParameter] = useState([]);
  // const [selectedCategory1, setSelectedCategory1] = useState("");
  // const [selectedParameter1, setSelectedParameter1] = useState([]);

  const gety1parameters = () => {
    // let newArray = [];
    // y1Category.map((ele) => {
    let v = CategoryParameters.find((site) => site.category === y1Category).parameters.map(
      (el) => el
    );

    // v.map((value) => newArray.push(value));
    // });

    return v;
  };

  const selectedY1Category = () => {
    let catvalue = CategoryParameters.map((val) => val.category);
    let value = catvalue[0];
    return value;
  };

  const gety2parameters = () => {
    // let newArray = [];
    // y2Category.map((ele) => {
    let v = CategoryParameters.find((site) => site.category === y2Category).parameters.map(
      (el) => el
    );

    // v.map((value) => newArray.push(value));
    // });

    return v;
  };

  const selectedY2Category = () => {
    let catvalue = CategoryParameters.map((val) => val.category);
    let value = catvalue[0];
    return value;
  };

  const [y1Category, setY1Category] = useState(selectedY1Category());

  console.log(y1Category, "SlectedY1");

  const [y1Parameter, setY1Parameter] = useState(gety1parameters());
  console.log(y1Parameter, "Y!PARAMETER");
  const [y1ParameterOptions, setY1ParameterOptions] = useState(gety1parameters());

  const [y2Category, setY2Category] = useState(selectedY2Category());

  const [y2Parameter, setY2Parameter] = useState(gety2parameters());
  const [y2ParameterOptions, setY2ParameterOptions] = useState(gety2parameters());

  const handleMultipleY1Category = () => {
    // let newY1Array = [];

    // y1Category.map((ele) => {
    let v = CategoryParameters.find((site) => site.category === y1Category).parameters.map(
      (el) => el
    );

    // v.map((value) => newY1Array.push(value));
    // });
    // return setY1ParameterOptions(v);
  };

  const handleMultipleY2Category = () => {
    let newY2Array = [];
    y2Category.map((ele) => {
      let v = CategoryParameters.find((site) => site.category === ele).parameters.map((el) => el);

      v.map((value) => newY2Array.push(value));
    });
    return setY2ParameterOptions(newY2Array), newY2Array;
  };

  const handleSitesChange = (event) => {
    let value = event.target.value;

    setSelectedSite([value]);
  };

  // const handleCategoryChange = (event, newValue) => {
  //   setSelectedCategory(newValue);
  // };
  const handleY1CategoryChange = (event) => {
    let value = event.target.value;
    console.log(value, "y1category");
    // if (value[value.length - 1] === "all") {
    //   setY1Category(
    //     y1Category.length ===
    //       CategoryParameters.map((site) => site.category).length
    //       ? []
    //       : CategoryParameters.map((block) => block.category)
    //   );
    //   return;
    // }

    setY1Category(value);
    // setY1Parameter(gety1parameters());
    // setY1ParameterOptions(gety1parameters());
  };
  const handleParameterChange = (event, newValue) => {
    setSelectedParameter(newValue);
  };

  const handleY1ParameterChange = (event) => {
    let value = event.target.value;

    if (value[value.length - 1] === "all") {
      setY1Parameter(y1Parameter.length === y1ParameterOptions.length ? [] : gety1parameters);
      return;
    }

    setY1Parameter(value);
  };

  useEffect(() => {
    // setY1Parameter(handleMultipleY1Category());
    setY1Parameter(gety1parameters());

    setY1ParameterOptions(gety1parameters());
  }, [y1Category]);

  const handleY2CategoryChange = (event) => {
    let value = event.target.value;

    // if (value[value.length - 1] === "all") {
    //   setY2Category(
    //     y2Category.length ===
    //       CategoryParameters.map((site) => site.category).length
    //       ? []
    //       : CategoryParameters.map((block) => block.category)
    //   );
    //   return;
    // }

    setY2Category(value);
  };

  const handleY2ParameterChange = (event) => {
    let value = event.target.value;

    if (value[value.length - 1] === "all") {
      setY2Parameter(y2Parameter.length === y2ParameterOptions.length ? [] : gety2parameters);
      return;
    }

    setY2Parameter(value);
  };

  useEffect(() => {
    // setY2Parameter(handleMultipleY2Category());
    setY2Parameter(gety2parameters());

    setY2ParameterOptions(gety2parameters());
  }, [y2Category]);

  const handleCategoryChange1 = (event, newValue) => {
    setSelectedCategory1(newValue);
  };
  const handleParameterChange1 = (event, newValue) => {
    setSelectedParameter1(newValue);
  };
  const getTrendlineGraph = () => {
    let data = {
      site: selectedSite[0],
      // endTime: Math.floor(new Date(trendline?.start_date).getTime() / 1000),
      // startTime: Math.floor(new Date(trendline.end_date).getTime() / 1000 ),
      endTime: 1708938503,
      startTime: 1708933906,
      // endTime: fromDate.getTime(),
      // startTime: toDate.getTime(),
      // y1Category: [selectedCategory],
      // y1Parameter: selectedParameter,
      // y2Category: [selectedCategory1],
      //  y2Parameter: selectedParameter1,
      y1Category: [y1Category],
      y1Parameter: y1Parameter,
      y2Category: [y2Category],
      y2Parameter: y2Parameter,
    };
    gettrendline(
      data,
      (apiRes) => {
        console.log(apiRes, "apiRes414");
        setTrendLineGraph(apiRes?.data);
        // const data = response.data;
        // const newCharts = data.charts;
        // setCharts(newCharts);
        // const align = data.align;
        // setChartYAlign(align);
      },
      (apiErr) => {
        console.log(apiErr, "apiErr");
      }
    );
  };
  return (
    <>
      {/* <Head title="CSV - Regular"></Head> */}

      <Grid container spacing={1} flexDirection="row">
        <Grid item>
          <MDBox pr={1}>
            <SingleDropdown
              label={"Site"}
              items={selectedSite}
              handleChange={handleSitesChange}
              selectedItem={selectedSite[0]}
            />
          </MDBox>
          {/* <Autocomplete
              fullWidth
              disablePortal
              size="small"
              id="Authentication"
              options={["ASPL"]}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Site"
                  name="site"
                  value={trendline.site}
                  onChange={handleChange}
                  style={{ backgroundColor: "white" }}
                />
              )}
            /> */}
        </Grid>
        <Grid item>
          {/* <Autocomplete
            fullWidth
            disablePortal
            size="small"
            id="Category"
            options={CategoryParameters.map((ele) => ele?.category)}
            value={selectedY1Category}
            onChange={handleCategoryChange1}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Y1 Cat"
                name="Y1_Cat"
                style={{ backgroundColor: "white" }}
              />
            )}
          /> */}
          <SingleDropdown
            label={"Y1 Cat"}
            items={CategoryParameters.map((ele) => ele.category)}
            handleChange={handleY1CategoryChange}
            selectedItem={y1Category}
          />
        </Grid>
        <Grid item>
          <MultiDropdown
            label={"Y1 Param"}
            items={y1ParameterOptions}
            handleChange={handleY1ParameterChange}
            selectedItems={y1Parameter}
          />
          {/* <Autocomplete
            fullWidth
            multiple
            disablePortal
            size="small"
            id="Parameter"
            options={
              selectedCategory
                ? CategoryParameters.find(
                    (ele) => ele.category === selectedCategory
                  ).parameters
                : []
            }
            value={selectedParameter}
            onChange={handleParameterChange}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Y1 Param"
                name="Y1_Param"
                style={{ backgroundColor: "white" }}
              />
            )}
          /> */}
        </Grid>
        <Grid item>
          {/* <Autocomplete
            fullWidth
            disablePortal
            size="small"
            id="Category"
            options={CategoryParameters.map((ele) => ele.category)}
            value={selectedCategory1}
            onChange={handleCategoryChange1}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Y2 Cat"
                name="Y2_Cat"
                style={{ backgroundColor: "white" }}
              />
            )}
          /> */}
          <SingleDropdown
            label={"Y2 Cat"}
            items={CategoryParameters.map((ele) => ele.category)}
            handleChange={handleY2CategoryChange}
            selectedItem={y2Category}
          />
        </Grid>
        <Grid item>
          <MultiDropdown
            label={"Y2 Param"}
            items={y2ParameterOptions}
            handleChange={handleY2ParameterChange}
            selectedItems={y2Parameter}
          />
          {/* <Autocomplete
            fullWidth
            multiple
            disablePortal
            size="small"
            id="Parameter"
            options={
              selectedCategory1
                ? CategoryParameters.find(
                    (ele) => ele.category === selectedCategory1
                  ).parameters
                : []
            }
            value={selectedParameter1}
            onChange={handleParameterChange1}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Y2 Param"
                name="Y2_Param"
                style={{ backgroundColor: "white" }}
              />
            )}
          /> */}
        </Grid>
        <Grid item>
          {/* <Space direction="vertical" size={12}>
            <DatePicker
              onChange={(date, dateString) =>
                handleDateChange({
                  target: { name: "start_date", value: dateString },
                })
              }
              // onChange={(date, dateString) =>
              //   handleDateChange(date, dateString, "start_date")
              // }
              defaultValue={dayjs(selectedDate.start_date)}
              // value={date.start_date}
              placeholder="Start Date"
              needConfirm={false}
              style={{ width: "230px", height: "40px" }}
            />
          </Space> */}
          <Datepick
            startLabel={"Start Date"}
            endLabel={"End Date"}
            fromDate={fromDate}
            setFromDate={setFromDate}
            toDate={toDate}
            setToDate={setToDate}
          />
          {/* <Dateselector
            startLabel={"Start Date"}
            endLabel={"End Date"}
            fromDate={fromDate}
            setFromDate={setFromDate}
            toDate={toDate}
            setToDate={setToDate}
          /> */}
        </Grid>
        {/* <Grid item>
          <Space direction="vertical">
            <DatePicker
              onChange={(date, dateString) =>
                handleDateChange({
                  target: { name: "end_date", value: dateString },
                })
              }
              // onChange={(date, dateString) =>
              //   handleDateChange(date, dateString, "start_date")
              // }
              // value={date.end_date}
              defaultValue={dayjs(selectedDate.end_date)}
              placeholder="End Date"
              needConfirm={false}
              style={{ width: "230px", height: "40px" }}
            />
          </Space>
        </Grid> */}
        <Grid item>
          <MDButton
            variant="outlined"
            // style={{ height: "39px" }}
            component="a"
            // href="https://www.creative-tim.com/product/material-dashboard-pro-react"
            target="_blank"
            rel="noreferrer"
            // variant="gradient"
            color={sidenavColor}
            fullWidth
            onClick={() => getTrendlineGraph()}
          >
            VIEW
          </MDButton>
        </Grid>
      </Grid>
      {trendLineGraph && (
        <Grid item xs={12} mt={2}>
          <TrendLineGraph
            system_Info={trendLineGraph}
            alignY={chartYAlign}
            height={400}
            heading="ASPL"
            y1CategoryParameters={CategoryParameters}
          />
        </Grid>
      )}
    </>
  );
};

export default TrendLine;
