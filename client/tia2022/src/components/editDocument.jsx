import React, { useState } from "react";

const UploadForm = (props) => {

  const [selectedFile, setSelectedFile] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  async function uploadFile(name, file) {
    var postData = new FormData();
    postData.append("name", name);
    postData.append("file", file);
    const response = await fetch('./upload.php', {
        method: 'POST',
        body: postData
    });
    const responseJson = await response.json();
    if (responseJson.success) {
      await props.switchToList();
    } else {
      setError(responseJson.error);
    }
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
          <div className="lorFormError">{error}</div>
      </form>
    </div>
  );
}

export default UploadForm;