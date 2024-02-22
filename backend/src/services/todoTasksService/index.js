import { ObjectId } from "mongodb";
import { db } from "../../utility/conn.js";

const TodoTasksService = {
  async getTasks(args = {}) {
    try {
      const { where, take, skip, orderBy } = args || {};
      const tasks = await db
        .collection("tasks")
        .find({
          // _id: new ObjectId("65d45f3323f5edb5da1c1aad"),
          title: where?.title,
        })
        .toArray();
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
};

export default TodoTasksService;
