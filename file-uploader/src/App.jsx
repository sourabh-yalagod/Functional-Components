import React, { useState } from 'react';

const App = () => {
  const [files, setFiles] = useState([]);
  const [isDraged, setIsDraged] = useState(false);

  const handleFiles = (e) => {
    const { files } = e.target;
    setFiles((prev) => [...prev, ...files]);
  };

  const handleremove = (fileName) => {
    setFiles((prev) => prev.filter((file) => file.name !== fileName));
  };

  const onDragOver = (e) => { 
    e.preventDefault()
    setIsDraged(true)
  }
  const onDragEnd = (e) => {
    e.preventDefault()
    setIsDraged(false)
  }
  const handleDrop = (e) => {
    e.preventDefault()
    const {files}=e.dataTransfer
    setFiles((prev) => [...prev, ...files]);
    setIsDraged(false)
  }

  return (
    <div className="uploader-container">
      <div
        onDragEnter={onDragOver}
        onDragExit={onDragEnd}
        onDragOver={onDragOver}
        onDrop={handleDrop}
        className={`${isDraged ? "upload-box-Drag" : "upload-box-noDrag"}`}>
        <input
          onChange={handleFiles}
          multiple
          type="file"
          name="file"
          id="file"
          className="file-input"
        />
        <h1>Drag and drop image file here</h1>
        <label htmlFor="file" className="upload-label">Upload Files</label>
      </div>

      <ul className="file-preview-list">
        {files?.map((file, index) => (
          <li className="file-preview-item" key={index}>
            <img
              className="preview-image"
              src={URL.createObjectURL(file)}
              alt={file?.name}
            />
            <div className="file-info">
              <div
                onClick={() => handleremove(file.name)}
                className="remove-button"
              >
                ✕
              </div>
              <div className="file-size">{((file.size) / 1024).toFixed(2)} Kb</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
