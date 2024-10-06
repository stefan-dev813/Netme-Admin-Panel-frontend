import React from 'react'
import styles from "./styles.module.css"
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

const FeedBackModel = ({data}) => {
    console.log(data, "allMessagesAreHere");
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <div>
            <div className={styles.reason} onClick={onOpen}>
              {data}
            </div>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalCloseButton />
                    <ModalBody  className={styles.modelBody}>
                        {/* <h3 className={styles.h3}>User Details</h3>
                        <div className={styles.profileDetails2}>
                            <div className={styles.profilePic}>
                                <Avatar name='Dan Abrahmov' src='https://bit.ly/dan-abramov' size="lg" />
                                <div><h2 >Gloria, 24</h2>
                                    <h3 className={styles.h3}>johndoe@gmail.com</h3>
                                    <span className={styles.iconSpan}>
                                        <PiSuitcaseSimple />
                                        Journalist
                                    </span>
                                </div>
                            </div>
                        </div> */}
                        {/* <h3 className={styles.h3}>User Details</h3>
                        <div className={styles.profileDetails2}>
                            <div className={styles.profilePic}>
                                <Avatar name='Dan Abrahmov' src='https://bit.ly/dan-abramov' size="lg" />
                                <div><h2>Gloria, 24</h2>
                                    <h3 className={styles.h3}>johndoe@gmail.com</h3>
                                    <span className={styles.iconSpan}>
                                        <PiSuitcaseSimple />
                                        Journalist
                                    </span>
                                </div>
                            </div>
                        </div> */}
                        <h2>
                            Feedback
                        </h2>
                        <div className={styles.text}>
                           {data}
                        </div>
                    </ModalBody>

                    <ModalFooter>

                    </ModalFooter>
                </ModalContent>
            </Modal>



        </div>
    )
}

export default FeedBackModel 