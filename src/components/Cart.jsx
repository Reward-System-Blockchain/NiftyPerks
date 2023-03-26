import React, { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCartItems,
  selectCartState,
  selectTotalAmount,
  selectTotalQTY,
  setClearCartItems,
  setCloseCart,
  setGetTotals,
} from "../app/CartSlice.js";
import CartCount from "./cart/CartCount";
import CartEmpty from "./cart/CartEmpty";
import CartItem from "./cart/CartItem";
import { sendNotifications } from "./notification/SendNotifications.jsx";

import { Polybase } from "@polybase/client";
import Web3 from "web3";
import axios from "axios";

const Cart = () => {
  const address = localStorage.getItem("walletAddress");
  const polybase_pk =
    "0x4d7f64eda64e488783ad02f434f0f68dfd4cb86414a5e843fdeabbd232697221c06a62243bb0251a79d45bb3c6e9f4e41e8755b1857afd06c2462517f350069d";

  const db = new Polybase({
    // defaultNamespace: "pk/0x4d7f64eda64e488783ad02f434f0f68dfd4cb86414a5e843fdeabbd232697221c06a62243bb0251a79d45bb3c6e9f4e41e8755b1857afd06c2462517f350069d/RewardSystem",

    defaultNamespace: `pk/${polybase_pk}/NiftyPerks1`,
  });

  const collectionReference = db.collection("nft");

  async function getPoints() {
    const data = await db.collection("nft").record(address).get();
    console.log(data.data.points);
    return data.data.points;
  }

  async function updateRecord() {
    // .create(functionName, args) args array is defined by the updateName fn in collection schema
    var currentPoint = await getPoints();
    const setPoints = await collectionReference
      .record(address)
      .call("setPoints", [currentPoint + 50]);
    console.log(setPoints);
    const setTier = await collectionReference
      .record(address)
      .call("setTier", ["Bronze"]);
    console.log(setTier);
  }

  const dispatch = useDispatch();
  const ifCartState = useSelector(selectCartState);
  const cartItems = useSelector(selectCartItems);
  const totalAmount = useSelector(selectTotalAmount);
  const totalQTY = useSelector(selectTotalQTY);

  // console.log(cartItems)

  useEffect(() => {
    dispatch(setGetTotals());
  }, [cartItems, dispatch]);

  const onCartToggle = () => {
    dispatch(
      setCloseCart({
        cartState: false,
      })
    );
  };
  const onCheckOut = () => {
    sendNotifications();
    updateRecord();
    console.log("Check Out");
    onClearCartItems();
    onCartToggle();
    toast.success("Purchase Successful");
  };

  const onClearCartItems = () => {
    dispatch(setClearCartItems());
  };

  return (
    <>
      <div
        className={`fixed top-0 left-0 right-0 bottom-0 blur-effect-theme duration-500 w-full h-screen opacity-100 z-[250] ${
          ifCartState
            ? "opacity-100 visible translate-x-0"
            : "opacity-0 invisible translate-x-8"
        }`}
      >
        <div
          className={`blur-effect-theme duration-500 h-screen max-w-xl w-full absolute right-0 ${
            ifCartState
              ? "opacity-100 visible translate-x-0"
              : "opacity-0 invisible translate-x-8"
          }`}
        >
          <CartCount
            totalQTY={totalQTY}
            onCartToggle={onCartToggle}
            onClearCartItems={onClearCartItems}
          />
          {cartItems?.length === 0 ? (
            <CartEmpty onCartToggle={onCartToggle} />
          ) : (
            <div>
              <div className="flex items-start justify-start flex-col gap-y-7 lg:gap-y-5 overflow-y-scroll h-[81vh] scroll-smooth scroll-hidden py-3">
                {cartItems?.map((item, i) => (
                  <CartItem key={i} item={item} />
                ))}
              </div>

              <div className="fixed bottom-0 bg-white w-full px-5 py-2 grid items-center">
                <div className="flex items-center justify-between">
                  <h1 className="text-base font-semibold uppercase">
                    SubTotal
                  </h1>
                  <h1 className="text-sm rounded bg-theme-cart text-slate-100 px-1 py-0.5">
                    ₹{totalAmount}
                  </h1>
                </div>
                <div className="grid items-center gap-2">
                  <p className="text-sm font-medium text-center">
                    Taxes and Shipping Will Calculate At Shipping
                  </p>
                  <button
                    type="button"
                    onClick={onCheckOut}
                    className="button-theme bg-theme-cart text-white"
                  >
                    Check Out
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
