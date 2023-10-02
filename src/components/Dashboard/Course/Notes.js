import React, { useState, useRef } from 'react';
import ReactFlow, { addEdge, MiniMap, Controls, Background } from 'react-flow-renderer';

export default function Whiteboard() {
  const [elements, setElements] = useState([]);
  const [text, setText] = useState('');
  const [selectedTool, setSelectedTool] = useState('draw');
  const [selectedColor, setSelectedColor] = useState('#000000');
  const [image, setImage] = useState(null);

  const onElementsRemove = (elementsToRemove) => {
    setElements((els) => els.filter((el) => !elementsToRemove.some((toRemove) => toRemove.id === el.id)));
  };

  const onConnect = (params) => {
    setElements((els) => addEdge({ ...params, animated: true }, els));
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleAddText = () => {
    const newNode = {
      id: `text-${elements.length + 1}`,
      type: 'text',
      position: { x: 200, y: 200 },
      data: { label: text, color: selectedColor },
    };
    setElements([...elements, newNode]);
  };

  const handleAddArrow = () => {
    const newNode = {
      id: `arrow-${elements.length + 1}`,
      type: 'arrow',
      position: { x: 200, y: 200 },
      data: { color: selectedColor },
    };
    setElements([...elements, newNode]);
  };

  const handleAddImage = () => {
    if (image) {
      const newNode = {
        id: `image-${elements.length + 1}`,
        type: 'image',
        position: { x: 200, y: 200 },
        data: { src: image },
      };
      setElements([...elements, newNode]);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="whiteboard-container">
      <div className="tools">
        <button onClick={() => setSelectedTool('draw')}>Draw</button>
        <button onClick={() => setSelectedTool('text')}>Text</button>
        <button onClick={() => setSelectedTool('arrow')}>Arrow</button>
        <button onClick={() => setSelectedTool('image')}>Image</button>
      </div>
      {selectedTool === 'text' && (
        <div className="text-input">
          <input type="text" value={text} onChange={handleTextChange} placeholder="Type your text..." />
          <input type="color" value={selectedColor} onChange={(e) => setSelectedColor(e.target.value)} />
          <button onClick={handleAddText}>Add Text</button>
        </div>
      )}
      {selectedTool === 'arrow' && (
        <div className="arrow-input">
          <input type="color" value={selectedColor} onChange={(e) => setSelectedColor(e.target.value)} />
          <button onClick={handleAddArrow}>Add Arrow</button>
        </div>
      )}
      {selectedTool === 'image' && (
        <div className="image-input">
          <input type="file" onChange={handleImageUpload} />
          <button onClick={handleAddImage}>Add Image</button>
        </div>
      )}
      <div className="canvas">
        <ReactFlow
          elements={elements}
          onElementsRemove={onElementsRemove}
          onConnect={onConnect}
          snapToGrid={true}
          snapGrid={[15, 15]}
        >
          <MiniMap />
          <Controls />
          <Background color="#aaa" gap={16} />
        </ReactFlow>
      </div>
    </div>
  );
}
