import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectTotalQTY, setOpenCart } from "../app/CartSlice.js";
// import { Link } from "react-router-dom";
// import { selectUser } from "../app/UserSlice.js";
// import { auth } from "../firebase.js";
// import { useHistory } from "react-router-dom";
// import UserProfilePage from "./UserProfilePage.jsx";

import NotificationPanel from "./NotificationPanel.jsx";
import { togglePanel } from "../app/notificationSlice.js";
import { addNotification } from "../app/notificationSlice.js";
import handleSendNotification from "../app/notificationSlice.js";
import {
  BellIcon,
  UserIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline";
import logo from "../assets/logo.png";
import * as PushAPI from "@pushprotocol/restapi"
import { Web3Button } from "@web3modal/react";

const Navbar = () => {
  const [navState, setNavState] = useState(false);
  const dispatch = useDispatch();
  const { isOpen, items } = useSelector((state) => state.notifications);
  const totalQTY = useSelector(selectTotalQTY);

  const handleToggle = () => {
    dispatch(togglePanel());
  };

  const [notification, SetNotification] = useState([]);
  const handleSendNotification = async () => {
    const notifications = await PushAPI.user.getFeeds({
        user: `eip155:80001:0xD490fB9eee2578444CFa56D74B4afaf215EfC269`, // user address in CAIP
        env: "staging",
      });
     SetNotification(notifications);
    notification.map((item,index) => {
      dispatch(addNotification(item));
      console.log(item);
    });
  };


  // const handleSendNotification = () => {
  //   const notification = {
  //     id: Date.now(),
  //     title: "New Notification",
  //     message: "This is a new notification",
  //   };
  //   dispatch(addNotification(notification));
  // };

  const onCartToggle = () => {
    dispatch(
      setOpenCart({
        cartState: true,
      })
    );
  };
  const onUserToggle = () => {
    location.href = "/profile";
    console.log("User Profile Page");
  };

  const onNavScroll = () => {
    if (window.scrollY > 30) {
      setNavState(true);
    } else {
      setNavState(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", onNavScroll);

    return () => {
      window.removeEventListener("scroll", onNavScroll);
    };
  }, []);
  return (
    <>
      <header
        className={
          !navState
            ? "absolute top-4 left-0 right-0 opacity-100 z-50"
            : "fixed top-0 left-0 right-0 h-[9vh] flex items-center justify-center opacity-100 z-[200] blur-effect-theme"
        }
      >
        <nav className="flex items-center justify-between nike-container">
          <div className="flex items-center">
            <img
              src={logo}
              alt="logo/img"
              className={`w-16 h-auto ${navState && "filter brightness-0"}`}
            />
          </div>
          <ul className="flex items-center justify-center gap-2">
            <li className="grid items-center">
              <button
                type="button"
                onClick={onUserToggle}
                className="border-none outline-none active:scale-110 transition-all duration-300 relative"
              >
                <UserIcon
                  className={`icon-style ${
                    navState && "text-slate-900 transition-all duration-300"
                  }`}
                />
                {/* <div
                  className={`absolute top-4 right-0 shadow w-4 h-4 text-[0.65rem] leading-tight font-medium rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-all duration-300 ${
                    navState
                      ? "bg-slate-900 text-slate-100 shadow-slate-900"
                      : "bg-slate-100 text-slate-900 shadow-slate-100"
                  }`}
                >
                  {totalQTY}
                </div> */}
              </button>
            </li>
            {/* <li className="grid items-center">
            <button onClick={handleToggle}>
              <BellIcon
                className={`icon-style ${
                  navState && "text-slate-900 transition-all duration-300"
                }`}
              />
              {items.length > 0 && (
              <span>{items.length}</span>
            )}
          </button>
          {isOpen && <NotificationPanel />}
            </li> */}
            <li className="grid items-center">
              <button
                type="button"
                onClick={onCartToggle}
                className="border-none outline-none active:scale-110 transition-all duration-300 relative"
              >
                <ShoppingBagIcon
                  className={`icon-style ${
                    navState && "text-slate-900 transition-all duration-300"
                  }`}
                />
                <div
                  className={`absolute top-4 right-0 shadow w-4 h-4 text-[0.65rem] leading-tight font-medium rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-all duration-300 ${
                    navState
                      ? "bg-slate-900 text-slate-100 shadow-slate-900"
                      : "bg-slate-100 text-slate-900 shadow-slate-100"
                  }`}
                >
                  {totalQTY}
                </div>
              </button>
            </li>
            <li>
              <div>
                <button onClick={handleSendNotification}>
                  Send Notification
                </button>
              </div>
            </li>
            <li className="grid items-center">
              <button onClick={handleToggle}
              className="border-none outline-none active:scale-110 transition-all duration-300 relative"
              >
                <BellIcon
                  className={`icon-style ${
                    navState && "text-slate-900 transition-all duration-300"
                  }`}
                />
                <div
                  className={`absolute top-4 right-0 shadow w-4 h-4 text-[0.65rem] leading-tight font-medium rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-all duration-300 ${
                    navState
                      ? "bg-slate-900 text-slate-100 shadow-slate-900"
                      : "bg-slate-100 text-slate-900 shadow-slate-100"
                  }`}
                >
                { <span>{items.length}</span>}
                </div>
              </button>
              {isOpen && <NotificationPanel />}
            </li>

            <li>
              <Web3Button label="Connect Wallet" balance="show" />
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
