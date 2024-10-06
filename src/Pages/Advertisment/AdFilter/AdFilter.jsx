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
  Box, // Import Box component from Chakra UI
} from "@chakra-ui/react";
import { BiFilter } from "react-icons/bi";
import styles from "./style.module.css";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { fetchPartnerAdData } from '../../../Redux/Advertisement/Partner/PartnerAdReducer';
import { useDispatch } from "react-redux";
import { format } from "date-fns"; 

function AdFilter({
  setAdType,
  adType,  
  type,
  page,
  search,
  setReleaseStartDate,
  releaseStartDate,
  setReleaseEndDate,
  releaseEndDate,
  setCreatedStartDate,
  createdStartDate,
  setCreatedEndDate,
  createdEndDate,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedMenu, setSelectedMenu] = useState("Ad Type");
  const [checkedItem, setCheckedItem] = useState("");
  const resetDate = () => {
    setAdType("");
    setReleaseStartDate("");
    setReleaseEndDate("");
    setCreatedStartDate("");
    setCreatedEndDate("");
    setCheckedItem("");
  };

  const dispatch = useDispatch()

  const applyFilters = () => {
    const formattedStartDate = releaseStartDate ? format(new Date(releaseStartDate), "yyyy-MM-dd") : null;
    const formattedEndDate = releaseEndDate ? format(new Date(releaseEndDate), "yyyy-MM-dd") : null;
    const formattedcreatedStartDate = createdStartDate ? format(new Date(createdStartDate), "yyyy-MM-dd") : null;
    const formattedcreatedEndDate = createdEndDate ? format(new Date(createdEndDate), "yyyy-MM-dd") : null;
  
    dispatch(
      fetchPartnerAdData(type, search, page,
      adType || "",
      formattedStartDate || "",
      formattedEndDate ||"",
      formattedcreatedStartDate ||"",
      formattedcreatedEndDate ||"",
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
                    onClick={() => setSelectedMenu("Ad Type")}
                    className={
                      selectedMenu === "Ad Type"
                        ? styles.activeCard
                        : styles.inactive
                    }
                  >
                    Ad Type
                  </Box>
                  <Box
                    borderWidth="1px"
                    p={4}
                    my={2}
                    cursor="pointer"
                    onClick={() => setSelectedMenu("Released On")}
                    className={
                      selectedMenu === "Released On"
                        ? styles.activeCard
                        : styles.inactive
                    }
                  >
                    Released On
                  </Box>
                  <Box
                    borderWidth="1px"
                    p={4}
                    my={2}
                    cursor="pointer"
                    onClick={() => setSelectedMenu("Created On")}
                    className={
                      selectedMenu === "Created On"
                        ? styles.activeCard
                        : styles.inactive
                    }
                  >
                    Created On
                  </Box>
                  <Box
                    borderWidth="1px"
                    p={4}
                    my={2}
                    cursor="pointer"
                    onClick={() => setSelectedMenu("Status")}
                    className={
                      selectedMenu === "Status"
                        ? styles.activeCard
                        : styles.inactive
                    }
                  >
                    Status
                  </Box>
                </div>

                <div className={styles.filterItems}>
                  {selectedMenu === "Ad Type" && (
                    <>
                      <p>Verification</p>
                      <div className={styles.adTypeRadio}>
                        <div>
                          <input
                            type="radio"
                            value="Suggestion list"
                            checked={adType === "Suggestion"}
                            onChange={() => {
                  setAdType("Suggestion"); // Update adType with setAdType
                }}
                          />
                          <span>Suggestion list</span>
                        </div>
                        <br />
                        <div>
                          <input
                            type="radio"
                            value="In-feed"
                            checked={adType === "Feed"}
                            onChange={() => {
                  setAdType("Feed"); 
                }}
                          />
                          <span>In-feed</span>
                        </div>
                      </div>
                    </>
                  )}
                  {selectedMenu === "Released On" && (
                    <>
                      <p>Released On</p>
                      <div className={styles.dateSelect}>
                        <div className={styles.singlePicker}>
                          <ReactDatePicker
                             selected={releaseStartDate ? new Date(releaseStartDate) : null}
                             onChange={(date) =>
                             setReleaseStartDate(
                             date ? format(date, "yyyy-MM-dd") : ""    
                             )
                               }
                            placeholderText="Start date"
                          />
                        </div>
                        <div className={styles.singlePicker}>
                          <ReactDatePicker
                         minDate={releaseStartDate ? new Date(releaseStartDate) : null}
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
                  {selectedMenu === "Created On" && (
                    <>
                      <p>Created On</p>
                      <div className={styles.dateSelect}>
                        <div className={styles.singlePicker}>
                          <ReactDatePicker
                            selected={createdStartDate ? new Date(createdStartDate) : null}
                             onChange={(date) =>
                             setCreatedStartDate(
                             date ? format(date, "yyyy-MM-dd") : "" 
                             )
                              }
                            placeholderText="Start date"
                          />
                        </div>
                        <div className={styles.singlePicker}>
                          <ReactDatePicker
                            minDate={createdStartDate ? new Date(createdStartDate) : null}
                            selected={createdEndDate ? new Date(createdEndDate) : null}
                         onChange={(date) =>
                         setCreatedEndDate(
                         date ? format(date, "yyyy-MM-dd") : "" // Use "yyyy-MM-dd" for correct format
                         )
                           }
                            placeholderText="End date"
                          />
                        </div>
                      </div>
                    </>
                  )}
                  {selectedMenu === "Status" && (
                    <>
                      <p>Status</p>
                      <div className={styles.adTypeRadio}>
                        {/* <div>
                          <input
                            type="radio"
                            value="Requested"
                            checked={checkedItem === "Requested"}
                            onChange={() =>{ 
                            setCheckedItem("Requested")
                            setStatus("Requested");
                            }}
                          />
                          <span>Requested</span>
                        </div> */}
                        <br />
                        {/* <div>
                          <input
                            type="radio"
                            value="History"
                            checked={checkedItem === "History"}
                            onChange={() =>{ 
                            setCheckedItem("History")
                            setStatus("History")
                            }}
                          />
                          <span>History</span>
                        </div> */}
                      </div>
                      <div className={styles.adTypeRadio}>
                        {/* <div>
                          <input
                            type="radio"
                            value="Rejected"
                            checked={checkedItem === "Rejected"}
                            onChange={() => {
                            setCheckedItem("Rejected")
                            }}
                          />
                          <span>Rejected</span>
                        </div> */}
                        <br />
                        {/* <div>
                          <input
                            type="radio"
                            value="Cancelled"
                            checked={checkedItem === "Cancelled"}
                            onChange={() =>{ 
                            setCheckedItem("Cancelled")
                            }}
                          />
                          <span>Cancelled</span>
                        </div> */}
                      </div>
                      <div className={styles.adTypeRadio}>
                        <div>
                          <input
                            type="radio"
                            value="Live"
                            checked={checkedItem === "Live"}
                            onChange={() =>{ 
                            setCheckedItem("Live")
                            }}
                          />
                          <span>Live</span>
                        </div>
                        <br />
                        <div>
                          <input
                            type="radio"
                            value="Ended"
                            checked={checkedItem === "Ended"}
                            onChange={() => {
                            setCheckedItem("Ended")
                            }}
                          />
                          <span>Starting Soon</span>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </ModalBody>

          <ModalFooter mb={25}>
            <button className={styles.blackBtn} onClick={resetDate}>
              Reset
            </button>
            &nbsp; &nbsp; &nbsp;
            <button
              className={styles.blackBtn2}
              onClick={() => {
               applyFilters();
                onClose();
              }}
            >
              Apply filters
            </button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AdFilter;
