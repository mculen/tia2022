import React, { useState, useEffect } from "react";
import DocumentListEntry from "./documentListEntry";

const DocumentList = (props) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const getList = async () => {
      const response = await fetch('./list.php');
      const data = await response.json();
      setItems(data);
    }

    getList().catch(console.log);
  }, []);

  var itemList = (<></>);
  if (items) {
    itemList = items.map((o) => <DocumentListEntry doc={o}/>);
  }

  return (
    <div className="documentList">
      {itemList}
      <div className="docEntry">
        <a href="#" onClick={props.switchToUpload}>Pridať dokument...</a>
      </div>
    </div>
  );
}

export default DocumentList;