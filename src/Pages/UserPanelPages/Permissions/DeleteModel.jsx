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
import styles from "./styles.module.css"
import { useDispatch } from 'react-redux'
// import { fetchCurrentVoucherData, updateCurrentVoucherData } from '../../Redux/Voucher/CurrentVoucherReducer'
import { RxCrossCircled } from 'react-icons/rx'
import { RiDeleteBin6Fill } from 'react-icons/ri'
import { message } from 'antd'
import { fetchRoleData, updateRoleData } from '../../../Redux/Role/RoleReducer'

const DeleteModel = ({ el }) => {
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
            <p>Are your sure want to Delete</p>
            <RiDeleteBin6Fill fontSize={150} color='#DB3B53' />
          </div>

          <ModalFooter>
            <div className={styles.modelFooter}>
              <Button variant='solid' color="black" mr={3}
                onClick={() => dispatch(updateRoleData({ deleted: true, userId: el._id })).then(() => {
                  dispatch(fetchRoleData()).then(() => {
                    onClose()
                    message.error("Role had been deleted")
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