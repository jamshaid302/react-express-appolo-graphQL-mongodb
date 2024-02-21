import TodoTasksService from "../../services/todoTasksService/index.js";

const getTasks = async (req, res) => {
  try {
    const data = await TodoTasksService.getTasks(req);
    return {
      data,
      count: data?.length,
    };
  } catch (error) {
    return res.status(500).send({
      message: "Error while fetching tasks",
      error,
    });
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
    return res.status(500).send({
      message: "Error while creating task",
      error,
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    res.send("deleteTask");
  } catch (error) {
    return res.status(500).send({
      message: "Error while deleting task",
      error,
    });
  }
};

export { getTasks, createUpdateTask, deleteTask };
