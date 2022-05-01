import React from "react";

const DocumentListEntry = (props) => {
  const { doc } = props;

  async function deleteDoc(id) {
    var postData = new FormData();
    postData.append("id", id);
    const response = await fetch('./delete_doc.php', {
      method: 'POST',
      body: postData
    });
    const responseJson = await response.json();
    props.update();
  }

  return (
    <div className="docEntry">
        <a href={"doc.php?id=" + doc.id} target="_blank">{doc.name}</a>
        <span className="docEntryUploaded">Nahrané: {new Date(doc.upload_time).toLocaleDateString()}</span>
        <br />
        <div className="docEntryUploaded"><a href="#" onClick={() => deleteDoc(doc.id)}>Odstrániť</a></div>
    </div>
  );
};

export default DocumentListEntry;