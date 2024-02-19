import React from "react";
import { Table } from "antd";
import { useRecoilState, useRecoilValue } from "recoil";
import { getTasks, todoListAtom } from "../../recoil/atom";

const TasksTable = () => {
  const tasks = useRecoilState(getTasks);
  // const todoList = useRecoilValue(todoListAtom);

  const columns = [
    {
      title: "Todo Tasks",
      dataIndex: "task",
      key: "task",
    },
    {
      title: "Actions",
    },
  ];

  return (
    <div>
      <Table columns={columns} dataSource={tasks[0]} />
    </div>
  );
};

export default TasksTable;
