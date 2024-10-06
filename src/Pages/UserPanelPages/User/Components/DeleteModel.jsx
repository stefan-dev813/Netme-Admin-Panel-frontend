import React, { useState } from 'react'
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
import styles from "../style.module.css"
// import { useDispatch } from 'react-redux'
import { RxCrossCircled } from 'react-icons/rx';
import { userRequest } from '../../../../requestMethod';

const DeleteModel = ({ data, id, getData, setType }) => {
  console.log("id**" ,id)
  console.log(data, 'data**');
  console.log("setType**" ,setType)
  console.log("getData**" , getData)
  // console.log("premiumFun**" , premiumFun())
  // const dispatch = useDispatch()
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [reason, setReason] = useState('');

  const handleUpdate = async () => {
    console.log("id$$" , id)
    
    try {
      const response = await userRequest.put('/admin/user/updateCustomer', {
          userId:id,
          deleted: true,
          reason: reason
      });
      onClose();
      if(response){
        if(setType === 'Standard'){
        getData('Standard')
        } else{
          getData()
          
          
        }
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <>
      <span onClick={onOpen} className={styles.blackBtn36}><RxCrossCircled fontSize={20} /> Delete</span>


      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
          </ModalBody>
          <div className={styles.deleteModeldiv}>
            <p>Are you sure want to delete?</p>
            <img src={data.images[0]} alt="" />
            <p>{data.userName}</p>
            <textarea 
            name="" 
            id="" 
            placeholder='Reason' 
            rows="4"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            >
        
            </textarea>
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

export default DeleteModel