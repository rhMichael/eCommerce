import { Button, Table, message } from "antd";
import React, { useEffect, useState } from "react";
// import ProductsForm from "./ProductsForm";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../redux/loadersSlice";
import { UpdateProductStatus } from "../../apicalls/products";
import { GetAllUsers, UpdateUserstatus } from "../../apicalls/users";

function Users() {
  const [users, setUsers] = useState([]);

  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(setLoading(true));
      const response = await GetAllUsers(null);
      dispatch(setLoading(false));
      if (response.success) {
        setUsers(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(setLoading(false));
      message.error(error.message);
    }
  };

  const onStatusUpdate = async (id, status) => {
    try {
      dispatch(setLoading(true));
      const response = await UpdateUserstatus(id, status);
      dispatch(setLoading(false));
      if (response.success) {
        message.success(response.message);
        getData();
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      dispatch(setLoading(false));
      message.error(error.message);
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      render: (text, record) => {
        return record.role.toUpperCase();
      },
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      render: (text, record) =>
        moment(record.createdAt).format("DD-MM-YYYY hh:mm:ss A"),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text, record) => {
        return record.status.toUpperCase();
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => {
        const { status, _id } = record;
        return (
          <div className="flex gap-3">
            {status === "active" && (
              <span
                className="underline cursor-pointer"
                onClick={() => onStatusUpdate(_id, "blocked")}
              >
                Block
              </span>
            )}
            {status === "blocked" && (
              <span
                className="underline cursor-pointer"
                onClick={() => onStatusUpdate(_id, "active")}
              >
                Unblock
              </span>
            )}
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    getData();
  }, []);

  return <Table columns={columns} dataSource={users} />;
}

export default Users;
