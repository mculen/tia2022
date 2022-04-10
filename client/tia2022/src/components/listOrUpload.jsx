import React, { useState } from "react";
import DocumentList from "./documentList";
import UploadForm from "./uploadForm";

const ListOrUpload = (props) => {
    const [isUploading, setUploading] = useState(false);

    function switchMode() {
        setUploading(!isUploading);
    }

    console.log("lou", props);
    const { logInFunction } = props;

    if (isUploading) {
        return <UploadForm switchToList={switchMode} />;
    } else {
        return <DocumentList switchToUpload={switchMode} />;
    }
}

export default ListOrUpload;