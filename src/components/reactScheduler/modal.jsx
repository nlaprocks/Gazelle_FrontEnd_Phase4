import React, { useState, useEffect } from "react";
import { Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";
// import "../../utils/newInsights/filterAccordion/filterAccordion.css";

const EventModal = ({ onClose, onCreate, start, end }) => {
  const [title, setTitle] = useState("");
  const [salesUplift, setSalesUplift] = useState("");
  const [budget, setBudget] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [roi, setRoi] = useState("");
  const [timeFrame, setTimeFrame] = useState("");
  const [channelPerformance, setChannelPerformance] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      onCreate(title, start, end);
      setTitle("");
      onClose();
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 z-50 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`bg-white p-4 rounded shadow-lg max-w-xl w-full transition-transform duration-300 ${
          isVisible ? "scale-100" : "scale-90"
        }`}
      >
        <h2 className="text-lg font-bold mb-3 text-center">Create New Event</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Event Title"
            className="border px-2 py-1 w-full mb-2"
            required
          />

          <Select
            mode="multiple"
            placeholder="Select Retailer"
            prefixIcon={<SearchOutlined />}
            //   value={selectedRetailers}
            style={{
              width: "100%",
            }}
            className="filtered-accordion-ant-select mb-2"
            maxTagCount="responsive"
          >
            <Select.Option key="retailer1" value="Retailer 1">
              Retailer 1
            </Select.Option>
            <Select.Option key="retailer2" value="Retailer 2">
              Retailer 2
            </Select.Option>
            <Select.Option key="retailer3" value="Retailer 3">
              Retailer 3
            </Select.Option>
            <Select.Option key="retailer4" value="Retailer 4">
              Retailer 4
            </Select.Option>
            <Select.Option key="retailer5" value="Retailer 5">
              Retailer 5
            </Select.Option>
          </Select>
          {/* Sales Uplift Filter */}
          <Select
            placeholder="Select Sales Uplift "
            value={salesUplift}
            onChange={setSalesUplift}
            className="mb-2 w-full"
          >
            <Select.Option value="high">High</Select.Option>
            <Select.Option value="medium">Medium</Select.Option>
            <Select.Option value="low">Low</Select.Option>
          </Select>

          {/* Budget Filter */}
          <input
            type="number"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            placeholder="Budget"
            className="border px-2 py-1 w-full mb-2"
          />

          {/* Product Category Filter */}
          <Select
            placeholder="Product Category"
            value={productCategory}
            onChange={setProductCategory}
            className="mb-2 w-full"
          >
            <Select.Option value="electronics">Electronics</Select.Option>
            <Select.Option value="clothing">Clothing</Select.Option>
            <Select.Option value="groceries">Groceries</Select.Option>
          </Select>

          {/* ROI Filter */}
          <Select placeholder="ROI" value={roi} onChange={setRoi} className="mb-2 w-full">
            <Select.Option value="high">High</Select.Option>
            <Select.Option value="medium">Medium</Select.Option>
            <Select.Option value="low">Low</Select.Option>
          </Select>

          {/* Time Frame Filter */}
          <Select placeholder="Time Frame" value={timeFrame} onChange={setTimeFrame} className="mb-2 w-full">
            <Select.Option value="short-term">Short-Term</Select.Option>
            <Select.Option value="mid-term">Mid-Term</Select.Option>
            <Select.Option value="long-term">Long-Term</Select.Option>
          </Select>

          {/* Channel Performance Filter */}
          <Select
            placeholder="Channel Performance"
            value={channelPerformance}
            onChange={setChannelPerformance}
            className="mb-2 w-full"
          >
            <Select.Option value="ecommerce">E-commerce</Select.Option>
            <Select.Option value="in-store">In-Store</Select.Option>
            <Select.Option value="both">Both</Select.Option>
          </Select>
          <div className="flex justify-between items-center gap-5">
            <button onClick={handleClose} className="mt-2 text-red-500">
              Cancel
            </button>
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">
              Create Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventModal;
