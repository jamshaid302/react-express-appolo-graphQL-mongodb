import "./App.css";
import { useQuery, useMutation } from "@apollo/client";
import TaskForm from "./components/form";
import TasksTable from "./components/table";
import { GET_TASKS, DELETE_TASK } from "./utils/queries";
import { todoListAtom } from "./recoil/atom";
import { useRecoilState } from "recoil";
import { useEffect, useState } from "react";

function App() {
  const {
    loading,
    error,
    data: { getTasks } = {},
    refetch,
  } = useQuery(GET_TASKS);
  const [_, setTodoList] = useRecoilState(todoListAtom);
  const [deleteTaskMutation] = useMutation(DELETE_TASK);
  const [editedData, setEditedData] = useState({});
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    setTodoList(getTasks?.data);
  }, [getTasks?.data, setTodoList]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const handleUpdate = (task) => {
    setIsEdit(true);
    setEditedData(task);
  };

  const handleDelete = async (taskId) => {
    try {
      const { data } = await deleteTaskMutation({ variables: { id: taskId } });
      if (data?.deleteTask) await refetch();
    } catch (error) {
      console.error("error", error);
    }
  };

  return (
    <div className="App">
      <TaskForm data={editedData} isEdit={isEdit} />
      <TasksTable
        data={getTasks?.data}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
      />
    </div>
  );
}

export default App;
