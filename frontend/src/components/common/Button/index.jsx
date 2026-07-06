import { Button } from "antd";

const CommonButton = ({
  children,
  loading = false,
  disabled = false,
  type = "default",
  htmlType = "button",
  danger = false,
  ghost = false,
  block = false,
  icon,
  onClick,
  className = "",
  ...props
}) => {
  
  return (
    <Button
      type={type}
      htmlType={htmlType}
      loading={loading}
      disabled={disabled}
      danger={danger}
      ghost={ghost}
      block={block}
      icon={icon}
      onClick={onClick}
      className={className}
      {...props}
    >
      {children}
    </Button>
  );
};

export default CommonButton;