import React, { useState } from "react";
import { DatePicker, Form, Input, Upload } from "antd";
import propTypes from "prop-types";
import { Button } from "../../common/UI/buttons/buttons";
import { Modal } from "../../common/UI/modals/antd-modals";
import { BasicFormWrapper } from "../../common/Style/styled";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { useFacultyStore } from "../store";
import FeatherIcon from "feather-icons-react";

function CreateFaculty() {
  const [form] = Form.useForm();
  const [{ visible }, { onfinish, setVisible }] = useFacultyStore();
  const [image, setimage] = useState({});
  return (
    <Modal
      type={"primary"}
      title="Create Faculty"
      visible={visible}
      footer={[
        <div key="1" className="project-modal-footer">
          <Button
            size="default"
            type="primary"
            key="submit"
            htmlType="submit"
            form="createFaculty"
          >
            Add New Faculty
          </Button>
          <Button
            size="default"
            type="white"
            key="back"
            outlined
            onClick={() => setVisible(false)}
          >
            Cancel
          </Button>
        </div>,
      ]}
      onCancel={() => setVisible(false)}
    >
      <div className="project-modal">
        <BasicFormWrapper>
          <Form
            form={form}
            id="createFaculty"
            name="createProject"
            onFinish={(values) => onfinish(values, image)}
          >
            <Form.Item name="name" label="Name">
              <Input />
            </Form.Item>
            <Form.Item name="email" label="Email">
              <Input placeholder="example@gmail.com" />
            </Form.Item>
            <Form.Item
              name="phoneNumber"
              label="Phone Number"
              rules={[
                {
                  required: true,
                  message: "Enter faculty number!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: "Enter student password!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item name="expertise" label="Expertise">
              <Input />
            </Form.Item>

            <Form.List name="qualification">
              {(fields, { add, remove }) => (
                <>
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      block
                      icon={<PlusOutlined />}
                    >
                      Add Qualification
                    </Button>
                  </Form.Item>
                  {fields.map(({ key, name, fieldKey, ...restField }) => (
                    <div
                      key={key}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        width: "100%",
                      }}
                      align="baseline"
                    >
                      <Form.Item
                        style={{
                          width: "95%",
                        }}
                        {...restField}
                        name={[name, "first"]}
                        fieldKey={[fieldKey, "first"]}
                        rules={[
                          { required: true, message: "Missing first name" },
                        ]}
                      >
                        <Input placeholder="Enter Qualification" />
                      </Form.Item>
                      <div
                        style={{
                          paddingTop: "10px",
                          marginLeft: "10px",
                          height: "58px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <MinusCircleOutlined
                          onClick={() => remove(name)}
                          style={{ fontSize: "20px" }}
                        />
                      </div>
                    </div>
                  ))}
                </>
              )}
            </Form.List>
            <Form.Item name="joiningDate" label="Joining Date">
              <DatePicker format={"YYYY/MM/DD"} />
            </Form.Item>
            <Form.Item label="Student Image" name="image">
              <Upload
                accept="image/*"
                maxCount={1}
                listType="picture"
                onChange={(info) => {
                  info.file.status = "done";
                  setimage(info.file.originFileObj);
                  console.log(info.file.originFileObj, "image");
                }}
              >
                <Button type="primary">
                  <FeatherIcon icon="camera" size={16} />
                  Upload Image
                </Button>
              </Upload>
            </Form.Item>
          </Form>
        </BasicFormWrapper>
      </div>
    </Modal>
  );
}
CreateFaculty.propTypes = {
  visible: propTypes.bool.isRequired,
  onCancel: propTypes.func.isRequired,
};

export default CreateFaculty;
