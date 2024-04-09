import React, { useEffect, useState } from "react";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   Legend,
//   CartesianGrid,
//   ResponsiveContainer,
// } from "recharts";
import { Card, Grid } from "@mui/material";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const TrendLineGraph = ({
  system_Info,
  alignY = { leftY: 1, rightY: 1 },
  height,
  heading,
  y1CategoryParameters,
}) => {
  const data = system_Info?.charts?.data || [];

  const getLinesForOpacity = () => {
    const objArray = Object.entries(data);
    let obj = {};
    objArray.forEach((element) => {
      obj = { ...obj, [element[0]]: 1 };
    });
    return obj;
  };

  const [opacity, setOpacity] = useState(getLinesForOpacity());

  const selectLine = (dataKey) => {
    setOpacity((prevState) => {
      return { ...prevState, [dataKey]: prevState[dataKey] === 0 ? 1 : 0 };
    });
  };

  const renderLegend = ({ payload }) => {
    return (
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "5px",
        }}
      >
        {payload.map(({ dataKey, color }) => {
          return (
            <strong
              key={dataKey}
              style={{
                fontSize: "0.8rem",
                color: color,
                cursor: "pointer",
                opacity: opacity[dataKey] === 0 ? 0.5 : 1,
              }}
              onClick={() => selectLine(dataKey)}
            >
              {String(dataKey).toUpperCase()}
            </strong>
          );
        })}
      </div>
    );
  };

  const lines = [];
  const getLineColor = (isLeftY, index) => {
    const leftYColors = [
      "#3B71CA",
      "#DC4C64",
      "#14A44D",
      "#E4A11B",
      "#54B4D3",
      "#CC004C",
      "#6460AA",
      "#0DB14B",
      "#0089D0",
      "#81BF97",
      "#4FA9D2",
      "#DF6756",
      "#4A154B",
      "#E3B34C",
      "#CE375C",
      "#ED642B",
      "#F26C7D",
      "#3F8F8B",
      "#225675",
      "#6460AA",
      "#8FD974",
      "#83D1C4",
      "#4DAAA7",
      "#F26764",
      "#54AFBC",
      "#F9B117",
      "#5BB462",
      "#072F54",
      "#D5DF37",
      "#58B1CE",
      "#76C065",
      "#19C0FF",
      "#7894FF",
    ];
    const rightYColors = [
      "#4caf50",
      "#ff9800",
      "#009688",
      "#cddc39",
      "#0d86bf",
      "#a432d1",
      "#ce466f",
      "#bf010e",
      "#a52812",
      "#edca4e",
      "#FF4F2D",
      "#FF8B74",
      "#CFB08D",
      "#1C4481",
      "#60688D",
      "#5B8BA1",
      "#F28D18",
      "#1DCDFE",
      "#21D0B2",
      "#2F455C",
      "#265B94",
      "#EE9142",
      "#007D98",
      "#F5B4A7",
      "#FFCD2E",
      "#5630FF",
      "#191035",
    ];

    if (isLeftY) {
      return leftYColors[index];
    }

    return rightYColors[index];
  };

  const getLeftYItems = () => {
    let objArray = Object.entries(data[0]);
    let lines = [];
    let colorIndex = 0;
    for (let i = 1; i <= alignY.leftY; i++) {
      if (objArray[i] !== undefined) {
        lines.push(
          <Line
            name={objArray[i][0]}
            yAxisId="left"
            type="monotone"
            dataKey={objArray[i][0]}
            stroke={getLineColor(true, colorIndex)}
            strokeWidth={2}
            strokeOpacity={opacity[objArray[i][0]]}
            dot={false}
          />
        );
        colorIndex += 1;
      }
    }
    return lines;
  };

  const getRightYItems = () => {
    let objArray = Object.entries(data[0]);
    let lines = [];
    let colorIndex = 0;
    for (let i = alignY.leftY + 1; i <= alignY.leftY + alignY.rightY; i++) {
      if (objArray[i] !== undefined) {
        lines.push(
          <Line
            name={objArray[i][0]}
            yAxisId="right"
            type="monotone"
            dataKey={objArray[i][0]}
            stroke={getLineColor(false, colorIndex)}
            strokeWidth={1}
            strokeOpacity={opacity[objArray[i][0]]}
            dot={false}
          />
        );
        colorIndex += 1;
      }
    }
    return lines;
  };

  // const keys = Object.keys(graph[0] || {});
  // for (let i = 1; i < keys.length; i++) {
  //   const key = keys[i];
  //   lines.push(
  //     <Line
  //       key={key}
  //       type="monotone"
  //       dataKey={key}
  //       stroke={colors[(i - 1) % colors.length]}
  //       dot={{ fill: colors[(i - 1) % colors.length] }}
  //       curve="catmullRom"
  //       strokeWidth={2}
  //     />
  //   );
  // }

  return (
    <Card
      sx={{
        padding: "15px",
        // ml: 2,
        // mr: 2,
        // mb: 1.1,
      }}
      elevation={6}
      style={
        {
          // fontFamily: "Arial, sans-serif",
          // padding: "15px",
          // borderRadius: "10px",
          // overflowX: "auto",
          // borderRadius: "5px",
        }
      }
    >
      {/* <h6>{heading}</h6> */}
      <Grid container>
        <ResponsiveContainer width="100%" height={height}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" angle={-7} />
            {/* <YAxis /> */}
            <Tooltip />
            <YAxis yAxisId="left" orientation="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Legend content={renderLegend} />

            {/* <Legend /> */}
            {/* {lines} */}
            {getLeftYItems().map((element) => element)}
            {getRightYItems().map((element) => element)}
          </LineChart>
        </ResponsiveContainer>
      </Grid>
    </Card>
  );
};

export default TrendLineGraph;
