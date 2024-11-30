import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import TPOGraphImg from './images/demo_graph_tpo.png';
import { Select, DatePicker } from "antd";
import { SearchOutlined } from "@ant-design/icons";

function PromoModal({ show, setShow }) {
  const handleClose = () => setShow(false);
  const [baseVolume, setBaseVolume] = useState("");
  const [incrementalVolume, setIncrementalVolume] = useState("");
  const [profitFromEvent, setProfitFromEvent] = useState("");
  const [incrementalProfitPoolEvent, setIncrementalProfitPoolEvent] = useState("");
  const [message, setMessage] = useState("");
  const [roi, setRoi] = useState("");
  const [timeFrame, setTimeFrame] = useState("");
  const [channelPerformance, setChannelPerformance] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const { RangePicker } = DatePicker;

  return (
    <>
      <Modal size="xl" show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title className="ml-auto">Create Promo</Modal.Title>
        </Modal.Header>
        <Modal.Body className="pb-1">
          <div className="grid grid-cols-[1fr_300px] gap-5">
            <div>
              <img src={TPOGraphImg} alt="Image" />
            </div>
            <form method="post" encType="multipart/form-data">
              <div className="grid grid-cols-1 gap-x-4">
                <div className="nla_form_project_name position-relative nla_form_field_block col-span-2">
                  <label htmlFor="baseVolume" className="mb-1 font-meduim">Base Volume</label>
                  <input
                    type="number"
                    value={baseVolume}
                    onChange={(e) => setBaseVolume(e.target.value)}
                    placeholder="Base Volume"
                    className="form-control"
                    required
                  />
                </div>
                <div className="nla_form_project_name position-relative nla_form_field_block col-span-2">
                  <label htmlFor="incrementalVolume" className="mb-1 font-meduim">Incremental Volume</label>
                  <input
                    type="number"
                    value={incrementalVolume}
                    onChange={(e) => setIncrementalVolume(e.target.value)}
                    placeholder="Incremental Volume"
                    className="form-control"
                    required
                  />
                </div>
                {/* <div className="nla_form_project_name position-relative nla_form_field_block col-span-2">
                  <textarea
                    name="promosion_message"
                    id=""
                    className="form-control"
                    placeholder="Type message..."
                    value=""
                    onChange={(e) => setMessage(e.target.value)}
                  ></textarea>
                </div> */}
                <div className="nla_form_field_block w-full">
                  <label htmlFor="incrementalVolume" className="mb-1 font-meduim">Promotion ROI for manufacturer</label>
                  <Select
                    placeholder="Select Retailer"
                    prefixIcon={<SearchOutlined />}
                    style={{
                      width: "100%",
                    }}
                    className="filtered-accordion-ant-select mb-3"
                    maxTagCount="responsive"
                  >
                    <Select.Option key="retailer1" value="Retailer 1">
                      Promotion 1
                    </Select.Option>
                    <Select.Option key="retailer2" value="Retailer 2">
                      Promotion 2
                    </Select.Option>
                  </Select>
                </div>
                <div className="nla_form_project_name position-relative nla_form_field_block col-span-2">
                  <label htmlFor="profitFromEvent" className="mb-1 font-meduim">Overall retailer profit from the event</label>
                  <input
                    type="number"
                    value={profitFromEvent}
                    onChange={(e) => setProfitFromEvent(e.target.value)}
                    placeholder="Incremental Volume"
                    className="form-control"
                    required
                  />
                </div>
                <div className="nla_form_project_name position-relative nla_form_field_block col-span-2">
                  <label htmlFor="profitFromEvent" className="mb-1 font-meduim">Incremental profit pool created by event</label>
                  <input
                    type="number"
                    value={incrementalProfitPoolEvent}
                    onChange={(e) => setIncrementalProfitPoolEvent(e.target.value)}
                    placeholder="Incremental Volume"
                    className="form-control"
                    required
                  />
                </div>
                {/*  <div className="nla_form_field_block">
                  <Select
                    placeholder="Select Brand"
                    prefixIcon={<SearchOutlined />}
                    style={{
                      width: "100%",
                    }}
                    className="filtered-accordion-ant-select mb-3"
                    maxTagCount="responsive"
                  >
                    <Select.Option key="brand1" value="Brand 1">
                      Brand 1
                    </Select.Option>
                    <Select.Option key="brand2" value="Brand 2">
                      Brand 2
                    </Select.Option>
                    <Select.Option key="brand3" value="Brand 3">
                      Brand 3
                    </Select.Option>
                  </Select>
                </div>
                <div className="nla_form_field_block">
                  <Select
                    placeholder="Select Product"
                    prefixIcon={<SearchOutlined />}
                    mode="multiple"
                    style={{
                      width: "100%",
                    }}
                    className="filtered-accordion-ant-select mb-3"
                    maxTagCount="responsive"
                  >
                    <Select.Option key="product1" value="Product 1">
                      Product 1
                    </Select.Option>
                    <Select.Option key="product2" value="Product 2">
                      Product 2
                    </Select.Option>
                    <Select.Option key="product3" value="Product 3">
                      Product 3
                    </Select.Option>
                  </Select>
                </div>
                <RangePicker className="w-full mb-3 h-[39px]"/>
                <div className="nla_form_field_block">
                  <Select
                    placeholder="Select Promotion Type"
                    prefixIcon={<SearchOutlined />}
                    style={{
                      width: "100%",
                    }}
                    className="filtered-accordion-ant-select mb-3"
                    maxTagCount="responsive"
                  >
                    <Select.Option key="promotiontype1" value="Promotion Type 1">
                      Promotion Type 1
                    </Select.Option>
                    <Select.Option key="promotiontype2" value="Promotion Type 2">
                      Promotion Type 2
                    </Select.Option>
                    <Select.Option key="promotiontype3" value="Promotion Type 3">
                      Promotion Type 3
                    </Select.Option>
                  </Select>
                </div>
                <div className="nla_form_field_block">
                  <Select
                    placeholder="Select Channel"
                    prefixIcon={<SearchOutlined />}
                    style={{
                      width: "100%",
                    }}
                    className="filtered-accordion-ant-select mb-3"
                    maxTagCount="responsive"
                  >
                    <Select.Option key="channel1" value="Channel 1">
                      Channel 1
                    </Select.Option>
                    <Select.Option key="channel2" value="Channel 2">
                      Channel 2
                    </Select.Option>
                    <Select.Option key="channel3" value="Channel 3">
                      Channel 3
                    </Select.Option>
                  </Select>
                </div>
                <div className="nla_form_project_name position-relative nla_form_field_block">
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Event Title"
                    className="form-control"
                    required
                  />
                </div> */}
                {/* <div className="nla_form_project_name position-relative nla_form_field_block">
                  <input
                    type="number"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    placeholder="Budget"
                    className="form-control font-normal"
                    required
                  />
                </div>
                <div className="nla_form_project_name position-relative nla_form_field_block">
                  <input
                    type="text"
                    value={title}
                    onChange={setRoi}
                    placeholder="ROI Calculate"
                    className="form-control"
                    required
                  />
                </div>
                <div className="nla_form_project_name position-relative nla_form_field_block">
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Forcast Uplift Calculate"
                    className="form-control"
                    required
                  />
                </div>
                <div className="nla_form_field_block">
                  <Select
                    placeholder="Select Status"
                    prefixIcon={<SearchOutlined />}
                    style={{
                      width: "100%",
                    }}
                    className="filtered-accordion-ant-select mb-3"
                    maxTagCount="responsive"
                  >
                    <Select.Option value="active">Active</Select.Option>
                  <Select.Option value="inprocess">Inprocess</Select.Option>
                  <Select.Option value="pending">Pending</Select.Option>
                  </Select>
                </div> */}
              </div>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer className="justify-center pb-3">
          <Button variant="secondary" className="w-auto" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default PromoModal;