import React, { useState, useEffect } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  LabelList,
  Legend,
  Brush,
} from "recharts";

// import "./DataAvailabilityBarChart.css";

const renderLegend = (props) => {
  const { payload } = props;

  return (
    <div style={{ paddingBottom: "3.25rem" }}>
      {payload.map((entry, index) => {
        return (
          <span key={`item-${index}`} style={{ color: "#575757" }}>
            %
          </span>
        );
      })}
    </div>
  );
};

export default function DataAvailabilityBarChart({ chartData, enableScroll }) {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload) {
      return (
        <div>
          <span>{`${payload[0].payload.siteName}: ${payload[0].payload.Percentage}%`}</span>
        </div>
      );
    }

    return null;
  };

  const toDecimal = (value, index) => {
    return value / 1000;
  };

  const [brushStartIndex, setBrushStartIndex] = useState(0);

  useEffect(() => {
    if (enableScroll === false) {
      setBrushStartIndex(0);
    }
  }, [enableScroll]);

  const getDataForScroll = () => {
    let cells = [];

    if (chartData && chartData.length > 0) {
      for (let i = brushStartIndex; i < brushStartIndex + 14; i++) {
        cells.push(<Cell key={`cell-${i}`} fill={chartData[i]?.color} />);
      }
    }

    return cells;
  };

  return enableScroll === true ? (
    <ResponsiveContainer style={{ height: "100%" }}>
      <BarChart
        data={chartData}
        margin={{
          top: 5,
          right: 30,
          // left: 20,
          //   bottom: 10,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="siteName" fontSize={10} interval={0} stroke="black" />
        <YAxis domain={[0, (data) => 100]} />
        <Tooltip content={<CustomTooltip />} />

        <Brush
          endIndex={13}
          onChange={(obj) => setBrushStartIndex(obj.startIndex)}
          dataKey="siteName"
          height={18}
          stroke="#A6ACAF"
          tickFormatter={() => ""}
        />
        <Legend
          wrapperStyle={{
            paddingLeft: "10px",
          }}
          verticalAlign="middle"
          content={renderLegend}
        />

        <Bar isAnimationActive={false} dataKey="Percentage">
          <LabelList dataKey="Percentage" position="center" fill="#fff" angle="270" />

          {getDataForScroll()}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  ) : (
    <ResponsiveContainer>
      <BarChart
        data={chartData}
        margin={{
          top: 5,
          right: 30,
          left: 0,
          bottom: 30,
        }}
        barCategoryGap={1.25}
        barGap={1}
        barSize={200}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="siteName"
          angle={270}
          tickMargin={32}
          fontSize={10}
          interval={0}
          stroke="black"
        />
        <YAxis domain={[0, (data) => 100]} />
        <Tooltip content={<CustomTooltip />} />

        <Legend
          wrapperStyle={{
            paddingLeft: "10px",
          }}
          verticalAlign="middle"
          content={renderLegend}
        />
        <Bar isAnimationActive={false} dataKey="Percentage">
          <LabelList dataKey="Percentage" position="center" fill="#000" angle="270" fontSize={8} />
          {chartData.map((datum, index) => {
            return <Cell key={`cell-${index}`} fill={datum?.color} />;
          })}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
