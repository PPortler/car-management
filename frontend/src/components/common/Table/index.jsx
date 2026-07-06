import { Table } from "antd";

const CommonTable = ({
  columns,
  dataSource,
  loading = false,
  rowKey = "id",
  size = "middle",

  pagination = false,

  current = 1,
  pageSize = 10,
  total = 0,
  onPageChange,
}) => {
  return (
    <Table
      rowKey={rowKey}
      columns={columns}
      dataSource={dataSource}
      loading={loading}
      bordered
      size={size}
      scroll={{ x: "max-content" }}
      pagination={
        pagination
          ? {
              current,
              pageSize,
              total,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} of ${total} items`,
              onChange: onPageChange,
            }
          : false
      }
    />
  );
};

export default CommonTable;