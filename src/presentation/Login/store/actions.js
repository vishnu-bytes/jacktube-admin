import { setStorageItem, getStorageItem, removeStorageItem } from "../../../infrastructure/common/local";
import { onLogin } from "../../../infrastructure/login";
import { routes } from "../../common/Routes/routes";
import { logError } from "../../common/Utils";
import firebase from "../../../config/api/firebase";
import { message } from "antd";

const auth = firebase.auth();
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
    (values, history) =>
      async ({ dispatch }) => {
        try {
          //  const snapshot= await adminData.on("value");
          let adminList;

          adminData.on("value", (snapshot) => {
            console.log("valuessss", snapshot.val())
            adminList = Object.keys(snapshot.val());
          })
          const authData = await auth.signInWithEmailAndPassword(values.email, values.password);

          console.log("values", adminList, authData.user.uid);
          let userExist;
          for (let i = 0; i < adminList?.length; i++) {
            if (adminList[i] === authData.user.uid) {
              console.log("user exists");
              userExist = true;
              break;
            } else {
              userExist = false;
            }
          }
          if (userExist) {
            let uid = authData.user.uid;
            setStorageItem("token", uid);
            setStorageItem("email",authData.user.email)
            console.log("email",authData.user.email)
            // if(res.token){
            let data = { email: values.email }
            adminData.child(uid).update(data)
            history.push(routes.DASHBOARD)

          } else {
            message.warning("User does not exist");
            await auth.signOut();

          }
        } catch (error) {
          switch (error.code) {
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
