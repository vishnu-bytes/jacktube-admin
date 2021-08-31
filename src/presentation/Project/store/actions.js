import { 
  getCourseList,
  getAllCourseList,
  createCourse,
  onDelete
} from "../../../infrastructure/course";
import { logError } from "../../common/Utils";
import { message } from "antd";

const actions = {
  setVisible:
    (params)=>
      ({setState})=>{
        setState({visible:params})
  },
  setEditVisible:
    (params)=>
      ({setState})=>{
        setState({editVisible:params.visible})
        setState({singleCourse:params.data})
  },
  onEdit:
    (params)=>
    async ({getState,dispatch})=>{
      logError(params,"edit")
      try{
        const value = { ...params, id:getState().singleCourse._id  };
        await createCourse(value);
        dispatch(actions.setEditVisible(false))
        message.success("Succesfully Updated");
        dispatch(actions.getCourse(getState().pageNumber))
      }catch(error){
        logError(error,"error")
      }

  },
  onDelete:
  (params) =>
    async ({ dispatch,getState }) => {
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
    async ({setState}) => {
      try {
        const res = await getCourseList(page);
        setState({ course: res });
        setState({pageNumber:page});
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
    async ({getState,dispatch}) => {
      try{
        await createCourse(params)
        dispatch(actions.setVisible(false))
        dispatch(actions.getCourse(getState().pageNumber))

      }catch (error){
        logError(error)
      }
    },
};


export default actions;
