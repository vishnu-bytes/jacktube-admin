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
       try{
        const res = await auth.createUserWithEmailAndPassword(values.email, values.password);
        console.log("userId",res)
        const user = res.user.uid
        adminData.child(user).update({email:values.email,id:user,superAdmin:false})
       setState({ VisibleCreate:false });
       }catch(error){
         console.log(error)
         error.code==="auth/email-already-in-use"&& message.warning("User already exists");
       }
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
          adminData.child(id).remove()
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
