import {
  getStudentList,
  onSubmit,
  onDelete,
  onCreateWebinar,
  deleteZoom,
  editZoom,
} from "../../../infrastructure/student";
import { logError } from "../../common/Utils";
import { message } from "antd";
// import WebinarData from "../../../demoData/webinar.json";
import firebase from "../../../config/api/firebase";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import moment from "moment";

const webinarData = firebase.database().ref("/webinar");
const categoryData = firebase.database().ref("/Category");
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
  setVisiblePrice:
    (params) =>
    ({ setState }) => {
      // setState({ visiblePrice: params },);
    },
  setViewVisible:
    (params) =>
    ({ setState }) => {
      setState({ viewVisible: params.value, singleRow: params.data });
    },
  setSearchData:
    (params) =>
    ({ setState }) => {
      setState({ searchData: params });
    },
  onfinish:
    (values, date, time, price, image) =>
    async ({ setState, dispatch }) => {
      console.log(values, date, time, "chck");

      if (Object.keys(image).length === 0) {
        message.warning("Please upload your profile photo");
      } else {
        setState({ loader: true });
        const storageRef = await ref(storage, image.name);
        const uploadedData = await uploadBytes(storageRef, image);
        const imageUrl = await getDownloadURL(uploadedData.ref);
        console.log(values, date, time, price, "values check");
        const value = moment(date).format("yyyy/MM/DD");
        const result = value + "T" + time + ":00Z";
        const dataVideo = {
          topic: values.title,
          start_time: result,
          duration: 60,
          password: values.password,
          agenda: values.description,
        };
        const zoom = await onCreateWebinar(dataVideo);
        values.time = time;
        values.startDate = date;
        values.price = price;
        values.premium === undefined
          ? (values.premium = false)
          : console.log("hgjgf");
        const key = webinarData.push().key;
        var data = {
          ...values,
          id: key,
          imageUrl: imageUrl,
          start_url: zoom.start_url,
          zoom_id: zoom.id,
          join_url: zoom.join_url,
        };
        try {
          const res = webinarData.child(key).update(data);
          const expertkey = expertData
            .child(values.presentor)
            .child("/webinarList")
            .push().key;
          console.log(key, "key of expert");
          await expertData
            .child(values.presentor)
            .child("webinarList")
            .child(expertkey)
            .update({ webinarId: key, id: expertkey });
          setState({ loader: false });

          console.log("reponse", res);
          dispatch(actions.setVisible(false));
          dispatch(actions.getStudent());
        } catch (error) {
          setState({ loader: false });
          logError(error);
        }
      }
    },
  onAddPrice:
    (params) =>
    async ({ setState, dispatch }) => {
      setState({ price: params.price });
      dispatch(actions.setVisiblePrice(false));
    },

  getStudent:
    () =>
    async ({ setState, dispatch }) => {
      try {
        webinarData.on("value", (snapshot) => {
          if (snapshot.val() === null) {
            setState({ studentList: [] });
            dispatch(actions.setSearchData([]));
          } else {
            let responselist = Object.values(snapshot.val());
            setState({ studentList: responselist });
            dispatch(actions.setSearchData(responselist));
            console.log(responselist, "webinar");
          }
        });
      } catch (error) {
        logError(error);
      }
    },
  getCategory:
    () =>
    async ({ setState, dispatch }) => {
      try {
        categoryData.on("value", (snapshot) => {
          let responselist = Object.values(snapshot.val());
          setState({ categoryList: responselist });
        });
      } catch (error) {
        logError(error);
      }
    },
  getExperts:
    () =>
    async ({ setState, dispatch }) => {
      try {
        expertData.on("value", (snapshot) => {
          let responselist = Object.values(snapshot.val());
          setState({ expertList: responselist });
          console.log(responselist, "expert data2");
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
    (values, date, time, price, image, id, prevPresentor, zoom_id) =>
    async ({ setState, dispatch }) => {
      setState({ loader: true });
      let imageUrl;
      if (typeof image === "string") {
        imageUrl = image;
      } else {
        console.log("image not changed", image);
        const storageRef = ref(storage, image.name);
        const uploadedData = await uploadBytes(storageRef, image);
        imageUrl = await getDownloadURL(uploadedData.ref);
        console.log(values, date, time, price, "values check");
      }
      values.time = time;
      values.startDate = date;
      values.price = price;
      console.log(values, "values");
      const value = moment(date).format("yyyy/MM/DD");
      const result = value + "T" + time + ":00Z";
      const dataVideo = {
        topic: values.title,
        start_time: result,
        duration: 60,
        password: values.password,
        agenda: values.description,
        id: zoom_id,
      };
      const zoom = await editZoom(dataVideo);

      var data = {
        ...values,
        id: id,
        imageUrl: imageUrl,
      };
      const res = webinarData.child(id).update(data);

      const webinarList = expertData.child(prevPresentor).child("webinarList");
      console.log("webinarlist", webinarList);
      let list;
      webinarList.on("value", (snapshot) => {
        if (snapshot.val() !== null) {
          list = Object.values(snapshot.val());
          console.log("list", list);
        }
      });
      for (let i = 0; i < list?.length; i++) {
        console.log("in exist");
        list[i].webinarId === id &&
          expertData
            .child(prevPresentor)
            .child("webinarList")
            .child(list[i].id)
            .remove();
        console.log("removed");
      }

      console.log("services in finish", values.presentor);
      const expertkey = expertData
        .child(values.presentor)
        .child("/webinarList")
        .push().key;
      await expertData
        .child(values.presentor)
        .child("webinarList")
        .child(expertkey)
        .update({ webinarId: id, id: expertkey });
      // logError(params, "Edit value");
      setState({ loader: false });

      dispatch(actions.setEditVisible(false));

      dispatch(actions.getStudent());
    },
  onDelete:
    (params, presentor) =>
    async ({ dispatch }) => {
      try {
        const del = await deleteZoom(params.zoom);
        // await onDelete(params);
        console.log(params.id, params.presentor, "params id");
        webinarData.child(params.id).remove();
        const webinarList = expertData
          .child(params.presentor)
          .child("webinarList");
        console.log("webinarlist", webinarList);
        let list;
        webinarList.on("value", (snapshot) => {
          if (snapshot.val() !== null) {
            list = Object.values(snapshot.val());
            console.log("list", list);
          }
        });
        for (let i = 0; i < list.length; i++) {
          console.log("in exist");
          list[i].webinarId === params.id &&
            expertData
              .child(params.presentor)
              .child("webinarList")
              .child(list[i].id)
              .remove();
          console.log("removed");
        }
        // message.success("Succesfully Deleted");
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
};

export default actions;
