import {
  getStudentList,
  onSubmit,
  onDelete,
  onEdit,
} from "../../../infrastructure/student";
import { logError } from "../../common/Utils";
import { message } from "antd";
import firebase from "../../../config/api/firebase";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const serviceData = firebase.database().ref("service");
const storage = getStorage();

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
      setState({ viewVisible: params.value });
      setState({ singleRow: params.data });
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
    (values, image) =>
    async ({ setState, dispatch }) => {
      const storageRef = ref(storage, image.name);
      const UploadedData = await uploadBytes(storageRef, image);
      const url = await getDownloadURL(UploadedData.ref);

      const key = serviceData.push().key;
      var data = {
        ...values,
        image: url,
        id: key,
      };
      console.log(values, key);
      try {
        await serviceData.child(key).update(data);
        dispatch(actions.setVisibleCreate(false));
        dispatch(actions.getStudent());
      } catch (error) {
        logError(error);
      }
    },
  getStudent:
    () =>
    async ({ setState, dispatch }) => {
      try {
        serviceData.on("value", (snapshot) => {
          let responselist = Object.values(snapshot.val());
          console.log(responselist, "data checfk");
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
        serviceData.child(params).remove();
      } catch {
        logError(params, "Edit value");
        dispatch(actions.getStudent());
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
