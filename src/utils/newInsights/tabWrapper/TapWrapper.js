import React, { useState } from "react";
import "./tapWrapper.css";
import info from "../../../assets/newIcons/feather-info.svg";
import chart from "../../../assets/newIcons/icon-chart.svg";
import Accordion from "../Accordion/Accordion";
import AddSlideModal from "../Modals/AddSlideModal";
import AddHeadingModal from "../Modals/addHeadingModal";
import AddTakeawayModal from "../Modals/addTakeawayModal";
import UpdateTakeawayModal from "../Modals/updateTakeawayModal";
import AddChartModal from "../Modals/addChartModal";
import allActions from "../../../store/index";
import { useSelector, useDispatch } from "react-redux";
import UpdateChartModal from "../Modals/updateChartModal";
import Spinner from "react-bootstrap/Spinner";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import ShareModal from "../Modals/shareModal";
import FilterAccordion from "../filterAccordion/FilterAccordion";

const TapWrapper = ({ showShareModal, setShowShareModal, sidebarState }) => {

  const [isInsights, setIsInsights] = useState(false);
  const [oneTimeLoader, setOneTimeLoader] = React.useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { model_id } = useParams();
  const authData = JSON.parse(localStorage.getItem("auth"));
  const loggedInUserEmail = authData?.email;

  const [currentSlideId, setCurrentSlideId] = React.useState(0);
  const [currentBullets, setCurrentBullets] = React.useState(null);
  const [showSlideModal, setShowSlideModal] = React.useState(false);
  const [showAddHeadingModal, setAddHeadingModal] = React.useState(false);
  const [showTakeawayModal, setShowTakeawayModal] = React.useState(false);
  const [updateTakeawayModal, setUpdateTakeawayModal] = React.useState(false);
  const [showAddChartModal, setShowAddChartModal] = React.useState(false);
  const [showUpdateChartModal, setShowUpdateChartModal] = React.useState(false);
  const [updateChartData, setUpdateChartData] = React.useState([]);
  const [newCreatedSlides, setNewCreatedSlides] = React.useState();
  const getAllSlideReducer = useSelector((state) => state.getAllSlideReducer);
  const getAllQuestionTypesReducer = useSelector((state) => state.getAllQuestionTypesReducer);
  const getQuestionsPerTypeReducer = useSelector((state) => state.getQuestionsPerTypeReducer);
  const addSlideReducer = useSelector((state) => state.addSlideReducer);
  const getFiltersReducer = useSelector((state) => state.getFiltersReducer);
  const localChartFilter = useSelector((state) => state.filterChartReducer);
  const adminQuestionsReducer = useSelector((state) => state.getAdminQuestionByModelIdReducer);
  const [filterDropDown, setFilterDropDown] = React.useState(false);

  const [activeIndex, setActiveIndex] = React.useState(-1);

  const tabClick = (index) => {
    setActiveIndex(index);
  };

  React.useEffect(() => {
    if (window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname);
    }
  }, []);

  React.useEffect(() => {
    Promise.all([
      dispatch(allActions.getAllQuestionTypesAction.getAllQuestionTypes(model_id)),
      dispatch(allActions.getAllSlidesAction.getAllSlide(model_id)),
      dispatch(allActions.getFiltersAction.fetchFilters({ model_id: model_id })),
      dispatch(allActions.retailerBrandsProductsAction.fetchRetailerBrandsProducts({ project_id: id, model_id: model_id, })),
      // dispatch(
      //   allActions.productsAction.fetchProducts({
      //     project_id: 511,
      //     model_id: 566,
      //   })
      // ),
      // dispatch(
      //   allActions.brandsAction.fetchBrands({
      //     project_id: 511,
      //     model_id: 566,
      //   })
      // ),
      // dispatch(
      //   allActions.retailersAction.fetchRetailers({
      //     project_id: 511,
      //     model_id: 566,
      //   })
      // ),
      dispatch(
        allActions.combinedColumnsAction.fetchCombinedColumns({
          project_id: id,
          model_id: model_id,
        })
      ),
      dispatch(
        allActions.inputDataCombinationAction.inputDataCombination({
          project_id: id,
          model_id: model_id,
        })
      ),
      dispatch(
        allActions.outputDataCombinationAction.outputDataCombination({
          project_id: id,
          model_id: model_id,
        })
      ),
    ]).then((results) => {
      // handle results
      setOneTimeLoader(1);
    }).catch((error) => {
      // handle error
    });
  }, []);

  React.useEffect(() => {
    if (getQuestionsPerTypeReducer.success) {
      delete getQuestionsPerTypeReducer.success;
    }
  }, [getQuestionsPerTypeReducer]);

  React.useEffect(() => {
    if (getAllQuestionTypesReducer.success) {
      delete getAllQuestionTypesReducer.success;
    }
  }, [getAllQuestionTypesReducer]);

  React.useEffect(() => {
    if (getAllSlideReducer.success) {
      setNewCreatedSlides(getAllSlideReducer?.slide?.data);
      delete getAllSlideReducer.success;
    }
  }, [getAllSlideReducer]);

  const callingQuestionsOnReducersSuccess = (val) => {
    if (val["success"]) {
      if (activeIndex === -1) {
        dispatch(allActions.getAllSlidesAction.getAllSlide(model_id));
      } else {
        if (window.location.hash) {
          dispatch(allActions.getAllSlidesAction.getAllSlide(model_id));
          dispatch(
            allActions.getQuestionsPerTypeAction.getQuestionsPerType(model_id, window.location.hash.substring(1).trim())
          );
        }
      }
    }
  };

  React.useEffect(() => {
    callingQuestionsOnReducersSuccess(addSlideReducer);
  }, [addSlideReducer]);

  React.useEffect(() => {
    if (getFiltersReducer.success) {
      dispatch(allActions.getAdminQuestionByModelIdAction.getAdminQuestionByModelId(model_id));
    }
  }, [getFiltersReducer]);

  React.useEffect(() => {
    if (getFiltersReducer.success && adminQuestionsReducer.success) {
      callCharts();
      dispatch(allActions.getAdminQuestionByModelIdAction.getAdminQuestionByModelId(model_id));
      delete getFiltersReducer.success;
      delete adminQuestionsReducer.success;
    }
  }, [getFiltersReducer, adminQuestionsReducer, activeIndex]);

  React.useEffect(() => {
    if (localChartFilter.success && localChartFilter.role === "admin") {


      dispatch(allActions.getAdminQuestionByModelIdAction.getAdminQuestionByModelId(model_id));
      dispatch(allActions.getFiltersAction.fetchFilters({ model_id: model_id }));
      setFilterDropDown(false);
      delete localChartFilter.success;
      delete localChartFilter.role;
    }
  }, [localChartFilter]);

  const applyChartLogic = (chartData, fData) => {
    let productsToUse = [];
    let retailersToUse = [];

    if (chartData?.products?.length === 0) {
      productsToUse = fData?.products || [];
    } else if (chartData?.products) {
      productsToUse = chartData.products;
    }

    if (chartData?.retailers?.length === 0) {
      retailersToUse = fData?.retailers || [];
    } else if (chartData?.retailers) {
      retailersToUse = chartData.retailers;
    }

    return { productsToUse, retailersToUse };
  };

  const callCharts = () => {
    const filtersData = getFiltersReducer?.filters?.data;
    const commonParams = {
      project_id: id,
      model_id: model_id,
    };
    commonParams.brands = filtersData?.brands;
    commonParams.date_start = filtersData?.startDate;
    commonParams.date_end = filtersData?.endDate;
    if (adminQuestionsReducer?.question?.data[0]?.Charts[0]?.filters_list) {
      const chartData = adminQuestionsReducer?.question?.data[0]?.Charts[0]?.filters_list;
      const { productsToUse, retailersToUse } = applyChartLogic(chartData, filtersData);
      dispatch(
        allActions.chart1Action.fetchChart1Data({ ...commonParams, products: productsToUse, retailers: retailersToUse })
      );
    }
    if (adminQuestionsReducer?.question?.data[1]?.Charts[0]) {
      const chartData = adminQuestionsReducer?.question?.data[1]?.Charts[0]?.filters_list;
      const { productsToUse, retailersToUse } = applyChartLogic(chartData, filtersData);
      dispatch(
        allActions.chart2Action.fetchChart2Data({ ...commonParams, products: productsToUse, retailers: retailersToUse })
      );
    }
    if (adminQuestionsReducer?.question?.data[2]?.Charts[0]) {
      const chartData3 = adminQuestionsReducer?.question?.data[2]?.Charts[0]?.filters_list;
      const { productsToUse: products3, retailersToUse: retailers3 } = applyChartLogic(chartData3, filtersData);
      dispatch(
        allActions.chart3Action.fetchChart3Data({ ...commonParams, products: products3, retailers: retailers3 })
      );
    }
    if (adminQuestionsReducer?.question?.data[3]?.Charts[0]) {
      const chartData4 = adminQuestionsReducer?.question?.data[3]?.Charts[0]?.filters_list;
      const { productsToUse: products4, retailersToUse: retailers4 } = applyChartLogic(chartData4, filtersData);
      dispatch(
        allActions.chart4Action.fetchChart4Data({ ...commonParams, products: products4, retailers: retailers4 })
      );
    }
    if (adminQuestionsReducer?.question?.data[4]?.Charts[0]) {
      const chartData5 = adminQuestionsReducer?.question?.data[4]?.Charts[0]?.filters_list;
      const { productsToUse: products5, retailersToUse: retailers5 } = applyChartLogic(chartData5, filtersData);
      dispatch(
        allActions.chart5Action.fetchChart5Data({ ...commonParams, products: products5, retailers: retailers5 })
      );
    }
    if (adminQuestionsReducer?.question?.data[5]?.Charts[0]) {
      const chartData6 = adminQuestionsReducer?.question?.data[5]?.Charts[0]?.filters_list;
      const { productsToUse: products6, retailersToUse: retailers6 } = applyChartLogic(chartData6, filtersData);
      dispatch(
        allActions.chart6Action.fetchChart6Data({ ...commonParams, products: products6, retailers: retailers6 })
      );
    }
    if (adminQuestionsReducer?.question?.data[6]?.Charts[0]) {
      const chartData7 = adminQuestionsReducer?.question?.data[6]?.Charts[0]?.filters_list;
      const { productsToUse: products7, retailersToUse: retailers7 } = applyChartLogic(chartData7, filtersData);
      dispatch(
        allActions.chart7Action.fetchChart7Data({ ...commonParams, products: products7, retailers: retailers7 })
      );
    }
    if (adminQuestionsReducer?.question?.data[7]?.Charts[0]) {
      const chartData8 = adminQuestionsReducer?.question?.data[7]?.Charts[0]?.filters_list;
      const { productsToUse: products8, retailersToUse: retailers8 } = applyChartLogic(chartData8, filtersData);
      dispatch(
        allActions.chart8Action.fetchChart8Data({ ...commonParams, products: products8, retailers: retailers8 })
      );
    }
    if (adminQuestionsReducer?.question?.data[8]?.Charts[0]) {
      const chartData9 = adminQuestionsReducer?.question?.data[8]?.Charts[0]?.filters_list;
      const { productsToUse: products9, retailersToUse: retailers9 } = applyChartLogic(chartData9, filtersData);
      dispatch(
        allActions.chart9Action.fetchChart9Data({ ...commonParams, products: products9, retailers: retailers9 })
      );
    }
  };

  const InsightsBlock = () => {
    setIsInsights(prevState => !prevState);
  };
// console.log(showAddChartModal,"setshowchartmodels");
console.log(adminQuestionsReducer,"getallsdfksd")

  return (
    <div>
      {/* ${!isInsights ? "datanot-showing" : ""} */}
      <div className={`nla_insight-tab-wrapper ${sidebarState ? "sidebarCollapse" : ""}`} id="tapWrapper">
        <FilterAccordion InsightsBlock={InsightsBlock} />
        {/* {isInsights && ( */}
        <>
          <div className="nla_insight-tabs-block d-flex justify-content-between align-items-start mt-4">
            <ul className="nav nav-tabs">
              <li onClick={() => tabClick(-1)} className="nav-item" role="presentation">
                <button
                  className={activeIndex === -1 ? "nav-link active" : "nav-link"}
                  id="all-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#all"
                  type="button"
                  role="tab"
                  aria-controls="all"
                  aria-selected="true"
                >
                  All
                </button>
              </li>
              {getAllQuestionTypesReducer?.allQuestion?.data?.map((tab, index) => {
                return (
                  <li
                    key={index}
                    onClick={() => {
                      tabClick(index);
                      navigate(`#${tab.type}`);
                      dispatch(allActions.getQuestionsPerTypeAction.getQuestionsPerType(model_id, tab.type));
                    }}
                    className="nav-item"
                    role="presentation"
                  >
                    <button
                      className={index === activeIndex ? "nav-link active" : "nav-link"}
                      id="all-tab"
                      data-bs-toggle="tab"
                      data-bs-target={`#${tab.type}`}
                      type="button"
                      role="tab"
                      aria-controls="all"
                      aria-selected="true"
                    >
                      {tab.type}
                    </button>
                  </li>
                );
              })}
            </ul>
            <a
              href="#!"
              className="btn btn-outline-secondary"
              onClick={(e) => {
                e.preventDefault();
                setShowSlideModal(true);
              }}
            >
              + Add New Slide
            </a>
          </div>
          {getAllSlideReducer.loading && oneTimeLoader === 0 ? (
            <Spinner animation="border" />
          ) : (
            <>
              <div className="insights-couns-block">
                <div className="insights_lbl">
                  <p className="d-inline-flex">
                    <img src={chart} alt="chart" className="me-1" /> Insights
                  </p>
                  <a
                    className="d-inline-block"
                    href="#!"
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                  >
                    <img src={info} alt="info" />
                  </a>
                </div>
                <p>
                  Total <span>{adminQuestionsReducer?.question?.data?.length + newCreatedSlides?.length}</span> Insight
                </p>
              </div>
              <>
                {
                  <div className="tab-content">
                    {activeIndex === -1 ? (
                      <>
                        {adminQuestionsReducer?.question?.data?.map((val, id) => {
                          return (
                            <Accordion
                              key={val.id}
                              value={val}
                              id={id}
                              setAddHeadingModal={setAddHeadingModal}
                              setShowTakeawayModal={setShowTakeawayModal}
                              setUpdateTakeawayModal={setUpdateTakeawayModal}
                              setCurrentBullets={setCurrentBullets}
                              setShowAddChartModal={setShowAddChartModal}
                              setCurrentSlideId={setCurrentSlideId}
                              setShowUpdateChartModal={setShowUpdateChartModal}
                              setUpdateChartData={setUpdateChartData}
                              role="admin"
                              callingQuestionsOnReducersSuccess={callingQuestionsOnReducersSuccess}
                              filterDropDown={filterDropDown}
                              setFilterDropDown={setFilterDropDown}
                            />
                          );
                        })}
                        {newCreatedSlides?.map((val, id) => {
                          return (
                            <Accordion
                              key={val.id}
                              value={val}
                              id={id}
                              setAddHeadingModal={setAddHeadingModal}
                              setShowTakeawayModal={setShowTakeawayModal}
                              setUpdateTakeawayModal={setUpdateTakeawayModal}
                              setCurrentBullets={setCurrentBullets}
                              setShowAddChartModal={setShowAddChartModal}
                              setCurrentSlideId={setCurrentSlideId}
                              setShowUpdateChartModal={setShowUpdateChartModal}
                              setUpdateChartData={setUpdateChartData}
                              role="users"
                              callingQuestionsOnReducersSuccess={callingQuestionsOnReducersSuccess}
                              filterDropDown={filterDropDown}
                              setFilterDropDown={setFilterDropDown}
                            />
                          );
                        })}
                      </>
                    ) : null}
                  </div>
                }
                {activeIndex !== -1 ? (
                  <div>
                    {getQuestionsPerTypeReducer?.question?.data?.map((tab, index) => {
                      let id;
                      if (tab) {
                        if (tab.type === "base") {
                          id = index;
                        } else if (tab.type === "promo") {
                          id = index + 4;
                        } else if (tab.type === "strat") {
                          id = index + 8;
                        } else {
                          id = index;
                        }
                      } else {
                      }
                      return (
                        <div key={index}>
                          <div className="tab-content">
                            {tab ? (
                              <Accordion
                                value={tab}
                                id={id}
                                setAddHeadingModal={setAddHeadingModal}
                                setShowTakeawayModal={setShowTakeawayModal}
                                setUpdateTakeawayModal={setUpdateTakeawayModal}
                                setCurrentBullets={setCurrentBullets}
                                setShowAddChartModal={setShowAddChartModal}
                                setCurrentSlideId={setCurrentSlideId}
                                setShowUpdateChartModal={setShowUpdateChartModal}
                                setUpdateChartData={setUpdateChartData}
                                role="admin"
                                callingQuestionsOnReducersSuccess={callingQuestionsOnReducersSuccess}
                                filterDropDown={filterDropDown}
                                setFilterDropDown={setFilterDropDown}
                              />
                            ) : null}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : null}
              </>
            </>
          )}
        </>
      </div>
      <AddSlideModal
        showSlideModal={showSlideModal}
        setShowSlideModal={setShowSlideModal}
        callingQuestionsOnReducersSuccess={callingQuestionsOnReducersSuccess}
      />
      <AddHeadingModal
        showAddHeadingModal={showAddHeadingModal}
        setAddHeadingModal={setAddHeadingModal}
        currentSlideId={currentSlideId}
        callingQuestionsOnReducersSuccess={callingQuestionsOnReducersSuccess}
      />
      {showTakeawayModal ? (
        <AddTakeawayModal
          showTakeawayModal={showTakeawayModal}
          setShowTakeawayModal={setShowTakeawayModal}
          currentSlideId={currentSlideId}
          callingQuestionsOnReducersSuccess={callingQuestionsOnReducersSuccess}
        />
      ) : null}
      {updateTakeawayModal ? (
        <UpdateTakeawayModal
          updateTakeawayModal={updateTakeawayModal}
          setUpdateTakeawayModal={setUpdateTakeawayModal}
          currentSlideId={currentSlideId}
          callingQuestionsOnReducersSuccess={callingQuestionsOnReducersSuccess}
          currentBullets={currentBullets}
          setCurrentBullets={setCurrentBullets}
        />
      ) : null}

      {showAddChartModal ? (
        <AddChartModal
          showAddChartModal={showAddChartModal}
          setShowAddChartModal={setShowAddChartModal}
          currentSlideId={currentSlideId}
          callingQuestionsOnReducersSuccess={callingQuestionsOnReducersSuccess}
        />
      ) : null}
      {showShareModal ? (
        <ShareModal
          showShareModal={showShareModal}
          setShowShareModal={setShowShareModal}
          loggedInUserEmail={loggedInUserEmail}
        />
      ) : null}

      {showUpdateChartModal ? (
        <UpdateChartModal
          showUpdateChartModal={showUpdateChartModal}
          setShowUpdateChartModal={setShowUpdateChartModal}
          updateChartData={updateChartData}
          setUpdateChartData={setUpdateChartData}
          callingQuestionsOnReducersSuccess={callingQuestionsOnReducersSuccess}
        />
      ) : null}
    </div>
  );
};

export default TapWrapper;
