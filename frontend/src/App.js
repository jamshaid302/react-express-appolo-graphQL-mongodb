import "./App.css";
import { useQuery, gql } from "@apollo/client";
import TaskForm from "./components/form";
import TasksTable from "./components/table";

const GET_TASKS = gql`
  query GetTasks {
    getTasks(where: { title: "task 2" }) {
      data {
        _id
        title
      }
      count
    }
  }
`;

function App() {
  const { loading, error, data: { getTasks } = {} } = useQuery(GET_TASKS);
  console.log("------", getTasks);

  return (
    <div className="App">
      <TaskForm />
      <TasksTable />
    </div>
  );
}

export default App;
