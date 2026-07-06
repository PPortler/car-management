import { Modal } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";

export const showConfirm = ({
  title,
  content,
  icon = <ExclamationCircleFilled style={{ color: "#fa541c" }} />,

  okText = "Confirm",
  cancelText = "Cancel",

  okType = "primary",

  centered = true,

  onOk,
  onCancel,
}) => {
  Modal.confirm({
    title,
    content,
    icon,

    okText,
    cancelText,
    okType,

    centered,

    onOk,
    onCancel,
  });
};