import "./App.css";
import { useQuery, gql } from "@apollo/client";
import TaskForm from "./components/form";
import TasksTable from "./components/table";

const GET_LOCATIONS = gql`
  query GetLocations {
    locations {
      id
      name
      description
      photo
    }
  }
`;

function App() {
  // const { loading, error, data } = useQuery(GET_LOCATIONS);

  return (
    <div className="App">
      <TaskForm />
      <TasksTable />
    </div>
  );
}

export default App;
