import { setStorageItem ,getStorageItem,removeStorageItem} from "../../../infrastructure/common/local";
import { onLogin } from "../../../infrastructure/login";
import { routes } from "../../common/Routes/routes";
import { logError } from "../../common/Utils";
import firebase from "../../../config/api/firebase";
import { message } from "antd";

const auth=firebase.auth();
const adminData = firebase.database().ref("/admin");


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
        const authData=await auth.signInWithEmailAndPassword(values.email, values.password);
       
        console.log("token",getStorageItem("token"));
        console.log(auth.currentUser.uid,"current user");
        
        console.log('authData',authData.user.uid);
        // const res = await onLogin(values);
        let uid=authData.user.uid;
        setStorageItem("token",uid);
        console.log("token",getStorageItem("token"),uid);
        // dispatch(actions.setToken(res?.token))
        // if(res.token){
          let data={email:values.email}
          adminData.child(uid).update(data)
          history.push(routes.DASHBOARD)
        // }
        // else{
        //   alert(res.message)
        // }
        
      } catch (error) {
        switch(error.code){
          case "auth/invalid-email":
            message.warning("Please enter a valid email address");
            break;
          case "auth/user-not-found":
            message.warning("User not found");
            break;
            case "auth/wrong-password":
            message.warning("Incorrect password");
            break;
          default:
            message.warning("Authentication failed");

        }
        // error===="auth/user-not-found" &&message.warning("Login Failed");
        logError("login", error);
      }
    },
};

export default actions;
