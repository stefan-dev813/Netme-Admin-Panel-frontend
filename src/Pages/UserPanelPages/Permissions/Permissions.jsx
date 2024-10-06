/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import {
  InputGroup,
  Input,
  InputRightElement,
  Button,
  Switch,
} from "@chakra-ui/react";
import { BiSearch } from "react-icons/bi";
import { HiPencil } from "react-icons/hi";
import CreateNewPlan from "./CreatePlan/CreateNewPlan";
import { Link } from "react-router-dom";
import DeleteModel from "./DeleteModel";
import { useDispatch, useSelector } from "react-redux";
import { fetchRoleData, updateRoleData } from "../../../Redux/Role/RoleReducer";
import { message } from "antd";
import { Helmet } from "react-helmet";
import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/react";

const Permissions = () => {
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();
  const role = useSelector((store) => store.RoleReducer.role.data) || [];
  const loading = useSelector((store) => store.RoleReducer.isLoading) || false;
  console.log("role:", loading);
  const [newPlan, setNewPlan] = useState(false);
  
  useEffect(() => {
    dispatch(fetchRoleData(search))
      .catch((error) => {
        console.log("Error:", error); // Log error message
        message.error(`Error fetching role data: ${error.message}`);
      });
  }, [dispatch, search]);

  function formatDate(inputDate) {
    const date = new Date(inputDate);
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = date.toLocaleDateString("en-US", options);

    return formattedDate;
  }

  if (newPlan) {
    return <CreateNewPlan setNewPlan={setNewPlan} />;
  }
  const getPermission = (value) => {
    if (value === "BOTH") {
      return "Both";
    } else if (value === "Partner") {
      return "Partner Panel";
    } else {
      return "User Panel";
    }
  };

  return (
    <div className={styles.MainContainer}>
      <Helmet>
        <title>Roles & Permissions - NETME </title>
      </Helmet>
      <div className={styles.firstDiv}>
        <h1>Roles and Permissions</h1>

        <div className={styles.filterDiv}>
          <InputGroup w={200}>
            <Input
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <InputRightElement>
              <BiSearch color="green.500" />
            </InputRightElement>
          </InputGroup>
          <Button bg="#8CC9E9" onClick={() => setNewPlan(true)}>
            Create New Role
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
                <Th>User name</Th>
                <Th>Email id</Th>
                <Th>Created on</Th>
                <Th>Permission</Th>
                <Th>Permission</Th>

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
                {role.map((el, i) => {
                  return (
                    <Tr key={i}>
                      <Td>{el.name}</Td>
                      <Td>{el.email}</Td>
                      <Td>{formatDate(el.createdAt)}</Td>

                      <Td>{getPermission(el.permissions)}</Td>
                      <Td>
                        Active
                        <Switch
                          zIndex={1}
                          isChecked={el.isPermission}
                          onChange={() =>
                            dispatch(
                              updateRoleData({
                                isPermission: !el.isPermission,
                                userId: el._id,
                              })
                            ).then(() => {
                              dispatch(fetchRoleData()).then(() => {
                                message.success("Data has been updated");
                              });
                            })
                          }
                        />
                      </Td>
                      <Td>
                        <div className={styles.actionDiv}>
                          <Link to={`/Roles/${el._id}`}>
                            <span className={styles.blackBtn2}>
                              <HiPencil /> Edit
                            </span>
                          </Link>
                          <DeleteModel el={el} />
                        </div>
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            )}
          </Table>
        </TableContainer>
        {!loading && role.length <= 0 && (
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

export default Permissions;
