import "./App.css";
import { useQuery, useMutation } from "@apollo/client";
import TaskForm from "./components/form";
import TasksTable from "./components/table";
import { GET_TASKS, DELETE_TASK } from "./utils/queries";

function App() {
  const {
    loading,
    error,
    data: { getTasks } = {},
    refetch,
  } = useQuery(GET_TASKS);
  const [deleteTaskMutation] = useMutation(DELETE_TASK);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const handleUpdate = (task) => {
    console.log("Update task with ID:", task);
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
      <TaskForm />
      <TasksTable
        data={getTasks?.data}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
      />
    </div>
  );
}

export default App;
