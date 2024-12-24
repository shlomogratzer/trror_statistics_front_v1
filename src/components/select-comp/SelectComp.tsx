import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { IAvgAttack, ISAttack } from "../../context/contextModel";

interface SelectCompProps {
  options?: ISAttack[] | IAvgAttack[];
  queris?: string[];
  lable: string;
  value: string | undefined;
  setFunc: (any: string) => void;
}
const SelectComp = (props: SelectCompProps) => {
  const handleChange = (event: SelectChangeEvent) => {
    props.setFunc(event.target.value as string);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{props.lable}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          // id="demo-simple-select"
          value={props.value}
          label={props.lable}
          onChange={handleChange}
        >
          {props.options &&
            props.options.map((option) => (
              <MenuItem value={option._id}>{option._id}</MenuItem>
            ))}
          {props.queris &&
            props.queris.map((option) => (
              <MenuItem value={option}>{option}</MenuItem>
            ))}
          <MenuItem value={"null"}>null</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default SelectComp;
