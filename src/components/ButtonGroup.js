import React, { useState, useEffect } from 'react';
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
    const fileReader = new FileReader();
    fileReader.onload = (event) => {
      const fileContent = event.target.result;
      const lines = fileContent.split('\n');
      const data = {};
      try {
        lines.forEach((line) => {
          const [key, value] = line.split(' : ');
          data[key.trim()] = Number(value.trim());
        });
      } catch (error) {
        alert("잘못된 형식의 파일입니다.");
      }
      // Start.js로 데이터 전달
      onFileData(data);
    };
    fileReader.readAsText(selectedFile);
  };

  useEffect(() => {
    if (selectedFile) {
      handleUpload();
    }
  }, [selectedFile]);

  return (
    <div className="ButtonGroup">
      <div className="file_button">
        <button className="button-style" onClick={handleDownload}>양식 다운로드</button>
        <label className="button-style" for="file-upload-button">파일 업로드</label>
      </div>
      <input id="file-upload-button" className="button-style" type="file" accept=".txt" onChange={handleFileChange} style={{display:"none"}} />
    </div>
  );
}

export default ButtonGroup;
