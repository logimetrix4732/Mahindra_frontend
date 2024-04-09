import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import React, { useContext, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import SitestatusBar from "./Component/SitesCard/SitestatusBar";
import { Card, Grid } from "@mui/material";
import SiteboxCard from "./Component/SiteBoxesCard/SiteboxCard";
import PowerGenerationGauge from "./Component/SitesCard/PowerGenerationGauge";
import Footer from "examples/Footer";
import MDBox from "components/MDBox";
import TemperaturesHumidity from "./Component/SitesCard/TemperaturesHumidity";
import WindDirectionSpeed from "./Component/SitesCard/WindDirectionSpeed";
import SystemLineChart from "./Component/SitesCard/SystemLineChart";
import { UserContext } from "context/UserContext";
import InverterValues from "./Component/SitesCard/InverterValues";
import axios from "axios";

export default function DynamicSites() {
  //   const params = useParams();
  const [dateTime, setDateTime] = useState(null);
  const {
    getGrid,
    dashboardBoxes,
    dashboardwind,
    dashboardGraph,
    dashboardtemperature,
    dashboardGauge,
  } = useContext(UserContext);
  // const handleDateChange = (event) => {
  //   getDashboardBoxes();
  //   setDateTime(event.target.value);
  // };
  // Main time state
  const [mainTime, setMainTime] = useState(new Date().getTime());

  // Status and Time states
  const [status, setStatus] = useState(0);
  const [timestamp, setTimestamp] = useState(undefined);

  const [sitestatusBar, setSitestatusBar] = useState({
    site: "ASPL",
    capacity: 40,
    status: "online",
    timestamp: 1711191784000,
    // 1709211199
  });

  const [wind, setWind] = useState([]);
  const [boxData, setBoxData] = useState([]);
  const [graph, setGraph] = useState([]);
  const [tableGrid, setTableGrid] = useState([]);
  const [temperatureData, setTemperatureData] = useState([]);
  const [blockTableObjects, setBlockTableObjects] = useState([]);
  const [powerGenerationGuage, setPowerGenerationGuage] = useState([]);
  // console.log(blockTableObjects, "BlockTableObjects");

  const [data, setData] = useState({
    DayGeneration: 6,
    Humidity: 29,
    Ambient_temp: 32,
    ghi: 21,
    gti: 22,
  });
  console.log(data, "Data46");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [openDateTimePicker, setOpenDateTimePicker] = useState(false);
  const [selectedBlock, setSelectedBlock] = React.useState("B01");

  const [isTimeReset, setIsTimeReset] = useState(true);

  const handleTimeSliderToggleClose = () => {
    setOpenTimeSliderSuccessAlert(false);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);

    // try {
    //   setIsTimeReset(false);
    // } finally {
    //   setSelectedDate(date);
    //   setOpenDateTimePicker(false);
    // }
  };

  const handleTimeReset = () => {
    setIsNextCount(0);
    let now = new Date();
    setSelectedDate(now);
    setMainTime(now.getTime());
    setOpenTimeSliderSuccessAlert(true);
    setIsTimeReset(true);
  };

  useEffect(() => {
    setMainTime(selectedDate.getTime());
  }, [selectedDate]);

  const getMinDateForPicker = () => {
    // Sep 10, 2021 12:00:00 PM
    const startTime = new Date(1631275200000);
    return startTime;
  };

  const [isNextCount, setIsNextCount] = useState(0);

  useEffect(() => {
    if (isNextCount !== 0) {
      getSiteData(mainTime);
    }
  }, [isNextCount]);

  const getEnablePacket = () => {
    if (isNextCount !== 0) {
      return "1";
    } else {
      return "0";
    }
  };

  const getIsNext = () => {
    if (isNextCount > 0) {
      return "1";
    } else {
      return "0";
    }
  };

  // Functions related to header (status and time)
  const getFormattedDateAndTimeString = (timestamp) => {
    const date = new Date(timestamp);
    return (
      <span>
        {String(date.getDate()).padStart(2, "0")}/{String(date.getMonth() + 1).padStart(2, "0")}/
        {date.getFullYear()}
        <span>&emsp;</span>
        {date
          .toLocaleString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })
          .toUpperCase()}
      </span>
    );
  };

  const handleBlockChange = (event) => {
    let value = event.target.value;

    setSelectedBlock(value);
  };

  //GetApis
  const getDashboardBoxes = () => {
    let startTime;
    let endTime;
    if (timestampDashboard == null) {
      startTime = 1693564813;
      endTime = Math.floor(Date.now() / 1000);
    } else {
      startTime = timestampDashboard - 120;
      endTime = timestampDashboard;
    }

    let data = {
      startTime: startTime,
      endTime: Math.floor(Date.now() / 1000),
    };
    console.log("Api jittttttttttt");
    dashboardBoxes(
      data,
      (apiRes) => {
        console.log(apiRes.data, "BoxData146");
        setBoxData(apiRes?.data);
      },
      (apiErr) => {
        console.log(apiErr, "apiRes");
      }
    );
  };

  //graph
  const getDashboardGraph = () => {
    let startTime;
    let endTime;
    if (timestampDashboard == null) {
      startTime = 1704105613;
      endTime = Math.floor(Date.now() / 1000);
    } else {
      startTime = timestampDashboard - 120;
      endTime = timestampDashboard;
    }
    let data = {
      startTime: startTime,
      endTime: Math.floor(Date.now() / 1000),
    };
    dashboardGraph(
      data,
      (apiRes) => {
        console.log(apiRes, "BoxDAtagraph");
        setGraph(apiRes?.data);
      },
      (apiErr) => {
        console.log(apiErr, "apiRes");
      }
    );
  };

  //temperature
  const getDashboardtemperature = () => {
    let startTime;
    let endTime;
    if (timestampDashboard == null) {
      startTime = 1693564813;
      endTime = Math.floor(Date.now() / 1000);
    } else {
      startTime = timestampDashboard - 120;
      endTime = timestampDashboard;
    }
    let data = {
      startTime: startTime,
      endTime: Math.floor(Date.now() / 1000),
    };
    console.log(data, "its me");

    dashboardtemperature(
      data,
      (apiRes) => {
        setTemperatureData(apiRes?.data);
      },
      (apiErr) => {
        console.log(apiErr, "apiRes");
      }
    );
  };
  //gauge
  const getDashboardGauge = () => {
    let startTime;
    let endTime;
    if (timestampDashboard == null) {
      startTime = 1693564813;
      endTime = Math.floor(Date.now() / 1000);
    } else {
      startTime = timestampDashboard - 120;
      endTime = timestampDashboard;
    }
    let data = {
      startTime: startTime,
      endTime: Math.floor(Date.now() / 1000),
    };
    console.log(data, "its me");

    dashboardGauge(
      data,
      (apiRes) => {
        setPowerGenerationGuage(parseFloat(apiRes.data[0].power.toFixed(2)) || []);
      },
      (apiErr) => {
        console.log(apiErr, "apiRes");
      }
    );
  };

  //   setEnabledLinearProgress(true);
  //   setShow(false);
  //   // Todo: Make it more secure by using token.
  //   axios
  //     .post(
  //       SERVER_URL + "/api/roles",
  //       { email: localStorage.getItem("userEmail") },
  //       { headers: { jwtToken: localStorage.getItem("userToken") } }
  //     )
  //     .then((response) => {
  //       // console.log("Users", response.data);
  //       let sortedUser = sortValues(response.data, sortBy.header, sortBy.order);
  //       setUsers(sortedUser);

  //       let currentUser = response.data.find(
  //         (element) => element.email === localStorage.getItem("userEmail")
  //       );
  //       setShow(false);
  //       setUser(currentUser);
  //       setRole(currentUser.role);
  //       setSelectedLocations(currentUser.locations);
  //       setSelectedMenu(currentUser.menu);

  //       setUser((prevState) => {
  //         let object = {};
  //         Object.keys(prevState).forEach((key) => {
  //           object = { ...object, [key]: "" };
  //         });
  //         return object;
  //       });
  //       setNewPassword("");
  //       setEmail("");
  //       setEnabledLinearProgress(false);
  //     })
  //     .catch(() => {
  //       setShow(false);
  //       setEnabledLinearProgress(false);
  //     });
  // };

  // const getDashboardGuage = () => {
  //   let startTime;
  //   let endTime;
  //   if (timestampDashboard == null) {
  //     startTime = 1704105613;
  //     endTime = Math.floor(Date.now() / 1000);
  //   } else {
  //     startTime = timestampDashboard - 120;
  //     endTime = timestampDashboard;
  //   }
  //   let data = {
  //     // block: selectedBlock,
  //     startTime: startTime,
  //     endTime: Math.floor(Date.now() / 1000),
  //   };
  //   axios
  //     .post(
  //       "http://64.227.158.146:3000/gauge",
  //       data
  //       // { email: localStorage.getItem("userEmail") },
  //       // { headers: { jwtToken: localStorage.getItem("userToken") } }
  //     )
  //     .then((response) => {
  //       console.log(response, "Guage");
  //       setPowerGenerationGuage(parseFloat(response.data[0].power.toFixed(2)) || []);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
  //table
  const getDashboardGrid = () => {
    // let data = {
    //   block: selectedBlock,
    //   startTime: 1712042933,
    //   endTime: 1712078678,
    // };
    let startTime;
    let endTime;
    if (timestampDashboard == null) {
      startTime = 1704105613;
      endTime = Math.floor(Date.now() / 1000);
    } else {
      startTime = timestampDashboard - 120;
      endTime = timestampDashboard;
    }
    let data = {
      block: selectedBlock,
      startTime: startTime,
      endTime: Math.floor(Date.now() / 1000),
    };
    console.log("Api hitt Dashboard grid");
    getGrid(
      data,
      (apiRes) => {
        console.log(apiRes.data, "BoxDatagrid");
        setTableGrid(apiRes?.data);
        formatInverterValues(apiRes?.data);
      },
      (apiErr) => {
        console.log(apiErr, "apiResDataGrid");
      }
    );
  };
  //wind
  const getDashboardWind = () => {
    let startTime;
    let endTime;
    if (timestampDashboard == null) {
      startTime = 1693564813;
      endTime = Math.floor(Date.now() / 1000);
    } else {
      startTime = timestampDashboard - 120;
      endTime = timestampDashboard;
    }
    let data = {
      startTime: startTime,
      endTime: Math.floor(Date.now() / 1000),
    };
    dashboardwind(
      data,
      (apiRes) => {
        setWind(apiRes?.data);
      },
      (apiErr) => {
        console.log(apiErr, "apiRes");
      }
    );
  };

  useEffect(() => {
    boxData?.map((data) => {
      setData(data);
    });
  }, [boxData]);

  const timestampDashboard = dateTime ? Math.floor(new Date(dateTime).getTime() / 1000) : null;

  const { email } = useParams();
  console.log(email, "Email");
  // const [data, setData] = useState(null);
  // let arr = [
  //   {
  //     data: "Custom Card",
  //     color: "#5984ED",
  //     name: "Generation",
  //     icon: "ni ni-google-wallet",
  //     counts: Math.floor(data?.DayGeneration * 100) / 100 + " MWH",
  //     // counts: "456.98",
  //     imagePath: "/Image/powerGeneration.png",
  //     imageHeight: 48,
  //     // count: boxData.filter((elem) => {
  //     //   if (elem.name === "Generation") {
  //     //     return elem.count;
  //     //   }
  //     // }),
  //   },
  //   {
  //     data: "Custom Card",
  //     color: "#4BCD93",
  //     name: "Humidity",
  //     icon: "ni ni-share-fill",
  //     counts: Math.floor(data?.Humidity * 100) / 100,
  //     // counts: "556.02",
  //     imagePath: "/Image/humidity.png",
  //     imageHeight: 48,
  //   },
  //   {
  //     data: "Custom Card",
  //     color: "#E66794",
  //     name: "Ambient_Temp",
  //     icon: "ni ni-folders-fill",
  //     counts: Math.floor(data?.Ambient_temp * 100) / 100,
  //     // counts: "356.90",
  //     imagePath: "/Image/thermometer.png",
  //     imageHeight: 48,
  //   },
  //   {
  //     data: "Custom Card",
  //     color: "#4CBACE",
  //     name: "GHI",
  //     icon: "ni ni-file-text-fill",
  //     counts: Math.floor(data?.ghi * 100) / 100,
  //     // counts: "256.13",
  //     imagePath: "/Image/ray.png",
  //     imageHeight: 48,
  //   },
  //   {
  //     data: "Custom Card",
  //     color: "#F4AD15",
  //     name: "GTI",
  //     icon: "ni ni-user-check-fill",
  //     counts: Math.floor(data?.gti * 100) / 100,
  //     // counts: "156.45",
  //     imagePath: "/Image/ray.png",
  //     imageHeight: 48,
  //   },
  // ];

  useEffect(() => {
    // fetchDataFromBackend(email)
    //   .then((response) => setData(response.data))
    //   .catch((error) => console.error("Error fetching data:", error));
  }, [email]);
  useEffect(() => {
    getDashboardGrid();
    getDashboardWind();
    getDashboardBoxes();
    getDashboardGraph();
    getDashboardGauge();

    getDashboardtemperature();
  }, []);
  useEffect(() => {
    getDashboardGrid();
  }, [selectedBlock]);

  const formatInverterValues = (data) => {
    let arrayOfObjectsX = [];

    let arrayFromObject = Object.entries(data);

    const heading = [
      "L1 I",
      "L2 I",
      "L3 I",
      "L1 V",
      "L2 V",
      "L3 V",
      "Frequency",
      "DC I",
      "DC V",
      "Active Power",
      "DC Power",
      "Reactive Power",
      "PF",
      "Cab Temp",
      "IGBT Temp",
      "DC Energy",
      "S1 L1 I",
      "S1 L2 I",
      "S1 L3 I",
      "S1 L1 V",
      "S1 L2 V",
      "S1 L3 V",
      "S1 DC I",
      "S1 DC V",
      "S1 Active Power",
      "S1 DC Power",
      "S1 PF",
      "S1 IGBT Temp",

      "S2 L1 I",
      "S2 L2 I",
      "S2 L3 I",
      "S2 L1 V",
      "S2 L2 V",
      "S2 L3 V",
      "S2 DC I",
      "S2 DC V",
      "S2 Active Power",
      "S2 DC Power",
      "S2 PF",
      "S2 IGBT Temp",

      "S3 L1 I",
      "S3 L2 I",
      "S3 L3 I",
      "S3 L1 V",
      "S3 L2 V",
      "S3 L3 V",
      "S3 DC I",
      "S3 DC V",
      "S3 Active Power",
      "S3 DC Power",
      "S3 PF",
      "S3 IGBT Temp",

      "S4 L1 I",
      "S4 L2 I",
      "S4 L3 I",
      "S4 L1 V",
      "S4 L2 V",
      "S4 L3 V",
      "S4 DC I",
      "S4 DC V",
      "S4 Active Power",
      "S4 DC Power",
      "S4 PF",
      "S4 IGBT Temp",

      "S1 + S2 Peak Active Power",
      "S3 + S4 Peak Active Power",
      "S1 / S1CB1 I",
      "S2 / S1CB2 I",
      "S3 / S1CB3 I",
      "S4 / S1CB4 I",
      "S5 / S1CB5 I",
      "S6 / S1CB6 I",
      "S7 / S1CB7 I",
      "S8 / S1CB8 I",
      "S9 / S2CB1 I",
      "S10 / S2CB2 I",
      "S11 / S2CB3 I",
      "S12 / S2CB4 I",
      "S13 / S2CB5 I",
      "S14 / S2CB6 I",
      "S15 / S2CB7 I",
      "S16 / S2CB8 I",
      "S17 / S3CB1 I",
      "S18 / S3CB2 I",
      "S19 / S3CB3 I",
      "S20 / S3CB4 I",
      "S21 / S3CB5 I",
      "S22 / S3CB6 I",
      "S23 / S3CB7 I",
      "S24 / S3CB8 I",
      "S25 / S4CB1 I",
      "S26 / S4CB2 I",
      "S27 / S4CB3 I",
      "S28 / S4CB4 I",
      "S29 / S4CB5 I",
      "S30 / S4CB6 I",
      "S31 / S4CB7 I",
      "S32 / S4CB8 I",
    ];

    for (let i = 0; i < heading.length; i++) {
      let inv1Value = NaN;
      let inv2Value = NaN;
      let inv3Value = NaN;
      let inv4Value = NaN;
      // let inv5Value = NaN;
      // let inv6Value = NaN;

      try {
        if (arrayFromObject[i][1]) {
          inv1Value = arrayFromObject[i][1];
        }
        if (arrayFromObject[heading.length + i][1]) {
          inv2Value = arrayFromObject[heading.length + i][1];
        }
        if (arrayFromObject[heading.length * 2 + i][1]) {
          inv3Value = arrayFromObject[heading.length * 2 + i][1];
        }
        if (arrayFromObject[heading.length * 3 + i][1]) {
          inv4Value = arrayFromObject[heading.length * 3 + i][1];
        }
        // if (arrayFromObject[heading.length * 4 + i][1]) {
        //   inv5Value = arrayFromObject[heading.length * 4 + i][1];
        // }
        // if (arrayFromObject[heading.length * 5 + i][1]) {
        //   inv6Value = arrayFromObject[heading.length * 5 + i][1];
        // }
      } catch (error) {}

      arrayOfObjectsX.push({
        heading: heading[i],
        inv1: inv1Value,
        inv2: inv2Value,
        inv3: inv3Value,
        inv4: inv4Value,
        // inv5: inv5Value,
        // inv6: inv6Value,
      });
    }
    setBlockTableObjects([...arrayOfObjectsX]);
  };

  return (
    <>
      {/* <DashboardLayout> */}
      {/* <DashboardNavbar /> */}
      {/* Helllo How are you sites are coming soon..........{email} */}

      {/* <Grid
            container
            spacing={1}
            columnSpacing={4}
            justifyContent="space-around"
            // style={{ marginTop: "68px" }}
          > */}
      {/* <Grid item xs={11.7}> */}

      <SitestatusBar
        sitestatusBar={sitestatusBar}
        status={data.status}
        timestamp={data.timestamp}
        // handleClickOpen={handleClickOpen}
        handleTimeReset={handleTimeReset}
        setIsNextCount={setIsNextCount}
        setOpenDateTimePicker={setOpenDateTimePicker}
        getMinDateForPicker={getMinDateForPicker}
        selectedDate={selectedDate}
        getFormattedDateAndTimeString={getFormattedDateAndTimeString}
        openDateTimePicker={openDateTimePicker}
        handleDateChange={handleDateChange}
      />
      {/* </Grid> */}
      {/* {arr.map((data) => (
              <Grid item key={data.name} xs={2.1}>
                <Card
                  elevation={6}
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-evenly",
                    height: "80px",
                    textAlign: "center",
                    borderRadius: "5px",
                  }}
                >
                  <img
                    src={data.imagePath}
                    alt={data.name}
                    height={data.imageHeight}
                    style={{ marginRight: "1rem" }}
                  />
                  <Grid item>
                    <h6>{data.name}</h6>
                    <h6>{data.counts || 0}</h6>
                  </Grid>
                </Card>
              </Grid>
            ))} */}
      {/* <Grid item> */}

      <SiteboxCard data={data} />
      <MDBox mt={0}>
        <Grid container spacing={1} justifyContent="space-between">
          <Grid item xs={3} md={6} lg={4}>
            <MDBox mb={2}>
              <PowerGenerationGauge totalExport={powerGenerationGuage} maxValue={50} />
            </MDBox>
          </Grid>
          <Grid item xs={3} mt={0}>
            <MDBox mb={2}>
              <TemperaturesHumidity temperatureData={temperatureData} />
            </MDBox>
          </Grid>
          <Grid item xs={2.3} mt={0}>
            <MDBox mb={2}>
              <WindDirectionSpeed wind={wind} />
            </MDBox>
          </Grid>
          <Grid item xs={12} mt={2}>
            <SystemLineChart system_Info={graph} height={400} heading="Irradiance / Generation" />
          </Grid>
          <Grid item xs={12} mt={2}>
            <InverterValues
              values={blockTableObjects}
              selectedBlock={selectedBlock}
              handleBlockChange={handleBlockChange}
            />
          </Grid>
        </Grid>
      </MDBox>

      {/* <Grid item xs={3} mt={2}>
              <PowerGenerationGauge data={data} />
            </Grid> */}
      {/* <Grid item xs={3} mt={2}>
          <TemperaturesHumidity temperatureData={temperatureData} />
        </Grid> */}
      {/* <Grid item xs={2.3} mt={2}>
              <WindDirectionSpeed wind={wind} />
            </Grid> */}
      {/* <Grid item xs={2.6}></Grid> */}
      {/* <Grid item xs={12} mt={2}>
              <SystemLineChart system_Info={graph} height={400} heading="Irradiance / Generation" />
            </Grid> */}
      {/* <Grid item xs={11.7} mt={2} mb={3}>
              <InverterValues values={blockTableObjects} />
            </Grid> */}
      {/* </Grid> */}

      {/* <Footer /> */}
      {/* </DashboardLayout> */}
    </>
  );
}
