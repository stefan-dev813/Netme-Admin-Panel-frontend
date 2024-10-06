import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
} from '@chakra-ui/react'
import { BiFilter } from 'react-icons/bi'
import styles from "./style.module.css"
import ReactDatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";

function MessageFilter({ startDate, setStartDate, endDate, setEndDate, setFilterApplied, filterApplied }) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const resetDate = () => {
      setEndDate("")
      setStartDate("")
  }
  return (
      <>
          <Button onClick={onOpen}>Filter  <BiFilter fontSize={20} marginLeft={10} /></Button>

          <Modal isOpen={isOpen} onClose={onClose} size="xl">
              <ModalOverlay />
              <ModalContent >
                  <ModalHeader fontSize={30} justifyContent="space-between" alignItems="center" boxShadow="lg" borderRadius={15} ><span>
                      Filters

                  </span>
                      <ModalCloseButton fontSize={20} mt={4} />
                  </ModalHeader>
                  <ModalBody>
                      <div className={styles.filterDiv2}>
                          <p>Received date and time</p>
                          <div className={styles.innerFilter}>
                            <div className={styles.singlePicker}>
                              <ReactDatePicker selected={startDate} onChange={(e) => setStartDate(e)} placeholderText='Start date' />
                              </div>
                                <div className={styles.singlePicker}>
                              <ReactDatePicker minDate={startDate} selected={endDate} onChange={(e) => setEndDate(e)} placeholderText='End date' />
                              </div>
                              {/* <DatePicker onChange={onChange} /> */}
                          </div>

                      </div>
                  </ModalBody>

                  <ModalFooter mb={25}>
                      <button className={styles.blackBtn} onClick={resetDate}>
                          Reset
                      </button>
                      &nbsp;
                      &nbsp;
                      &nbsp;
                      <button className={styles.blackBtn2} onClick={() => {
                          setFilterApplied((prev) => !prev)
                          onClose()
                      }}>Apply filters</button>
                  </ModalFooter>
              </ModalContent>
          </Modal>
      </>
  )
}
export default MessageFilter