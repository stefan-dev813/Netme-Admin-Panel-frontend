import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Modal, Upload, message } from "antd";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const UploadImage = ({
  fileList,
  setFileList,
  previewImage,
  setPreviewImage,
  onImageUpload,
}) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewTitle, setPreviewTitle] = useState("");

  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    onImageUpload(newFileList); // Call the callback function in the parent component
  };

  const beforeUpload = (file) => {
    const allowedFileTypes = ["image/jpeg", "image/png", "image/gif"];
    const isImage = file.type.startsWith("image/");
    const isAllowedFileType = allowedFileTypes.includes(file.type);

    if (!isImage && !isAllowedFileType) {
      message.error("You can only upload image files!");
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
    <>
      <Upload
        action="
                https://admin.netme.eu/netmeapi/api/util/uploadFile"
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        beforeUpload={beforeUpload}
        maxCount={1}
        size="lg"
      >
        {fileList.length >= 1 ? null : uploadButton}
      </Upload>
      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img
          alt="example"
          style={{
            width: "100%",
          }}
          src={previewImage}
        />
      </Modal>
    </>
  );
};

export default UploadImage;
