import React from "react";
import { Grid, Button, Typography, Card } from "@material-ui/core";
import { useEffect, useState } from "react";
import axios from "axios";
import Dates from "./Dates";
import MenuItem from "@material-ui/core/MenuItem";
import { AppState } from "../../../AppContext";

import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import { tempSitesBlocksInverters } from "../../../constants/SiteNames";

import { SERVER_URL } from "../../../constants/constants";
import { el } from "date-fns/locale";
import SingleDropdown from "./SingleDropdown";
import MultiDropdown from "./MultiDropdown";
import TrendlineBiaxialLineChart from "./TrendlineBiaxialLineChart";
import { y1CategoryParameters } from "../../../constants/trendlineParameters";

export default function TrendLine() {
  const { setEnabledLinearProgress, setSnackbar } = AppState();
  const [disabledCSVBtn, setDisabledCSVBtn] = useState(false);

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

  const [frequency, setFrequency] = useState("daily");

  const handleFrequencyChange = (event) => {
    let value = event.target.value;
    setFrequency(value);
  };

  const gety1parameters = () => {
    let newArray = [];
    y1Category.map((ele) => {
      let v = y1CategoryParameters.find((site) => site.category === ele).parameters.map((el) => el);

      v.map((value) => newArray.push(value));
    });

    return newArray;
  };

  const selectedY1Category = () => {
    let catvalue = y1CategoryParameters.map((val) => val.category);
    let value = [catvalue[0]];
    return value;
  };

  const gety2parameters = () => {
    let newArray = [];
    y2Category.map((ele) => {
      let v = y1CategoryParameters.find((site) => site.category === ele).parameters.map((el) => el);

      v.map((value) => newArray.push(value));
    });

    return newArray;
  };

  const selectedY2Category = () => {
    let catvalue = y1CategoryParameters.map((val) => val.category);
    let value = [catvalue[0]];
    return value;
  };

  const [y1Category, setY1Category] = useState(selectedY1Category());

  const [y1Parameter, setY1Parameter] = useState(gety1parameters());
  const [y1ParameterOptions, setY1ParameterOptions] = useState(gety1parameters());

  const [y2Category, setY2Category] = useState(selectedY2Category());

  const [y2Parameter, setY2Parameter] = useState(gety2parameters());
  const [y2ParameterOptions, setY2ParameterOptions] = useState(gety2parameters());

  const handleMultipleY1Category = () => {
    let newY1Array = [];

    y1Category.map((ele) => {
      let v = y1CategoryParameters.find((site) => site.category === ele).parameters.map((el) => el);

      v.map((value) => newY1Array.push(value));
    });
    return setY1ParameterOptions(newY1Array), newY1Array;
  };

  const handleMultipleY2Category = () => {
    let newY2Array = [];
    y2Category.map((ele) => {
      let v = y1CategoryParameters.find((site) => site.category === ele).parameters.map((el) => el);

      v.map((value) => newY2Array.push(value));
    });
    return setY2ParameterOptions(newY2Array), newY2Array;
  };

  const handleY1CategoryChange = (event) => {
    let value = event.target.value;

    if (value[value.length - 1] === "all") {
      setY1Category(
        y1Category.length === y1CategoryParameters.map((site) => site.category).length
          ? []
          : y1CategoryParameters.map((block) => block.category)
      );
      return;
    }

    setY1Category(value);
  };
  useEffect(() => {
    setY1Parameter(handleMultipleY1Category());
  }, [y1Category]);

  const handleY1ParameterChange = (event) => {
    let value = event.target.value;

    if (value[value.length - 1] === "all") {
      setY1Parameter(y1Parameter.length === y1ParameterOptions.length ? [] : gety1parameters);
      return;
    }

    setY1Parameter(value);
  };

  const handleY2CategoryChange = (event) => {
    let value = event.target.value;

    if (value[value.length - 1] === "all") {
      setY2Category(
        y2Category.length === y1CategoryParameters.map((site) => site.category).length
          ? []
          : y1CategoryParameters.map((block) => block.category)
      );
      return;
    }

    setY2Category(value);
  };
  useEffect(() => {
    setY2Parameter(handleMultipleY2Category());
  }, [y2Category]);

  const handleY2ParameterChange = (event) => {
    let value = event.target.value;

    if (value[value.length - 1] === "all") {
      setY2Parameter(y2Parameter.length === y2ParameterOptions.length ? [] : gety2parameters);
      return;
    }

    setY2Parameter(value);
  };

  const [sitesBlocksInverters, setSitesBlocksInverters] = useState(tempSitesBlocksInverters);
  const [selectedSites, setSelectedSites] = useState(sitesBlocksInverters[0].name);

  const siteNamesAndBlocks = JSON.parse(localStorage.getItem("siteNamesAndBlocks"));

  const getSites = (sites = siteNamesAndBlocks) => {
    return sites.map((site) => site.name);
  };

  const [siteOptions, setSiteOptions] = useState(getSites());
  const [selectedBlocks, setSelectedBlocks] = useState(
    sitesBlocksInverters[0].blocks.map((block) => block.name)
  );

  const [selectedInverters, setSelectedInverters] = useState(["I01"]);

  const fetchDropdownValues = () => {
    // console.log("fetch drop down values");
    axios.post(SERVER_URL + "/manageinverters/inverters").then((response) => {
      let sites = response.data.sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));
      setSitesBlocksInverters(sites);
      setSelectedSites(sites[1].name);
      setSelectedBlocks(sites[1].blocks[0].name);
    });
  };

  useEffect(() => {
    fetchDropdownValues();
  }, []);

  const handleSitesChange = (event) => {
    let value = event.target.value;

    setSelectedSites(value);

    let blocks = sitesBlocksInverters
      .find((site) => site.name === value)
      .blocks.map((block) => block.name);
    let singleblock = blocks[0];
    setSelectedBlocks(singleblock);
  };

  const handleBlocksChange = (event) => {
    let value = event.target.value;

    setSelectedBlocks(value);
  };

  const handleInvertersChange = (event) => {
    let value = event.target.value.sort();

    if (value[value.length - 1] === "all") {
      if (selectedInverters.length === 0) {
        setSelectedInverters(getInverterOptions());
      } else {
        setSelectedInverters([]);
      }

      return;
    }
    setSelectedInverters(value);
  };
  const getInverterOptions = () => {
    let inverters = [];
    try {
      const site = sitesBlocksInverters.find((site) => site.name === selectedSites);
      const block = site["blocks"].find((block) => block.name === selectedBlocks);
      const foundInveters = block?.inverters.map((inv) => inv.name);
      inverters = foundInveters.length > 0 ? foundInveters.sort() : [];
    } catch (error) {
      inverters = [];
    }
    return inverters;
  };

  const [disabledViewBtn, setDisabledViewBtn] = useState(false);

  const [charts, setCharts] = useState([]);
  const [chartYAlign, setChartYAlign] = useState({});

  const getTrendlineData = (startTime, endTime, beginTime) => {
    setEnabledLinearProgress(true);

    setDisabledViewBtn(true);

    axios
      .post(SERVER_URL + "/trendline/graph", {
        site: selectedSites,
        block: selectedBlocks,
        inverters: selectedInverters,

        startTime: fromDate.getTime(),
        endTime: toDate.getTime(),
        frequency: frequency,
        y1Category: y1Category,
        y1Parameter: y1Parameter,
        y2Category: y2Category,
        y2Parameter: y2Parameter,
      })
      .then((response) => {
        const data = response.data;
        const newCharts = data.charts;
        setCharts(newCharts);
        const align = data.align;
        setChartYAlign(align);
        setEnabledLinearProgress(false);

        setDisabledViewBtn(false);
      })
      .catch((error) => {
        // console.log(error);
        setEnabledLinearProgress(false);

        setDisabledViewBtn(false);
      });
  };

  const fetchCSV = async () => {
    let jwtToken = localStorage.getItem("userToken");
    setDisabledCSVBtn(true);
    setEnabledLinearProgress(true);
    try {
      const response = await axios.post(SERVER_URL + "/trendline/csv", {
        email: localStorage.getItem("userEmail"),
        site: selectedSites,
        block: selectedBlocks,
        inverters: selectedInverters,
        startTime: fromDate.getTime(),
        endTime: toDate.getTime(),
        frequency: frequency,
        y1Category: y1Category,
        y1Parameter: y1Parameter,
        y2Category: y2Category,
        y2Parameter: y2Parameter,
      });
      const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = downloadUrl;
      let filename = `${fromDate.getDate()}_${fromDate.getMonth() + 1} to ${toDate.getDate()}_${
        toDate.getMonth() + 1
      }.csv`;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
      setEnabledLinearProgress(false);
      setDisabledCSVBtn(false);
    } catch (error) {
      // console.log(error);
      setSnackbar((prevState) => ({
        ...prevState,
        open: true,
        severity: "error",
        message: "No data found.",
      }));
      setEnabledLinearProgress(false);
      setDisabledCSVBtn(false);
    }
  };

  return (
    <>
      <Grid container direction="row" justifyContent="flex-start" alignItems="flex-start">
        <Grid item>
          <SingleDropdown
            label={"Site"}
            items={siteOptions}
            handleChange={handleSitesChange}
            selectedItem={selectedSites}
          />
        </Grid>
        <Grid item style={{ marginLeft: "1rem" }}>
          <SingleDropdown
            label={"Block"}
            items={
              sitesBlocksInverters.find((site) => site.name === selectedSites)
                ? sitesBlocksInverters
                    .find((site) => site.name === selectedSites)
                    .blocks.map((block) => block.name)
                : []
            }
            handleChange={handleBlocksChange}
            selectedItem={selectedBlocks}
          />
        </Grid>
        <Grid item style={{ marginLeft: "1rem" }}>
          <MultiDropdown
            label={"Inverter"}
            items={getInverterOptions()}
            handleChange={handleInvertersChange}
            selectedItems={selectedInverters}
          />
        </Grid>
        <Grid item>
          <Dates
            fromDate={fromDate}
            setFromDate={setFromDate}
            toDate={toDate}
            setToDate={setToDate}
          />
        </Grid>
        <Grid item style={{ marginLeft: "1rem" }}>
          <FormControl>
            <InputLabel id="frequency-simple-select-label">Frequency</InputLabel>
            <Select
              labelId="frequency-simple-select-label"
              id="frequency-simple-select"
              value={frequency}
              onChange={handleFrequencyChange}
              style={{ fontSize: ".8rem" }}
            >
              <MenuItem value={"daily"}>Daily</MenuItem>
              <MenuItem value={"mtd"}>MTD</MenuItem>
              <MenuItem value={"ytd"}>YTD</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item style={{ marginLeft: "1rem" }}>
          <MultiDropdown
            label={"Y1 Cat"}
            items={y1CategoryParameters.map((ele) => ele.category)}
            handleChange={handleY1CategoryChange}
            selectedItems={y1Category}
          />
        </Grid>
        <Grid item style={{ marginLeft: "1rem" }}>
          <MultiDropdown
            label={"Y1 Param"}
            items={y1ParameterOptions}
            handleChange={handleY1ParameterChange}
            selectedItems={y1Parameter}
          />
        </Grid>
        <Grid item style={{ marginLeft: "1rem" }}>
          <MultiDropdown
            label={"Y2 Cat"}
            items={y1CategoryParameters.map((ele) => ele.category)}
            handleChange={handleY2CategoryChange}
            selectedItems={y2Category}
          />
        </Grid>
        <Grid item style={{ marginLeft: "1rem" }}>
          <MultiDropdown
            label={"Y2 Param"}
            items={y2ParameterOptions}
            handleChange={handleY2ParameterChange}
            selectedItems={y2Parameter}
          />
        </Grid>
        <Grid item style={{ marginLeft: "1rem", marginTop: "0.8rem" }}>
          <Button
            variant="outlined"
            size="small"
            style={{
              // paddingInline: "1.5rem",
              // marginTop: "-0.6rem",
              fontSize: "14px",
              height: "2rem",
            }}
            color="primary"
            onClick={getTrendlineData}
            disabled={disabledViewBtn}
          >
            {disabledViewBtn ? "Loading" : "View"}
          </Button>
        </Grid>
        <Grid item style={{ marginLeft: "1rem", marginTop: "0.8rem" }}>
          <Button
            variant="outlined"
            color="primary"
            size="small"
            style={{
              // paddingInline: "1.5rem",
              // marginTop: "-0.6rem",
              fontSize: "14px",
              height: "2rem",
            }}
            onClick={fetchCSV}
            disabled={disabledCSVBtn}
          >
            {disabledCSVBtn ? "Downloading" : "CSV"}
          </Button>
        </Grid>
      </Grid>
      {charts.map((chart, index) => (
        <Grid container key={index}>
          <Card
            style={{
              width: "100%",
              height: "410px",
              marginTop: "1rem",
              // paddingBottom: "3rem",

              marginLeft: "-1rem",
              // paddingTop: ".5rem",
              paddingInline: ".5rem",
            }}
          >
            <TrendlineBiaxialLineChart data={chart.data} alignY={chartYAlign} />
          </Card>
        </Grid>
      ))}
    </>
  );
}
