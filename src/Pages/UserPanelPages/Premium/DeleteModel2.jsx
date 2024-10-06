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
import styles from "./styles.module.css"
import { useDispatch } from 'react-redux'
// import { fetchCurrentSubscriptionData, updateCurrentSubscriptionData } from '../../Redux/Subscription/CurrentSubscriptionReducer'
import { RxCrossCircled } from 'react-icons/rx'
import { RiDeleteBin6Fill } from 'react-icons/ri'
import { fetchSubscriptionData, updateSubscriptionData } from '../../../Redux/Subscription/subscriptionReducer'
import { message } from 'antd'
// import { message } from 'antd'

const DeleteModel = ({ id }) => {
  const dispatch = useDispatch()
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <span className={styles.blackBtn3} onClick={onOpen}  ><RxCrossCircled fontSize={20} /> Delete</span>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
          </ModalBody>
          <div className={styles.deleteModeldiv}>
            <RiDeleteBin6Fill fontSize={80} color='#DB3B53' />
            <p>Are your sure want to delete this<br />
              subscription plan?</p>
          </div>

          <ModalFooter>
            <div className={styles.modelFooter}>
              <Button variant='solid' color="black" mr={3}
                onClick={() => dispatch(updateSubscriptionData({ deleted: true, userType: "USER", planId: id })).then(() => {
                  dispatch(fetchSubscriptionData("", "USER")).then(() => {
                    onClose()
                    message.error("Subscription had been deleted")
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