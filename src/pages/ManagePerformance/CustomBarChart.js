import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  Legend,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

const renderLegend = (props) => {
  const { payload } = props;

  return (
    <div style={{ textAlign: "center" }}>
      {payload.map((entry, index) => {
        if (entry.value === "prBudget") {
          return (
            <span key={`item-${index}`} style={{ color: "#5DADE2" }}>
              &#9679;&nbsp;Budget&emsp;
            </span>
          );
        } else {
          return (
            <span key={`item-${index}`}>
              <span style={{ color: "#48C9B0" }}>&#9679;</span>&nbsp;
              <span style={{ color: "#EC7063" }}>&#9679;</span>&nbsp;Actual
            </span>
          );
        }
      })}
    </div>
  );
};

export default function CustomBarChart({ chartData }) {
  return (
    <ResponsiveContainer>
      <BarChart
        data={chartData}
        margin={{
          top: 20,
          right: 30,
          left: 0,
          // bottom: 5,
        }}
        barCategoryGap={1.25}
        barGap={1}
        barSize={200}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="site" angle={270} tickMargin={32} fontSize={10} interval={0} />
        <YAxis domain={[0, (data) => 110]} />

        <Legend
          wrapperStyle={{
            paddingTop: "25px",
          }}
          formatter={(value, entry, index) => (value === "plantPr" ? "Actual PR" : "Budget")}
          content={renderLegend}
        />

        <Bar isAnimationActive={false} dataKey="prBudget" fill="#5DADE2">
          <LabelList dataKey="prBudget" position="center" fill="#000" angle="270" fontSize={8} />
        </Bar>
        <Bar isAnimationActive={false} dataKey="plantPr">
          <LabelList dataKey="plantPr" position="center" fill="#000" angle="270" fontSize={8} />
          {chartData.map((datum, index) => {
            if (Number(datum.plantPr) >= Number(datum.prBudget)) {
              return <Cell key={`cell-${index}`} fill="#48C9B0" />;
            } else {
              return <Cell key={`cell-${index}`} fill="#EC7063" />;
            }
          })}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
