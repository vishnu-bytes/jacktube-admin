import {
  getStudentList,
  onSubmit,
  onDelete,
  onEdit,
} from "../../../infrastructure/student";
import { logError } from "../../common/Utils";
import { message } from "antd";
import firebase from "../../../config/api/firebase";
import { getStorage, ref, uploadBytes,getDownloadURL } from "firebase/storage";

const expertData = firebase.database().ref("/expert");

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
  setSearchData:
    (params) =>
      ({ setState }) => {
        setState({ searchData: params });
      },
  onfinish:
    (values, image, studentList,panImage) =>
      async ({ setState, dispatch }) => {
        console.log("image", image);

        const storageRef = ref(storage, image.name);
        const UploadedData = await uploadBytes(storageRef, image);
        const url= await getDownloadURL(UploadedData.ref);
        
        const panStorageRef = ref(storage, panImage.name);
        const UploadedPanData = await uploadBytes(panStorageRef, panImage);
        const panIamgeUrl= await getDownloadURL(UploadedPanData.ref);

        let checked=false;
        for (let item = 0; item < studentList.length; item++) {
          if (studentList[item].phone === values.phone) {
            message.warning("This phone nunber is already taken");
            console.log("stuckkk");
            checked=true;
            break;
          }else{
            checked=false;
            if(checked===false){

              var data = {
                ...values,
                profileImage: url,
                panIamgeUrl
              };
              console.log(data,"data")
              try {
                expertData.child(values.phone).update(data);
                dispatch(actions.setVisible(false));
                dispatch(actions.getStudent());
              } catch (error) {
                logError(error);
              }
              // 
              }
          }
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
        console.log(params, "values");
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
