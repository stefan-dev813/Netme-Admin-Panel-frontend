import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import crossImg from "../../assets/crossImg.svg";
import styles from "./styles.module.css";
import { useDispatch } from "react-redux";
import {
  fetchCurrentVoucherData,
  updateCurrentVoucherData,
} from "../../Redux/Voucher/CurrentVoucherReducer";
import { RxCrossCircled } from "react-icons/rx";
import { message } from "antd";

const DeleteModel = ({ el, type }) => {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleDeleteVoucher = async (dispatch, el, type, onClose) => {
    try {
      await dispatch(
        updateCurrentVoucherData({
          deleted: true,
          voucherId: el._id,
        })
      );

      await dispatch(fetchCurrentVoucherData(type));

      onClose();
      message.error("Voucher has been deleted");
    } catch (error) {
      console.error("Error deleting voucher:", error);
      message.error("Failed to delete the voucher");
    }
  };
  return (
    <>
      <span className={styles.blackBtn3} onClick={onOpen}>
        <RxCrossCircled fontSize={20} /> Delete
      </span>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody></ModalBody>
          <div className={styles.deleteModeldiv}>
            <img src={crossImg} alt="" />
            <p>
              Are your sure want to delete
              <br />
              promotion?
            </p>
          </div>

          <ModalFooter>
            <div className={styles.modelFooter}>
              <Button
                variant="solid"
                color="black"
                mr={3}
                onClick={() => handleDeleteVoucher(dispatch, el, type, onClose)}
              >
                Yes
              </Button>
              <Button variant="outline" color="black" onClick={onClose}>
                No
              </Button>
            </div>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DeleteModel;
