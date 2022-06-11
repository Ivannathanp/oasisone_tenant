import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import SideBar from "./components/Navbar/SideBar";
import Login from "./components/pages/LoginPage/ValidateLoginPage";
import Register from "./components/pages/LoginPage/RegisterPage";
import Forget from "./components/pages/LoginPage/ForgetPasswordPage";
import PasswordReset from "./components/pages/LoginPage/PasswordResetPage";
import EmailSent from "./components/pages/LoginPage/EmailSentPage";
import Dashboard from "./components/pages/DashboardPage/DashboardPage";
import Order from "./components/pages/OrderPage/OrderPage";
import OrderStatus from "./components/pages/OrderStatusPage/OrderStatusPage";
import Promo from "./components/pages/PromoPage/PromoPage";
import Inventory from "./components/pages/InventoryPage/InventoryPage";
import Tables from "./components/pages/TablesPage/TablesPage";
import Qr from "./components/pages/QrPage/QrPage";
import Customer from "./components/pages/CustomerPage/CustomerPage";
import Settings from "./components/pages/SettingsPage/SettingsPage";
import MissingRoute from "./components/pages/MissingRoute";
import RedirectDashboard from "./components/pages/RedirectDashboard";
import "./App.css";
import { io } from "socket.io-client";
import { SocketContext } from "./components/socketContext";

//Auth & redux
import AuthRoute from "./components/Auth/routes/AuthRoute";
import BasicRoute from "./components/Auth/routes/BasicRoute";
import { connect } from "react-redux";

function App({ checked, tenant }) {
  {
    process.env.NODE_ENV === "development"
      ? process.env.REACT_APP_DEV_MODE
      : process.env.REACT_APP_PRO_MODE;
  }

  // Socket
  const [socket, setSocket] = useState("");
  const [socketRetrieved, setSocketRetrieved] = useState(false);
  const [online, setOnline] = useState(0);

  let peopleOnline = online - 1;
  let onlineText = "";

  if (peopleOnline < 1) {
    onlineText = "No one else is online";
  } else {
    onlineText =
      peopleOnline > 1
        ? `${online - 1} people are online`
        : `${online - 1} person is online`;
  }

  console.log(onlineText);

  useEffect(() => {
    if (socket) {
      socket.on("visitor enters", (data) => setOnline(data));
      socket.on("visitor exits", (data) => setOnline(data));

      socket.on("roomUsers", ({ room, users }) => {
        outputRoomName(room);
        // outputUsers(users);
      });
      socket.emit("joinRoom", tenant.tenant_id);
      console.log("I am app socket", socket.emit("joinRoom", tenant.tenant_id));
    }
  });

  // function outputUsers(users) {
  //   const userList = [];
  //   users.forEach((user) => {
  //     userList.push(user);
  //   });
  //   console.log("users :", userList);
  // }

  function outputRoomName(room) {
    console.log("Room is :", room);
  }

  useEffect(() => {
    console.log("tenant is: ", tenant);

    if (tenant.tenant_id != undefined) {
      const newSocket = io("https://oasisoneserver.herokuapp.com", {transports: ['polling']}, {
        query: {
          tenant_id: tenant.tenant_id,
        },
      });

      setSocket(newSocket);
      setSocketRetrieved(true);
      return () => newSocket.close();
    }
  }, [tenant]);

  if (socketRetrieved) {
    console.log("app socket is: ", socket);
  }

  return (
    
    <Router basename="/oasisone_tenant">
      {checked && (
        <div className="app">
          <Switch>
            <Route exact path="/" component={Login} />

            <BasicRoute exact path="/login/:userEmail?" component={Login} />

            <BasicRoute
              exact path="/emailsent/:userEmail?/:reset?"
                            component={EmailSent}
            />
            <BasicRoute
            exact  path="/passwordreset/:userID/:resetString"
              
              component={PasswordReset}
            />
            <BasicRoute exact path="/register"  component={Register} />
            <BasicRoute exact path="/forgetpassword"  component={Forget} />

            <SocketContext.Provider value={socket}>
              <div class="box">
                <div class="column">
                  <SideBar />
                </div>
                <div class="column2">
                  <AuthRoute exact path="/dashboard" component={Dashboard} />
                  <AuthRoute path="/orders" exact component={Order} />
                  <AuthRoute
                    path="/orderstatus"
                    exact
                    component={OrderStatus}
                  />
                  <AuthRoute path="/promo" exact component={Promo} />
                  <AuthRoute path="/inventory" exact component={Inventory} />
                  <AuthRoute path="/tables" exact component={Tables} />
                  <AuthRoute path="/qr" exact component={Qr} />
                  <AuthRoute path="/customer" exact component={Customer} />
                  <AuthRoute path="/settings" exact component={Settings} />
                </div>
              </div>
            </SocketContext.Provider>
            <Route path="*" component={MissingRoute} />
          </Switch>
        </div>
      )}
    </Router>
  );
}

function mapStateToProps({ session }) {
  return {
    checked: session.checked,
    tenant: session.user,
  };
}

export default connect(mapStateToProps)(App);
