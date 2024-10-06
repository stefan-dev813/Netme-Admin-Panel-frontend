import React, { useState } from "react";
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
  Box, 
} from "@chakra-ui/react";
import { BiFilter } from "react-icons/bi";
import styles from "./style.module.css";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch } from "react-redux";
import { fetchNotificationData } from "../../../../Redux/PushNotification/NotificationReducer";
import { format } from "date-fns"; 

function AdFilter({
  type,
  page,
  releasStartDate,
  releaseEndDate,
  city,
  setCity,
  setReleasStartDate,
  setReleaseEndDate,
  search,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedMenu, setSelectedMenu] = useState("Ad Type");
  // const [city, setCity] = useState("");
  // const [releaseStartDate,setReleaseStartDate]=useState("")
  // const [releaseEndDate,setReleaseEndDate]=useState("")

  const resetData = () => {
setReleasStartDate("");
    setReleaseEndDate("");
    setCity("");
  };

  const dispatch = useDispatch()

  const applyFilters = () => {
    const formattedStartDate = releasStartDate ? format(new Date(releasStartDate), "yyyy-MM-dd") : null;
    const formattedEndDate = releaseEndDate ? format(new Date(releaseEndDate), "yyyy-MM-dd") : null;
  
    dispatch(
      fetchNotificationData(type, search, page,
         formattedStartDate || "",
       formattedEndDate ||"",
     city || "",
      )
    );
    onClose();
  };
  
  
  return (
    <>
      <Button onClick={onOpen}>
        Filter <BiFilter fontSize={20} marginLeft={10} />
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent maxW="65vw">
          <ModalHeader
            fontSize={30}
            justifyContent="space-between"
            alignItems="center"
            boxShadow="lg"
            borderRadius={15}
          >
            <span>Filters</span>
            <ModalCloseButton fontSize={20} mt={4} />
          </ModalHeader>
          <ModalBody className={styles.modalBody}>
            <div className={styles.filterDiv2}>
              <div className={styles.innerFilter}>
                <div className={styles.filterMenu}>
                  <Box
                    borderWidth="1px"
                    p={4}
                    my={2}
                    cursor="pointer"
                    onClick={() => setSelectedMenu("Release On")}
                    className={
                      selectedMenu === "Release On"
                        ? styles.activeCard
                        : styles.inactive
                    }
                  >
                    Release On
                  </Box>
                  <Box
                    borderWidth="1px"
                    p={4}
                    my={2}
                    cursor="pointer"
                    onClick={() => setSelectedMenu("City")}
                    className={
                      selectedMenu === "City"
                        ? styles.activeCard
                        : styles.inactive
                    }
                  >
                    City
                  </Box>
                </div>

                <div className={styles.filterItems}>
                  {selectedMenu === "Release On" && (
                    <>
                      <p>Released On</p>
                      <div className={styles.dateSelect}>
                        <div className={styles.singlePicker}>
                          <ReactDatePicker
                          selected={releasStartDate ? new Date(releasStartDate) : null}
  onChange={(date) =>
    setReleasStartDate(
      date ? format(date, "yyyy-MM-dd") : "" // Use "yyyy-MM-dd" for correct format
    )
  }
                            placeholderText="Start date"
                          />
                        </div>
                        <div className={styles.singlePicker}>
                          <ReactDatePicker
                          minDate={releasStartDate ? new Date(releasStartDate) : null}
                         selected={releaseEndDate ? new Date(releaseEndDate) : null}
  onChange={(date) =>
    setReleaseEndDate(
      date ? format(date, "yyyy-MM-dd") : "" // Use "yyyy-MM-dd" for correct format
    )
  }
                            placeholderText="End date"
                          />
                        </div>
                      </div>
                    </>
                  )}
                  {selectedMenu === "City" && (
                    <>
                      <p>City</p>
                      <div className={styles.adTypeRadio}>
                        {/* Input field for entering city name */}
                        <input
                          type="text"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          placeholder="Enter city"
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </ModalBody>

          <ModalFooter mb={25}>
            <button className={styles.blackBtn} onClick={resetData}>
              Reset
            </button>
            &nbsp; &nbsp; &nbsp;
            <button className={styles.blackBtn2} onClick={() => {
                          applyFilters()
                          onClose()
                      }}>Apply filters</button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}


export default AdFilter;
