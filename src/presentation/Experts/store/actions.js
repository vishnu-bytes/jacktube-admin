import {
  getStudentList,
  onSubmit,
  onDelete,
  onEdit,
} from "../../../infrastructure/student";
import { logError } from "../../common/Utils";
import { message } from "antd";
import firebase from "../../../config/api/firebase";

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
  setSearchData:
    (params) =>
    ({ setState }) => {
      setState({ searchData: params });
    },
  onfinish:
    (values, image) =>
    async ({ setState, dispatch }) => {
      const key = expertData.push().key;
      var data = {
        id: key,
        ...values,
        profileImage: image,
      };
      try {
        expertData.child(key).update(data);
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
        expertData.on("value", (snapshot) => {
          let responselist = Object.values(snapshot.val());
          console.log(responselist, "data list");
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
      setState({ editVisible: params.value });
      setState({ singleRow: params.data });
    },
  setViewVisible:
    (params) =>
    ({ setState }) => {
      setState({ viewVisible: params.value });
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
        expertData.child(params).remove();
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
