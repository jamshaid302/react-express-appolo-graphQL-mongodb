import {
  getTasks,
  createUpdateTask,
  deleteTask,
} from "../../controllers/todoTasks/index.js";

const resolvers = {
  Query: {
    getTasks: async (_, args) => await getTasks(args),
  },

  Mutation: {
    createUpdateTask: async (_, args, context) => await createUpdateTask(args),
    deleteTask: async (_, { id }) => await deleteTask(id),
  },
};

export default resolvers;
