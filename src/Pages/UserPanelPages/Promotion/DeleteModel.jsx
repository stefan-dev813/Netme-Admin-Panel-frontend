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
import crossImg from "../../..//assets/crossImg.svg"
import styles from "./styles.module.css"
import { useDispatch } from 'react-redux'
import { RxCrossCircled } from 'react-icons/rx'
import { message } from 'antd'
import { fetchcurrentPromotionData, updatecurrentPromotionData } from '../../../Redux/Promotion/CurrentPromotionReducer'

const DeleteModel = ({ el, type }) => {
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
            <img src={crossImg} alt="" />
            <p>Are your sure want to delete<br />
              promotion?</p>
          </div>

          <ModalFooter>
            <div className={styles.modelFooter}>
              <Button variant='solid' color="black" mr={3} onClick={() => dispatch(updatecurrentPromotionData({ deleted: true, voucherId: el._id })).then(() => {
                dispatch(fetchcurrentPromotionData(type, "")).then(() => {
                  onClose()
                  message.error("Promotion had been deleted")
                })

              })}>
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