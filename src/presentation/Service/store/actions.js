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
    (values, image, form, setImageUrl, setimage) =>
      async ({ setState, dispatch }) => {
        if (Object.keys(image).length === 0) {
          message.warning("Please upload image");
        } else {
          setState({ loader: true });

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
            setState({ loader: false });
            form.resetFields();
            setImageUrl("");
            setimage({});
          } catch (error) {
            setState({ loader: false });
            logError(error);
          }
        }
      },
  getStudent:
    () =>
      async ({ setState, dispatch }) => {
        try {
          serviceData.on("value", (snapshot) => {
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
    (values, image, id) =>
      async ({ setState, dispatch }) => {
        let url;
        if (typeof image === "string") {
          url = image;
        } else {
          const storageRef = ref(storage, image.name);
          const UploadedData = await uploadBytes(storageRef, image);
          url = await getDownloadURL(UploadedData.ref);
        }
        setState({ loader: true });

        // const key = serviceData.push().key;
        var data = {
          ...values,
          image: url,
          id: id,
        };
        console.log(values, id);
        try {
          await serviceData.child(id).update(data);
          setState({ loader: false });

          dispatch(actions.setEditVisible(false));
          dispatch(actions.getStudent());
        } catch (error) {
          setState({ loader: false });

          logError(error);
        }

        // logError(params, "Edit value");
        dispatch(actions.getStudent());
      },
  onDelete:
    (params) =>
      async ({ dispatch, setState }) => {
        try {
          console.log("res00")
          // serviceData.child(params).remove();
          // dispatch(actions.getStudent());
          // setState({ viewVisible: false });
          let responselist;
          expertData.on("value", (snapshot) => {
            console.log("object res01", snapshot.val());
            
            if (snapshot.val() !== null) {

              responselist = Object.values(snapshot.val());
              console.log(responselist , "list in expert res0");

            }
           
          });
          for (let i = 0; i < responselist.length; i++) {
            console.log("service list res1", responselist[i].services);
            for(let j=0;j<responselist[i].services.length;j++){
              console.log("res2")
              if(responselist[i].services[j]===params){
                console.log("params",responselist[i].services[j],params);
                console.log("id",responselist[i].id);
                const res = await expertData.child(responselist[i].id).child("services").child(params).remove();
                console.log("res>>123",res);
                // console.log("res>>>>>>",res)
              }
            }
          }
          // setState({ singleRow: params.data });
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
