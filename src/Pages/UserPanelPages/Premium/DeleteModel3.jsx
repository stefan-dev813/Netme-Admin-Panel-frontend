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
import Vector from "../../../assets/Vector.svg"
import styles from "./styles.module.css"
// import { useDispatch } from 'react-redux'
// import { fetchCurrentSubscriptionData, updateCurrentSubscriptionData } from '../../Redux/Subscription/CurrentSubscriptionReducer'
import { RxCrossCircled } from 'react-icons/rx'
// import { message } from 'antd'

const DeleteModel = ({ el, type }) => {
  // const dispatch = useDispatch()
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <span className={styles.blackBtn3} onClick={onOpen}  ><RxCrossCircled fontSize={20} /> Delete Entry</span>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
          </ModalBody>
          <div className={styles.deleteModeldiv}>
            <p>Are your sure want to end this<br />
              subscription ?</p>
            <img src={Vector} alt="" />
            <p>Jhon doe</p>
          </div>


          <ModalFooter>
            <div className={styles.modelFooter}>
              <Button variant='solid' color="black" mr={3}
              //  onClick={() => dispatch(updateCurrentSubscriptionData({ deleted: true, SubscriptionId: el._id })).then(() => {
              //   dispatch(fetchCurrentSubscriptionData(type)).then(() => {
              //     onClose()
              //     message.error("Subscription had been deleted")
              //   })

              // })}
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