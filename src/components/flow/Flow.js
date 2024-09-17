import React, { useEffect, useState, useCallback, useRef } from "react";
import { useSelector } from "react-redux";
import "./flow.css";
import useUndoable from "use-undoable";
import { Modal, Button } from "react-bootstrap";
import TextUpdaterNode from "../customNode/TextUpdaterNode";
import ReactFlow, {
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
  getBezierPath,
  addEdge,
  useReactFlow,
  Background,
  getMarkerEnd,
  getEdgeCenter,
  Controls,
  MiniMap,
  MarkerType,
  // InteractiveMinimap,
  // MiniMapProps,
} from "react-flow-renderer";
import { useDispatch } from "react-redux";
import allActions from "../../store/index";

// -----------------------------------------------------------
const nodeTypes = { textUpdater: TextUpdaterNode };

const Flow = ({
  activeNode,
  setActiveNode,
  menu,
  setMenu,
  paramState,
  setParamState,
  projectId,
  setNodesObserver,
}) => {
  const [showMiniMap, setShowMiniMap] = React.useState(true);
  const dispatch = useDispatch();
  const getNodeId = () => `randomnode_${+new Date()}`;
  const initialNodes = [];
  const saveclass = useRef("save-button");
  const initialEdges = [];
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [rfInstance, setRfInstance] = useState(null);

  const onConnect = useCallback(
    (params) =>
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            type: "customedge",
            markerEnd: {
              type: MarkerType.ArrowClosed,
            },
          },
          eds
        )
      ),

    [setEdges]
  );
  const onSave = useCallback(() => {
    if (rfInstance) {
      const flow = rfInstance.toObject();
      localStorage.setItem("react_flow_nodes", JSON.stringify(flow));
      saveclass.current = "save-button";
    }
  }, [rfInstance]);
  const getModelByModelIdReducer = useSelector(
    (state) => state.getModelByModelIdReducer
  );
  React.useEffect(() => {
    if (getModelByModelIdReducer.success) {
      if (getModelByModelIdReducer?.model?.data?.output_file === null) {
        localStorage.removeItem("nodesData_from_database");
      } else {
        setNodes(
          getModelByModelIdReducer?.model?.data?.output_file?.nodes || []
        );
        setNodesObserver(
          getModelByModelIdReducer?.model?.data?.output_file?.nodes || []
        );
        setEdges(
          getModelByModelIdReducer?.model?.data?.output_file?.edges || []
        );
      }
      delete getModelByModelIdReducer.success;
    }
  }, [getModelByModelIdReducer]);
  const onDragOver = useCallback((event, node) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);
  const paramSwitchHandler = (state) => {
    setMenu("head2");
    setActiveNode(state);
    setParamState(state);
  };
  const onDrop = useCallback(
    (event, node) => {
      event.preventDefault();
      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData("application/reactflow");
      const node_data = event.dataTransfer.getData("node_data");
      paramSwitchHandler(node_data);

      // check if the dropped element is valid
      if (typeof type === "undefined" || !type) {
        return;
      }
      if (projectId === undefined) {
        return; // Do not add new edge
      }

      const position = rfInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      const getNodeIdCust1 = () => `randomnode_${+new Date()}`;
      const getNodeIdCust2 = () => `randomnode_${+new Date() + 20}`;
      const getNodeIdCust3 = () => `randomnode_${+new Date() + 40}`;
      const custId1 = getNodeIdCust1();
      const custId2 = getNodeIdCust2();
      const custId3 = getNodeIdCust3();
      const customNode = [
        {
          width: 150,
          height: 39,
          id: custId1,
          type: "textUpdater",
          position: {
            x: event.clientX - reactFlowBounds.left,
            y: event.clientY - reactFlowBounds.top,
          },
          data: {
            // label: "Read File",
            label: "DB Read",
          },
          selected: false,
          positionAbsolute: {
            x: event.clientX - reactFlowBounds.left,
            y: event.clientY - reactFlowBounds.top,
          },
          dragging: false,
          name: "cluster",
        },
        {
          width: 150,
          height: 39,
          id: custId2,
          type: "textUpdater",
          position: {
            x: event.clientX - reactFlowBounds.left + 200,
            y: event.clientY - reactFlowBounds.top,
          },
          data: {
            label: "Price",
          },
          selected: false,
          positionAbsolute: {
            x: event.clientX - reactFlowBounds.left + 200,
            y: event.clientY - reactFlowBounds.top,
          },
          dragging: false,
          name: "cluster",
        },
        {
          width: 150,
          height: 39,
          id: custId3,
          type: "textUpdater",
          position: {
            x: event.clientX - reactFlowBounds.left + 400,
            y: event.clientY - reactFlowBounds.top,
          },
          data: {
            label: "Write File",
          },
          selected: true,
          positionAbsolute: {
            x: event.clientX - reactFlowBounds.left + 400,
            y: event.clientY - reactFlowBounds.top,
          },
          dragging: false,
          name: "cluster",
        },
      ];
      const customEdge = [
        {
          source: custId1,
          sourceHandle: "right",
          target: custId2,
          targetHandle: "left",
          // arrowHeadType: "arrow",
          markerEnd: {
            type: MarkerType.ArrowClosed,
          },
          type: "customedge",
          id: "reactflow__edge-" + custId2 + "-" + custId1,
        },
        {
          source: custId2,
          sourceHandle: "right",
          target: custId3,
          targetHandle: "left",
          // arrowHeadType: "arrow",
          markerEnd: {
            type: MarkerType.ArrowClosed,
          },
          type: "customedge",
          id: "reactflow__edge-" + custId3 + "-" + custId2,
        },
      ];

      if (node_data === "Price Elasticity") {
        setNodes((nds) => nds.concat(customNode));
        setNodesObserver((nds) => nds.concat(customNode));
        setEdges((eds) => eds.concat(customEdge));
      } else {
        const newNode = {
          id: getNodeId(),
          type: "textUpdater",
          position,
          data: { label: `${node_data} ` },
        };
        setNodes((nds) => nds.concat(newNode));
        setNodesObserver((nds) => nds.concat(newNode));
      }
    },
    [rfInstance]
  );
  useEffect(() => {
    const ab = document.getElementsByClassName("selectable");
    for (var i = 0; i < ab.length; i++) {
      ab[i].classList.remove("selected");
    }
  }, []);
  const customEdge = ({
    id,
    source,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    style,
    target,
    // arrowHeadType,
    markerEndId,
    markerEnd,
    // markerStart,
  }) => {
    const edgePath = getBezierPath({
      sourceX,
      sourceY,
      sourcePosition,
      targetX,
      targetY,
      targetPosition,
    });
    // const markerEnd = getMarkerEnd(arrowHeadType, markerEndId);
    // const markerEnd = getMarkerEnd(MarkerType.Arrow, markerEndId);
    const [edgeCenterX, edgeCenterY] = getEdgeCenter({
      sourceX,
      sourceY,
      targetX,
      targetY,
    });
    return (
      <>
        <path
          id={id}
          className="react-flow__edge-path "
          d={edgePath}
          markerEnd={markerEnd}
        />
        <foreignObject>
          <body></body>
        </foreignObject>
      </>
    );
  };

  const edgeTypes = {
    customedge: customEdge,
  };

  const graphStyles = { width: "100%", height: "530px" };

  useEffect(() => {
    saveclass.current = "save-button-unsaved";
  }, [nodes, edges]);
  useEffect(() => {
    onSave();
  }, [nodes, edges]);
  let newArray = ["Read", "Write", "Price"];
  newArray.map((e) => localStorage.setItem(e + " Counter", 0));
  useEffect(() => {
    // localStorage.setItem("writeFileCounter", 1);
    for (let k = 0; k < newArray.length; k++) {
      for (let i = 0; i < nodes?.length; i++) {
        if (nodes[i].data.label === newArray[k]) {
          let counter = parseInt(
            localStorage.getItem(newArray[k] + " Counter")
          );
          if (counter !== 0) {
            nodes[i].data.label = newArray[k] + " (" + counter + ")";
          }
          localStorage.setItem(newArray[k] + " Counter", counter + 1);
        }
      }
    }
  }, [nodes]);
  return (
    <>
      <ReactFlowProvider>
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          {nodes?.length === 0 ? (
            <>
              {projectId === undefined ? (
                <div className="empty">
                  Nodes can be dragged only after project creation
                </div>
              ) : (
                <div className="empty">Drag an operator to start</div>
              )}
            </>
          ) : null}
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setRfInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            style={graphStyles}
            edgeTypes={edgeTypes}
            nodeTypes={nodeTypes}
            onNodeClick={(e, node) => {
              paramSwitchHandler(node?.data?.label.trim());
              dispatch(
                allActions.getNodeClickStateAction.getNodeStateResponse(
                  node.data.label
                )
              );
            }}
            connectionMode={`loose`}
          >
            <div className="save__controls">
              <button
                onClick={() => {
                  setShowMiniMap(!showMiniMap);
                }}
              >
                {showMiniMap ? `Hide MiniMap` : "Show MiniMap"}
              </button>
              {/* <button onClick={onSave}>save</button> */}
              {/* <button onClick={onRestore}>restore</button> */}
            </div>
            {showMiniMap ? (
              <MiniMap
                nodeStrokeColor={(n) => {
                  // if (n.data.label === "Read File ") {
                  //   return "#0041d0";
                  // } else if (n.data.label === "Write File ") return "green";
                  // else if (n.data.label === "Price ") return "#ff0072";
                  // else {
                  //   return "#000";
                  // }
                  return "rgb(23, 79, 115)";
                }}
                nodeColor={(n) => {
                  // if (n.data.label === "Read File") return "green";
                  return "#fff";
                }}
                maskColor="rgb(0,0,0, 0.1)"
                // nodeStrokeColor="#000"
                // draggable={true}
                // zoomable={true}
                // clickable={true}
              />
            ) : null}

            <Background variant="dots" gap={12} size={0.5} />
            <Controls className="flow-controls"></Controls>
          </ReactFlow>
        </div>
      </ReactFlowProvider>
    </>
  );
};

// eslint-disable-next-line import/no-anonymous-default-export
export default ({
  activeNode,
  setActiveNode,
  menu,
  setMenu,
  paramState,
  setParamState,
  projectId,
  setNodesObserver,
}) => (
  <ReactFlowProvider
    activeNode={activeNode}
    setActiveNode={setActiveNode}
    menu={menu}
    setMenu={setMenu}
    paramState={paramState}
    setParamState={setParamState}
    projectId={projectId}
    setNodesObserver={setNodesObserver}
  >
    <Flow
      activeNode={activeNode}
      setActiveNode={setActiveNode}
      menu={menu}
      setMenu={setMenu}
      paramState={paramState}
      setParamState={setParamState}
      projectId={projectId}
      setNodesObserver={setNodesObserver}
    />
  </ReactFlowProvider>
);
