import {
  getStudentList,
  onSubmit,
  onDelete,
  onEdit,
} from "../../../infrastructure/student";
import { logError } from "../../common/Utils";
import { message } from "antd";
import WebinarData from "../../../demoData/webinar.json";
import firebase from "../../../config/api/firebase";

const webinarData = firebase.database().ref("webinar");
const categoryData = firebase.database().ref("Category");

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
      setState({ visible: params });
    },
  setVisiblePrice:
    (params) =>
    ({ setState }) => {
      setState({ visiblePrice: params }, () => {});
    },
  setViewVisible:
    (params) =>
    ({ setState }) => {
      setState({ viewVisible: params.value, singleRow: params.data });
    },
  setSearchData:
    (params) =>
    ({ setState }) => {
      setState({ searchData: params });
    },
  onfinish:
    (values, image) =>
    ({ setState, dispatch }) => {
      console.log(values, "values");
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
        // const res = await getStudentList();
        setState({ studentList: WebinarData });
        dispatch(actions.setSearchData(WebinarData));
      } catch (error) {
        logError(error);
      }
    },
  getCategory:
    () =>
    async ({ setState, dispatch }) => {
      try {
        categoryData.on("value", (snapshot) => {
          let responselist = Object.values(snapshot.val());
          console.log(responselist,"category data")
          setState({ categoryList: responselist });
        });
      } catch (error) {
        logError(error);
      }
    },
  setEditVisible:
    (params) =>
    ({ setState }) => {
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
