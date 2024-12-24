import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { MakeOptional } from "@mui/x-charts/internals";
import { PieValueType } from "@mui/x-charts";

interface Props {
  data: MakeOptional<PieValueType, "id">[];
}
const PieComp = (props: Props) => {
  React.useEffect(() => {
    console.log(props.data);
  }, [props.data]);
  return (
    <PieChart
      series={[
        {
          data: props.data,
          //    [
          //     { id: 0, value: 10, label: "series A" },
          //     { id: 1, value: 15, label: "series B" },
          //     { id: 2, value: 20, label: "series C" },
          //     { id: 3, value: 20, label: "series t" },
          //   ],
        },
      ]}
      width={500}
      height={400}
    />
  );
};

export default PieComp;
