import Image from "next/image";
import { useCallback, useMemo, useRef } from "react";
import ReactFlow, {
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  updateEdge,
  ConnectionLineType,
} from "reactflow";
import dagre from "dagre";
import Modal from "./modal";

// 👇 you need to import the reactflow styles
import "reactflow/dist/style.css";
import { Handle, Position } from "reactflow";
import { ItemNames } from "@/lib/types";
import items from "@/../public/items.json";

function God({ data }: { data: { god: string } }) {
  return (
    <div onClick={(e) => console.log(e.detail)}>
      <div className="relative">
        <div className="hover:bg-black opacity-30 h-full w-full absolute"></div>
        <Image
          src="https://smite-builder.b-cdn.net/skills/achilles-2-0.png"
          alt="alt-name"
          width={70}
          height={70}
        />
      </div>
      <Handle type="source" position={Position.Bottom} id="a" />
    </div>
  );
}

function Item({ data }: { data: { item: ItemNames } }) {
  return (
    <div onClick={(e) => console.log(e.detail)}>
      <Handle type="target" position={Position.Top} id="a" />
      <div className="relative">
        <div className="hover:bg-black opacity-30 h-full w-full absolute"></div>
        <Image
          src={items[data.item].icon}
          alt={data.item}
          width={70}
          height={70}
        />
      </div>
      <Handle type="source" position={Position.Bottom} id="a" />
    </div>
  );
}

const position = { x: 0, y: 0 };

export const initialNodes = [
  {
    id: "1",
    type: "God",
    data: { label: "input" },
    position,
  },
  {
    id: "2",
    type: "Item",
    data: { item: "Iron Mail" },
    position,
  },
];

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 172;
const nodeHeight = 36;

const getLayoutedElements = (nodes: any, edges: any, direction = "TB") => {
  const isHorizontal = direction === "LR";
  dagreGraph.setGraph({ rankdir: direction });

  nodes.forEach((node: any) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge: any) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  nodes.forEach((node: any) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    node.targetPosition = isHorizontal ? "left" : "top";
    node.sourcePosition = isHorizontal ? "right" : "bottom";

    // We are shifting the dagre node position (anchor=center center) to the top left
    // so it matches the React Flow node anchor point (top left).
    node.position = {
      x: nodeWithPosition.x - nodeWidth / 2,
      y: nodeWithPosition.y - nodeHeight / 2,
    };

    return node;
  });

  return { nodes, edges };
};

const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
  initialNodes,
  []
);

export default function Flow() {
  const edgeUpdateSuccessful = useRef(true);
  const [nodes, setNodes, onNodesChange] = useNodesState(layoutedNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);

  const onConnect = useCallback(
    (params: any) =>
      setEdges((eds) =>
        addEdge(
          { ...params, type: ConnectionLineType.SmoothStep, animated: true },
          eds
        )
      ),
    []
  );

  const onEdgeUpdateStart = useCallback(() => {
    edgeUpdateSuccessful.current = false;
  }, []);

  const onEdgeUpdate = useCallback((oldEdge: any, newConnection: any) => {
    edgeUpdateSuccessful.current = true;
    setEdges((els) => updateEdge(oldEdge, newConnection, els));
  }, []);

  const onEdgeUpdateEnd = useCallback((_: any, edge: any) => {
    if (!edgeUpdateSuccessful.current) {
      setEdges((eds) => eds.filter((e) => e.id !== edge.id));
    }
  }, []);

  return (
    <ReactFlow
      nodeTypes={useMemo(() => ({ Item, God }), [])}
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onEdgeUpdate={onEdgeUpdate}
      onEdgeUpdateStart={onEdgeUpdateStart}
      onEdgeUpdateEnd={onEdgeUpdateEnd}
      onConnect={onConnect}
      connectionLineType={ConnectionLineType.SmoothStep}
      fitView
    >
      <Controls>
        <Modal
          onSelect={(item) =>
            setNodes((prev) => [
              ...prev,
              {
                id: prev.length.toString() + 1,
                type: "Item",
                data: { item },
                position,
              },
            ])
          }
        />
      </Controls>
      <Background />
    </ReactFlow>
  );
}
