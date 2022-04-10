import React, { useState } from "react";

const UploadForm = (props) => {

  const [selectedFile, setSelectedFile] = useState("");
  const [name, setName] = useState("");

  async function uploadFile(name, file) {
    console.log("upload", name, file);
    var data = new FormData();
    data.append("name", name);
    data.append("file", file);
    const response = await fetch('./upload.php', {
        method: 'POST',
        body: data
    });
    const response_json = await response.json();
    await props.switchToList();
  }

  async function handleSubmit(event) {
    event.preventDefault();
    await uploadFile(name, selectedFile);
  }

  return (
    <div className="lorFormOuter">
      <form className="lorForm" onSubmit={handleSubmit}>
          <div className="lorFormRow">Názov: <input type="test" value={name} onChange={(event) => setName(event.target.value)} /></div>
          <div className="lorFormRow">Súbor: <input type="file" onChange={(event) => setSelectedFile(event.target.files[0])} /></div>
          <div className="lorFormButtons">
              <div className="lorFormSubmit"><input type="submit" value="Pridať" /></div>
              <a href="#" className="lorFormSwitch" onClick={props.switchToList}>Zrušiť</a>
          </div>
      </form>
    </div>
  );
}

export default UploadForm;