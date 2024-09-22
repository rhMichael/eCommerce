import { Col, Form, Input, Modal, Row, Select, Tabs, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../../redux/loadersSlice";
import { AddProduct, EditProduct } from "../../../apicalls/products";
import Images from "./Images";

const addtionalThings = [
  {
    label: "Bill Available",
    name: "billAvailable",
  },
  {
    label: "Warranty Available",
    name: "warrantyAvailable",
  },
  {
    label: "Accessories Available",
    name: "accessoriesAvailable",
  },
  {
    label: "Box Available",
    name: "boxAvailable",
  },
];

const rules = [
  {
    required: true,
    message: "Required",
  },
];

function ProductsForm({
  showProductForm,
  setShowProductForm,
  selectedProduct,
  getData,
}) {
  const dispatch = useDispatch();

  const [selectedTab = "1", setSeletedTab] = useState("1");

  const formRef = useRef(null);
  const { user } = useSelector((state) => state.users);

  useEffect(() => {
    if (selectedProduct) {
      formRef.current.setFieldsValue(selectedProduct);
    }
  }, [selectedProduct]);

  const onFinish = async (values) => {
    console.log("Success:", values);
    try {
      dispatch(setLoading(true));
      let response = null;
      if (selectedProduct) {
        response = await EditProduct(selectedProduct._id, values);
      } else {
        values.seller = user._id;
        values.status = "pending";
        response = await AddProduct(values);
      }
      dispatch(setLoading(false));
      if (response.success) {
        message.success(response.message);
        getData();
        setShowProductForm(false);
      }
    } catch (error) {
      dispatch(setLoading(false));
      message.error(error.message);
    }
  };

  return (
    <Modal
      title=""
      open={showProductForm}
      onCancel={() => setShowProductForm(false)}
      centered
      width={1000}
      okText="Save"
      onOk={() => {
        formRef.current.submit();
        // ?.validateFields().then((values) => {
        // console.log("Success:", values);
        // })
      }}
      {...(selectedTab === "2" && { footer: false })}
    >
      <div>
        <h1 className="text-primary text-xl text-center font-semibold uppercase">
          {selectedProduct ? "Edit Product" : "Add Product"}
        </h1>
        <Tabs
          defaultActiveKey="1"
          activeKey={selectedTab}
          onChange={(key) => setSeletedTab(key)}
        >
          <Tabs.TabPane tab="General" key="1">
            <Form layout="vertical" ref={formRef} onFinish={onFinish}>
              <Form.Item label="Name" name="name" rules={rules}>
                <Input type="text" />
              </Form.Item>
              <Form.Item label="Description" name="description" rules={rules}>
                <TextArea type="text" />
              </Form.Item>

              <Row gutter={[16, 16]}>
                <Col span={8}>
                  <Form.Item label="Price" name="price" rules={rules}>
                    <Input type="number" />
                  </Form.Item>
                </Col>

                <Col span={8}>
                  <Form.Item label="Category" name="category" rules={rules}>
                    <Select>
                      <Select.Option value="select">Select</Select.Option>
                      <Select.Option value="electronics">
                        Electronics
                      </Select.Option>
                      <Select.Option value="fashion">Fashion</Select.Option>
                      <Select.Option value="home">Home</Select.Option>
                      <Select.Option value="sports">Sports</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>

                <Col span={8}>
                  <Form.Item label="Age" name="age" rules={rules}>
                    <Input type="number" />
                  </Form.Item>
                </Col>
              </Row>

              <div className="flex gap-10">
                {addtionalThings.map((item) => {
                  return (
                    <Form.Item
                      label={item.label}
                      name={item.name}
                      valuePropName="checked"
                    >
                      <Input
                        type="checkbox"
                        value={item.name}
                        onChange={(e) => {
                          formRef.current.setFieldsValue({
                            [item.name]: e.target.checked,
                          });
                        }}
                        checked={formRef.current?.getFieldsValue(item.name)}
                      />
                    </Form.Item>
                  );
                })}
              </div>

              <Form.Item
                label="Show Bids on Product Page"
                name="showBidsOnProductPage"
                valuePropName="checked"
              >
                <Input
                  type="checkbox"
                  onChange={(e) => {
                    formRef.current.setFieldsValue({
                      showBidsOnProductPage: e.target.checked,
                    });
                  }}
                  checked={formRef.current?.getFieldsValue('showBidsOnProductPage')}
                />
              </Form.Item>
            </Form>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Images" key="2" disabled={!selectedProduct}>
            <Images
              selectedProduct={selectedProduct}
              getData={getData}
              setShowProductForm={setShowProductForm}
            />
          </Tabs.TabPane>
        </Tabs>
      </div>
    </Modal>
  );
}

export default ProductsForm;
