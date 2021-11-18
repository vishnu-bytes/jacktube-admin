import { onDelete, onEdit } from "../../../infrastructure/student";
import { logError } from "../../common/Utils";
import { message } from "antd";
import firebase from "../../../config/api/firebase";

const categoryData = firebase.database().ref("Category");

const actions = {
  setVisible:
    (params) =>
    ({ setState }) => {
      setState({ visible: params });
    },
  setEditVisible:
    (params) =>
    ({ setState }) => {
      setState({ editVisible: params.value });
      setState({ singleRow: params.data });
    },
  setSearchData:
    (params) =>
    ({ setState }) => {
      setState({ searchData: params });
    },
  onfinish:
    (values, form) =>
    async ({ setState, dispatch }) => {
      setState({ loader: true });
      const key = categoryData.push().key;
      var data = {
        category: values.category,
        id: key,
      };
      try {
        categoryData.child(key).update(data);
        form.resetFields();
        setState({ loader: false });
        dispatch(actions.setVisible(false));
        dispatch(actions.getStudent());
      } catch (error) {
        setState({ loader: false });
        logError(error);
      }
    },
  getStudent:
    () =>
    async ({ setState, dispatch }) => {
      try {
        categoryData.on("value", (snapshot) => {
          if (snapshot.val() === null) {
            setState({ studentList: [] });
            dispatch(actions.setSearchData([]));
          } else {
            let responselist = Object.values(snapshot.val());
            setState({ studentList: responselist });
            dispatch(actions.setSearchData(responselist));
          }
        });
      } catch (error) {
        logError(error);
      }
    },

  onEdit:
    (params) =>
    async ({ dispatch }) => {
      console.log(params, "params");
      try {
        categoryData.child(params.initial.id).update(params.values);
        dispatch(actions.setEditVisible(false));
      } catch (error) {
        logError(error);
      }
      logError(params, "Edit value");
      dispatch(actions.getStudent());
    },
  onDelete:
    (params) =>
    async ({ dispatch }) => {
      try {
        categoryData.child(params).remove();
      } catch {
        logError(params, "Edit value");
      }
    },
};

export default actions;
