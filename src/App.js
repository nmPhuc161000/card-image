import './App.css';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudArrowUp } from '@fortawesome/free-solid-svg-icons';

function App() {
  const [urlImg, setUrlImg] = useState("");
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];

    if (!file) return;

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "sword-cards"); // Đảm bảo tên preset đúng
    data.append("cloud_name", "dqnq00784");
    data.append("api_key", "YOUR_API_KEY"); // API Key

    const res = await fetch("https://api.cloudinary.com/v1_1/dqnq00784/image/upload", {
      method: "POST",
      body: data
    });

    if (res.ok) {
      const uploadImgUrl = await res.json();
      setUrlImg(uploadImgUrl.url);
      console.log(uploadImgUrl);
    } else {
      console.error("Error uploading image:", res.statusText);
    }
  }

  return (
    <div className="App">
      <FontAwesomeIcon icon={faCloudArrowUp} />
      <input type='file' className='file-input' onChange={handleFileUpload} />
      <div>{urlImg}</div>
    </div>
  );
}

export default App;
