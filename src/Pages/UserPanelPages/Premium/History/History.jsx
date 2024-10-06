import React, { useEffect } from "react";
import styles from "../styles.module.css";
import { Spinner } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { fetchPremiumSubscriptionData } from "../../../../Redux/Subscription/premiumReducer";
import DeleteModel from "../../User/Components/DeleteModel";
import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

const History = ({ type }) => {
  const dispatch = useDispatch();
  const loading = useSelector((store) => store?.PremiumSubscriptionReducer?.isLoading) || false;
  const premiumSubscriptionAllData = useSelector(
    (store) => store?.PremiumSubscriptionReducer?.premiumSubscriptionData
  ) || [];

  useEffect(() => {
    dispatch(fetchPremiumSubscriptionData());
  }, [dispatch, type]);

  if (!loading && premiumSubscriptionAllData.length === 0) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center', marginTop: '10%' }}>
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
              <Th>User Detail</Th>
              <Th>Email</Th>
              <Th>Birthday</Th>
              <Th>Purchased on</Th>
              <Th>Status</Th>
              <Th>Plan name</Th>
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
              {Array.isArray(premiumSubscriptionAllData) && premiumSubscriptionAllData.map((item, i) => (
                <Tr key={i}>
                  <Td>{item?.userName}</Td>
                  <Td>{item?.email}</Td>
                  <Td>
                    {item?.dob === null
                      ? ""
                      : new Date(item?.dob)?.toJSON()?.slice(0, 10)}
                  </Td>
                  <Td>N/A</Td>
                  <Td>N/A</Td>
                  <Td>N/A</Td>
                  <Td>
                    <div className={styles.actionDiv}>
                      <Link to={`/SubscriptionUser/Premium/${item?._id}`}>
                        <span className={styles.blackBtn2}>
                          <FaEye /> See Details
                        </span>
                      </Link>
                      <DeleteModel data={item} id={item._id} getData={() => { dispatch(fetchPremiumSubscriptionData()) }} setType="Premium" />
                    </div>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          )}
        </Table>
      </TableContainer>
    </div>
  );
};

export default History;