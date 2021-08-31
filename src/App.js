import React, { Suspense } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { routes } from "./presentation/common/Routes";
import { theme } from "./presentation/common/Theme/themeVariables";
import { PrimaryLoadingIndicator } from "./presentation/common/UI/LoadingIndicator";
import store from "./redux/store";
import { Provider } from "react-redux";

//import static css to override antd
import "./presentation/common/Style/style.css";
import LayoutProvider from "./presentation/Layout";

//component imports
const Login = React.lazy(() => import("./presentation/Login"));
const Signup = React.lazy(() => import("./presentation/Signup"));
const Dashboard = React.lazy(() => import("./presentation/Dashboard"));
const StudentList =React.lazy(()=>import("./presentation/StudentList"));
const Calendar = React.lazy(() => import("./presentation/Calendar"));
const Notification = React.lazy(() => import("./presentation/Notification"));
const Course = React.lazy(()=> import("./presentation/Project"))
const FacultytList = React.lazy(() => import("./presentation/FacultyList"));
const Webinars = React.lazy(() => import("./presentation/Webinars"));
const Blog = React.lazy(()=> import("./presentation/Blog"));
const BlogExpanded = React.lazy(()=> import('./presentation/Blog/BlogsExpanded'));


function App() {
  return (
    <Provider store={store}>
    <ThemeProvider
      theme={{ ...theme, rtl: false, topMenu: false, darkMode: false }}
    >
      <Router>
        <Suspense
          fallback={
            <PrimaryLoadingIndicator
              text="Loading...Breath in...Breath out..."
              isFullPage
            />
          }
        >
          <Switch>
          <Route exact path={routes.LOGIN} component={Login} />
          <Route exact path={routes.SIGNUP} component={Signup} />
           
            <LayoutProvider>
              <Route exact path={routes.DASHBOARD} component={Dashboard} />
              <Route exact path={routes.STUDENTLIST} component={StudentList} />
              <Route path={routes.CALENDER} component={Calendar} />
              <Route exact path={routes.NOTIFICATION} component={Notification} />
              <Route exact path ={routes.FACULTYLIST} component={FacultytList} />
              <Route exact path ={routes.WEBINAR} component={Webinars} />
              <Route exact path={routes.COURSE} component={Course} />
              <Route exact path={routes.BLOG} component={Blog} />
              <Route exact path={routes.BLOGEXPANDED} component={BlogExpanded} />
            </LayoutProvider>
          </Switch>
        </Suspense>
      </Router>
    </ThemeProvider>
    </Provider>
  );
}

export default App;
