import React from "react";
import { Button, Popconfirm, Table } from "antd";
import { useRecoilState, useRecoilValue } from "recoil";
import { getTasks, todoListAtom } from "../../recoil/atom";

const TasksTable = ({ data, handleDelete, handleUpdate }) => {
  const tasks = useRecoilState(getTasks);
  // const todoList = useRecoilValue(todoListAtom);

  const columns = [
    {
      title: "Todo Tasks",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Actions",
      render: (text, record) => (
        <span>
          {/* Add a button or link for updating the task */}
          <Button type="primary" onClick={() => handleUpdate(record)}>
            Update
          </Button>

          {/* Add a popconfirm for deleting the task */}
          <Popconfirm
            title="Are you sure to delete this task?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button style={{ marginLeft: 8 }} type="primary" danger>
              Delete
            </Button>
          </Popconfirm>
        </span>
      ),
    },
  ];

  return (
    <div>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default TasksTable;
