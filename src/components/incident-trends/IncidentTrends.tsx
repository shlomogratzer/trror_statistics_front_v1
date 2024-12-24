import { PieValueType } from "@mui/x-charts";
import { MakeOptional } from "@mui/x-charts/internals";
import useFetch from "../../hooks/useFetch";
import React, { useContext } from "react";
import SelectComp from "../select-comp/SelectComp";
import { Button, InputBase, InputLabel } from "@mui/material";
import { TAttackContext } from "../../context/ContextProvider";
interface Props {
  typeQuery: string;
  query: string;
  startYear: string;
  endYear: string;
  limit: number;
  page: number;
  setData: React.Dispatch<
    React.SetStateAction<MakeOptional<PieValueType, "id">[]>
  >;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  setTypeQuery: React.Dispatch<React.SetStateAction<string>>;
  setStartYear: React.Dispatch<React.SetStateAction<string>>;
  setEndYear: React.Dispatch<React.SetStateAction<string>>;
}
const IncidentTrends = ({
  typeQuery,
  query,
  startYear,
  endYear,
  limit,
  page,
  setQuery,
  setStartYear,
  setEndYear,
  setTypeQuery,
}: Props) => {
  const { getFatch } = useFetch("https://trror-statistics-v1.onrender.com");
  const AttackListContext = useContext(TAttackContext);
  const queryHndler = async () => {
    if (typeQuery === "yearly" && query) {
      const data = await getFatch(
        `/api/analysis/incident-trends?iyear=${query}&limit=${limit}&page=${page}`
      );

      AttackListContext?.setTAttacks(data.tAttak);
    } else if (typeQuery === "interval" && startYear && endYear) {
      const data = await getFatch(
        `/api/analysis/incident-trends?start=${startYear}&end=${endYear}&limit=${limit}&page=${page}`
      );
      AttackListContext?.setTAttacks(data.tAttak);
    } else if (typeQuery === "last 10 years" && query) {
      const data = await getFatch(
        `/api/analysis/incident-trends?last=${10}&limit=${limit}&page=${page}`
      );
      console.log(data);

      AttackListContext?.setTAttacks(data.tAttak);
    } else if (typeQuery === "last 5 years" && query) {
      const data = await getFatch(
        `/api/analysis/incident-trends?last=${5}&limit=${limit}&page=${page}`
      );
      console.log(data);

      AttackListContext?.setTAttacks(data.tAttak);
    }
  };

  return (
    <>
      <SelectComp
        lable="interval"
        value={typeQuery}
        setFunc={setTypeQuery}
        queris={["yearly", "interval", "last 10 years", "last 5 years"]}
      />
      {typeQuery === "yearly" && (
        <>
          <InputLabel sx={{ marginLeft: "10px" }}>{typeQuery}</InputLabel>
          <InputBase
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setQuery(e.target.value)
            }
            type="number"
            sx={{
              border: "1px solid black",
              borderRadius: "8px",
              margin: "10px",
              padding: "8px",
            }}
          />
        </>
      )}
      {typeQuery === "interval" && (
        <>
          <InputLabel sx={{ marginLeft: "10px" }}>year to start</InputLabel>
          <InputBase
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setStartYear(e.target.value)
            }
            type="number"
            sx={{
              border: "1px solid black",
              borderRadius: "8px",
              margin: "10px",
              padding: "8px",
            }}
          />
          <InputLabel sx={{ marginLeft: "10px" }}>year to end</InputLabel>
          <InputBase
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEndYear(e.target.value)
            }
            type="number"
            sx={{
              border: "1px solid black",
              borderRadius: "8px",
              margin: "10px",
              padding: "8px",
            }}
          />
        </>
      )}
      <Button onClick={queryHndler} color="inherit" variant="outlined">
        send
      </Button>
      {/* <GraphComp options={data} /> */}
    </>
  );
};

export default IncidentTrends;
