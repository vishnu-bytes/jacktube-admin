import {
  getStudentList,
  onSubmit,
  onDelete,
  onEdit,
} from "../../../../infrastructure/student";
import { logError } from "../../../common/Utils";
import { message } from "antd";

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
    setVisibleCreate:
    (params) =>
    ({ setState }) => {
      console.log("done", params);
      setState({ VisibleCreate: params.value });
    },
    setVisible:
    (params) =>
    ({ setState }) => {
      console.log("object",params)
      setState({ viewVisible: params });
    },
  setVisiblePrice:
    (params) =>
    ({ setState }) => {
      console.log("object")
      setState({ visiblePrice: params },()=>{
        console.log("checking",params)
      });
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
        setState({ studentList: res.results });
        dispatch(actions.setSearchData(res.results));
      } catch (error) {
        logError(error);
      }
    },
  setEditVisible:
    (params) =>
    ({ setState }) => {
      console.log(params.value,"valueee")
      setState({ editVisible: params.value });
      setState({ singleRow: params.data });
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
  getCourse:
    (page) =>
    async ({ setState }) => {
      try {
        const res = await getStudentList(page);
        setState({ course: res });
        setState({ pageNumber: page });
      } catch (error) {
        logError(error);
      }
    },
};

export default actions;
