import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FC } from "react";

interface ValueDropdownProps {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  items: string[];
}

const ValueDropdown: FC<ValueDropdownProps> = ({ value, setValue, items }) => {
  return (
    <Select value={value} onValueChange={(value) => setValue(value)}>
      <SelectTrigger className="capitalize">
        <SelectValue placeholder="Select Value" className="capitalize" />
      </SelectTrigger>
      <SelectContent>
        {items.map((item) => (
          <SelectItem key={item} value={item} className="capitalize">
            {item}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default ValueDropdown;
