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
import vector from "../../../assets/Vector.svg"
import styles from "./style.module.css"
import { useDispatch } from 'react-redux'
import { fetchUserData, updateUserData } from '../../../Redux/User/UserReducer'
import { message } from 'antd'


const DeleteModel = ({el, type, data, id }) => {
  const dispatch = useDispatch()
  const { isOpen, onOpen, onClose } = useDisclosure();



  return (
    <>
      <p onClick={onOpen} className={styles.blackBtn3} style={{
        padding: "10px 30px 10px 30px"
      }}
      //  onClick={() => dispatch(updateActivePartnerData({ partnerId: el.partnerId._id, status: "Deleted" }))}
      >Delete Permanently</p>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
          </ModalBody>
          <div className={styles.deleteModeldiv}>
            <p>Are your sure want to Delete
              <br /> permanently?
            </p>
            <img src={vector} alt='' style={{ width: "20%" }} />
            <h3>Jhon deo</h3>
          </div>

          <ModalFooter>
            <div className={styles.modelFooter}>
              <Button variant='solid' color="black" mr={3}
              onClick={() => dispatch(updateUserData({ deleted: true, voucherId: el._id })).then(() => {
                dispatch(fetchUserData(type)).then(() => {
                  onClose()
                  message.error("Voucher had been deleted")
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