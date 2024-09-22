import { Modal, Table, message } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setLoading } from "../../../redux/loadersSlice";
import { GetAllBids } from "../../../apicalls/products";
import moment from "moment";
import Divider from "../../../components/Divider";
function Bids({ showBidsModal, setShowBidsModal, selectedProduct }) {
  const [bidsData, setBidsData] = useState([]);
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(setLoading(true));
      const response = await GetAllBids({
        product: selectedProduct._id,
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

  // useEffect(() => {
  //   getData();
  // }, [])

  const columns = [
    {
      title: "Bid Placed On",
      dataIndex: "createdAt",
      render: (text, record) => {
        return moment(text).format("DD-MM-YYYY hh:mm a");
      },
    },
    {
      title: "Name",
      dataIndex: "name",
      render: (text, record) => {
        return record.buyer.name;
      },
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
    if (selectedProduct) {
      getData();
    }
  }, [selectedProduct]);

  return (
    <div>
      <Modal
        title=""
        open={showBidsModal}
        onOk={() => setShowBidsModal(false)}
        onCancel={() => setShowBidsModal(false)}
        centered
        width={1000}
        footer={null}
      >
        <div className="flex gap-3 flex-col">
          <h1 className="text-xl text-primary">Bids</h1>
          <Divider />
          <h1 className="text-xl text-primary">
            Product name: {selectedProduct.name}
          </h1>

          <Table columns={columns} dataSource={bidsData} />
        </div>
      </Modal>
    </div>
  );
}

export default Bids;
