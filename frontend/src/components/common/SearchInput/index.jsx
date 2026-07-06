import { Input } from "antd";
import { Search } from "lucide-react";

const SearchInput = ({
  value,
  onChange,
  placeholder = "Search...",
}) => {
  return (
    <Input
      allowClear
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      prefix={<Search size={16} />}
      size="large"
      className="w-full"
    />
  );
};

export default SearchInput;