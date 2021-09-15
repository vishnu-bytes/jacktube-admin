import {
  getStudentList,
  onSubmit,
  onDelete,
  onEdit,
} from "../../../../infrastructure/student";
import { logError } from "../../../common/Utils";
import { message } from "antd";
import firebase from "../../../../config/api/firebase";

const subscriptionData = firebase.database().ref("subscription");

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
      console.log("object", params);
      setState({ viewVisible: params });
    },
  setVisiblePrice:
    (params) =>
    ({ setState }) => {
      console.log("object");
      setState({ visiblePrice: params }, () => {
        console.log("checking", params);
      });
    },
  setSearchData:
    (params) =>
    ({ setState }) => {
      setState({ searchData: params });
    },
  onfinish:
    (values, web, one, options) =>
    async ({ setState, dispatch }) => {
      const key = subscriptionData.push().key;
      var data = {
        values: values,
        webinar: web,
        oneonone: one,
        options: options,
        id: key,
      };
      try {
        subscriptionData.child(key).update(data);
        dispatch(actions.setVisible(false));
        dispatch(actions.getStudent());
      } catch (error) {
        logError(error);
      }
    },
  getStudent:
    () =>
    async ({ setState, dispatch }) => {
      try {
        let responselist;
        subscriptionData.on("value", (snapshot) => {
          responselist = Object.values(snapshot.val());
          console.log(responselist, "userlist");
          setState({ studentList: responselist });
          dispatch(actions.setSearchData(responselist));
        });
      } catch (error) {
        logError(error);
      }
    },
  setEditVisible:
    (params) =>
    ({ setState }) => {
      console.log(params.value, "valueee");
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
      console.log(params,"params")
      try {
        subscriptionData.child(params).remove();
        dispatch(actions.getStudent());
      } catch {
        logError(params, "Edit value");
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
