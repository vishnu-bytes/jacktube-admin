import { onClick,onSubmit } from "../../../infrastructure/blog";
import { logError } from "../../common/Utils";


const actions = {
  setBlog:
    (newValue) =>
    ({ setState }) => {
      setState({ result: newValue });
    },
  setPage:
    (newValue) =>
    ({ setState }) => {
      setState({ page: newValue });
    },

  onBlog:
  (page)=>
  async ({setState})=>{
    try{
      const blog = await onClick(page);
      setState({result:blog})
      setState({totalPage:blog.totalDoc})
    } catch (eroor){
      logError("blog Error",eroor)
    }
  },
  onSubmit:
    (values) =>
    async ({ setState }) => {
      try {
        console.log(values,"Response")
        const res = await onSubmit(values);
        console.log(res)
      } catch (error) {
        logError("login", error);
      }
    },
};

export default actions;
