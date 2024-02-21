import { gql } from "@apollo/client";

export const GET_TASKS = gql`
  query GetTasks {
    # getTasks(where: { title: "task 2" }) {
    getTasks {
      data {
        _id
        title
      }
      count
    }
  }
`;

export const DELETE_TASK = gql`
  mutation DeleteTask($id: String) {
    deleteTask(id: $id)
  }
`;
