import { ObjectId } from "mongodb";
import { db } from "../../utility/conn.js";

const TodoTasksService = {
  async getTasks(args = {}) {
    try {
      const { where, take, skip, orderBy } = args || {};
      const tasks = await db.collection("tasks").find(where).toArray();
      return tasks;
    } catch (error) {
      return error;
    }
  },

  async getTaskByID(id = "") {
    try {
      const task = await db
        .collection("tasks")
        .find({
          _id: new ObjectId(id),
        })
        .toArray();
      return task;
    } catch (error) {
      return error;
    }
  },

  async createUpdateTask(data) {
    try {
      const { _id: id } = data || {};
      let task;
      if (!id) {
        task = await db.collection("tasks").insertOne({
          title: data?.title,
        });
      } else {
        task = await db.collection("tasks").updateOne(
          { _id: new ObjectId(id) },
          {
            $set: {
              title: data?.title,
            },
          },
          {
            upsert: true,
          }
        );
      }

      return task?.acknowledged && id
        ? {
            insertedId: id,
          }
        : task;
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
