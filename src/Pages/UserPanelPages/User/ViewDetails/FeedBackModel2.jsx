import React from 'react'
import styles from "./style.module.css"
import { Avatar, useDisclosure } from '@chakra-ui/react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'
import { PiSuitcaseSimple } from 'react-icons/pi'

const FeedBackModel2 = ({message, datas}) => {
    console.log(datas, 'allData');
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <div>
            <div className={styles.reason} onClick={onOpen}>
             {message}
            </div>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalCloseButton />
                    <ModalBody  className={styles.modelBody}>
                     
                        <h3 className={styles.h3}>User Details</h3>
                        <div className={styles.profileDetails2}>
                        <div className={styles.profilePic}>
                                                <Avatar name='Dan Abrahmov' src={datas.images}/>
                                <div><h2>{datas.userName}</h2>
                                    <h3 className={styles.h3}>{datas.email}</h3>
                                    <span className={styles.iconSpan}>
                                        <PiSuitcaseSimple />
                                        Journalist
                                    </span>
                                </div>
                            </div>
                        </div>
                        <h2>
                            Feedback
                        </h2>
                        <div className={styles.text}>
                           {message}
                        </div>
                    </ModalBody>

                    <ModalFooter>

                    </ModalFooter>
                </ModalContent>
            </Modal>



        </div>
    )
}

export default FeedBackModel2 