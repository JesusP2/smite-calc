import { useCallback, useMemo } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from "reactflow";
// 👇 you need to import the reactflow styles
import "reactflow/dist/style.css";
import { Handle, Position } from "reactflow";

const handleStyle = { left: 10 };

function initialNode() {
  return (
  <div onClick={() => console.log('select an item')}></div>
  )
}

function TextUpdaterNode({ data }: { data: any }) {
  return (
    <div onClick={() => console.log("clicked")}>
      <Handle type="target" position={Position.Top} />
      <div>
        <img src="https://smite-builder.b-cdn.net/skills/achilles-2-0.png" />
      </div>
      <Handle type="source" position={Position.Bottom} id="a" />
      <Handle
        type="source"
        position={Position.Bottom}
        id="b"
        style={handleStyle}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="c"
        style={{ left: 20 }}
      />
      <Handle type="source" position={Position.Left} id="d" />
      <Handle type="source" position={Position.Left} id="e" />
    </div>
  );
}

const initialEdges = [
  { id: "e1-2", source: "1", target: "2", sourceHandle: "a" },
];

export default function Flow() {
  const initialNodes = useMemo(
    () => [
      {
        id: "1",
        position: { x: 0, y: 0 },
        data: { label: "1" },
        type: "textUpdater",
      },
      {
        id: "2",
        position: { x: 0, y: 100 },
        data: { label: "2" },
        type: "output",
      },
    ],
    []
  );
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  // setNodes(nodes => ([...nodes, ]))

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <ReactFlow
      nodeTypes={useMemo(() => ({ textUpdater: TextUpdaterNode }), [])}
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
    >
      <Controls />
      <Background />
    </ReactFlow>
  );
}
