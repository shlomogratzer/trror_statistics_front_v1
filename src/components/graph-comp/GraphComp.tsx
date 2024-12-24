import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { ResponsiveChartContainer } from "@mui/x-charts/ResponsiveChartContainer";
import { BarPlot } from "@mui/x-charts/BarChart";
import { LinePlot } from "@mui/x-charts/LineChart";
import { ChartsXAxis } from "@mui/x-charts/ChartsXAxis";
import { ISAttack } from "../../context/contextModel";
import { BarSeriesType, LineSeriesType } from "@mui/x-charts";
interface Props {
  options: ISAttack[];
}

const GraphComp = (props: Props) => {
  const [type, setType] = React.useState<"line" | "bar">("line");
  const [seriesValue, setSeriesValue] = React.useState<
    (LineSeriesType | BarSeriesType)[]
  >([]);
  const intioalData = () => {
    if (!props.options) {
      return;
    }
    props.options.map((option) => {
      setSeriesValue((prev) => {
        console.log(prev);
        return [
          ...prev,
          {
            type,
            data: [option.sumCasualties],
          },
        ];
      });
    });
  };
  React.useEffect(() => {
    setSeriesValue([]);
    intioalData();
  }, [props.options, type]);
  return (
    <Box sx={{ width: "100%" }}>
      <TextField
        select
        value={type}
        onChange={(event) => setType(event.target.value as "line" | "bar")}
        label="series type"
        sx={{ minWidth: 150 }}
      >
        <MenuItem value="line">line</MenuItem>
        <MenuItem value="bar">bar</MenuItem>
      </TextField>

      <div>
        <ResponsiveChartContainer
          series={
            seriesValue || [
              {
                type,
                data: [1, 2, 3, 2, 1],
              },
              {
                type,
                data: [4, 3, 1, 3, 4],
              },
              {
                type,
                data: [7, 4, 2, 4, 3],
              },
            ]
          }
          xAxis={[
            {
              data: ["A", "B", "C", "D", "E"],
              scaleType: "band",
              id: "x-axis-id",
            },
          ]}
          height={200}
        >
          <BarPlot />
          <LinePlot />
          <ChartsXAxis label="X axis" position="bottom" axisId="x-axis-id" />
        </ResponsiveChartContainer>
      </div>
    </Box>
  );
};

export default GraphComp;
