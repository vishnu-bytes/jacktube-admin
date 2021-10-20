import {
  getStudentList,
  onSubmit,
  onDelete,
  onEdit,
} from "../../../infrastructure/student";
import { logError } from "../../common/Utils";
import { message } from "antd";
import UserData from "../../../demoData/usersData.json";
import firebase from "../../../config/api/firebase"

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
        firebase.database().ref(`/users`).on('value', snapshot => {
          if(snapshot.val()===null){
            setState({studentList:[]});
            dispatch(actions.setSearchData([]))
          }else{
            let responselist = Object.values(snapshot.val())
            console.log(responselist,"firabse")
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
    switchChange:
    (status, id) =>
      async ({ setState }) => {
        try {
          console.log(status, "status")
          firebase.database().ref(`/users`).child(id).update({ status: status });
        } catch (error) {

        }
      },
};

export default actions;
