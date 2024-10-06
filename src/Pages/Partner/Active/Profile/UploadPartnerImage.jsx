import React from "react";
import { PlusOutlined } from '@ant-design/icons';
import { Upload, message } from 'antd';
import { fileRequest } from "../../../../requestMethod";


const UploadPartnerImage = ({ fileList, setFileList, onImageUpload }) => {
    const handleChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
        onImageUpload(newFileList); // Call the callback function in the parent component
    };

    const beforeUpload = (file) => {
        const allowedFileTypes = ['image/jpeg', 'image/png', 'image/gif'];
        const isImage = file.type.startsWith('image/');
        const isAllowedFileType = allowedFileTypes.includes(file.type);

        if (!isImage && !isAllowedFileType) {
            message.error('You can only upload image files!');
            return false; // Cancel the upload
        }

        return true;
    };

    const uploadButton = (
        <div>
            <PlusOutlined />
        </div>
    );

    return (
        <Upload
            // action={fileRequest.defaults.baseURL + "/api/util/uploadFile"}
            action="https://admin.netme.eu/netmeapi/api/util/uploadFile"

            listType="picture-card"
            fileList={fileList}
            onChange={handleChange}
            beforeUpload={beforeUpload}
            maxCount={1}
            size="lg"
            showUploadList={false}
        >
            {uploadButton}
        </Upload>
    );
};

export default UploadPartnerImage;
