import { setStorageItem } from "../../../infrastructure/common/local";
import { onLogin } from "../../../infrastructure/login";
import { routes } from "../../common/Routes/routes";
import { logError } from "../../common/Utils";


const actions = {
  setToken:
    (newValue) =>
    ({ setState }) => {
      setState({ token: newValue });
    },
  setIsLogged:
    (newValue) =>
    ({ setState }) => {
      setState({ isLogged: newValue });
    },
  onSubmit:
    (values,history) =>
    async ({ dispatch }) => {
      try {
        const res = await onLogin(values);
        setStorageItem("token", res?.token);
        dispatch(actions.setToken(res?.token))
        if(res.token){
          history.push(routes.DASHBOARD)
        }
        else{
          alert(res.message)
        }
        
      } catch (error) {
        logError("login", error);
      }
    },
};

export default actions;
