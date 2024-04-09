import React, { useState, useEffect } from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import "bootstrap/dist/css/bootstrap.min.css";
import { Grid } from "@mui/material";

const getStartTime = () => {
  let date = new Date();
  date.setHours(0, 1, 0, 0);
  return date.getTime();
};

const getPeakTime = (timestamp) => {
  let date = new Date(timestamp);
  return date.toLocaleTimeString();
};

const getMaxNow = (max, generation) => {
  let maxNum = Number(max);
  let generationNum = Number(generation);
  let result = maxNum - generationNum;

  if (generationNum > maxNum) {
    return 0;
  } else {
    return result;
  }
};

const getMaxLabel = (max, generation) => {
  let maxNum = Number(max);
  let generationNum = Number(generation);

  if (generationNum > maxNum) {
    return generationNum;
  } else {
    return maxNum;
  }
};

const ProgressBarChart = () => {
  const [progress, setProgress] = useState(0);
  const [comparisonData, setComparisonData] = useState({
    capacity: 40,
    powerGeneration: 25,
    max: 50,
    maxTime: Date.now(),
  });

  useEffect(() => {
    const interval = setInterval(() => {
      // Update progress state every 1 second
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prevProgress + 10; // Increment progress by 10%
      });
    }, 1000);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  return (
    <>
      {/* // <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
    //   <ProgressBar
    //     animated
    //     now={progress}
    //     label={`${progress}%`}
    //     style={{
    //       height: "14px",
    //       width: "90%",
    //       borderRadius: "20px",
    //       marginRight: "8px",
    //     }}
    //   />
    //   <p>Capacity: 40 MW</p>
    // </div> */}
      <Grid container style={{ marginTop: "-0.3rem" }} alignItems="center">
        <Grid item xs style={{ marginRight: "1rem" }}>
          <ProgressBar>
            <ProgressBar
              animated
              label={`${comparisonData.powerGeneration} MW`}
              max={comparisonData.capacity}
              variant="success"
              now={comparisonData.powerGeneration}
              key={1}
            />
            <ProgressBar
              animated
              data-toggle="tooltip"
              data-placement="bottom"
              title={`Max Time: ${getPeakTime(comparisonData.maxTime * 1000)}`}
              //   label={`${comparisonData.max} MW`}
              max={comparisonData.capacity}
              variant="info"
              now={getMaxNow(comparisonData.max, comparisonData.powerGeneration)}
              key={2}
            />
            {
              <span style={{ color: "#000" }}>
                &ensp;
                {`Max: ${getMaxLabel(comparisonData.max, comparisonData.powerGeneration)} MW`}
              </span>
            }
          </ProgressBar>
        </Grid>
        <Grid item>
          Capacity:
          <span style={{ color: "#008f56" }}>
            {comparisonData.capacity} <small>MW</small>
          </span>
        </Grid>
      </Grid>
    </>
  );
};

export default ProgressBarChart;
