import React, { useState, useEffect } from "react";
import DocumentListEntry from "./documentListEntry";
import Categories from "./categories";

const DocumentList = (props) => {
  const [items, setItems] = useState([]);

  const updateList = async () => {
    const response = await fetch('./list.php');
    const data = await response.json();
    setItems(data);
  }

  useEffect(() => {
    updateList().catch(console.log);
  }, []);

  var itemList = (<></>);
  if (items) {
    itemList = items.map((o) => <DocumentListEntry doc={o} update={updateList}/>);
  }

  return (<>
<<<<<<< HEAD
    <Categories setCategory={props.setCategory} />
=======
    <CategoryList/>
>>>>>>> tmp
    <div className="documentList">
      {itemList}
      <div className="docEntry">
        <a href="#" onClick={props.switchToUpload}>Pridať dokument...</a>
      </div>
    </div>
  </>);
}

export default DocumentList;