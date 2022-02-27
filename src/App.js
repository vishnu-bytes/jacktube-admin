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
const Dashboard = React.lazy(() => import("./presentation/Dashboard"));
const StudentList = React.lazy(() => import("./presentation/UserList"));
const Videos = React.lazy(() => import("./presentation/Videos"));


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
{/* {token===null? */}

<Route exact path={routes.LOGIN} component={Login} />
             {/* : */}

              <LayoutProvider>
                <Route exact path={routes.DASHBOARD} component={Dashboard} />
                <Route
                  exact
                  path={routes.STUDENTLIST}
                  component={StudentList}
                />
                
                <Route exact path={routes.VIDEOS} component={Videos} />

              </LayoutProvider>
            </Switch>
          </Suspense>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
