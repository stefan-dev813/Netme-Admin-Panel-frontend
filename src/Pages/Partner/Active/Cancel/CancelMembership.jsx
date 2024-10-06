import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import styles from './style.module.css'
import cancelImage from "../../../../assets/cancelImage.png";


function CancelMembership({partnerId,partnerName}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  return (
    <div>
      <Button onClick={onOpen} className={styles.cancelButton}>Cancel Membership</Button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered={true}>
        <ModalOverlay />
        <ModalContent style={{ top: "10%",borderRadius:"10px" }}>
          <ModalCloseButton />
          <ModalBody>
            <div className={styles.crossImage}>
              <img src={cancelImage} alt="" />
            </div>
            <div className={styles.cancelContent}>
              <p>Are your sure want to cancel</p>
              <p>the membership of {partnerName}?</p>
            </div>
          </ModalBody>
          <div className={styles.actionButton}>
            <button onClick={onClose}>Yes</button>
            <button onClick={onClose}>No</button>
          </div>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default CancelMembership;
