import React, { useState } from "react";
import styles from "../styles.module.css";
import { Avatar, AvatarGroup, Spinner } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import {
  fetchActivePartnerData,
  updateActivePartnerData,
} from "../../../Redux/Partner/ActivePartnerReducer";
import { Pagination, message } from "antd";
import ContactDetails from "../ContactDetails/ContactDetails";
import { Link } from "react-router-dom";

const NewPartner = ({ loading, partner, total, setPage, setContact }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setPage(page);
  };

  const handelUpdate = (data) => {
    try {
      dispatch(updateActivePartnerData(data)).then((res) => {
        dispatch(fetchActivePartnerData("Requested", "", 1));
        if (data.status === "Active") {
          message.success("Request Accepted");
        } else {
          message.error("Request Rejected");
        }
      });
    } catch (error) {
      message.error("Something went wrong");
    }
  };
  function convertDate(dateStr) {
    try {
      const dateObj = new Date(dateStr);
      const formattedDate = `${dateObj.getUTCDate()}.${
        dateObj.getUTCMonth() + 1
      }.${dateObj.getUTCFullYear()}`;
      return formattedDate;
    } catch (error) {
      return null;
    }
  }

  if (!loading && partner.length === 0) {
    return <div style={{display:'flex', justifyContent:'center', alignItems: 'center', textAlign:'center', marginTop:'10%'}}>No data available</div>;
  }


  return (
    <div className={styles.tableDiv}>
      <table className={styles.table}>
        <tr style={{display:'block'}}>
          <th style={{minWidth:'100px', maxWidth:'100px'}}>Location</th>
          <th className={styles.tableHead}>Address</th>
          <th className={styles.tableHead}>Submission Date</th>
          <th className={styles.tableHead}>City</th>
          <th className={styles.tableHead}>Category</th>
          <th className={styles.tableHead}>Tax Number</th>
          <th className={styles.tableHead}>Legal Representative</th>
          <th className={styles.tableHead}>Mobile Number</th>
          <th className={styles.tableHead}>Phone Number</th>
          <th className={styles.tableHead}>Membership</th>
          <th className={styles.tableHead}>Images</th>
          <th className={styles.tableHead}>Membership cancelled</th>
          <th className={styles.tableHead}>Free Trail</th>
          <th style={{minWidth:'290px', maxWidth:'290px'}}>Actions</th>
        </tr>

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
          <div style={{border:'1px solid #D9D9D9', borderRadius:'15px'}}>
          <tbody>
            {partner.map((el, i) => {
              return (
                <tr key={i}>
                  <td style={{minWidth:'100px', maxWidth:'100px'}}>{el.name}</td>

                  <td className={styles.tableHead}>
                    <div className={styles.address}>{el?.address}</div>
                  </td>
                  <td className={styles.tableHead}>{convertDate(el.createdAt)}</td>
                  <td className={styles.tableHead}>{el.city}</td>
                  <td className={styles.tableHead}>{el.category}</td>
                  <td className={styles.tableHead}>{el.taxNumber}</td>
                  <td className={styles.tableHead}>
                    <Link to={`/Partners/${el?.partnerId?._id}`}>
                      <p className={styles.blackBtn}> Contact Details</p>
                    </Link>
                  </td>
                  <td className={styles.tableHead}>{el?.partnerId?.mobile}</td>
                  <td className={styles.tableHead}>{el.businessTel}</td>
                  <td className={styles.tableHead}>N/A</td>
                  <td className={styles.tableHead}>
                    {el.photos.length === 1 ? (
                      <Avatar name="Ryan Florence" src={el.photos[0]} />
                    ) : (
                      <AvatarGroup size="md" max={2}>
                        {el.photos.map((pl) => {
                          return <Avatar name="Ryan Florence" src={pl} />;
                        })}
                      </AvatarGroup>
                    )}
                  </td>
                  <td className={styles.tableHead}>N/A</td>
                  <td className={styles.tableHead}>N/A</td>

                  <td style={{minWidth:'300px',maxWidth:'300px'}}>
                    <div className={styles.actionDiv}>
                      <p
                        className={styles.blackBtn2}
                        onClick={() =>
                          handelUpdate({
                            partnerId: el.partnerId._id,
                            status: "Active",
                          })
                        }
                      >
                        Accept
                      </p>
                      <p
                        className={styles.blackBtn3}
                        onClick={() =>
                          handelUpdate({
                            partnerId: el.partnerId._id,
                            status: "Deleted",
                          })
                        }
                      >
                        Reject
                      </p>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
          </div> 
        )}
      </table>
      {total > 10 && (
        <div className={styles.pagination}>
          <Pagination
            defaultCurrent={1}
            current={currentPage}
            total={total}
            onChange={handlePageChange}
            showSizeChanger={false}
          />
        </div>
      )}
    </div>
  );
};

export default NewPartner;
