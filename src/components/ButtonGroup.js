import React from 'react';
import "../styles/file.css";

function ButtonGroup() {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = require("../file/current_var.txt");
    link.download = "current_var.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="ButtonGroup">
      <button className="button-style" onClick={handleDownload}>양식 다운로드</button>
      <button className="button-style">파일 업로드</button>
    </div>
  );
}

export default ButtonGroup;
