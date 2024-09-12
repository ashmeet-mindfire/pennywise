import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserContext } from "@/context/userContext";
import { IUserContext } from "@/lib/types";
import { FC, useContext } from "react";

interface CategoryDropdownProps {
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
}

const CategoryDropdown: FC<CategoryDropdownProps> = ({ category, setCategory }) => {
  const { categories } = useContext(UserContext) as IUserContext;

  return (
    <Select value={category} onValueChange={(value) => setCategory(value)}>
      <SelectTrigger className="">
        <SelectValue placeholder="Select Category" />
      </SelectTrigger>
      <SelectContent>
        {categories.map((category, idx) => (
          <SelectItem value={category} key={idx}>
            {category}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CategoryDropdown;
