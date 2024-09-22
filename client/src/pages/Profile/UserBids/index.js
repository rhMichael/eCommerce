import { Modal, Table, message } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../../redux/loadersSlice";
import moment from "moment";
import { GetAllBids } from "../../../apicalls/products";

function UserBids() {
  const [bidsData, setBidsData] = useState([]);
  const dispatch = useDispatch();
    const { user } = useSelector(state => state.users)

  const getData = async () => {
    try {
      dispatch(setLoading(true));
      const response = await GetAllBids({
        user: user._id
      });
      dispatch(setLoading(false));
      if (response.success) {
        console.log(response.data);
        setBidsData(response.data);
      }
    } catch (error) {
      dispatch(setLoading(false));
      message.error(error.message);
    }
  };

  const columns = [
    {
        title: "Product",
        dataIndex: "product",
        render: (test, record) => {
            return record.product.name;
        },
    },
    {
      title: "Bid Placed On",
      dataIndex: "createdAt",
      render: (text, record) => {
        return moment(text).format("DD-MM-YYYY hh:mm a");
      },
    },
    {
      title: "Seller",
      dataIndex: "seller",
      render: (text, record) => {
        return record.seller.name;
      },
    },
    {
        title: "Offered Price",
        dataIndex: "offeredPrice",
        render: (text, record) => {
            return record.product.price;
        }
    },
    {
      title: "Bid Amount",
      dataIndex: "bidAmount",
    },
    {
      title: "Message",
      dataIndex: "message",
    },
    {
      title: "Contact Details",
      dataIndex: "contactDetails",
      render: (text, record) => {
        return (
          <div>
            <p>Phone: {record.mobile}</p>
            <p>Email: {record.buyer.email}</p>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
      getData();
  }, []);

  return (
    <div>
      <Table columns={columns} dataSource={bidsData} />
    </div>
  );
}

export default UserBids;
