import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FC } from "react";

interface TimePeriodDropdownProps {
  timePeriod: string;
  setTimePeriod: React.Dispatch<React.SetStateAction<string>>;
}

const TimePeriodDropdown: FC<TimePeriodDropdownProps> = ({ timePeriod, setTimePeriod }) => {
  return (
    <Select value={timePeriod} onValueChange={(value) => setTimePeriod(value)}>
      <SelectTrigger className="">
        <SelectValue placeholder="Select Time Period" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="year">Year</SelectItem>
        <SelectItem value="month">Month</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default TimePeriodDropdown;
