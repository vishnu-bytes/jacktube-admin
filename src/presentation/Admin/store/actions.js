import {
  getStudentList,
  onSubmit,
  onDelete,
  onEdit,
} from "../../../infrastructure/student";
import { logError } from "../../common/Utils";
import { message } from "antd";
import UserData from "../../../demoData/usersData.json";

const actions = {
  onSubmit:
    (values) =>
    async ({ setState, dispatch }) => {
      try {
        await onSubmit(values);
        dispatch(actions.setVisible(false));
        dispatch(actions.getStudent());
      } catch (error) {
        logError(error);
      }
    },
  setVisible:
    (params) =>
    ({ setState }) => {
      setState({ viewVisible: params.value });
      setState({ singleRow: params.data });
    },
  setVisibleCreate:
    (params) =>
    ({ setState }) => {
      console.log("done", params);
      setState({ VisibleCreate: params.value });
    },
  setVisibleEdit:
    (params) =>
    ({ setState }) => {
      console.log(params.data,"data")
      setState({ viewVisibleEdit: params.value });
      setState({ singleRow: params.data });
    },
  setSearchData:
    (params) =>
    ({ setState }) => {
      setState({ searchData: params });
    },
  onfinish:
    (values, image) =>
    ({ setState, dispatch }) => {
      const formdata = { ...values, image: image };
      var form_data = new FormData();
      for (var key in formdata) {
        form_data.append(key, formdata[key]);
      }
      dispatch(actions.onSubmit(form_data));
    },
  getStudent:
    () =>
    async ({ setState, dispatch }) => {
      try {
        const res = await getStudentList();
        // setState({ studentList: res.results });
        setState({ studentList: UserData });
        // dispatch(actions.setSearchData(res.results));
        dispatch(actions.setSearchData(UserData));
      } catch (error) {
        logError(error);
      }
    },
  onEdit:
    (params) =>
    ({ dispatch }) => {
      logError(params, "Edit value");
      dispatch(actions.getStudent());
    },
  onDelete:
    (params) =>
    async ({ dispatch }) => {
      try {
        await onDelete(params);
        message.success("Succesfully Deleted");
        dispatch(actions.getStudent());
      } catch (error) {
        logError(error);
      }
    },
};

export default actions;
