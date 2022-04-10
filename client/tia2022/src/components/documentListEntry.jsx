import React from "react";

const DocumentListEntry = (props) => {
    const { doc } = props;
  return (
    <div className="docEntry">
        <a href={"doc.php?id=" + doc.id} target="_blank">{doc.name}</a>
        <span className="docEntryUploaded">Nahrané: {new Date(doc.upload_time).toLocaleDateString()}</span>
    </div>
  );
};

export default DocumentListEntry;