import React, { useState, useRef } from 'react';
import './App.css';
import { Rnd } from 'react-rnd';
import html2canvas from 'html2canvas';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import templateImage from './assets/image.jpg';

function App() {
  const [texts, setTexts] = useState([]);
  const [fontSize, setFontSize] = useState(16);
  const imageRef = useRef(null);

  const addTextBox = () => {
    setTexts([...texts, { id: Date.now(), text: 'Edit me', x: 50, y: 50 }]);
  };

  const updateText = (id, newText) => {
    setTexts(texts.map(t => t.id === id ? { ...t, text: newText } : t));
  };

  const deleteTextBox = (id) => {
    setTexts(texts.filter(t => t.id !== id));
  };

  const handleCapture = async () => {
    const canvas = await html2canvas(imageRef.current);
    const dataUrl = canvas.toDataURL('image/png');
    const blob = await (await fetch(dataUrl)).blob();

    const zip = new JSZip();
    zip.file("template-output.png", blob);
    zip.generateAsync({ type: 'blob' }).then(zipFile => {
      saveAs(zipFile, "template-filler.zip");
    });
  };

  return (
    <div className="app">
      <h1>🖼️ Image Template Filler</h1>

      <button onClick={addTextBox}>➕ Add Text</button>

      <label>Font Size:
        <input
          type="range"
          min="10"
          max="40"
          value={fontSize}
          onChange={(e) => setFontSize(parseInt(e.target.value))}
        />
      </label>

      <div className="image-area" ref={imageRef}>
        <img src={templateImage} alt="Template" className="template-img" />
        {texts.map((t) => (
          <Rnd
            key={t.id}
            default={{ x: t.x, y: t.y, width: 200, height: 50 }}
            bounds="parent"
          >
            <div className="text-box">
              <button className="delete-btn" onClick={() => deleteTextBox(t.id)}>❌</button>
              <textarea
                style={{ fontSize: `${fontSize}px` }}
                value={t.text}
                onChange={(e) => updateText(t.id, e.target.value)}
                className="draggable-text"
              />
            </div>
          </Rnd>
        ))}
      </div>

      <button onClick={handleCapture}>⬇️ Download ZIP</button>
    </div>
  );
}

export default App;
