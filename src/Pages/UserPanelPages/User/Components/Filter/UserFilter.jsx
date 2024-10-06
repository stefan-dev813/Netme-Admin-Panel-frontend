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
import { fetchUserData } from "../../../../../Redux/User/UserReducer";
import { format } from "date-fns"; 

function UserFilter({ 
  type, 
  page,
  search,
  registerationStartDate,
  registerationEndDate,
  setRegisterationStartDate,
  setRegisterationEndDate,
  gender,
  setGender,
  setCity, 
  city,
  ageRangeStart,
  setAgeRangeStart,
  ageRangeEnd,
  setAgeRangeEnd
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedMenu, setSelectedMenu] = useState("Verification");
  const [verification, setVerification] = useState("Verified");
 
  const resetData = () => {
    setRegisterationStartDate("");
    setRegisterationEndDate("");
    setGender("");
    setCity("");
    setAgeRangeStart("");
    setAgeRangeEnd("");
  };

  const dispatch = useDispatch();

  const applyFilters = () => {
    const formattedregisterationStartDate = registerationStartDate ? format(new Date(registerationStartDate), "yyyy-MM-dd") : null;
    const formattedregisterationEndDate = registerationEndDate ? format(new Date(registerationEndDate), "yyyy-MM-dd") : null;
   
    dispatch(fetchUserData(type, search, page, 
      formattedregisterationStartDate || "",
      formattedregisterationEndDate || "",
      gender || "",
      city || "",
      ageRangeStart || "",
      ageRangeEnd || ""
    ));
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
                    onClick={() => setSelectedMenu("Verification")}
                    className={
                      selectedMenu === "Verification"
                        ? styles.activeCard
                        : styles.inactive
                    }
                  >
                    Verification
                  </Box>
                  <Box
                    borderWidth="1px"
                    p={4}
                    my={2}
                    cursor="pointer"
                    onClick={() => setSelectedMenu("Meeting Attened")}
                    className={
                      selectedMenu === "Meeting Attened"
                        ? styles.activeCard
                        : styles.inactive
                    }
                  >
                    Did not attend meeting
                  </Box>
                  <Box
                    borderWidth="1px"
                    p={4}
                    my={2}
                    cursor="pointer"
                    onClick={() => setSelectedMenu("Registered On")}
                    className={
                      selectedMenu === "Registered On"
                        ? styles.activeCard
                        : styles.inactive
                    }
                  >
                    Registered On
                  </Box>
                  <Box
                    borderWidth="1px"
                    p={4}
                    my={2}
                    cursor="pointer"
                    onClick={() => setSelectedMenu("Gender")}
                    className={
                      selectedMenu === "Gender"
                        ? styles.activeCard
                        : styles.inactive
                    }
                  >
                    Gender
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
                  <Box
                    borderWidth="1px"
                    p={4}
                    my={2}
                    cursor="pointer"
                    onClick={() => setSelectedMenu("Age")}
                    className={
                      selectedMenu === "Age"
                        ? styles.activeCard
                        : styles.inactive
                    }
                  >
                    Age
                  </Box>
                </div>

                <div className={styles.filterItems}>
                  {selectedMenu === "Verification" && (
                    <>
                      <p>Verification</p>
                      <div className={styles.adTypeRadio}>
                        <div>
                          <input
                            type="radio"
                            value="Verified"
                            checked={verification === "Verified"}
                            onChange={() => setVerification("Verified")}
                          />
                          <span>Verified</span>
                        </div>
                        <br />
                        <div>
                          <input
                            type="radio"
                            value="Non Verified"
                            checked={verification === "Non Verified"}
                            onChange={() => setVerification("Non Verified")}
                          />
                          <span>Non Verified</span>
                        </div>
                      </div>
                    </>
                  )}
                  {selectedMenu === "Meeting Attened" && (
                    <>
                      <p>Meeting Attended</p>
                    </>
                  )}
                  {selectedMenu === "Registered On" && (
                    <>
                      <p>Released On</p>
                      <div className={styles.dateSelect}>
                        <div className={styles.singlePicker}>
                          <ReactDatePicker
                            selected={registerationStartDate ? new Date(registerationStartDate) : null}
                            onChange={(date) => 
                            setRegisterationStartDate(
                              date ? format(date, "yyyy-MM-dd") : ""
                            )
                            }
                            placeholderText="Start date"
                          />
                        </div>
                        <div className={styles.singlePicker}>
                          <ReactDatePicker
                            minDate={registerationStartDate ? new Date(registerationStartDate): ''}
                            selected={registerationEndDate ? new Date(registerationEndDate) : ""}
                            onChange={(date) => 
                            setRegisterationEndDate(
                              date ? format(date, "yyyy-MM-dd") : ""
                            )
                            }
                            placeholderText="End date"
                          />
                        </div>
                      </div>
                    </>
                  )}
                  {selectedMenu === "Gender" && (
                    <>
                      <p>Gender</p>
                      <div className={styles.adTypeRadio}>
                        <div>
                          <input
                            type="radio"
                            value="male"
                            checked={gender === "Male"}
                            onChange={() => setGender("Male")}
                          />
                          <span>Male</span>
                        </div>
                        <br />
                        <div>
                          <input
                            type="radio"
                            value="female"
                            checked={gender === "Female"}
                            onChange={() => setGender("Female")}
                          />
                          <span>Female</span>
                        </div>
                        <br />
                        <div>
                          <input
                            type="radio"
                            value="others"
                            checked={gender === "Others"}
                            onChange={() => setGender("Others")}
                          />
                          <span>Others</span>
                        </div>
                      </div>
                    </>
                  )}
                  {selectedMenu === "City" && (
                    <>
                      <p>City</p>
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="Enter city"
                        className={styles.cityInput} // Add a class for styling if needed
                      />
                    </>
                  )}
                  {selectedMenu === "Age" && (
                    <>
                      <p>Age</p>
                      <div>
                        <input
                          type="number"
                           value={ageRangeStart}
                          onChange={(e) => setAgeRangeStart(e.target.value)}
                          placeholder="Start Age"
                          className={styles.ageInput} // Add a class for styling if needed
                        />
                        <input 
                          type="number"
                          value={ageRangeEnd}
                          onChange={(e) => setAgeRangeEnd(e.target.value)}
                          placeholder="End Age"
                          style={{marginLeft:'10px'}}
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

export default UserFilter;
