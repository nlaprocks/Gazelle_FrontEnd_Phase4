   import React from "react";
import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import Moment from "react-moment";
import Spinner from "react-bootstrap/Spinner";
const AdvanceLog = ({ log, setLog }) => {
  const handleLogClose = () => setLog(false);
  const getAllLogReducer = useSelector((state) => state.getAllLogReducer);
  return (
    <Modal show={log} onHide={handleLogClose} centered className="logModal">
      <Modal.Header>
        <Modal.Title>Advance Log</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="nla-advance-log-list-block">
          <h6>Logs:</h6>
          <div className="container my-3">
            {getAllLogReducer.loading ? (
              <>
                <Spinner
                  as="span"
                  animation="grow"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                Loading...
              </>
            ) : (
              <div className="dataTables_wrapper">
                <div className="dataTables_scroll">
                  <div className="dataTables_scrollHead">
                    <div className="dataTables_scrollHeadInner">
                      <table
                        id="insightManagementData"
                        className="table stripe row-border order-column nla-data-table"
                        style={{ width: "100%" }}
                      >
                        <thead>
                          <tr>
                            <th>Status</th>
                            <th>Log Message</th>
                            <th className="text-center">Created Date</th>
                            <th className="text-center">Created Time</th>
                          </tr>
                        </thead>
                        <>
                          {getAllLogReducer?.log?.data?.length > 0 ? (
                            <tbody>
                              {getAllLogReducer?.log?.data?.map(
                                (val, index) => {
                                  return (
                                    <tr key={index}>
                                      <td>{val?.status}</td>
                                      <td>{val?.log_message}</td>
                                      <td className="text-center">
                                        <Moment format="DD/MM/YYYY">
                                          {val?.created_at}
                                        </Moment>
                                      </td>
                                      <td className="text-center">
                                        <Moment format="HH:mm:ss">
                                          {val?.created_at}
                                        </Moment>
                                      </td>
                                    </tr>
                                  );
                                }
                              )}
                            </tbody>
                          ) : null}
                        </>
                      </table>
                      {!getAllLogReducer?.log?.data?.length > 0 ? (
                        <div
                          className="mt-3 text-center"
                          style={{ borderTop: "0px" }}
                        >
                          No Logs Exists
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button
          type="button"
          className="btn btn-outline-primary"
          data-bs-dismiss="modal"
          onClick={handleLogClose}
        >
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default AdvanceLog;
