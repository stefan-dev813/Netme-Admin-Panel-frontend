import React from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
} from '@chakra-ui/react'
import crossImg from "../../../assets/crossImg.svg"
import styles from "./style.module.css"
import { RxCrossCircled } from 'react-icons/rx'
import { useDispatch } from 'react-redux'
import { fetchUserNotificationData, updateUserNotificationData } from '../../../Redux/User/UserNotificationReducer'
import { message } from 'antd'


const DeleteModel = ({ notificationId,title,type,page }) => {
  const dispatch = useDispatch()
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <span className={styles.blackBtn3} onClick={onOpen}  ><RxCrossCircled fontSize={20} />Cancel</span>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent maxW="40vw">
          <ModalCloseButton />
          <ModalBody>
          </ModalBody>
          <div className={styles.deleteModeldiv}>
            <p>Are your sure want to delete this<br />
              push notification??</p>
            <h5>{title}</h5>
          </div>

          <ModalFooter >
            <div className={styles.modelFooter}>
              <Button variant='solid' color="black" mr={3} 
               onClick={() => dispatch(updateUserNotificationData({ deleted: true, notificationId})).then(() => {
                dispatch(fetchUserNotificationData(type,"",page)).then(() => {
                  onClose()
                  message.success("Subscription has been deleted")
                })

              })}
              >
                Yes
              </Button>
              <Button variant='outline' color="black" onClick={onClose}>No</Button>
            </div>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>

  )
}

export default DeleteModel