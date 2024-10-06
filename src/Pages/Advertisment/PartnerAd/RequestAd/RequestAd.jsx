import React, { useEffect } from "react";
import styles from "../style.module.css";
import { Pagination, message } from "antd";
import { useDispatch } from "react-redux";
import {
  fetchPartnerAdData,
  updatePartnerAdData,
} from "../../../../Redux/Advertisement/Partner/PartnerAdReducer";
import { useNavigate } from "react-router-dom";
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

const RequestAd = ({ ads, total, page, setPage, type, loading }) => {
  console.log("Ads data:", ads);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleAccept = (adId, partnerId) => {
    const data = {
      adId,
      partnerId,
      status: "Approved",
    };
    dispatch(updatePartnerAdData(data)).then(() => {
      dispatch(fetchPartnerAdData(type, "", page));
    });
  };

  const handleReject = (adId, partnerId) => {
    const data = {
      adId,
      partnerId,
      status: "Rejected",
    };
    dispatch(updatePartnerAdData(data)).then(() => {
      dispatch(fetchPartnerAdData(type, "", page));
    });
  };

  if (!loading && ads.length === 0) {
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
              <Th style={{ textTransform: "capitalize" }}>Partner Name</Th>
              <Th style={{ textTransform: "capitalize" }}>Ad Name</Th>
              <Th style={{ textTransform: "capitalize" }}>Ad Title</Th>
              <Th style={{ textTransform: "capitalize" }}>Ad body</Th>
              <Th style={{ textTransform: "capitalize" }}>Ad Type</Th>
              <Th style={{ textTransform: "capitalize" }}>Release on</Th>
              <Th style={{ textTransform: "capitalize" }}>Created on</Th>
              <Th style={{ textTransform: "capitalize" }}>Action</Th>
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
              {ads.length > 0 &&
                ads.map((el, i) => {
                  return (
                    <Tr key={i}>
                      <Td>
                        {el.partnerId && (
                          <>
                            {el.partnerId?.fullName} {el.partnerId?.lastName}
                          </>
                        )}
                      </Td>
                      <Td>{el.name}</Td>
                      <Td>{el.title}</Td>
                      <Td>{el.body}</Td>
                      <Td>{el.adType}</Td>
                      <Td>{formatDate(el.releaseDate)}</Td>
                      <Td>{formatDate(el.createdAt)}</Td>
                      <div className={styles.actionDiv}>
                        <span
                          className={styles.blackBtn2}
                          onClick={() =>
                            handleAccept(el._id, el.partnerId?._id)
                          }
                        >
                          Accept
                        </span>
                        <span
                          className={styles.blackBtn3}
                          onClick={() =>
                            handleReject(el._id, el.partnerId?._id)
                          }
                        >
                          Reject
                        </span>
                      </div>
                    </Tr>
                  );
                })}
            </Tbody>
          )}
        </Table>
      </TableContainer>
      {total > 10 && (
        <div className={styles.pagination}>
          <Pagination
            defaultCurrent={1}
            total={total}
            onChange={(e) => setPage(e)}
            showSizeChanger={false}
          />
        </div>
      )}
    </div>
  );
};

export default RequestAd;

function formatDate(dateStr) {
  try {
    const dateObj = new Date(dateStr);
    const options = { day: "numeric", month: "short", year: "numeric" };
    const formattedDate = dateObj.toLocaleDateString("en-US", options);
    return formattedDate;
  } catch (error) {
    return null;
  }
}
