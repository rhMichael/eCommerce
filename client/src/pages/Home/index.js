import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../redux/loadersSlice";
import { GetProducts } from "../../apicalls/products";
import { Input, message } from "antd";
import { useNavigate } from "react-router";
import Divider from "../../components/Divider";
import Filters from "./Filters";
import moment from "moment";

function Home() {
  const [showFilters, setShowFilters] = useState(true);
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    status: "approved",
    category: [],
    age: [],
  });
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);

  const getData = async () => {
    try {
      dispatch(setLoading(true));
      const response = await GetProducts(filters);
      dispatch(setLoading(false));
      if (response.success) {
        setProducts(response.data);
      }
    } catch (error) {
      dispatch(setLoading(false));
      message.error(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, [filters])

  return (
    <div className="flex gap-5 bg-gray">
      {showFilters && (
        <Filters
          filters={filters}
          setFilters={setFilters}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
        />
      )}
      <div className="flex flex-col gap-5 w-full">
        <div className="flex gap-5 items-center">
          {!showFilters && (
            <i
              className="ri-equalizer-line text-xl"
              onClick={() => setShowFilters(!showFilters)}
            ></i>
          )}
          <input
            type="text"
            placeholder="Search Products here..."
            className="border border-gray-300 rounded border-solid w-full px-2 py-1 h-14"
          />
        </div>
        <div
          className={`
            grid gap-5 ${showFilters ? "grid-cols-4" : "grid-cols-5"} w-full`}
        >
          {products?.map((product) => {
            return (
              <div
                className="border border-gray-300 rounded border-solid flex flex-col cursor-pointer gap-2 pb-2"
                key={product._id}
                onClick={() => navigate(`/product/${product._id}`)}
              >
                <img
                  src={product.images[0]}
                  className="w-full h-52 p-2 rounded-md object-cover"
                  alt=""
                  style={{ width: "min-content", margin: "auto" }}
                />
                <div className="px-2 flex flex-col">
                  <h1 className="text-lg font-semibold">{product.name}</h1>
                  <p className="text-sm">
                    
                      {product.age} {" "}
                      {product.age == "1" ? "Year" : "Years"} {" "}
                      Old
                  </p>
                  <Divider />
                  <span className="text-xl font-semibold text-green-700">
                    $ {product.price}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Home;
