import TodoTasksService from "../../services/todoTasksService/index.js";

const getTasks = async (req, res) => {
  try {
    const data = await TodoTasksService.getTasks();
    return {
      data,
      count: data?.length,
    };
  } catch (error) {
    console.error("error", error);
    throw new Error("Error while fetching tasks");
  }
};

const createUpdateTask = async (req, res) => {
  try {
    const data = await TodoTasksService.createUpdateTask(req?.body);
    return res.status(200).send({
      message: "Task Created",
      data,
    });
  } catch (error) {
    console.error("error", error);
    throw new Error("Error while creating task");
  }
};

const deleteTask = async (req, res) => {
  try {
    const data = await TodoTasksService.deleteTask(req);
    if (data?.acknowledged) return "Task delete Successfully";
  } catch (error) {
    console.error("error", error);
    throw new Error("Error while deleting task");
  }
};

export { getTasks, createUpdateTask, deleteTask };
