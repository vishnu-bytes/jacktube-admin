import {
  getFacultyList,
  onDelete,
  onEdit,
  onSubmit,
} from "../../../infrastructure/faculty";
import { logError } from "../../common/Utils";
import { message } from "antd";

const actions = {
  onfinish:
    (values, image) =>
    ({ setState, dispatch }) => {
      const data = values.qualification.map((q) => {
        return q.first;
      });
      const formdata = { ...values, image: image, qualification: data };
      var form_data = new FormData();
      for (var key in formdata) {
        form_data.append(key, formdata[key]);
      }
      dispatch(actions.onSubmit(form_data));
    },
  onSubmit:
    (values) =>
    async ({ setState, dispatch }) => {
      try {
        await onSubmit(values);
        dispatch(actions.getFaculty());
        dispatch(actions.setVisible(false));
      } catch (error) {
        logError(error);
      }
    },
  setFaculty:
    (params) =>
    ({ setState }) => {
      setState({ searchData: params });
    },

  getFaculty:
    () =>
    async ({ setState, dispatch }) => {
      try {
        const res = await getFacultyList();
        setState({ facultyList: res.results });
        dispatch(actions.setFaculty(res.results));
      } catch (error) {
        logError(error);
      }
    },
  setVisible:
    (params) =>
    ({ setState }) => {
      setState({ visible: params });
    },
  seteditVisible:
    (params) =>
    ({ setState }) => {
      setState({ editVisible: params.value });
      setState({ singleRow: params.data });
    },
  onEdit:
    (params) =>
    async ({ dispatch }) => {
      try {
        const data = params.qualification.map((q) => {
          return q.first;
        });
        const value = { ...params, qualification: data };
        await onSubmit(value);
        await onEdit(params);
        message.success("Succesfully Edited");
        dispatch(actions.getFaculty());
      } catch (error) {
        logError(error);
      }
    },
  onDelete:
    (params) =>
    async ({ dispatch }) => {
      try {
        await onDelete(params);
        message.success("Succesfully Deleted");
        dispatch(actions.getFaculty());
      } catch (error) {
        logError(error);
      }
    },
};

export default actions;
