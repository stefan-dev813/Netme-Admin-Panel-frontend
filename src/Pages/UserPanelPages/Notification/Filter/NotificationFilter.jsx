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
import { fetchUserNotificationData } from "../../../../Redux/User/UserNotificationReducer";
import { format } from "date-fns"; 

function NotificationFilter({ 
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
  const [selectedMenu, setSelectedMenu] = useState("UserType");
  const [user, setUser] = useState("All Users");

  const resetData = () => {
    setReleasStartDate("");
    setReleaseEndDate("");
    setCity("");
  };

  const dispatch = useDispatch();

  const applyFilters = () => {
    const formattedStartDate = releasStartDate ? format(new Date(releasStartDate), "yyyy-MM-dd") : null;
    const formattedEndDate = releaseEndDate ? format(new Date(releaseEndDate), "yyyy-MM-dd") : null;
    dispatch(fetchUserNotificationData(type, search, page, 
      formattedStartDate || "",
      formattedEndDate ||"",
      city || "",
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
                    onClick={() => setSelectedMenu("UserType")}
                    className={
                      selectedMenu === "UserType"
                        ? styles.activeCard
                        : styles.inactive
                    }
                  >
                    User Type
                  </Box>
                  {/* <Box
                    borderWidth="1px"
                    p={4}
                    my={2}
                    cursor="pointer"
                    onClick={() => setSelectedMenu("Platform")}
                    className={
                      selectedMenu === "Platform"
                        ? styles.activeCard
                        : styles.inactive
                    }
                  >
                    Platform
                  </Box> */}
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
                    onClick={() => setSelectedMenu("City")}
                    className={
                      selectedMenu === "City"
                        ? styles.activeCard
                        : styles.inactive
                    }
                  >
                    city
                  </Box>
                </div>

                <div className={styles.filterItems}>
                  {selectedMenu === "UserType" && (
                    <>
                      <p>User Type</p>
                      <div className={styles.adTypeRadio}>
                        <div>
                          <input
                            type="radio"
                            value="All Users"
                            checked={user === "All Users"}
                            onChange={() => setUser("All Users")}
                          />
                          <span>All Users</span>
                        </div>
                        <br />
                        <div>
                          <input
                            type="radio"
                            value="Premium Users"
                            checked={user === "Premium Users"}
                            onChange={() => setUser("Premium Users")}
                          />
                          <span>Premium Users</span>
                        </div>
                        <div>
                          <input
                            type="radio"
                            value="Standard Users"
                            checked={user === "Standard Users"}
                            onChange={() => setUser("Standard Users")}
                          />
                          <span>Standard Users</span>
                        </div>
                      </div>
                    </>
                  )}
                  {/* {selectedMenu === "Platform" && (
                    <>
                      <p>Platform</p>
                    </>
                  )} */}
                  {selectedMenu === "Released On" && (
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
                      <input
                          type="text"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          placeholder="Enter city"
                        />
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

export default NotificationFilter
