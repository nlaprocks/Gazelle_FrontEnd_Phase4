import React from "react";
import file from "../../../assets/newIcons/feather-file-plus.svg";
import info from "../../../assets/newIcons/feather-info.svg";
import { ReactComponent as Save } from "../../../assets/newIcons/save.svg";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Api from "../../../services/Api";
import allActions from "../../../store/index";
import RunDemo from "../../../components/pptDownloader/AllPptDownloader";

const TopBar = ({ setShowShareModal, sidebarState }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { model_id } = useParams();

  const [project, setProject] = React.useState([]);
  const project_id = useParams().id;
  

  // Model Version
  const getInsightsVersionReducer = useSelector((state) => state.getInsightsVersionReducer);

  React.useEffect(() => {
    async function fetchProject() {
      const { data } = await Api("GET", `api/v1/project/${project_id}`);
      setProject(data.data.project_name);
    }
    fetchProject();
    dispatch(allActions.getInsightsVersionAction.getInsightsVersion(model_id));
    // window.location.reload();
  }, []);

  
  const latestVersionId = getInsightsVersionReducer?.insightsVersion?.data?.[0]?.id; // Assuming the first version is the latest


  return (
    <div className={`design-studio-topbar  ${sidebarState ? "sidebarCollapse" : ""}`}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-4">
            <div className="new-project-name">
              <Link to="/dashboard">
                <div className="nla-arrow-left-icon">
                  <span></span>
                </div>
              </Link>
              <div className="nla-name">
                <span>Back to Home Page</span>
                <p>{project}</p>
              </div>
            </div>
          </div>
          <div className="col-lg-8">
            <div className="btn-wrapper">
              <div className="nla-select-box-with-lbl headerDropDown">
                {/* <select
                  className="form-select"
                  value={model_id}
                  onChange={(e) => {
                    navigate(`/new-insights/${project_id}/${e.target.value}`);
                    window.location.reload();
                  }}
                >
                  <option value="">Select a Version</option>
                  {getInsightsVersionReducer?.insightsVersion?.data?.map((val, id) => {
                    return (
                      <>
                        {val?.model_version === 1 && model_id === 1 ? (
                          <option value={val?.id} key={id} disabled={true}>
                            Version {val?.model_version}
                          </option>
                        ) : (
                          <option value={val?.id} key={id}>
                            Version {val?.model_version}
                          </option>
                        )}
                      </>
                    );
                  })}
                </select> */}

                
                <select
  className="form-select"
  value={model_id}
  onChange={(e) => {
    
    const selectedVersion = e.target.value || latestVersionId;
    

    navigate(`/new-insights/${project_id}/${selectedVersion}`);
    window.location.reload(); 
  }}
>
  <option value="">Select a Version</option>
  
  {getInsightsVersionReducer?.insightsVersion?.data?.map((val, id) => {
    
  
    return (
      <>
        {val?.model_version === 1 && model_id === 1 ? (
          <option value={val?.id} key={id} disabled={true}>
            Version {val?.model_version}
          </option>
        ) : (
          <option value={val?.id} key={id}>
            Version {val?.model_version}
          </option>
        )}
      </>
    );
  })}
</select>

              </div>
              <div className="other-design-studio-buttons">
                <div>
                  <a
                    href="#!"
                    className="btn btn-outline-primary d-inline-flex items-center gap-3"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowShareModal(true);
                    }}
                  >
                    Share
                    <i className="fa-solid fa-file-circle-plus ms-0"></i>
                    {/* <img src={file} alt="file-plus" /> */}
                  </a>
                  {/* <a href="#!" className="d-inline-block">
                    <img src={info} alt="info" style={{ marginLeft: "4px" }} />
                  </a> */}
                </div>
                <div
                // onClick={() => {
                //   PdfDownloader();
                // }}
                >
                  <RunDemo />
                  {/* <a href="#!" className="d-inline-block">
                    <img src={info} alt="info" style={{ marginLeft: "4px" }} />
                  </a> */}
                </div>
                <div>
                  <a href="#!" className="btn btn-primary d-inline-flex">
                    Save <Save />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
