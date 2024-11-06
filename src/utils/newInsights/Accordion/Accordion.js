import React, { useRef } from "react";
import Accordion from "react-bootstrap/Accordion";
import DropDown from "../../../components/dropDown/DropDown";
import { ReactComponent as Edit } from "../../../assets/newIcons/Icon_feather-edit-2.svg";
import { ReactComponent as Delete } from "../../../assets/newIcons/Icon_material-delete-forever.svg";
import { ReactComponent as Copy } from "../../../assets/newIcons/feather-copy.svg";
import { useClickAway } from "react-use";
import EditHeading from "../editHeading/EditHeading";
import allActions from "../../../store/index";
import { useSelector, useDispatch } from "react-redux";
import RunDemo from "../../../components/pptDownloader/PptDownloader";
import FilterDropDown from "../../../components/filterDropDown/FilterDropDown";
import { useParams } from "react-router";
// import Chart1 from "../charts/apache-echarts/chart1";
import LineBar from "../charts/apache-echarts/LineBar";
import MultiLine from "../charts/apache-echarts/MultiLine";
import MultiLine2 from "../charts/apache-echarts/MultiLine2";
import PromotedDepthChart from "../charts/apache-echarts/PromotedDepthChart";
import PromotionalLiftChart from "../charts/apache-echarts/PromotionalLiftChart";
import LiftChart from "../charts/apache-echarts/LiftChart";
import ElasticityStratagyChart from "../charts/apache-echarts/ElasticityStratagyChart";
import ProfitCurvesChart from "../charts/apache-echarts/ProfitCurvesChart";
import PriceSlopeChart from "../charts/apache-echarts/PriceSlopeChart";
import BarChartUser from "../charts/apache-echarts/userCharts/BarChartUser";
import RadarChartUser from "../charts/apache-echarts/userCharts/RadarChartUser";
import Bar from "../charts/apache-echarts/chart1_brand";
import BarRetailor from "../charts/apache-echarts/chart1_retailer";
// import Bar from "../charts/apache-echarts/chart1";


const AccordionComp = ({ value, id, setAddHeadingModal, setShowTakeawayModal, setUpdateTakeawayModal, setCurrentBullets, setShowAddChartModal, setCurrentSlideId,
  setShowUpdateChartModal, setUpdateChartData, role, callingQuestionsOnReducersSuccess, filterDropDown, setFilterDropDown, }) => {

  const { model_id } = useParams();
  const dispatch = useDispatch();

  // console.log("filterDropDown::: ", filterDropDown);
  // ** this state is to keep the track of active filterDropDown
  const [clickedIndex, setClickedIndex] = React.useState(null);
  // console.log("clickedIndex::: ", clickedIndex);
  const [notes, setNotes] = React.useState(false);
  const [chartModel, setChartModel] = React.useState('Brand')

  const [notesState, setNotesState] = React.useState({
    model_id: model_id,
    slide_id: 0,
    notes: "",
  });

  const deleteTakeawayReducer = useSelector((state) => state.deleteTakeawayReducer);
  const filterUsersChartReducer = useSelector((state) => state.filterUsersChartReducer);
  const copyChartReducer = useSelector((state) => state.copyChartReducer);
  const deleteChartReducer = useSelector((state) => state.deleteChartReducer);
  const deleteSlideReducer = useSelector((state) => state.deleteSlideReducer);
  const addUpdateNoteReducer = useSelector((state) => state.addUpdateNoteReducer);
  const [dropDownState, setDropDownState] = React.useState(false);

  const [deleteTakeaway, setDeleteTakeaway] = React.useState({
    model_id: model_id,
    slide_id: null,
  });

  const toggleDropDown = () => {
    dropDownState ? setDropDownState(false) : setDropDownState(true);
  };

  // const allQuestionsReducer = useSelector((state) => state.getAdminQuestionReducer);
  // console.log("allQuestionsReducer::: ", allQuestionsReducer);

  const deleteTakeawayHandler = () => {
    dispatch(allActions.deleteTakeawayAction.deleteTakeaway(deleteTakeaway));
  };

  const ref = React.useRef();
  const ref1 = React.useRef();

  useClickAway(ref, () => setDropDownState(false));

  React.useEffect(() => {
    setDeleteTakeaway({ ...deleteTakeaway, slide_id: value.id });
    setNotesState({
      ...notesState,
      slide_id: value.id,
      notes: value?.Notes?.length > 0 ? value?.Notes[0]?.notes : "",
    });
  }, [value]);

  React.useEffect(() => {
    if (filterUsersChartReducer.success) {
      dispatch(allActions.getAllSlidesAction.getAllSlide(model_id));
      setFilterDropDown(false);
      delete filterUsersChartReducer.success;
    }
  }, [filterUsersChartReducer]);

  React.useEffect(() => {
    if (deleteTakeawayReducer.success) {
      dispatch(allActions.getAdminQuestionByModelIdAction.getAdminQuestionByModelId(model_id));
      callingQuestionsOnReducersSuccess(deleteTakeawayReducer);
      delete deleteTakeawayReducer.success;
    }
  }, [deleteTakeawayReducer]);

  React.useEffect(() => {
    if (copyChartReducer.success) {
      callingQuestionsOnReducersSuccess(copyChartReducer);
      delete copyChartReducer.success;
    }
  }, [copyChartReducer]);

  React.useEffect(() => {
    if (deleteChartReducer.success) {
      callingQuestionsOnReducersSuccess(deleteChartReducer);
      delete deleteChartReducer.success;
    }
  }, [deleteChartReducer]);

  React.useEffect(() => {
    if (addUpdateNoteReducer.success || deleteSlideReducer.success) {
      dispatch(allActions.getAdminQuestionByModelIdAction.getAdminQuestionByModelId(model_id));

      callingQuestionsOnReducersSuccess(addUpdateNoteReducer || deleteSlideReducer);
      delete addUpdateNoteReducer.success;
    }
  }, [addUpdateNoteReducer]);

  React.useEffect(() => {
    if (deleteSlideReducer.success) {
      callingQuestionsOnReducersSuccess(deleteSlideReducer);
      dispatch(allActions.getAllQuestionTypesAction.getAllQuestionTypes(model_id));
      delete deleteSlideReducer.success;
    }
  }, [deleteSlideReducer]);

  const chart1Reducer = useSelector((state) => state.chart1Reducer);
  const chart2Reducer = useSelector((state) => state.chart2Reducer);
  const chart3Reducer = useSelector((state) => state.chart3Reducer);
  const chart4Reducer = useSelector((state) => state.chart4Reducer);
  const chart5Reducer = useSelector((state) => state.chart5Reducer);
  const chart6Reducer = useSelector((state) => state.chart6Reducer);
  const chart7Reducer = useSelector((state) => state.chart7Reducer);
  const chart8Reducer = useSelector((state) => state.chart8Reducer);
  const chart9Reducer = useSelector((state) => state.chart9Reducer);
  const chart10Reducer = useSelector((state) => state.chart10Reducer);


  return (
    <div id="insightsAccordions" >
      <Accordion defaultActiveKey="10">
        <Accordion.Item eventKey="0" id="myHtmlTableID">
          <Accordion.Header>
            <>
              <div className={`theme_badge ${value?.type}`}>
                <span>{value?.type}</span>
                <span className="nla_number">{id + 1}</span>
              </div>
              <p>{value?.question}</p>
              {/* {id !== 8 ? <RunDemo value={value} id={id} role={role} /> : null} */}
              <span className="nla_results">Results</span>
            </>
          </Accordion.Header>
          <Accordion.Body>
            <div className="row">
              <div className="col-lg-12">
                <div className="nla_accordion-content-title-with-filter-block position-relative">
                  {value?.SlideNames?.length > 0 ? (
                    <EditHeading
                      slideName={value.SlideNames}
                      callingQuestionsOnReducersSuccess={callingQuestionsOnReducersSuccess}
                    />
                  ) : null}

                  <div className="nla_filter_block ms-auto position-relative" ref={ref1}>
                    {role === "admin" ? (
                      <div className="nla_filter_block position-relative m-0">
                        <div
                          className="nla_filter m-0"
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            setFilterDropDown(!filterDropDown);
                            // setClickedIndex(id);
                            setClickedIndex((prevIndex) => (prevIndex === id ? null : id));
                          }}
                        >
                          <i className="fa-solid fa-filter"></i>
                        </div>
                        {clickedIndex !== null && clickedIndex === id ? (
                          <FilterDropDown
                            chartData={value.Charts}
                            role={role}
                            callingQuestionsOnReducersSuccess={callingQuestionsOnReducersSuccess}
                            setFilterDropDown={setFilterDropDown}
                            setClickedIndex={setClickedIndex}
                          />
                        ) : null}
                      </div>
                    ) : null}

                    <div className="dropdown" ref={ref}>
                      <button className="btn btn-primary dropdown-toggle" onClick={toggleDropDown}>
                        + Add Item
                      </button>
                      {dropDownState ? (
                        <DropDown
                          setAddHeadingModal={setAddHeadingModal}
                          setShowTakeawayModal={setShowTakeawayModal}
                          setShowAddChartModal={setShowAddChartModal}
                          setCurrentSlideId={setCurrentSlideId}
                          slideId={value.id}
                          role={role}
                          value={value}
                        />
                      ) : null}
                    </div>
                    {/* {
                      id !== 8 ?
                        <div className="btn btn-primary">
                          <RunDemo value={value} id={id} role={role} />
                        </div>
                        :
                        <></>
                    } */}
                      {
                      
                        <div className="btn btn-primary">
                          <RunDemo value={value} id={id} role={role} />
                        </div>
                        
                    }
                    
                    {role !== "admin" ? (
                      <button className="btn btn-danger deleteSlideBtn">
                        <a
                          href="#!"
                          className=""
                          onClick={(e) => {
                            e.preventDefault();
                            dispatch(
                              allActions.deleteSlideAction.deleteSlide({
                                model_id: model_id,
                                slide_id: value?.id,
                              })
                            );
                          }}
                        >
                          Delete Slide <i className="fa-solid fa-trash"></i>
                        </a>
                      </button>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
            <div className="row align-items-stretch">
              {role === "admin" ? (
                <div className="col-lg-12">
                  {id === 0 ? (
                    <>
                      {chart1Reducer?.chart1Data?.data?.length > 0 ? (
                        // **chart1
                        chartModel === 'Brand' ?
                          <>
                            {/* <Chart1 isLoading={chart1Reducer?.loading} /> */}
                            <Bar isLoading={chart1Reducer?.loading} chartModel={chartModel} setChartModel={setChartModel} />
                          </>
                          :
                          <>
                            {/* <Chart1 isLoading={chart1Reducer?.loading} setChartModel={setChartModel} /> */}
                            <BarRetailor isLoading={chart1Reducer?.loading} chartModel={chartModel} setChartModel={setChartModel} />
                          </>
                      ) : (
                        <div className="text-center">Data not Found</div>
                      )}
                    </>
                  ) : id === 1 ? (
                    // **chart2
                    <>
                      {chart2Reducer?.chart2Data?.data?.length > 0 ? (
                        // **chart2
                        <PriceSlopeChart isLoading={chart2Reducer?.loading} />
                      ) : (
                        <div className="text-center">Data not Found</div>
                      )}
                    </>
                  ) : // <PriceSlopeChart />
                    id === 2 ? (
                      // **chart3
                      <>
                        {chart3Reducer?.chart3Data?.data?.length > 0 ? (
                          <LineBar isLoading={chart3Reducer?.loading} />
                        ) : (
                          <div className="text-center">Data not Found 🫤</div>
                        )}
                      </>
                    ) : id === 3 ? (
                      // **chart4
                      <>
                        {chart4Reducer?.chart4Data?.data?.length > 0 ? (
                          <MultiLine isLoading={chart4Reducer?.loading} />
                        ) : (
                          <div className="text-center">Data not Found 🫤</div>
                        )}
                      </>
                    ) : id === 4 ? (
                      // **chart5
                      <>
                        {chart5Reducer?.chart5Data?.data?.length > 0 ? (
                          <MultiLine2 isLoading={chart5Reducer?.loading} />
                        ) : (
                          <div className="text-center">Data not Found 🫤</div>
                        )}
                      </>
                    ) : id === 5 ? (
                      // **chart6
                      <>
                        {chart6Reducer?.chart6Data?.data?.length > 0 ? (
                          <PromotedDepthChart isLoading={chart6Reducer?.loading} />
                        ) : (
                          <div className="text-center">Data not Found 🫤</div>
                        )}
                      </>
                    ) : id === 6 ? (
                      // **chart7
                      <>
                        {chart7Reducer?.chart7Data?.data?.length > 0 ? (
                          <PromotionalLiftChart isLoading={chart7Reducer?.loading} />
                        ) : (
                          <div className="text-center">Data not Found 🫤</div>
                        )}
                      </>
                    ) : id === 7 ? (
                      // **chart8
                      <>
                        {chart8Reducer?.chart8Data?.data?.length > 0 ? (
                          <LiftChart isLoading={chart8Reducer?.loading} />
                        ) : (
                          <div className="text-center">Data not Found 🫤</div>
                        )}
                      </>
                    ) : id === 8 ? (
                      // **chart9
                      <>
                        {chart9Reducer?.chart9Data?.data?.length > 0 ? (
                          <ElasticityStratagyChart isLoading={chart8Reducer?.loading} />
                        ) : (
                          <div className="text-center">Data not Found 🫤</div>
                        )}
                      </>
                    ) : id === 9 ? (
                      <ProfitCurvesChart />
                    ) : null}
                </div>
              ) : (
                <div className="col-lg-12">
                  {value?.Charts?.length > 0 ? (
                    <>
                      {value?.Charts?.map((chartValue, index) => {
                        return (
                          <div key={index} className="mb-4">
                            <div className="nla_graph-heading">
                              <div className="nla_heading" style={{ visibility: "hidden" }}>
                                <h5>Price Architecture Across Retailers</h5>
                                <div>
                                  <a
                                    href="#!"
                                    onClick={(e) => {
                                      e.preventDefault();
                                    }}
                                  >
                                    <Edit />
                                  </a>
                                  <a
                                    href="#!"
                                    onClick={(e) => {
                                      e.preventDefault();
                                    }}
                                  >
                                    <Delete />
                                  </a>
                                </div>
                              </div>
                              <div className="nla_heading-buttons">
                                <div className="nla_filter_block position-relative m-0" ref={ref1}>
                                  <div
                                    className="nla_filter m-0"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => {
                                      setFilterDropDown(!filterDropDown);
                                      // setClickedIndex(index);
                                      setClickedIndex((prevIndex) => (prevIndex === id ? null : id));
                                    }}
                                  >
                                    <i className="fa-solid fa-filter"></i>
                                  </div>
                                  {clickedIndex !== null && clickedIndex === index ? (
                                    <FilterDropDown
                                      chartData={value.Charts}
                                      role={role}
                                      callingQuestionsOnReducersSuccess={callingQuestionsOnReducersSuccess}
                                      setFilterDropDown={setFilterDropDown}
                                    />
                                  ) : null}
                                </div>
                                <a
                                  href="#!"
                                  title="Copy"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    let copyChart = {};
                                    Object.assign(copyChart, {
                                      model_id: model_id,
                                      chart_json: chartValue.chart_json,
                                      slide_id: chartValue.slide_id,
                                      chart_name: chartValue.chart_name,
                                      chart_type: chartValue.chart_type,
                                      x_axis_label: chartValue.x_axis_label,
                                      x_axis_data_point: chartValue.x_axis_data_point,
                                      y_axis_label: chartValue.y_axis_label,
                                      y_axis_data_point: chartValue.y_axis_data_point,
                                      chart_data_type: chartValue.chart_data_type,
                                    });
                                    dispatch(allActions.copyChartAction.copyChart(copyChart));
                                  }}
                                >
                                  <Copy />
                                </a>
                                <a
                                  href="#!"
                                  title="Edit"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setUpdateChartData(chartValue);
                                    setShowUpdateChartModal(true);
                                  }}
                                >
                                  <Edit />
                                </a>
                                <a
                                  href="#!"
                                  title="Delete"
                                  className="delete-icon"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    let deleteChart = {};
                                    Object.assign(deleteChart, {
                                      model_id: model_id,
                                      chart_id: chartValue.id,
                                      slide_id: chartValue.slide_id,
                                    });

                                    dispatch(allActions.deleteChartAction.deleteChart(deleteChart));
                                  }}
                                >
                                  <Delete />
                                </a>
                              </div>
                            </div>
                            {chartValue?.chart_type ? (
                              chartValue?.chart_type !== "radar" ? (
                                <BarChartUser data={chartValue} />
                              ) : (
                                <RadarChartUser data={chartValue} />
                              )
                            ) : null}
                          </div>
                        );
                      })}
                    </>
                  ) : (
                    <div
                      className="nla_add-chart-block text-center"
                      onClick={() => {
                        setShowAddChartModal(true);
                        setCurrentSlideId(value.id);
                      }}
                    >
                      <div className="p-3" data-bs-toggle="modal" data-bs-target="#addChart">
                        <h2>
                          <i className="fa-solid fa-circle-plus"></i>
                        </h2>
                        <h4>Add Chart</h4>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="row">
              <div className="col-lg-2 col-2 d-flex justify-content-start align-items-center">
                <img
                  src={require("../../../assets/images/darkLogo.png")}
                  alt=""
                  style={{ maxWidth: "147px", maxHeight: "48px" }}
                ></img>
              </div>
              <div className="col-lg-8">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: "0 10px",
                    marginTop: "35px",
                  }}
                >
                  <div
                    className={notes ? "nla_add-comment position-relative" : "nla_add-comment nla_expan position-relative"}
                    style={{ width: "80%" }}
                  >
                    <textarea
                      name="type_note"
                      id=""
                      className="form-control"
                      placeholder="Type Notes..."
                      value={notesState?.notes}
                      onChange={(e) => {
                        setNotesState({
                          ...notesState,
                          notes: e.target.value,
                        });
                      }}
                    ></textarea>
                    <div className="nla_add-comment-toggle-btn">
                      <i
                        className="fa-solid fa-floppy-disk"
                        onClick={() => {
                          setNotes(false);
                          dispatch(allActions.addUpdateNoteAction.addUpdateNote(notesState));
                        }}
                      ></i>
                      <i
                        className="fa-solid fa-plus"
                        onClick={() => { setNotes(true); }}
                      ></i>
                    </div>
                  </div>
                  {notes ? null : (
                    <p className="m-0" style={{ width: "50%" }}>
                      <b>Note:</b> {notesState?.notes}
                    </p>
                  )}
                </div>
              </div>
              <div className="col-lg-2 col-2 d-flex justify-content-end align-items-end">
                <img
                  src={value?.Insight?.Project?.company_logo}
                  alt=""
                  style={{ maxWidth: "147px", maxHeight: "48px" }}
                ></img>
              </div>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default AccordionComp;
