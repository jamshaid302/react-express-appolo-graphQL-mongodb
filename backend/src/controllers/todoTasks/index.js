import TodoTasksService from "../../services/todoTasksService/index.js";
import { ObjectId } from "mongodb";

const getTasks = async (args = {}) => {
  try {
    const data = await TodoTasksService.getTasks(args);
    return {
      data,
      count: data?.length,
    };
  } catch (error) {
    console.error("error", error);
    throw new Error("Error while fetching tasks");
  }
};

const createUpdateTask = async ({ data = {} }) => {
  try {
    const res = await TodoTasksService.createUpdateTask(data);
    const insertedTask = await TodoTasksService.getTasks({
      where: { _id: new ObjectId(res?.insertedId) },
    });
    return {
      _id: insertedTask[0]?._id,
      title: insertedTask[0]?.title,
    };
  } catch (error) {
    console.error("error", error);
    throw new Error("Error while creating task");
  }
};

const deleteTask = async (id) => {
  try {
    const data = await TodoTasksService.deleteTask(id);
    if (data?.acknowledged) return "Task delete Successfully";
  } catch (error) {
    console.error("error", error);
    throw new Error("Error while deleting task");
  }
};

export { getTasks, createUpdateTask, deleteTask };
