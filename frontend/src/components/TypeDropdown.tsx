import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FC } from "react";

interface TypeDropdownProps {
  type: string;
  setType: React.Dispatch<React.SetStateAction<string>>;
}

const TypeDropdown: FC<TypeDropdownProps> = ({ type, setType }) => {
  return (
    <Select value={type} onValueChange={(value) => setType(value)}>
      <SelectTrigger className="">
        <SelectValue placeholder="Select Type" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="expense">Expense</SelectItem>
        <SelectItem value="income">Income</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default TypeDropdown;
