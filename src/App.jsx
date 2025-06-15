import React, { useState, useEffect } from 'react';
import html2canvas from 'html2canvas';
import sampleImage from './assets/sample.jpg';

// This is a test update for pull request


function App() {
  // Load saved state from localStorage
  const [textBoxes, setTextBoxes] = useState(() => {
    const saved = localStorage.getItem('textBoxes');
    return saved ? JSON.parse(saved) : [];
  });

  // Save to localStorage on any change
  useEffect(() => {
    localStorage.setItem('textBoxes', JSON.stringify(textBoxes));
  }, [textBoxes]);

  const addTextBox = () => {
    const newTextBox = {
      id: Date.now(),
      text: 'Your Text Here',
      x: 50,
      y: 50,
      fontSize: 16,
      fontFamily: 'Arial',
      color: '#ff0000',
    };
    setTextBoxes([...textBoxes, newTextBox]);
  };

  const updateTextBox = (id, updatedBox) => {
    setTextBoxes(textBoxes.map(box => (box.id === id ? { ...box, ...updatedBox } : box)));
  };

  const deleteTextBox = (id) => {
    setTextBoxes(textBoxes.filter(box => box.id !== id));
  };

  const handleMouseDown = (e, id) => {
    const startX = e.clientX;
    const startY = e.clientY;
    const box = textBoxes.find(box => box.id === id);
    const origX = box.x;
    const origY = box.y;

    const handleMouseMove = (moveEvent) => {
      const dx = moveEvent.clientX - startX;
      const dy = moveEvent.clientY - startY;
      updateTextBox(id, { x: origX + dx, y: origY + dy });
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const downloadImage = () => {
    const container = document.getElementById('image-container');
    html2canvas(container).then(canvas => {
      const link = document.createElement('a');
      link.download = 'image-with-text.png';
      link.href = canvas.toDataURL();
      link.click();
    });
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Image Template Filler - Final Update</h1>



      <div style={{ marginBottom: '10px' }}>
        <button onClick={addTextBox}>Add Text Box</button>
        <button onClick={downloadImage} style={{ marginLeft: '10px' }}>Download Image</button>
      </div>

      <div
        id="image-container"
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '500px',
          border: '2px solid black',
          userSelect: 'none',
        }}
      >
        <img src={sampleImage} alt="Sample" style={{ width: '100%', display: 'block' }} />

        {textBoxes.map((box) => (
          <div
            key={box.id}
            onMouseDown={(e) => handleMouseDown(e, box.id)}
            style={{
              position: 'absolute',
              left: `${box.x}px`,
              top: `${box.y}px`,
              color: box.color,
              fontSize: `${box.fontSize}px`,
              fontFamily: box.fontFamily,
              cursor: 'move',
              backgroundColor: 'rgba(255,255,255,0.5)',
              padding: '4px',
              borderRadius: '4px',
            }}
          >
            <input
              type="text"
              value={box.text}
              onChange={(e) => updateTextBox(box.id, { text: e.target.value })}
              style={{
                fontSize: `${box.fontSize}px`,
                fontFamily: box.fontFamily,
                color: box.color,
                border: 'none',
                background: 'transparent',
                outline: 'none',
              }}
            />
            <br />
            <select
              value={box.fontFamily}
              onChange={(e) => updateTextBox(box.id, { fontFamily: e.target.value })}
            >
              <option>Arial</option>
              <option>Courier New</option>
              <option>Georgia</option>
              <option>Times New Roman</option>
              <option>Verdana</option>
            </select>
            <input
              type="color"
              value={box.color}
              onChange={(e) => updateTextBox(box.id, { color: e.target.value })}
              style={{ marginLeft: '5px' }}
            />
            <input
              type="number"
              value={box.fontSize}
              onChange={(e) => updateTextBox(box.id, { fontSize: parseInt(e.target.value) })}
              style={{ width: '50px', marginLeft: '5px' }}
              min="8"
              max="72"
            />
            <button onClick={() => deleteTextBox(box.id)} style={{ marginLeft: '5px' }}>❌</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
