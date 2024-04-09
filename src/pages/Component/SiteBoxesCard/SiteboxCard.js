import { Grid } from "@mui/material";
import MDBox from "components/MDBox";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import React from "react";
import powergen from "../../../assets/images/Siteboxcard/powerGeneration.png";
import humidity from "../../../assets/images/Siteboxcard/humidity.png";
import ambienttemp from "../../../assets/images/Siteboxcard/thermometer.png";
import ghi from "../../../assets/images/Siteboxcard/ray.png";
import PowerGenerationGauge from "../SitesCard/PowerGenerationGauge";

export default function SiteboxCard({ data }) {
  return (
    <>
      <MDBox py={0}>
        <Grid container spacing={1} justifyContent="space-between">
          <Grid item xs={6} md={4} lg={2}>
            <MDBox mb={0}>
              <ComplexStatisticsCard
                color="dark"
                // icon="weekend"
                icon={powergen}
                title="Generation"
                count={parseFloat(data.DayGeneration.toFixed(2))}
                MWH
                // percentage={{
                //   color: "success",
                //   amount: "+55%",
                //   label: "than lask week",
                // }}
                percentage={{
                  color: "success",
                  amount: "",
                  label: "Just updated",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={6} md={4} lg={2}>
            <MDBox mb={0}>
              <ComplexStatisticsCard
                icon={humidity}
                title="Humidity"
                count={parseFloat(data?.Humidity?.toFixed(2))}
                // percentage={{
                //   color: "success",
                //   amount: "+3%",
                //   label: "than last month",
                // }}
                percentage={{
                  color: "success",
                  amount: "",
                  label: "Just updated",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={6} md={4} lg={2}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon={ambienttemp}
                title="Ambient Temp"
                count={parseFloat(data?.Ambient_temp?.toFixed(2))}
                // percentage={{
                //   color: "success",
                //   amount: "+1%",
                //   label: "than yesterday",
                // }}
                percentage={{
                  color: "success",
                  amount: "",
                  label: "Just updated",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={6} md={4} lg={2}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon={ghi}
                title="GHI"
                count={parseFloat(data?.ghi?.toFixed(2))}
                // percentage={{
                //   color: "success",
                //   amount: "",
                //   label: "Just updated",
                // }}
                percentage={{
                  color: "success",
                  amount: "",
                  label: "Just updated",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={6} md={4} lg={2}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon={ghi}
                title="GTI-1"
                count={parseFloat(data?.gti1?.toFixed(2))}
                percentage={{
                  color: "success",
                  amount: "",
                  label: "Just updated",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={6} md={4} lg={2}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon={ghi}
                title="GTI-2"
                count={parseFloat(data?.gti2?.toFixed(2))}
                percentage={{
                  color: "success",
                  amount: "",
                  label: "Just updated",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={6} md={4} lg={2}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon={ghi}
                title="GTI-3"
                count={parseFloat(data?.gti3?.toFixed(2))}
                percentage={{
                  color: "success",
                  amount: "",
                  label: "Just updated",
                }}
              />
            </MDBox>
          </Grid>
          {/* <PowerGenerationGauge />s */}
        </Grid>
      </MDBox>
    </>
  );
}
