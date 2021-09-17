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

const expertData = firebase.database().ref("/expert");
const serviceData = firebase.database().ref("/service");


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
    (values, image, studentList, panImage) =>
      async ({ setState, dispatch }) => {
        console.log("image", image);
        if (Object.keys(image).length === 0) {
          message.warning("Please upload your profile photo");
        } else if (Object.keys(panImage).length === 0) {
          message.warning("Please upload your PAn card image");
        } else {


          const storageRef = ref(storage, image.name);
          const UploadedData = await uploadBytes(storageRef, image);
          const url = await getDownloadURL(UploadedData.ref);

          const panStorageRef = ref(storage, panImage.name);
          const UploadedPanData = await uploadBytes(panStorageRef, panImage);
          const panIamgeUrl = await getDownloadURL(UploadedPanData.ref);

          let checked = false;
          for (let item = 0; item < studentList.length; item++) {
            if (studentList[item].phone === values.phone) {
              message.warning("This phone nunber is already taken");
              console.log("stuckkk");
              checked = true;
              break;
            } else {
              checked = false;
            }
          }
          if (checked === false) {

            var data = {
              ...values,
              // id: "+91" + values.phone,
              profileImage: url,
              panIamgeUrl: panIamgeUrl,
              status:1
            };
            console.log(data, "data")
            try {
              expertData.child("+91" + values.phone).update(data);
              console.log(values.services.length,"length");
              for(let i=0;i<values.services.length;i++){
                const key = serviceData.child(values.services[i]).child("/expertsList").push().key;
                console.log(key,"key of expert")
                serviceData.child(values.services[i]).child("expertsList").child(key).update({'expertId':"+91"+values.phone});
                console.log(serviceData,"serviceData");
              }
              dispatch(actions.setVisible(false));
            
              dispatch(actions.getStudent());
            } catch (error) {
              logError(error);
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
          serviceData.on("value", (snapshot) => {
            let servicelist = Object.values(snapshot.val());
            console.log(servicelist, "data list");
            setState({ serviceList: servicelist }, () => {
            });
          });
        } catch (error) {
          logError(error);
        }
      },
  setEditVisible:
    (params) =>
      ({ setState }) => {
        console.log(params, "params")
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
    (values, image, studentList, panImage, phone) =>
      async ({ setState, dispatch }) => {
        console.log("image", image);

        let url;
        let panIamgeUrl;
        console.log(typeof image === "string", "stringg")
        if (typeof image === "string") {
          url = image;
        } else {
          const storageRef = ref(storage, image.name);
          const UploadedData = await uploadBytes(storageRef, image);
          url = await getDownloadURL(UploadedData.ref);
        }
        console.log(typeof panImage === "string", "stringg")
        if (typeof panImage === "string") {
          panIamgeUrl = panImage;
          console.log("valuessssss", values)
        } else {
          const panStorageRef = ref(storage, panImage.name);
          const UploadedPanData = await uploadBytes(panStorageRef, panImage);
          panIamgeUrl = await getDownloadURL(UploadedPanData.ref);
        }
        console.log("values", values)
        // let checked = false;
        // for (let item = 0; item < studentList.length; item++) {
        //   if (studentList[item].phone === values.phone) {
        //     message.warning("This phone nunber is already taken");
        //     console.log("stuckkk");
        //     checked = true;
        //     break;
        //   } else {
        //     checked = false;
        // if (checked === false) {

        var data = {
          ...values,
          profileImage: url,
          panIamgeUrl: panIamgeUrl
        };
        console.log(data, "data")
        try {
          expertData.child("+91" + phone).update(data);
          dispatch(actions.setEditVisible(false));
          dispatch(actions.getStudent());
        } catch (error) {
          logError(error);
        }
        // }
        //     }
        // }
      },
  onDelete:
    (params) =>
      async ({ dispatch }) => {
        try {
          console.log("delete id", params)
          expertData.child("+91" + params).remove();
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
  switchChange:
    (status,phone) =>
      async ({ setState }) => {
        try {
          console.log(status,"status")
          expertData.child("+91"+phone).update({status:status});
        } catch (error) {
         
        }
      },
      
};

export default actions;
