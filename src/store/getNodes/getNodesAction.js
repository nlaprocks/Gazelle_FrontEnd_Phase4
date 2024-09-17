import {
  GET_NODES_REQUEST,
  GET_NODES_SUCCESS,
  GET_NODES_FAILURE,
} from "./getNodesType";
import Api from "../../services/Api";

const getNodesRequest = (data) => {
  return {
    type: GET_NODES_REQUEST,
    loading: true,
  };
};
const getNodesSuccess = (SignInData) => {
  return {
    type: GET_NODES_SUCCESS,
    payload: SignInData,
    loading: false,
  };
};
const getNodesFailure = (error) => {
  return {
    type: GET_NODES_FAILURE,
    payload: error,
    loading: false,
  };
};

const getNodesState = (project_id) => {
  let loading = true;
  return async (dispatch) => {
    try {
      dispatch(getNodesRequest(loading));

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      let { data } = await Api("GET", `api/get/model/${project_id}`, config);
      console.log(
        "GetNodeAction from Action: ",
        data?.data[0].output_file.nodes
      );

      const nodesData = {
        edges: data[0]?.output_file?.edges,
        nodes: data[0]?.output_file?.nodes,
        viewport: data[0]?.output_file?.viewport,
      };
      console.log("data", data);
      if (data === "Empty nodes") {
        localStorage.removeItem("nodesData_from_database");
      } else {
        localStorage.setItem(
          "nodesData_from_database",
          JSON.stringify(data.data[0].output_file)
        );
      }
      loading = false;
      dispatch(getNodesSuccess(nodesData, loading));
      // console.log(res);
    } catch (error) {
      const msg = error.response;
      loading = false;
      dispatch(getNodesFailure(msg, loading));
      console.log(msg);
    }
  };
};
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getNodesRequest,
  getNodesSuccess,
  getNodesFailure,
  getNodesState,
};
