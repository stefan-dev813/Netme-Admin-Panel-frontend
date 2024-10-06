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
// import vector from "../../../../assets/Vector.svg"
import styles from "./style.module.css"
// import { useDispatch } from 'react-redux'
// import { fetchUserData, updateUserData } from '../../../Redux/User/UserReducer'
// import { message } from 'antd'
import { userRequest } from '../../../../requestMethod';


const DeletePermanentlyModel = ({ data, id, getData }) => {
  console.log(data, 'dataOfTheUser');
  // const dispatch = useDispatch()
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleUpdate = async () => {
    console.log(id, 'id');
    try {
      const response = await userRequest.delete('/admin/user/deletePermanently', {
        data: {
          userId: id,
        },
      });
      if(response){
        getData();
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

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
            <img src={data.images[0]} alt='' style={{ width: "20%" }} />
            <h3>{data.userName}</h3>
          </div>

          <ModalFooter>
            <div className={styles.modelFooter}>
              <Button variant='solid' color="black" mr={3}
               onClick={handleUpdate}
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

export default DeletePermanentlyModel;