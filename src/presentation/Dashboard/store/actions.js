import {
  getCourseList,
  getAllCourseList,
  createCourse,
  onDelete
} from "../../../infrastructure/course";
import { logError } from "../../common/Utils";
import { message } from "antd";
import firebase from "../../../config/api/firebase";
import { reportData, allPayments } from "../../../infrastructure/reports";

const expertData = firebase.database().ref("/expert");
const usertData = firebase.database().ref("/users");
const webinarData = firebase.database().ref("/webinar");
// const sessionData = firebase.database().ref("/webinar");





const actions = {
  setVisible:
    (params) =>
      ({ setState }) => {
        setState({ visible: params })
      },
  setEditVisible:
    (params) =>
      ({ setState }) => {
        setState({ editVisible: params.visible })
        setState({ singleCourse: params.data })
      },
  onEdit:
    (params) =>
      async ({ getState, dispatch }) => {
        logError(params, "edit")
        try {
          const value = { ...params, id: getState().singleCourse._id };
          await createCourse(value);
          dispatch(actions.setEditVisible(false))
          message.success("Succesfully Updated");
          dispatch(actions.getCourse(getState().pageNumber))
        } catch (error) {
          logError(error, "error")
        }

      },
  onDelete:
    (params) =>
      async ({ dispatch, getState }) => {
        try {
          await onDelete(params);
          message.success("Succesfully Deleted");
          dispatch(actions.getCourse(getState().pageNumber));
        } catch (error) {
          logError(error);
        }
      },
  getCourse:
    (page) =>
      async ({ setState }) => {
        try {
          const res = await getCourseList(page);
          setState({ course: res });
          setState({ pageNumber: page });
        } catch (error) {
          logError(error);
        }
      },
  getAllCourse:
    (page) =>
      async ({ setState }) => {
        try {
          const res = await getAllCourseList(page);
          setState({ allCourse: res.results });
        } catch (error) {
          logError(error);
        }
      },
  createCourse:
    (params) =>
      async ({ getState, dispatch }) => {
        try {
          await createCourse(params)
          dispatch(actions.setVisible(false))
          dispatch(actions.getCourse(getState().pageNumber))

        } catch (error) {
          logError(error)
        }
      },
  getTotalExperts:
    (page) =>
      async ({ setState, dispatch }) => {
        try {
          expertData.on("value", (snapshot) => {
            console.log("object", snapshot.val())
            if (snapshot.val() !== null) {
              let responselist = Object.values(snapshot.val());
              console.log(responselist, "data list in dashboard");
              setState({ totalExperts: responselist.length });
              // dispatch(actions.setSearchData(responselist));
            } else if (snapshot.val() === null) {
              setState({ totalExperts: 0 });
              // dispatch(actions.setSearchData([]));
            }
          });
        } catch (error) {
          logError(error);
        }
      },
  getTotalUsers:
    (page) =>
      async ({ setState, dispatch }) => {
        try {
          usertData.on("value", (snapshot) => {
            console.log("object", snapshot.val())
            if (snapshot.val() !== null) {
              let responselist = Object.values(snapshot.val());
              console.log(responselist, "data list");
              setState({ totalUsers: responselist.length });
              // dispatch(actions.setSearchData(responselist));
            } else if (snapshot.val() === null) {
              setState({ totalUsers: 0 });
              // dispatch(actions.setSearchData([]));
            }
          });
        } catch (error) {
          logError(error);
        }
      },
  getTotalRevenue:
    () =>
      async ({setState}) => {
        try {
          const res = await allPayments();
          console.log(" all response", res.items)
          let sum = 0;
          res.items.forEach((item)=>sum+=item.amount);
          console.log(sum, "total");
          setState({totalRevenue:sum})

        } catch (error) {

        }

      }
};


export default actions;
