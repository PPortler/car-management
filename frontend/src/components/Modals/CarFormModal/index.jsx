import { useEffect } from "react";
import { Modal, Form, Input } from "antd";

const CarFormModal = ({
  open,
  mode = "create",
  loading = false,
  initialValues = null,
  onCancel,
  onSubmit,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (!open) return;

    if (mode === "edit" && initialValues) {
      form.setFieldsValue(initialValues);
    } else {
      form.resetFields();
    }
  }, [open, mode, initialValues]);

  const handleFinish = (values) => {
    onSubmit(values);
  };

  return (
    <Modal
      open={open}
      title={mode === "create" ? "Add Car" : "Edit Car"}
      okText={mode === "create" ? "Create" : "Update"}
      cancelText="Cancel"
      confirmLoading={loading}
      destroyOnHidden
      onCancel={onCancel}
      onOk={() => form.submit()}
    >
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item
          label="Plate Number"
          name="plate_number"
          rules={[
            {
              required: true,
              message: "Please enter plate number",
            },
          ]}
        >
          <Input placeholder="e.g. 1กก1234" />
        </Form.Item>

        <Form.Item
          label="Brand"
          name="brand"
          rules={[
            {
              required: true,
              message: "Please enter brand",
            },
          ]}
        >
          <Input placeholder="Toyota" />
        </Form.Item>

        <Form.Item
          label="Model"
          name="model"
          rules={[
            {
              required: true,
              message: "Please enter model",
            },
          ]}
        >
          <Input placeholder="Corolla Cross" />
        </Form.Item>

        <Form.Item label="Note" name="note">
          <Input.TextArea rows={4} placeholder="Additional information..." />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CarFormModal;
