import { useSelector, useDispatch } from "react-redux";
import { togglePanel, removeNotification } from "../app/notificationSlice";
import { FaBell, FaTimes } from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import * as PushAPI from "@pushprotocol/restapi"
import { addNotification } from "../app/notificationSlice";

const NotificationPanel = () => {
  const dispatch = useDispatch();
  const { isOpen, items } = useSelector((state) => state.notifications);

  const handleClick = () => {
    dispatch(togglePanel());
  };

//   const handleSendNotification = async () => {
//     const notifications = await PushAPI.user.getFeeds({
//         user: `eip155:80001:0xD490fB9eee2578444CFa56D74B4afaf215EfC269`, // user address in CAIP
//         env: "staging",
//       });
//     dispatch(addNotification(notifications));
//     console.log(notifications);
//   };

  
//   const NotificationReceiver = async (props) => {
//     const notifications = await PushAPI.user.getFeeds({
//       user: `eip155:80001:${address}`, // user address in CAIP
//       env: "staging",
//     });
//     SetNotification(notifications);
//     console.log(notifications);
//   };

  const handleRemove = (sid) => {
    dispatch(removeNotification({ sid }));
  };

  return (
    <>
   
      <ToastContainer />
      <div className="fixed top-4 right-4 z-50">
        {/* <button
          className="relative rounded-full p-2 bg-blue-500 text-white focus:outline-none"
          onClick={handleClick}
        >
          <FaBell size={20} />
          {items.length > 0 && (
            <span className="absolute top-0 right-0 rounded-full bg-red-500 text-white font-bold text-xs px-2">
              {items.length}
            </span>
          )}
        </button> */}
        {isOpen && (
          <div className="bg-white rounded-md shadow-lg p-4 absolute top-20 right-0 w-80 h-96 overflow-y-auto">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-bold">Notifications</h2>
              <button
                className="p-1 rounded-full hover:bg-gray-200 focus:outline-none"
                onClick={handleClick}
              >
                <FaTimes size={18} />
              </button>
            </div>
            <div className="flex flex-col gap-2">
              {items.map((item) => (
                <div
                  key={item.sid}
                  className="flex items-center justify-between border-b border-gray-200 py-2"
                >
                  <div className="flex items-center gap-2">
                    <div className="bg-gray-200 rounded-full p-2">
                      {/* {item.icon} */}
                    </div>
                    <div>
                      <h3 className="font-bold">{item.title}</h3>
                      <p className="text-sm">{item.message}</p>
                    </div>
                  </div>
                  <button
                    className="p-1 rounded-full hover:bg-gray-200 focus:outline-none"
                    onClick={() => handleRemove(item.sid)}
                  >
                    <FaTimes size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default NotificationPanel;
