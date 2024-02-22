import { ObjectId } from "mongodb";
import { db } from "../../utility/conn.js";

const TodoTasksService = {
  async getTasks(args = {}) {
    try {
      const { where, take, skip, orderBy } = args || {};
      const tasks = await db.collection("tasks").find({}).toArray();
      return tasks;
    } catch (error) {
      return error;
    }
  },

  async createUpdateTask(data) {
    try {
      const task = await db.collection("tasks").insertOne({
        title: data?.title,
      });
      return task;
    } catch (error) {
      return error;
    }
  },

  async deleteTask(id) {
    try {
      const task = await db.collection("tasks").deleteOne({
        _id: new ObjectId(id),
      });
      return task;
    } catch (error) {
      return error;
    }
  },
};

export default TodoTasksService;
