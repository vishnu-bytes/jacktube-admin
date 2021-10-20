import {
  getStudentList,
  onSubmit,
  onDelete,
  onEdit,
} from "../../../infrastructure/student";
import { logError } from "../../common/Utils";
import { message } from "antd";
import firebase from "../../../config/api/firebase";

const reviewData = firebase.database().ref("/review");
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
        console.log("visibe check", params.value)
        setState({ viewVisible: params.value });
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
          reviewData.on("value", (snapshot) => {
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
          //   let data={
          //     "review":"Lorem ipsum dolor sit",
          //     "user":"Vishnu",
          //     "expert":"-MlUK3e9Gd12DOHCbDm5",
          //     "webinar":false,
          //     "rating":3.5,
          //     "statusChanged":false,
          //     "status":""
          //   }
          // const key = reviewData.push().key;
          // data.id=key;
          // await reviewData.child(key).update(data);
          // console.log("created")

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
  getExpertData:
    () =>
      async ({ setState, dispatch }) => {
        expertData.on("value", (snapshot) => {
          console.log("object", snapshot.val())
          if (snapshot.val() !== null) {
            let responselist = Object.values(snapshot.val());
            console.log(responselist, "data list");
            setState({ expertData: responselist });
          } else if (snapshot.val() === null) {
            setState({ expertData: [] });
          }
        });
      },
      onStatusChange:
      (id,status,expertId,review,rating,user)=>
      async()=>{
        await reviewData.child(id).update({statusChanged:true,status:status});
        if(status === "Accepted"){
          const key = expertData.child(expertId).child("/reviewList").push().key;
          await expertData.child(expertId).child("reviewList").child(key).update({ 'reviewIdId': key, "review": review,"rating":rating,user:user });
        }
      }
};

export default actions;
