import { Button, Table, message } from "antd";
import React, { useEffect, useState } from "react";
// import ProductsForm from "./ProductsForm";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../redux/loadersSlice";
import {
  EditProduct,
  GetProducts,
  UpdateProductStatus,
} from "../../apicalls/products";

function Products() {
  const [products, setProducts] = useState([]);
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(setLoading(true));
      const response = await GetProducts(null);
      dispatch(setLoading(false));
      if (response.success) {
        setProducts(response.data);
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
      const response = await UpdateProductStatus(id, status);
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
      title: "Product",
      dataIndex: "name",
    },
    {
      title: "Seller",
      dataIndex: "name",
      render: (text, record) => {
        return record.seller.name;
      },
    },
    {
      title: "Images",
      dataIndex: "image",
      render: (text, record) => {
        return record?.images?.length > 0 ? (
          <img
            src={record.images[0]}
            alt=""
            className="w-20 h-20 object-cover rounded-md"
          />
        ) : (
          ""
        );
      },
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Category",
      dataIndex: "category",
      render: (text, record) => {
        return record.category.toUpperCase();
      },
    },
    {
      title: "Age",
      dataIndex: "age",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text, record) => {
        return record.status.toUpperCase();
      },
    },
    {
      title: "Added On",
      dataIndex: "createdAt",
      render: (text, record) =>
        moment(record.createdAt).format("DD-MM-YYYY hh:mm:ss A"),
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => {
        const { status, _id } = record;
        return (
          <div className="flex gap-3">
            {status === "pending" && (
              <span
                className="underline cursor-pointer"
                onClick={() => onStatusUpdate(_id, "approved")}
              >
                Approve
              </span>
            )}
            {status === "pending" && (
              <span
                className="underline cursor-pointer"
                onClick={() => onStatusUpdate(_id, "rejected")}
              >
                Reject
              </span>
            )}

            {status === "approved" && (
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
                onClick={() => onStatusUpdate(_id, "approved")}
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

  return (
    <div>
      <Table columns={columns} dataSource={products} />
    </div>
  );
}

export default Products;
