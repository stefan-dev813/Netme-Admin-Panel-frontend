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
import styles from "./style.module.css";
import crossImg from "../../../assets/crossImg.svg";
import { RiDeleteBin6Fill } from "react-icons/ri";
import {
  fetchPartnerAdData,
  updatePartnerAdData,
} from "../../../Redux/Advertisement/Partner/PartnerAdReducer";
import { message } from "antd";
import { useDispatch } from "react-redux";
import { fetchExternalAdData, updateExternalAdData } from "../../../Redux/Advertisement/External/ExternalAdReducer";

const DeleteModel = ({ el, type, page,partnerAd }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();

  const handleYes = () =>{
    const data = {
      adId:el._id,
      partnerId:el.partnerId._id,
      status:"Cancelled"
    }
    if (partnerAd){
    dispatch(updatePartnerAdData(data)).then(() => {
      dispatch(fetchPartnerAdData(type, page)).then(() => {
        onClose();
        message.error("Ad has been cancelled");
      });
    });
  }else{
    dispatch(updateExternalAdData(data)).then(() => {
      dispatch(fetchExternalAdData(type, page)).then(() => {
        onClose();
        message.error("Ad has been cancelled");
      });
    })
  }
  }


  return (
    <>
      <p onClick={onOpen} className={styles.blackBtn31}>
        Cancel
      </p>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody></ModalBody>
          <div className={styles.deleteModeldiv}>
            <img src={crossImg} alt="" />

            <p>
              Are your sure want to Cancel this
              <br />
              Advertisement?
            </p>
          </div>

          <ModalFooter>
            <div className={styles.modelFooter}>
              <Button
                variant="solid"
                color="black"
                mr={3}
                onClick={handleYes}
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
