import React from "react";
import "./style.css";
import { Form, Input, Button } from "antd";
import { Formik } from "formik";
import { useRecoilState } from "recoil";
import { todoListAtom } from "../../recoil/atom";

const TaskForm = () => {
  const [_, setTodoList] = useRecoilState(todoListAtom);

  return (
    <div className="container">
      <h1>Add Tasks</h1>
      <Formik
        initialValues={{ task: "" }}
        onSubmit={async (values, { resetForm }) => {
          setTodoList((prev) => [...prev, { task: values?.task }]);
          resetForm();
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
                value={formik.values.task}
              />
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit">Add</Button>
            </Form.Item>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default TaskForm;
