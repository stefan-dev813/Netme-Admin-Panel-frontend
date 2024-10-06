import React, { useState } from "react";
import styles from "../styles.module.css";
import { Spinner } from "@chakra-ui/react";
import {
  fetchActivePartnerData,
  updateActivePartnerData,
} from "../../../Redux/Partner/ActivePartnerReducer";
import { useDispatch } from "react-redux";
import { Pagination, message } from "antd";
import { Link } from "react-router-dom";

const DeletePartner = ({
  loading,
  partner,
  total,
  setPage,
  setContact,
  setViewMeatings,
  setBusinessId,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setPage(page);
  };

  const updateData = (data) => {
    try {
      dispatch(updateActivePartnerData(data)).then((res) => {
        console.log("res:", res);
        dispatch(fetchActivePartnerData("Deleted", "", 1));
        if (data.status === "Blacklisted") {
          message.warning("User Added to Blacklist");
        } else {
          message.error("User Deleted Permanently");
        }
      });
    } catch (error) {}
  };
  function convertDate(dateStr) {
    try {
      // Convert the input date string to a Date object
      const dateObj = new Date(dateStr);

      // Format the Date object in the desired output format
      const formattedDate = `${dateObj.getUTCDate()}.${
        dateObj.getUTCMonth() + 1
      }.${dateObj.getUTCFullYear()}`;
      return formattedDate;
    } catch (error) {
      // If the input date string is not in the correct format, handle the error
      return null;
    }
  }
  const handleView = (businessId) => {
    setViewMeatings(true);
    setBusinessId(businessId);
  };

  if (!loading && partner.length === 0) {
    return <div style={{display:'flex', justifyContent:'center', alignItems: 'center', textAlign:'center', marginTop:'10%'}}>No data available</div>;
  }

  return (
    <div className={styles.tableDiv}>
      <table className={styles.table}>
        <tr style={{display:'block'}}>
          <th className={styles.tableHead}>Location</th>
          <th className={styles.tableHead}>Address</th>

          <th className={styles.tableHead}>No. of Meetings</th>
          <th className={styles.tableHead}>Registered on</th>

          <th className={styles.tableHead}>Membership</th>
          <th className={styles.tableHead}>Type</th>
          <th className={styles.tableHead}>Membership Expire on</th>

          <th style={{minWidth:'520px', maxWidth:'520px'}}>Actions</th>
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
          <div style={{border:'1px solid #D9D9D9', borderRadius:'20px'}}>
          <tbody>
            {partner.map((el, i) => {
              return (
                <tr key={i}>
                  <td className={styles.tableHead}>{el.name}</td>

                  <td className={styles.tableHead}>
                    <div className={styles.address}>{el?.address}</div>
                  </td>

                  <td className={styles.tableHead}>
                    <p
                      className={styles.blackBtn29}
                      onClick={() => handleView(el._id)}
                    >
                      View
                    </p>
                  </td>
                  <td className={styles.tableHead}>{convertDate(el.createdAt)}</td>
                  <td className={styles.tableHead}>N/A</td>
                  <td className={styles.tableHead}>N/A</td>
                  <td className={styles.tableHead}>N/A</td>
                  <td style={{minWidth:'600px', maxWidth:'600px'}}>
                    <div className={styles.actionDiv}>
                      <Link to={`/Partners/deletedprofile/${el.partnerId._id}`}>
                        <p className={styles.blackBtn4}>Profile</p>
                      </Link>
                      <p
                        className={styles.blackBtn2}
                        onClick={() =>
                          updateData({
                            partnerId: el.partnerId._id,
                            status: "Blacklisted",
                          })
                        }
                      >
                        Add To BlackList
                      </p>
                      <p
                        className={styles.blackBtn3}
                        onClick={() =>
                          updateData({
                            partnerId: el.partnerId._id,
                            deleted: true,
                          })
                        }
                      >
                        Delete Permanently
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

export default DeletePartner;
