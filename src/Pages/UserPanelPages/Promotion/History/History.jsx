import React from "react";
import styles from "../styles.module.css";
import { Spinner, Switch } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
// import { fetchCurrentPromotionData, updateCurrentPromotionData } from '../../../Redux/Promotion/CurrentPromotionReducer';
import DeleteModel from "../DeleteModel";
import { message } from "antd";
import {
  fetchcurrentPromotionData,
  updatecurrentPromotionData,
} from "../../../../Redux/Promotion/CurrentPromotionReducer";
import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

const History = ({ history, loading, type }) => {
  const dispatch = useDispatch();
  function formatDate(inputDate) {
    const date = new Date(inputDate);
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = date.toLocaleDateString("en-US", options);

    return formattedDate;
  }
  function calculateDateDifference(date1, date2) {
    const oneDay = 24 * 60 * 60 * 1000; // One day in milliseconds

    const firstDate = new Date(date1);
    const secondDate = new Date(date2);

    const diffInTime = Math.abs(firstDate - secondDate);
    const diffInDays = Math.round(diffInTime / oneDay);
    return diffInDays;
  }

  if (!loading && history.length === 0) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          marginTop: "10%",
        }}
      >
        No data available
      </div>
    );
  }

  return (
    <div className={styles.tableDiv}>
      <TableContainer
        style={{ border: "1px solid #D9E1E7", borderRadius: "20px" }}
      >
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Promo code Name</Th>
              <Th>Start Date</Th>
              <Th>End Date</Th>
              <Th>Time Period</Th>
              <Th>Promo Code</Th>
              <Th>Redeemed</Th>
              <Th>Comments</Th>
              <Th>Actions</Th>
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
              {history.map((el, i) => {
                return (
                  <Tr key={i}>
                    <Td>{el.name}</Td>
                    <Td>{formatDate(el.startDate)}</Td>
                    <Td>{formatDate(el.endDate)}</Td>

                    <Td>{calculateDateDifference(el.startDate, el.endDate)}</Td>
                    <Td>
                      Active
                      <Switch
                        zIndex={1}
                        isChecked={el.active}
                        colorScheme="teal"
                        onChange={() =>
                          dispatch(
                            updatecurrentPromotionData({
                              active: !el.active,
                              voucherId: el._id,
                            })
                          ).then(() => {
                            dispatch(fetchcurrentPromotionData("History")).then(
                              () => {
                                message.success("Promotion has been updated");
                              }
                            );
                          })
                        }
                      />
                    </Td>
                    <Td>123</Td>
                    <Td>{el.code}</Td>

                    <Td>
                      <DeleteModel type={type} el={el} />
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          )}
        </Table>
      </TableContainer>
    </div>
  );
};

export default History;
