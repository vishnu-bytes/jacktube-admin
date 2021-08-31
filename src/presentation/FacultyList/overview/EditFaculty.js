import React, { useEffect } from "react";
import { DatePicker, Form, Input, Upload } from "antd";
import propTypes from "prop-types";
import { Button } from "../../common/UI/buttons/buttons";
import { Modal } from "../../common/UI/modals/antd-modals";
import { BasicFormWrapper } from "../../common/Style/styled";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { useFacultyStore } from "../store";
import FeatherIcon from "feather-icons-react";
import moment from "moment";

function EditFaculty() {
  const [form] = Form.useForm();
  const [{ editVisible, singleRow }, { onEdit, seteditVisible }] =
    useFacultyStore();
  useEffect(() => {
    if (singleRow?.joiningDate) {
      let qua = singleRow?.qualification;
      let arrayQuali = qua?.map((q) => {
        return {
          first: q,
        };
      });
      let joiningDateTime = singleRow?.joiningDate;
      let date = joiningDateTime.split("T")[0];
      let momentDate = moment(date, "YYYY/MM/DD");
      let data = {
        ...singleRow,
        qualification: arrayQuali,
        joiningDate: momentDate,
      };
      form.setFieldsValue(data);
    }
  }, [singleRow]);

  return (
    <Modal
      type={"primary"}
      title="Edit Faculty"
      visible={editVisible}
      footer={[
        <div key="1" className="project-modal-footer">
          <Button
            size="default"
            type="primary"
            key="submit"
            htmlType="submit"
            form="createFaculty"
          >
            Update Faculty
          </Button>
          <Button
            size="default"
            type="white"
            key="back"
            outlined
            onClick={() => seteditVisible(false)}
          >
            Cancel
          </Button>
        </div>,
      ]}
      onCancel={() => seteditVisible(false)}
    >
      <div className="project-modal">
        <BasicFormWrapper>
          <Form
            form={form}
            id="createFaculty"
            name="createProject"
            onFinish={onEdit}
          >
            <Form.Item name="name" label="Name">
              <Input />
            </Form.Item>
            <Form.Item name="email" label="Email">
              <Input placeholder="example@gmail.com" />
            </Form.Item>
            <Form.Item name="phoneNumber" label="Phone Number">
              <Input />
            </Form.Item>
            <Form.Item name="password" label="Password">
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
              <DatePicker
                defaultValue={moment("2015/01/01", "YYYY/MM/DD")}
                format={"YYYY/MM/DD"}
              />
            </Form.Item>
            <Form.Item label="Student Image" name="student image">
              <Upload
                accept="image/*"
                maxCount={1}
                listType="picture"
                onChange={(info) => {
                  info.file.status = "done";
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
EditFaculty.propTypes = {
  visible: propTypes.bool.isRequired,
  onCancel: propTypes.func.isRequired,
};

export default EditFaculty;
