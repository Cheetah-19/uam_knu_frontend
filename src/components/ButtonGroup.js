import React, { useState } from 'react';
import "../styles/file.css";

function ButtonGroup({ onFileData }) {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = require("../file/current_var.txt");
    link.download = "current_var.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (selectedFile) {
      const fileReader = new FileReader();
      fileReader.onload = (event) => {
        const fileContent = event.target.result;
        const lines = fileContent.split('\n');
        const data = {};
        lines.forEach((line) => {
          const [key, value] = line.split(' : ');
          data[key.trim()] = Number(value.trim());
        });
        // Start.js로 데이터 전달
        onFileData(data);
      };
      fileReader.readAsText(selectedFile);
    }
  };

  return (
    <div className="ButtonGroup">
      <div className="file_button">
      <button className="button-style" onClick={handleDownload}>양식 다운로드</button>
      <button className="button-style" onClick={handleUpload}>파일 업로드</button>
      </div>
      <input className="button-style" type="file" onChange={handleFileChange} />
      
    </div>
  );
}

export default ButtonGroup;
