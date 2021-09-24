import {
  getStudentList,
  onSubmit,
  onDelete,
  onEdit,
} from "../../../infrastructure/student";
import { logError } from "../../common/Utils";
import { message } from "antd";
import UserData from "../../../demoData/usersData.json";
import firebase from "../../../config/api/firebase";
import { users } from "../../common/Assets/Icons";


const adminData = firebase.database().ref("/admin");

const auth = firebase.auth();
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
        console.log(params.data, "data")
        setState({ viewVisibleEdit: params.value });
        setState({ singleRow: params.data });
      },
  setSearchData:
    (params) =>
      ({ setState }) => {
        setState({ searchData: params });
      },
  onfinish:
    (values) =>
      async ({ setState, dispatch }) => {
        const formdata = { ...values };
        const res = await auth.createUserWithEmailAndPassword(values.email, values.password);
        console.log("userId",res.user)
        const user = res.user.uid
        adminData.child(user).update({email:values.email,id:users})
        // var form_data = new FormData();
        // for (var key in formdata) {
        //   form_data.append(key, formdata[key]);
        // }
        // dispatch(actions.onSubmit(form_data));
      },
  getStudent:
    () =>
      async ({ setState, dispatch }) => {
        try {
          adminData.on("value", (snapshot) => {
            console.log("object", snapshot.val())
            if (snapshot.val() !== null) {
              let responselist = Object.values(snapshot.val());
              console.log(responselist, "data list");
              setState({ studentList: responselist });
              dispatch(actions.setSearchData(responselist));
            } else if (snapshot.val() === null) {
              setState({ studentList: [] });
              dispatch(actions.setSearchData([]));
            }
          });
          // console.log("admin in",adminData)
          // const snapshot =  adminData.on("value");
          // console.log("admin snapshot",snapshot)
          // if (snapshot.val() === null) {
          //   setState({ studentList: [] });
          //   dispatch(actions.setSearchData([]));
          // }else{
          //  let adminList= Object.values(snapshot.val());
          // console.log("admin",adminList)
          
          //  setState({ studentList: adminList });
          
          //  dispatch(actions.setSearchData(adminList));
          // }
         
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
    (id) =>
      async ({ dispatch }) => {
        try {
          // await onDelete(params);
        // const user=auth.currentUser.providerData);
        // console.log("user",user)
          message.success("Succesfully Deleted");
          dispatch(actions.getStudent());
        } catch (error) {
          logError(error);
        }
      },
};

export default actions;
