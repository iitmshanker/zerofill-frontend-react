import * as React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";

const pieParams = { height: 300, margin: { right: 5 } };

export default function PieColor(props) {
  const { statsApiData } = props;
  return (
    <Stack direction="row" width="100%" textAlign="center" spacing={2}>
      <Box flexGrow={1}>
        <Typography>Objects By Type</Typography>
        <PieChart
          colors={["#ffa7a7", "#fec65a", "#1799e3"]}
          series={[
            {
              arcLabel: (item) => `${((100)*item.value/(statsApiData?.session_stats?.["Objects Processed"])).toFixed(1) +"%"}`,
              arcLabelMinAngle: 10,

              data: [
                {
                  id: 0,
                  value: statsApiData?.session_stats?.["^Flexibles/Sachets"],
                  label: "Total Flexibles",
                },
                {
                  id: 1,
                  value: statsApiData?.session_stats?.["^Rigids/Bottles"],
                  label: "Total Rigids",
                },
                {
                  id: 2,
                  value: statsApiData?.session_stats?.["^Tetra Paks/Cartons"],
                  label: "Total Tetrapacks",
                },
              ],
            },
          ]}
          {...pieParams}
          sx={{
            [`& .${pieArcLabelClasses.root}`]: {
              fill: "white",
              fontWeight: "bold",
              fontSize: 18,
            },
          }}
        />
      </Box>
    </Stack>
  );
}
