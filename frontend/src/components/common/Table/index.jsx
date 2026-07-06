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
    <div className="overflow-hidden rounded-xl border border-slate-100 bg-white">
      <Table
        rowKey={rowKey}
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        bordered={false}
        size={size}
        scroll={{ x: "max-content" }}
        className="custom-table"
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
                className: "!px-6 !py-4 border-t border-slate-100 !m-0 bg-slate-50/50",
              }
            : false
        }
      />
    </div>
  );
};

export default CommonTable;