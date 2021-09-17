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
const expertData = firebase.database().ref("/expert");

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
      setState({ visiblePrice: params },);
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
    (values, date, time, price) =>
    async ({ setState, dispatch }) => {
      console.log(values, date, time, price, "values check");

      values.time=time;
      values.startDate=date;
      values.price=price;
      console.log(values, "values");
      // const key = webinarData.push().key;
      // var data = {
      //   id: key,
      // };
      // try {
      //   webinarData.child(key).update(data);
      //   dispatch(actions.setVisible(false));
      //   dispatch(actions.getStudent());
      // } catch (error) {
      //   logError(error);
      // }
    },
  onAddPrice:
    (params) =>
    async ({ setState, dispatch }) => {
      setState({ price: params.price });
      dispatch(actions.setVisiblePrice(false));
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
          setState({ categoryList: responselist });
        });
      } catch (error) {
        logError(error);
      }
    },
  getExperts:
    () =>
    async ({ setState, dispatch }) => {
      try {
        expertData.on("value", (snapshot) => {
          let responselist = Object.values(snapshot.val());
          setState({ expertList: responselist });
          console.log(responselist, "expert data2");
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
