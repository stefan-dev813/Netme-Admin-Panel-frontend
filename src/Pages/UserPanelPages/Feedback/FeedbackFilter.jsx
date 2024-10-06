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
import styles from './styles.module.css';
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch } from "react-redux";
import { userRequest } from "../../../requestMethod";


function FeedbackFilter({ type, page, userType, setUserType,setFeedback }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedMenu, setSelectedMenu] = useState("UserType");
  const [user, setUser] = useState("All Users");
  // const [platform, setPlatform] = useState("");
  // const [releasedOnStartDate, setReleasedOnStartDate] = useState("");
  // const [releasedOnEndDate, setReleasedOnEndDate] = useState("");
  // const [city,setCity]=useState("")



  const resetData = () => {
    setUserType("");
  };

  const dispatch = useDispatch();

  const applyFilters = async () => {
    try {
      const res = await userRequest.get(`/admin/user/findAllFeedbacks?userType=${userType}`);
      setFeedback(res.data && res.data.findFeedback);
      console.log(res, 'findFeedbackSolutions');
      // dispatch(fetchPartnerAdData(type, page, {
      //   releaseStartDate,
      //   releaseEndDate,
      //   createdStartDate,
      //   createdEndDate,
      //   adType,
      //   status
      // }));
      onClose();
    } catch (error) {
      console.error("Error applying filters:", error);

    }
  };
  
  

  return (
    <>
      <Button onClick={onOpen}>
        Filter <BiFilter fontSize={20} marginLeft={10} />
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent maxW="60vw" height="70vh"  marginLeft={10}>
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
                </div>

                <div className={styles.filterItems}>
                  {selectedMenu === "UserType" && (
                    <>
                      <p>Verifications</p>
                      <div className={styles.adTypeRadio}>
                        <div>
                          <input
                            type="radio"
                            value="All Users"
                            checked={userType === "All Users"}
                            onChange={() => setUserType("All Users")}
                          />
                          <span>All Users</span>
                        </div>
                        <br />
                        <div>
                          <input
                            type="radio"
                            value="Premium Users"
                            checked={userType === "PREMIUM"}
                            onChange={() => setUserType("PREMIUM")}
                          />
                          <span>Premium Users</span>
                        </div>
                        <div>
                          <input
                            type="radio"
                            value="Standard Users"
                            checked={userType === "STANDARD"}
                            onChange={() => setUserType("STANDARD")}
                          />
                          <span>Standard Users</span>
                        </div>
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

export default FeedbackFilter
