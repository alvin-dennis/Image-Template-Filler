'use client';

import { useState, useRef, useEffect } from 'react';
import styles from './page.module.css';

export default function Home() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedFont, setSelectedFont] = useState(null);
  const [fontName, setFontName] = useState('Arial');
  const [csvData, setCsvData] = useState(null);
  const [csvHeaders, setCsvHeaders] = useState([]);
  const [textLayers, setTextLayers] = useState([]);
  const [activeLayer, setActiveLayer] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const canvasRef = useRef(null);
  const [draggedTag, setDraggedTag] = useState(null);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const layerStartPos = useRef({ x: 0, y: 0, width: 0, height: 0 });

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          setSelectedImage(img);
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFontUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fontUrl = URL.createObjectURL(file);
      const fontFace = new FontFace(file.name.split('.')[0], `url(${fontUrl})`);
      
      fontFace.load().then((loadedFace) => {
        document.fonts.add(loadedFace);
        setFontName(file.name.split('.')[0]);
        setSelectedFont(loadedFace);
      });
    }
  };

  const handleCsvUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target.result;
        const rows = text.split('\n');
        const headers = rows[0].split(',').map(header => header.trim());
        const data = rows.slice(1).map(row => {
          const values = row.split(',').map(value => value.trim());
          return headers.reduce((obj, header, index) => {
            obj[header] = values[index] || '';
            return obj;
          }, {});
        }).filter(row => Object.values(row).some(value => value !== ''));

        setCsvHeaders(headers);
        setCsvData(data);
      };
      reader.readAsText(file);
    }
  };

  const clearCanvas = () => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (selectedImage) {
        ctx.drawImage(selectedImage, 0, 0);
      }
      setTextLayers([]);
      setActiveLayer(null);
    }
  };

  const handleDragStart = (header) => {
    setDraggedTag(header);
  };

  const handleCanvasDrop = (e) => {
    e.preventDefault();
    if (draggedTag && canvasRef.current) {
      const canvas = canvasRef.current;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const newLayer = {
        id: Date.now(),
        text: `{${draggedTag}}`,
        x,
        y,
        width: 200,
        height: 40,
        fontSize: 20,
        isSelected: false
      };
      
      setTextLayers([...textLayers, newLayer]);
      setActiveLayer(newLayer.id);
    }
  };

  const handleCanvasDragOver = (e) => {
    e.preventDefault();
  };

  const handleLayerMouseDown = (e, layerId) => {
    e.stopPropagation();
    const layer = textLayers.find(l => l.id === layerId);
    if (layer) {
      setActiveLayer(layerId);
      setIsDragging(true);
      dragStartPos.current = { x: e.clientX, y: e.clientY };
      layerStartPos.current = { x: layer.x, y: layer.y };
    }
  };

  const handleResizeMouseDown = (e, layerId) => {
    e.stopPropagation();
    const layer = textLayers.find(l => l.id === layerId);
    if (layer) {
      setActiveLayer(layerId);
      setIsResizing(true);
      dragStartPos.current = { x: e.clientX, y: e.clientY };
      layerStartPos.current = { x: layer.x, y: layer.y, width: layer.width, height: layer.height };
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging && activeLayer) {
      const dx = e.clientX - dragStartPos.current.x;
      const dy = e.clientY - dragStartPos.current.y;
      
      setTextLayers(textLayers.map(layer => 
        layer.id === activeLayer
          ? { ...layer, x: layerStartPos.current.x + dx, y: layerStartPos.current.y + dy }
          : layer
      ));
    } else if (isResizing && activeLayer) {
      const dx = e.clientX - dragStartPos.current.x;
      const dy = e.clientY - dragStartPos.current.y;
      
      setTextLayers(textLayers.map(layer => 
        layer.id === activeLayer
          ? { 
              ...layer, 
              width: Math.max(100, layerStartPos.current.width + dx),
              height: Math.max(40, layerStartPos.current.height + dy)
            }
          : layer
      ));
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsResizing(false);
  };

  const drawLayers = () => {
    if (canvasRef.current && selectedImage) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(selectedImage, 0, 0);
      
      textLayers.forEach(layer => {
        ctx.font = `${layer.fontSize}px Space Mono`;
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillText(layer.text, layer.x, layer.y + layer.fontSize);
      });
    }
  };

  useEffect(() => {
    if (selectedImage && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      
      canvas.width = selectedImage.width;
      canvas.height = selectedImage.height;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(selectedImage, 0, 0);
      drawLayers();
    }
  }, [selectedImage, textLayers]);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isResizing, activeLayer]);

  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <h1 className={styles.title}>IMAGE TEMPLATE FILLER</h1>
        <p className={styles.subtitle}>Upload your image, font, and CSV to get started</p>
      </div>
      
      <div className={styles.content}>
        <div className={styles.sidebar}>
          <div className={styles.uploadSection}>
            <h2 className={styles.sectionTitle}>Upload Image</h2>
            <label className={styles.uploadLabel}>
              <span className={styles.uploadText}>Choose an image file</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className={styles.fileInput}
              />
            </label>
          </div>

          <div className={styles.uploadSection}>
            <h2 className={styles.sectionTitle}>Upload Font</h2>
            <label className={styles.uploadLabel}>
              <span className={styles.uploadText}>Choose a font file</span>
              <input
                type="file"
                accept=".ttf,.otf,.woff,.woff2"
                onChange={handleFontUpload}
                className={styles.fileInput}
              />
            </label>
            <p className={styles.fontInfo}>Current Font: {fontName}</p>
          </div>

          <div className={styles.uploadSection}>
            <h2 className={styles.sectionTitle}>Upload CSV</h2>
            <label className={styles.uploadLabel}>
              <span className={styles.uploadText}>Choose a CSV file</span>
              <input
                type="file"
                accept=".csv"
                onChange={handleCsvUpload}
                className={styles.fileInput}
              />
            </label>
            {csvData && (
              <div className={styles.csvInfo}>
                <p>CSV Headers: {csvHeaders.join(', ')}</p>
                <p>Number of Records: {csvData.length}</p>
                <div className={styles.tagsContainer}>
                  {csvHeaders.map((header, index) => (
                    <div
                      key={index}
                      className={styles.tag}
                      draggable
                      onDragStart={() => handleDragStart(header)}
                    >
                      {header}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className={styles.preview}>
          {selectedImage ? (
            <div className={styles.canvasContainer}>
              <canvas
                ref={canvasRef}
                className={styles.canvas}
                onDrop={handleCanvasDrop}
                onDragOver={handleCanvasDragOver}
              />
              {textLayers.map(layer => (
                <div
                  key={layer.id}
                  className={`${styles.textLayer} ${layer.id === activeLayer ? styles.active : ''}`}
                  style={{
                    left: layer.x,
                    top: layer.y,
                    width: layer.width,
                    height: layer.height
                  }}
                  onMouseDown={(e) => handleLayerMouseDown(e, layer.id)}
                >
                  <div className={styles.resizeHandle} onMouseDown={(e) => handleResizeMouseDown(e, layer.id)} />
                </div>
              ))}
              <button 
                className={styles.clearButton}
                onClick={clearCanvas}
              >
                Clear Canvas
              </button>
            </div>
          ) : (
            <div className={styles.placeholder}>
              <p>Upload an image to see the preview</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
