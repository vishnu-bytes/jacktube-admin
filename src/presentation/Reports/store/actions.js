import {
  reportData, allPayments
} from "../../../infrastructure/reports";
import { logError } from "../../common/Utils";
import { message } from "antd";
import moment from "moment"


const actions = {
  onSubmit:
    (values) =>
      async ({ setState, dispatch }) => {
        try {
          // await onSubmit(values);
          dispatch(actions.setVisible(false));
          dispatch(actions.getStudent());
        } catch (error) {
          logError(error);
        }
      },
  setVisible:
    (params) =>
      ({ setState }) => {
        setState({ visibleReport: params });
      },
  setVisiblePrice:
    (params) =>
      ({ setState }) => {
        console.log("object")
        setState({ visiblePrice: params }, () => {
          console.log("checking", params)
        });
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
          // const res = await getStudentList();
          const res = await allPayments();
          console.log(" all response", res)
          let paymentList = res.items;
          console.log(moment.unix(paymentList[0].created_at).format("DD/MM/YYYY"), "dateee")
          for (let i = 0; i < paymentList.length; i++) {
            paymentList[i].created_at = moment.unix(paymentList[i].created_at).format("DD/MM/YYYY");
            paymentList[i].status = paymentList[i].status==="captured"?"Success":paymentList[i].status==="authorized"?"processing":paymentList[i].status          }
          console.log("payment list",paymentList)
          setState({ studentList: paymentList });
          dispatch(actions.setSearchData(res.items));
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
          // await onDelete(params);
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
          // const res = await getStudentList(page);
          // setState({ course: res });
          setState({ pageNumber: page });
        } catch (error) {
          logError(error);
        }
      },
  getAllPayents:
    (from, to) =>
      async ({ setState, dispatch }) => {
        console.log(from, to, "dates")
        try {
          // const res = await getStudentList();
          const res = await reportData({ "from": from, "to": to })
          console.log("response filter", res);

          let paymentList = res.items;
          if(res.count !==0){
          for (let i = 0; i < paymentList.length; i++) {
            paymentList[i].created_at = moment.unix(paymentList[i].created_at).format("DD/MM/YYYY");
            paymentList[i].status = paymentList[i].status==="captured"?"Success":paymentList[i].status==="authorized"?"processing":paymentList[i].status          }
          }
          paymentList?.length===0&&setState({isDisabled:true})
            setState({ studentList:paymentList });
          dispatch(actions.setSearchData(res.items));
        } catch (error) {
          logError(error);
        }
      },
};

export default actions;
