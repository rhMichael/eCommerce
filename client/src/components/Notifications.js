import { Modal, Tabs, message } from "antd";
import React from "react";
import Divider from "./Divider";
import { useNavigate } from "react-router";
import moment from "moment";
import { DeleteNotification } from "../apicalls/notifications";
import { useDispatch } from "react-redux";
import { setLoading } from "../redux/loadersSlice";

function Notifications({
  notifications = [],
  reloadNotifications,
  showNotifications,
  setShowNotifications,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const deleteNotification = async (id) => {
    try {
      dispatch(setLoading(true));
      const response = await DeleteNotification(id);
      dispatch(setLoading(false));
      if (response.success) {
        message.success(response.message);
        reloadNotifications();
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  return (
    <Modal
      title="Notifications"
      open={showNotifications}
      onCancel={() => setShowNotifications(false)}
      footer={null}
      centered
      width={1000}
    >
      <div className="flex flex-col gap-2">
        {notifications.map((notification) => (
          <div
            className="flex flex-col gap-2 border border-solid border-gray-300 rounded p-2"
            key={notification._id}
          >
            <div className="flex justify-between items-center ">
              <div
                onClick={() => {
                  navigate(notification.onClick);
                  setShowNotifications(false);
                }}
              >
                <h1 className="text-gray-700">{notification.title}</h1>
                <span className="text-gray-600">{notification.message}</span>
                <h1 className="text-gray-500 text-sm">
                  {moment(notification.createdAt).fromNow()}
                </h1>
              </div>
              <i
                className="ri-delete-bin-line"
                onClick={() => deleteNotification(notification._id)}
              ></i>
            </div>
          </div>
        ))}
      </div>
    </Modal>
  );
}

export default Notifications;
