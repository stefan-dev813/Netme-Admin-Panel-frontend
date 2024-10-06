import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import {
  Avatar,
  Button,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { Helmet } from "react-helmet";
import { BiFilter, BiSearch } from "react-icons/bi";
import { message } from "antd";
import { BsFillCheckCircleFill } from "react-icons/bs";
import FeedBackModel from "./FeedBackModel";
import { userRequest } from "../../../requestMethod";
import { HiMiniMinus } from "react-icons/hi2";
import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import FeedbackFilter from "./FeedbackFilter";
import { Spinner } from "@chakra-ui/react";

const Feedback = () => {
  const [search, setSearch] = useState("");
  const [feedback, setFeedback] = useState([]);
  const [filteredFeedback, setFilteredFeedback] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userType, setUserType] = useState("All Users");

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const res = await userRequest.get(`/admin/user/findAllFeedbacks`);
        setFeedback(res.data.findFeedback);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching feedback:", error);
        setLoading(false);
      }
    };

    if (search.trim() === "") {
      fetchFeedback();
    } else {
      const filteredData = feedback.filter(
        (item) =>
          item.reportedByDetails &&
          item.reportedToDetails &&
          (item.reportedByDetails.userName
            .toLowerCase()
            .includes(search.toLowerCase()) ||
            item.reportedByDetails.email
              .toLowerCase()
              .includes(search.toLowerCase()) ||
            item.reportedToDetails.userName
              .toLowerCase()
              .includes(search.toLowerCase()) ||
            item.reportedToDetails.email
              .toLowerCase()
              .includes(search.toLowerCase()))
      );

      setFeedback(filteredData);
    }
  }, [search]);

  return (
    <div className={styles.MainContainer}>
      <Helmet>
        <title>Feedback - NETME</title>
      </Helmet>
      <div className={styles.firstDiv}>
        <h1>Feedbacks</h1>

        <div className={styles.filterDiv}>
          <InputGroup w={200}>
            <Input
              placeholder="Search"
              onChange={(e) => setSearch(e.target.value)}
            />
            <InputRightElement>
              <BiSearch color="green.500" />
            </InputRightElement>
          </InputGroup>
          <FeedbackFilter
            setUserType={setUserType}
            userType={userType}
            setFeedback={setFeedback}
          />
        </div>
      </div>
      <div className={styles.tableDiv}>
        <TableContainer
          style={{
            border: "1px solid #D9E1E7",
            borderRadius: "20px",
            paddingRight: "10px",
          }}
        >
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>User Detail</Th>
                <Th>Reviewed By</Th>
                <Th>Stolen Fake photo</Th>
                <Th>Insult or harassment</Th>
                <Th>Spam or Fraud</Th>
                <Th>
                  Pornographic or
                  <br />
                  inappropriate content
                </Th>
                <Th>Optional Message</Th>
                <Th>Review</Th>
              </Tr>
            </Thead>
            {loading ? (
              <span className={styles.spin}>
                <Spinner
                  thickness="4px"
                  speed="0.65s"
                  emptyColor="gray.200"
                  color="blue.500"
                  size="lg"
                />
              </span>
            ) : (
              <Tbody>
                {feedback &&
                  feedback.map((el, i) => {
                    return (
                      <Tr key={i}>
                        <Td>
                          <div className={styles.profileDetails}>
                            <div className={styles.profilePic}>
                              <Avatar
                                name="Dan Abrahmov"
                                src={el.reportedByDetails?.images}
                              />
                              <p>{el.reportedByDetails?.userName}</p>
                            </div>
                            <p>{el.reportedByDetails?.email}</p>
                          </div>
                        </Td>
                        <Td>
                          <div className={styles.profileDetails}>
                            <div className={styles.profilePic}>
                              <Avatar
                                name="Dan Abrahmov"
                                src={el.reportedToDetails?.images}
                              />
                              <p>{el.reportedToDetails?.userName}</p>
                            </div>
                            <p>{el.reportedToDetails?.email}</p>
                          </div>
                        </Td>

                        <Td>
                          {el.categories === "Stolen fake photo" ? (
                            <div className={styles.check}>
                              <BsFillCheckCircleFill fontSize={20} />
                            </div>
                          ) : (
                            <div className={styles.check}>
                              <HiMiniMinus />
                            </div>
                          )}
                        </Td>
                        <Td>
                          {el.categories === "Insult or harassment" ? (
                            <div className={styles.check}>
                              <BsFillCheckCircleFill fontSize={20} />
                            </div>
                          ) : (
                            <div className={styles.check}>
                              <HiMiniMinus />
                            </div>
                          )}
                        </Td>
                        <Td>
                          {el.categories === "Spam or Fraud" ? (
                            <div className={styles.check}>
                              <BsFillCheckCircleFill fontSize={20} />
                            </div>
                          ) : (
                            <div className={styles.check}>
                              <HiMiniMinus />
                            </div>
                          )}
                        </Td>
                        <Td>
                          {el.categories ===
                          "Pornographic or inappropriate content" ? (
                            <div className={styles.check}>
                              <BsFillCheckCircleFill fontSize={20} />
                            </div>
                          ) : (
                            <div className={styles.check}>
                              <HiMiniMinus />
                            </div>
                          )}
                        </Td>
                        <Td>
                          {el.categories === "Optional Message" ? (
                            <div className={styles.check}>
                              <BsFillCheckCircleFill fontSize={20} />
                            </div>
                          ) : (
                            <div className={styles.check}>
                              <HiMiniMinus />
                            </div>
                          )}
                        </Td>
                        <Td>
                          <FeedBackModel data={el.message} />
                        </Td>
                      </Tr>
                    );
                  })}
              </Tbody>
            )}
          </Table>
        </TableContainer>
        {!loading && feedback.length <= 0 && (
          <div
            style={{
              display: "flex",
              fontSize: "16px",
              fontWeight: "400",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              marginTop: "10%",
            }}
          >
          No data available (api error 404 not found)
          </div>
        )}
      </div>
    </div>
  );
};

export default Feedback;
