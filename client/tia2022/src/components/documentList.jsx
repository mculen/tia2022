import React, { Component } from "react";
import DocumentListEntry from "./documentListEntry";

class DocumentList extends Component {
  constructor() {
    super();
    this.state = { items: [] }
  }

  async componentDidMount() {
    await this.getList();
  }

  async getList() {
    const response = await fetch('./list.php');
    const data = await response.json();
    this.setState({ items: data });
    console.log(data);
  }

  render() {
    const { items } = this.state;
    if (items) {
      return (
        <div className="documentList">
          {console.log(items)}{items.map((o) => {
              return <DocumentListEntry doc={o}/>;
            })}
        </div>
      );
    }
  }
}

export default DocumentList;