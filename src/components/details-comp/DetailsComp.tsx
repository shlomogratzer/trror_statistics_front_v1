import React, { useEffect } from "react";
import Styles from "./style.module.css";
import useFetch from "../../hooks/useFetch";
import SelectComp from "../select-comp/SelectComp";
import PieComp from "../pie-comp/PieComp";
import { MakeOptional } from "@mui/x-charts/internals";
import { PieValueType } from "@mui/x-charts";
import { IAvgAttack, ISAttack } from "../../context/contextModel";
import IncidentTrends from "../incident-trends/IncidentTrends";
const DetailsComp = () => {
  const [data, setData] = React.useState<MakeOptional<PieValueType, "id">[]>(
    []
  );
  const [mainQueris, setMainQueris] = React.useState<string>("");
  const [typeAttacks, setTypeAttacks] = React.useState<string>("");
  const [region, setRegion] = React.useState<string>("");
  const [options, setOptions] = React.useState<ISAttack[] | IAvgAttack[]>([]);
  const [types, setTypes] = React.useState<string>("");
  const [typeQuery, setTypeQuery] = React.useState<string>("");
  const [query, setQuery] = React.useState<string>("");
  const [startYear, setStartYear] = React.useState<string>("");
  const [endYear, setEndYear] = React.useState<string>("");
  const [limit, _setLimit] = React.useState<number>(50);
  const [page, _setPage] = React.useState<number>(1);
  const { getFatch } = useFetch("https://trror-statistics-v1.onrender.com");

  const mainQuerys = [
    "/api/analysis/deadliest-attack-types/",
    "/api/analysis/highest-casualty-regions/",
    "/api/analysis/incident-trends/",
    "/api/relationships/top-groups/",
    "/api/relationships/groups-by-year/",
    "/api/relationships/deadliest-regions/",
  ];

  const getTAByType = (data: ISAttack[]) => {
    console.log(data);

    if (!data) {
      return;
    }
    const newData = data.map((option, index) => ({
      id: index,
      label: option._id,
      value: option.sumCasualties,
    }));

    setData(newData);
  };

  const getDataByRegion = (data: IAvgAttack[]) => {
    console.log(data);
    if (!data) {
      return;
    }
    const newData = data.map((option, index) => ({
      id: index,
      label: option._id,
      value: option.AverageCasualties,
    }));
    setData(newData);
  };

  const hendleMianQuery = async () => {
    if (mainQueris === mainQuerys[0]) {
      const data = await getFatch(mainQuerys[0]);
      getTAByType(data.tAttak);
      setOptions(data.tAttak);
      setTypes("deadliest-attack-types");
    } else if (mainQueris === mainQuerys[1]) {
      const data = await getFatch(mainQuerys[1]);
      getDataByRegion(data.tAttak);
      setOptions(data.tAttak);
      setTypes("highest-casualty-regions");
    } else if (mainQueris === mainQuerys[2]) {
      setTypes("incident-trends");
      // } else if (mainQueris === mainQuerys[3]) {
      //   const data = await getFatch(mainQuerys[3]);
      //   setData(data);
      // } else if (mainQueris === mainQuerys[4]) {
      //   const data = await getFatch(mainQuerys[4]);
      //   setData(data);
      // } else if (mainQueris === mainQuerys[5]) {
      //   const data = await getFatch(mainQuerys[5]);
      //   setData(data);
    }
  };
  useEffect(() => {
    console.log(data);
  }, [data]);

  useEffect(() => {
    setData([]);
    hendleMianQuery();
    console.log(mainQueris);
  }, [mainQueris]);
  return (
    <div className={Styles.detailsComp}>
      <SelectComp
        value={mainQueris}
        setFunc={setMainQueris}
        queris={mainQuerys}
        lable="Main Query"
      />
      {data.length > 0 && types === "deadliest-attack-types" && (
        <>
          <SelectComp
            lable="Type Attack"
            value={typeAttacks}
            setFunc={setTypeAttacks}
            options={options}
          />
          <PieComp data={data} />
        </>
      )}
      {data.length > 0 && types === "highest-casualty-regions" && (
        <>
          <SelectComp
            lable="High Casualty Regions"
            value={region}
            setFunc={setRegion}
            options={options}
          />
          <PieComp data={data} />
        </>
      )}
      {types === "incident-trends" && (
        <IncidentTrends
          typeQuery={typeQuery}
          query={query}
          startYear={startYear}
          endYear={endYear}
          limit={limit}
          page={page}
          setData={setData}
          setQuery={setQuery}
          setStartYear={setStartYear}
          setEndYear={setEndYear}
          setTypeQuery={setTypeQuery}
        />
      )}
    </div>
  );
};

export default DetailsComp;
