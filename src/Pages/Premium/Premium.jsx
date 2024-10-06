import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import {
  InputGroup,
  Input,
  InputRightElement,
  Button,
  Switch,
} from "@chakra-ui/react";
import { Helmet } from "react-helmet";
import { BiSearch } from "react-icons/bi";
import { HiPencil } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import DeleteModel from "./DeleteModel2";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSubscriptionData,
  updateSubscriptionData,
} from "../../Redux/Subscription/subscriptionReducer";
import { message } from "antd";
import { Spinner } from "@chakra-ui/react";
import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

const Premium = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const Subscription =
    useSelector((store) => store.SubscriptionReducer.subscriptionData.data) ||
    [];
  const loading = useSelector((store) => store.SubscriptionReducer.isLoading);
  const total = useSelector(
    (store) => store.SubscriptionReducer.subscriptionData.totalData
  );
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(fetchSubscriptionData(search, "PARTNER"));
  }, [search, dispatch, navigate]);

  return (
    <div className={styles.MainContainer}>
      <Helmet>
        <title>Partner Subscriptions - NETME </title>
      </Helmet>
      <div className={styles.firstDiv}>
        <h1>Partner Subscription</h1>

        <div className={styles.filterDiv}>
          <InputGroup w={200} borderRadius={13}>
            <Input
              placeholder="Search"
              onChange={(e) => setSearch(e.target.value)}
            />
            <InputRightElement>
              <BiSearch color="green.500" />
            </InputRightElement>
          </InputGroup>
          <Button bg="#8CC9E9" onClick={() => navigate("/CreatePlan")}>
            Create New Plan
          </Button>
        </div>
      </div>
      <div className={styles.tableDiv}>
        <TableContainer
          style={{ border: "1px solid #D9E1E7", borderRadius: "20px" }}
        >
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th style={{ textTransform: "capitalize" }}>Plan Name</Th>
                <Th style={{ textTransform: "capitalize" }}>
                  Time Period(Months)
                </Th>
                <Th style={{ textTransform: "capitalize" }}>Price(Є)</Th>
                <Th style={{ textTransform: "capitalize" }}>Features</Th>

                <Th style={{ textTransform: "capitalize" }}>Actions</Th>
                <Th style={{ textTransform: "capitalize" }}>Status</Th>
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
                {Subscription?.map((el, i) => {
                  return (
                    <Tr key={i}>
                      <Td>{el?.planName}</Td>
                      <Td>{el?.timePeriod}</Td>
                      <Td>{el?.price}</Td>

                      <Td>{el?.features ? el?.features : "...."}</Td>
                      <Td>
                        <div className={styles.actionDiv}>
                          <Link to={`/Subscription/${el._id}`}>
                            {" "}
                            <span className={styles.blackBtn2}>
                              <HiPencil /> Edit
                            </span>
                          </Link>
                          <DeleteModel id={el._id} />
                        </div>
                      </Td>
                      <Td>
                        Active &nbsp;
                        <Switch
                          zIndex={1}
                          isChecked={el.status}
                          colorScheme="teal"
                          onChange={() =>
                            dispatch(
                              updateSubscriptionData({
                                status: !el.status,
                                planId: el._id,
                                userType: "PARTNER",
                              })
                            ).then(() => {
                              dispatch(
                                fetchSubscriptionData("", "PARTNER")
                              ).then(() => {
                                message.success(
                                  "Subscription has been updated"
                                );
                              });
                            })
                          }
                        />
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            )}
          </Table>
        </TableContainer>
        {!loading && Subscription.length <= 0 && (
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
            No data available
          </div>
        )}
      </div>
    </div>
  );
};

export default Premium;
