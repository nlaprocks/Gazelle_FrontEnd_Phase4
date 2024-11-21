import React from "react";
import Modal from "react-bootstrap/Modal";
import { useSelector, useDispatch } from "react-redux";
import allActions from "../../../store/index";
import Spinner from "react-bootstrap/Spinner";

const ShareModal = ({ showShareModal, setShowShareModal, loggedInUserEmail }) => {

  const dispatch = useDispatch();

  const [sendEmail, setSendEmail] = React.useState({
    from_email: loggedInUserEmail,
    to_email: "",
    document: "",
  });

  const handleChange = (e) => {
    setSendEmail({ ...sendEmail, [e.target.name]: e.target.value });
  };

  const sendEmailReducer = useSelector((state) => state.sendEmailReducer);
                   //Old Code
  // const shareProject = () => {
  //   dispatch(allActions.sendEmailAction.sendEmail(sendEmail));
  //   console.log("run successfully")
  // };
                   //New Code
  const shareProject = () => {
    const { to_email, document } = sendEmail;
  

    if (!to_email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to_email)) {
      alert("Please enter a valid email address.");
      return;
    }
  
    if (!document) {
      alert("Please upload a PPT file.");
      return;
    }
  
  
    dispatch(allActions.sendEmailAction.sendEmail(sendEmail));
    
  };
  


  React.useEffect(() => {
    if (sendEmailReducer.success) {
      setShowShareModal(false);
      delete sendEmailReducer.success;
    }
  }, [sendEmailReducer]);

  return (
    <Modal
      show={showShareModal}
      onHide={() => {
        setShowShareModal(false);
      }}
      centered
      scrollable
    >
      <Modal.Header>
        <Modal.Title>
          <h5 className="modal-title">Share Insights</h5>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="nla_modal_banenr">
          <img
            src={require("../../../assets/images/new_project_create_image.png")}
            alt="placeholder"
            className="img-fluid"
          />
        </div>
        <div className="nla-add-heading-block">
          <form>
            <div className="">
              <div className="nla_form_project_name position-relative nla_form_field_block">
                <input
                  type="text"
                  className="form-control"
                  id="projectName"
                  placeholder="Enter Email*"
                  name="to_email"
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="nla_form_file_upload position-relative nla_form_field_block">
                <label htmlFor="formFile" id="companyLogo" style={{ color: "#acb0b1", paddingLeft: "20px" }}>
                  {sendEmail?.document ? sendEmail?.document.name : ` Upload PPT File*`}
                </label>
                <input
                  className="form-control"
                  type="file"
                  id="formFile"
                  accept=".ppt, .pptx"
                  onChange={(e) => {
                    setSendEmail({ ...sendEmail, document: e.target.files[0] });
                    // setLogo(e.target.files[0].name);
                  }}
                />
              </div>
            </div>
          </form>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button
          type="button"
          className="btn btn-outline-danger"
          data-bs-dismiss="modal"
          onClick={() => {
            setShowShareModal(false);
          }}
        >
          No
        </button>
        <button type="button" className="btn btn-primary" onClick={() => shareProject()}>
          {sendEmailReducer?.loading ? (
            <>
              <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />
              Loading...
            </>
          ) : (
            "Share"
          )}
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default ShareModal;
