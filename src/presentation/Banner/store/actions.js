import {
  getStudentList,
  onSubmit,
  onDelete,
  onEdit,
  createNotification
} from "../../../infrastructure/student";
import { logError } from "../../common/Utils";
import { message } from "antd";
import firebase from "../../../config/api/firebase";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const webinarData = firebase.database().ref("/webinar");
const BannerData = firebase.database().ref("Banners");
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
  setVisible:
    (params) =>
      ({ setState }) => {
        setState({ visible: params });
      },
  setVisibleCreate:
    (params) =>
      ({ setState }) => {
        console.log("done", params);
        setState({ VisibleCreate: params.value });
      },
  setSearchData:
    (params) =>
      ({ setState }) => {
        setState({ searchData: params });
      },
  onfinish:
    (values, image, form, setImageUrl, setimage) =>
      async ({ setState, dispatch }) => {
        console.log("value", values);
        const key = BannerData.push().key;
        if (values.type === 2) {
          if (Object.keys(image).length === 0) {
            message.warning("Please  ulpoad the image");
          } else {
            setState({ loader: true });
            const storageRef = ref(storage, image.name);
            const UploadedData = await uploadBytes(storageRef, image);
            const url = await getDownloadURL(UploadedData.ref);
            var dataadd = {
              ...values,
              image: url,
              id: key,
            };
            await BannerData.child(key).update(dataadd);
          }
        } else {
          var data = {
            ...values,
            id: key,
          };
          await BannerData.child(key).update(data);
        }
        dispatch(actions.setVisibleCreate(false));
        dispatch(actions.getStudent());
      },
  getWebinar:
    () =>
      async ({ setState, dispatch }) => {
        try {
          let responselist;
          webinarData.on("value", (snapshot) => {
            if (snapshot.val() !== null) {
              responselist = Object.values(snapshot.val());
            } else {
              responselist = [];
            }
            setState({ webinarData: responselist });
            // dispatch(actions.setSearchData(responselist));
            console.log(responselist, "webinar");
          });
        } catch (error) {
          logError(error);
        }
      },
  getStudent:
    () =>
      async ({ setState, dispatch }) => {
        try {
          dispatch(actions.getWebinar())
          BannerData.on("value", (snapshot) => {
            if (snapshot.val() !== null) {
              let responselist = Object.values(snapshot.val());
              console.log(responselist, "data checfk");
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
  setEditVisible:
    (params) =>
      ({ setState }) => {
        setState({ editVisible: params.value });
        setState({ singleRow: params.data });
      },
  onEdit:
    (values, id, image) =>
      async ({ dispatch, setState }) => {
        console.log("value", values);
        const key = BannerData.push().key;
        if (values.type === 2) {
          if (Object.keys(image).length === 0) {
            message.warning("Please  ulpoad the image");
          } else {
            setState({ loader: true });
            const storageRef = ref(storage, image.name);
            const UploadedData = await uploadBytes(storageRef, image);
            const url = await getDownloadURL(UploadedData.ref);
            var dataadd = {
              ...values,
              image: url,
              id: id,
            };
            await BannerData.child(id).update(dataadd);
          }
        } else {
          var data = {
            ...values,
            id: id,
          };
          await BannerData.child(id).update(data);
        }
        dispatch(actions.setEditVisible(false));
        dispatch(actions.getStudent());
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
  onDelete:
    (params) =>
      async ({ dispatch }) => {
        try {
          console.log(params, "idd")
          BannerData.child(params).remove();
          dispatch(actions.getStudent());
        } catch (error) {
          logError(error);
        }
      },
};

export default actions;
