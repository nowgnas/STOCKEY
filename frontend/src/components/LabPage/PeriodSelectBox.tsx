import { memo } from 'react';
import { useRecoilState } from "recoil";
import { selectedLabPeriodState } from "../../stores/LaboratoryAtoms";

import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import styled from "styled-components";

const PeriodSelectBox = () => {
  const [period, setPeriod] = useRecoilState(selectedLabPeriodState)
  const selectItem = [
    { value: 1, text: "지난 1개월" },
    { value: 3, text: "지난 3개월" },
    { value: 6, text: "지난 6개월" },
  ];


  const handleChange= (e: SelectChangeEvent<number>) => {
    e.preventDefault();
    if (typeof e.target.value == "number") {
      setPeriod(e.target.value);
    }
  }

  return (
    <FormWrapper>
      <InputLabel id="period-select-label" sx={{ fontSize: "1.3rem" }}>
        기간
      </InputLabel>
      <Select
        labelId="period-select-label"
        label="기간"
        value={period}
        onChange={handleChange}
        sx={{ fontSize: "1.3rem" }}
      >
        {selectItem.map((item) => {
          return (
            <MenuItem key={item.value} value={item.value} sx={{ fontSize: "1.3rem" }}>
              {item.text}
            </MenuItem>
          );
        })}
      </Select>
    </FormWrapper>
  );
};

export default memo(PeriodSelectBox);

const FormWrapper = styled(FormControl)({
  width: "120px",
});
