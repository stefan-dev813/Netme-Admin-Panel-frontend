import React from "react";
import styles from "../styles.module.css";
import { HiPencil } from "react-icons/hi";
import { Spinner, Switch } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
// import { fetchCurrentVoucherData, updateCurrentVoucherData } from '../../../Redux/Voucher/CurrentVoucherReducer';
import DeleteModel from "../DeleteModel";
import { Link, useNavigate } from "react-router-dom";
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

const Current = ({ history, loading, type, key }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
              <Th>Duration (in days)</Th>
              <Th>Status</Th>
              <Th>Redeemed</Th>
              <Th>Promo Code</Th>
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
                            dispatch(fetchcurrentPromotionData("Current")).then(
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
                      <div className={styles.actionDiv}>
                        <Link to={`/Promotions/${el._id}`}>
                          <span className={styles.blackBtn2}>
                            <HiPencil /> Edit
                          </span>
                        </Link>
                        <DeleteModel el={el} type={type} />
                      </div>
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

export default Current;
