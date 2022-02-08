import React, { useEffect } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import Login from "./screens/Login";
import dashboard from "./screens/Dashbord/Dashbord";
import demographic from "./screens/Dashbord/Demographic";
import ioT from "./screens/Dashbord/IoT";
import NavbarMenu from "./components/NavbarMenu";
import appInbox from "./screens/App/Inbox";
import appChat from "./screens/App/Chat";
import appCalendar from "./screens/App/Calendar";
import appContact from "./screens/App/Contact";
import appTaskbar from "./screens/App/Taskbar";
import scanner from "./screens/Scanner/Scanner";
import filemanagerdashboard from "./screens/FileManager/Dashboard";
import filedocuments from "./screens/FileManager/Documents";
import filemedia from "./screens/FileManager/Media";
import fileimages from "./screens/FileManager/Images";
import blognewPost from "./screens/Blog/NewPost";
import blogdetails from "./screens/Blog/BlogDetails";
import bloglist from "./screens/Blog/BlogList";
import uitypography from "./screens/UIElements/Typography";
import uitabs from "./screens/UIElements/Tabs";
import uibuttons from "./screens/UIElements/Button";
import bootstrapui from "./screens/UIElements/BootstrapUI";
import uiicons from "./screens/UIElements/Icons";
import uinotifications from "./screens/UIElements/Notifications";
import uicolors from "./screens/UIElements/Colors";
import uilistgroup from "./screens/UIElements/ListGroup";
import uimediaobject from "./screens/UIElements/MediaObject";
import uimodal from "./screens/UIElements/Modals";
import uiprogressbar from "./screens/UIElements/ProgressBar";
import widgetsdata from "./screens/Widgets/Data";
import widgetsweather from "./screens/Widgets/Weather";
import widgetsblog from "./screens/Widgets/Blog";
import widgetsecommers from "./screens/Widgets/ECommers";
import registration from "./screens/Auth/Registration";
import lockscreen from "./screens/Auth/Lockscreen";
import forgotpassword from "./screens/Auth/ForgotPassword";
import page404 from "./screens/Auth/Page404";
import page403 from "./screens/Auth/Page403";
import page500 from "./screens/Auth/Page500";
import page503 from "./screens/Auth/Page503";
import blankpage from "./screens/Pages/BlankPage";
import profile from "./screens/Pages/Profile";
import profilev2page from "./screens/Pages/ProfileV2";
import imagegalleryprofile from "./screens/Pages/ImageGallery";
import timeline from "./screens/Pages/TimeLine";
import pricing from "./screens/Pages/Pricing";
import invoices from "./screens/Pages/Invoices";
import invoicesv2 from "./screens/Pages/InvoicesV2";
import searchresult from "./screens/Pages/SearchResults";
import helperclass from "./screens/Pages/HelperClass";
import teamsboard from "./screens/Pages/TeamsBoard";
import maintanance from "./screens/Pages/Maintanance";
import testimonials from "./screens/Pages/Testimonials";
import faqs from "./screens/Pages/Faqs";
import formvalidation from "./screens/Forms/FormValidation";
import ActivationEmail from "./screens/Auth/ActivationEmail";
import basicelements from "./screens/Forms/BasicElements";
import tablenormal from "./screens/Tables/TableNormal";
import echart from "./screens/Charts/Echart";
import leafletmap from "./screens/Maps/GoogleMaps";
import ResetPassword from "./screens/Auth/ResetPassword";
import { Redirect } from "react-router-dom";
import ProjectsList from "./screens/Pages/ProjectsList";
import FundamentalScanner from "./screens/FundamentalScanner/FundamentalScanner";
import { useDispatch, useSelector } from "react-redux";
import CandlestickScanner from "./screens/CandlestickScanner/CandlestickScanner";
import TopLovedScanners from "./screens/TopLovedScanners/TopLovedScanners";
import Checkout from "./components/Pages/Checkout";
import Home from "./screens/Home/Home";
import ChangePassword from "./components/Pages/ChangePassword";
import Telegram from "./screens/Pages/Telegram";
import Trading from "./screens/Trading/Trading"
import CryptoTrading from "./screens/CryptoTrading/CryptoTrading"
import Orders from "./screens/Orders/orders"
import Positions from "./screens/Positions/positions"
import Holdings from "./screens/Holdings/holdings"
import {
  dispatchLogin,
  fetchUser,
  dispatchGetUser,
} from "./actions/authAction";
window.__DEV__ = true;

const App = () => {
  const isLoggedIn = localStorage.getItem("firstLogin");
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const auth = useSelector((state) => state.auth);
  console.log(auth);

  useEffect(() => {
    const firstLogin = localStorage.getItem("firstLogin");
    if (firstLogin) {
      const getToken = async () => {
        const access_token = localStorage.getItem("access");
        dispatch({ type: "GET_TOKEN", payload: access_token });
      };
      getToken();
    }
  }, [auth.isLogged, dispatch]);

  useEffect(() => {
    if (token) {
      const getUser = () => {
        dispatch(dispatchLogin());
        return fetchUser(token).then((res) => {
          if (!res) {
            localStorage.removeItem("firstLogin");
            localStorage.removeItem("access");
            return (window.location.href =
              "http://ec2-13-235-48-197.ap-south-1.compute.amazonaws.com:3000/login");
          }
          dispatch(dispatchGetUser(res));
        });
      };
      getUser();
    }
  }, [token, dispatch]);

  var res = window.location.pathname;
  var baseUrl = process.env.PUBLIC_URL;
  baseUrl = baseUrl.split("/");
  res = res.split("/");
  res = res.length > 0 ? res[baseUrl.length] : "/";
  res = res ? res : "/";
  const activeKey1 = res;

  return (
    <div id="wrapper">
      {activeKey1 === "" ||
        activeKey1 === "/" ||
        activeKey1 === "login" ||
        activeKey1 === "registration" ||
        activeKey1 === "lockscreen" ||
        activeKey1 === "forgotpassword" ||
        activeKey1 === "page404" ||
        activeKey1 === "page403" ||
        activeKey1 === "page500" ||
        activeKey1 === "page503" ||
        activeKey1 === "maintanance" ||
        activeKey1 === "user" ? (
        <Switch>
          <Route exact path={`${process.env.PUBLIC_URL}/`} component={Home} />
          {!isLoggedIn ? (
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/login`}
              component={Login}
            />
          ) : (
            <Redirect to="/dashboard" />
          )}

          <Route
            exact
            path={`${process.env.PUBLIC_URL}/forgotpassword`}
            component={forgotpassword}
          />
          <Route
            exact
            path={`${process.env.PUBLIC_URL}/page404`}
            component={page404}
          />

          <Route
            exact
            path={`${process.env.PUBLIC_URL}/page403`}
            component={page403}
          />
          <Route
            exact
            path={`${process.env.PUBLIC_URL}/page500`}
            component={page500}
          />
          <Route
            exact
            path={`${process.env.PUBLIC_URL}/page503`}
            component={page503}
          />
          <Route
            exact
            path={`${process.env.PUBLIC_URL}/user/activate/:activation_token`}
            component={ActivationEmail}
          />

          <Route
            exact
            path={`${process.env.PUBLIC_URL}/user/reset/:id`}
            component={ResetPassword}
          />
          <Route
            exact
            path={`${process.env.PUBLIC_URL}/registration`}
            component={registration}
          />

          <Route
            exact
            path={`${process.env.PUBLIC_URL}/lockscreen`}
            component={lockscreen}
          />

          <Route
            exact
            path={`${process.env.PUBLIC_URL}/maintanance`}
            component={maintanance}
          />
        </Switch>
      ) : (
        <>
          <NavbarMenu />
          <div id="main-content">
            <Switch>
              (
              {isLoggedIn ? (
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/dashboard`}
                  component={dashboard}
                />

              ) : (
                <Redirect to="/login" />
              )}
              ) (
              <Route
                exact
                path={`${process.env.PUBLIC_URL}/demographic`}
                component={demographic}
              />
              )
              <Route
                exact
                path={`${process.env.PUBLIC_URL}/ioT`}
                component={ioT}
              />
              {isLoggedIn && (
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/payment/status/:paymentId`}
                  component={Checkout}
                />
              )}
              <Route
                exact
                path={`${process.env.PUBLIC_URL}/trading`}
                component={Trading}
              />
              <Route
                exact
                path={`${process.env.PUBLIC_URL}/cryptotrading`}
                component={CryptoTrading}
              />
              <Route
                exact
                path={`${process.env.PUBLIC_URL}/orders`}
                component={Orders}
              />
              <Route
                exact
                path={`${process.env.PUBLIC_URL}/positions`}
                component={Positions}
              />
              <Route
                exact
                path={`${process.env.PUBLIC_URL}/holdings`}
                component={Holdings}
              />
              <Route
                exact
                path={`${process.env.PUBLIC_URL}/appinbox`}
                component={appInbox}
              />
              {isLoggedIn && (
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/activate/telegram`}
                  component={Telegram}
                />
              )}
              <Route
                exact
                path={`${process.env.PUBLIC_URL}/appchat`}
                component={appChat}
              />
              <Route
                exact
                path={`${process.env.PUBLIC_URL}/appcalendar`}
                component={appCalendar}
              />
              <Route
                exact
                path={`${process.env.PUBLIC_URL}/appcontact`}
                component={appContact}
              />
              <Route
                exact
                path={`${process.env.PUBLIC_URL}/apptaskbar`}
                component={appTaskbar}
              />
              (
              {isLoggedIn ? (
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/scanners`}
                  component={ProjectsList}
                />
              ) : (
                <Redirect to="/login" />
              )}
              )
              {isLoggedIn ? (
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/scanners/fundamental-scanner`}
                  component={FundamentalScanner}
                />
              ) : (
                <Redirect to="/login" />
              )}
              {isLoggedIn ? (
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/scanners/top-loved-scanner`}
                  component={TopLovedScanners}
                />
              ) : (
                <Redirect to="/login" />
              )}
              {isLoggedIn ? (
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/scanners/candlestick-scanner`}
                  component={CandlestickScanner}
                />
              ) : (
                <Redirect to="/login" />
              )}
              <Route
                exact
                path={`${process.env.PUBLIC_URL}/filemanagerdashboard`}
                component={filemanagerdashboard}
              />
              <Route
                exact
                path={`${process.env.PUBLIC_URL}/filedocuments`}
                component={filedocuments}
              />
              <Route
                exact
                path={`${process.env.PUBLIC_URL}/filemedia`}
                component={filemedia}
              />
              <Route
                exact
                path={`${process.env.PUBLIC_URL}/fileimages`}
                component={fileimages}
              />
              <Route
                exact
                path={`${process.env.PUBLIC_URL}/blognewpost`}
                component={blognewPost}
              />
              <Route
                exact
                path={`${process.env.PUBLIC_URL}/blogdetails`}
                component={blogdetails}
              />
              <Route
                exact
                path={`${process.env.PUBLIC_URL}/bloglist`}
                component={bloglist}
              />
              <Route
                exact
                path={`${process.env.PUBLIC_URL}/uitypography`}
                component={uitypography}
              />
              <Route
                exact
                path={`${process.env.PUBLIC_URL}/uitabs`}
                component={uitabs}
              />
              <Route
                exact
                path={`${process.env.PUBLIC_URL}/bootstrapui`}
                component={bootstrapui}
              />
              <Route
                exact
                path={`${process.env.PUBLIC_URL}/uiicons`}
                component={uiicons}
              />
              <Route
                exact
                path={`${process.env.PUBLIC_URL}/uinotifications`}
                component={uinotifications}
              />
              <Route
                exact
                path={`${process.env.PUBLIC_URL}/uicolors`}
                component={uicolors}
              />
              <Route
                exact
                path={`${process.env.PUBLIC_URL}/uilistgroup`}
                component={uilistgroup}
              />
              <Route
                exact
                path={`${process.env.PUBLIC_URL}/uimediaobject`}
                component={uimediaobject}
              />
              <Route
                exact
                path={`${process.env.PUBLIC_URL}/uimodal`}
                component={uimodal}
              />
              <Route
                exact
                path={`${process.env.PUBLIC_URL}/uibuttons`}
                component={uibuttons}
              />
              <Route
                exact
                path={`${process.env.PUBLIC_URL}/uiprogressbar`}
                component={uiprogressbar}
              />
              <Route
                exact
                path={`${process.env.PUBLIC_URL}/widgetsdata`}
                component={widgetsdata}
              />
              <Route
                exact
                path={`${process.env.PUBLIC_URL}/widgetsweather`}
                component={widgetsweather}
              />
              <Route
                exact
                path={`${process.env.PUBLIC_URL}/widgetsblog`}
                component={widgetsblog}
              />
              <Route
                exact
                path={`${process.env.PUBLIC_URL}/widgetsecommers`}
                component={widgetsecommers}
              />
              <Route
                exact
                path={`${process.env.PUBLIC_URL}/blankpage`}
                component={blankpage}
              />
              <Route
                exact
                path={`${process.env.PUBLIC_URL}/profile`}
                component={profile}
              />
              <Route
                exact
                path={`${process.env.PUBLIC_URL}/change-password`}
                component={ChangePassword}
              />
              <Route
                exact
                path={`${process.env.PUBLIC_URL}/profilev2page`}
                component={profilev2page}
              />
              <Route
                exact
                path={`${process.env.PUBLIC_URL}/imagegalleryprofile`}
                component={imagegalleryprofile}
              />
              <Route
                exact
                path={`${process.env.PUBLIC_URL}/timeline`}
                component={timeline}
              />
              <Route
                exact
                path={`${process.env.PUBLIC_URL}/pricing`}
                component={pricing}
              />
              <Route
                exact
                path={`${process.env.PUBLIC_URL}/invoices`}
                component={invoices}
              />
              <Route
                exact
                path={`${process.env.PUBLIC_URL}/invoicesv2`}
                component={invoicesv2}
              />
              <Route
                exact
                path={`${process.env.PUBLIC_URL}/searchresult`}
                component={searchresult}
              />
              <Route
                exact
                path={`${process.env.PUBLIC_URL}/helperclass`}
                component={helperclass}
              />
              <Route
                exact
                path={`${process.env.PUBLIC_URL}/teamsboard`}
                component={teamsboard}
              />
              <Route
                exact
                path={`${process.env.PUBLIC_URL}/scanners/scanner`}
                component={scanner}
              />
              <Route
                exact
                path={`${process.env.PUBLIC_URL}/testimonials`}
                component={testimonials}
              />
              <Route
                exact
                path={`${process.env.PUBLIC_URL}/faqs`}
                component={faqs}
              />
              <Route
                exact
                path={`${process.env.PUBLIC_URL}/formvalidation`}
                component={formvalidation}
              />
              <Route
                exact
                path={`${process.env.PUBLIC_URL}/basicelements`}
                component={basicelements}
              />
              <Route
                exact
                path={`${process.env.PUBLIC_URL}/tablenormal`}
                component={tablenormal}
              />
              <Route
                exact
                path={`${process.env.PUBLIC_URL}/echart`}
                component={echart}
              />
              <Route
                exact
                path={`${process.env.PUBLIC_URL}/leafletmap`}
                component={leafletmap}
              />
            </Switch>
          </div>
        </>
      )}
    </div>
  );
};

export default withRouter(App);
