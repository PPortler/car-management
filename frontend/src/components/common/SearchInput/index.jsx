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
      prefix={<Search size={18} className="text-slate-400 mr-2" />}
      size="large"
    />
  );
};

export default SearchInput;