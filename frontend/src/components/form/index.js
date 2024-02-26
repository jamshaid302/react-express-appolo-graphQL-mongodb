import React from "react";
import "./style.css";
import { Form, Input, Button } from "antd";
import { Formik } from "formik";
import { CREATE_UPDATE_TASK, GET_TASKS } from "../../utils/queries";
import { useMutation, useQuery } from "@apollo/client";

const TaskForm = ({ data = {}, isEdit = false }) => {
  const [createUpdateTask] = useMutation(CREATE_UPDATE_TASK);
  const { refetch } = useQuery(GET_TASKS);

  const initialValues = {
    task: isEdit ? data?.title : "",
  };

  return (
    <div className="container">
      <h1>{isEdit ? "Edit Task" : "Add Tasks"}</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values, { resetForm }) => {
          try {
            const formObj = {
              variables: { data: { title: values?.task } },
            };

            const task = isEdit
              ? await createUpdateTask({
                  variables: {
                    data: {
                      _id: data?._id,
                      title: values?.task,
                    },
                  },
                })
              : await createUpdateTask(formObj);

            if (task?.data?.createUpdateTask?._id) {
              resetForm();
              refetch();
            }
          } catch (error) {
            console.error("error", error);
          }
        }}
      >
        {(formik) => (
          <Form layout="inline" className="form" onFinish={formik.handleSubmit}>
            <Form.Item name="task">
              <Input
                type="text"
                placeholder="Add a task"
                name="task"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik?.values?.task}
                required
              />
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit">{isEdit ? "Update" : "Add"}</Button>
            </Form.Item>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default TaskForm;
