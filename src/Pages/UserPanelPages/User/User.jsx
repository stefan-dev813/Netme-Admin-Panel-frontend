/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import styles from "./style.module.css";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  InputGroup,
  Input,
  InputRightElement,
} from "@chakra-ui/react";
import { BiSearch } from "react-icons/bi";
import Standard from "./Standard/Standard";
import Premium from "./Premium/Premium";
import Deleted from "./Deleted/Deleted";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "../../../Redux/User/UserReducer";
import { Helmet } from "react-helmet";
// import { message } from 'antd'
import UserFilter from "./Components/Filter/UserFilter";
const User = () => {
  const dispatch = useDispatch();
  const { totalCount, standardUser, premiumUser, deletedUser } = useSelector(
    (store) => store.UserReducer.user
  );
  const data = useSelector((store) => store.UserReducer.user.data) || [];
  const loading = useSelector((store) => store.UserReducer.isLoading);
  const [type, setType] = useState("Standard");
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [registerationStartDate, setRegisterationStartDate] = useState("");
  const [registerationEndDate, setRegisterationEndDate] = useState("");
  const [gender, setGender] = useState("");
  const [ageRangeStart, setAgeRangeStart] = useState("");
  const [ageRangeEnd, setAgeRangeEnd] = useState("");
  const [city, setCity] = useState("");
  const [meetingAttendance, setMeetingAttendance] = useState("");

  useEffect(() => {
    dispatch(
      fetchUserData(
        type,
        search,
        page,
        registerationStartDate,
        registerationEndDate,
        gender,
        city,
        ageRangeStart,
        ageRangeEnd,
        meetingAttendance
      )
    );
  }, [type, page, search]);
  const getData = (type) => {
    dispatch(fetchUserData(type, search, page));
  };

  return (
    <div className={styles.MainContainer}>
      <Helmet>
        <title> Current Users - NETME </title>
      </Helmet>
      <div className={styles.firstDiv}>
        <h1>Users</h1>
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
          <UserFilter
            search={search}
            type={type}
            page={page}
            registerationStartDate={registerationStartDate}
            registerationEndDate={registerationEndDate}
            setRegisterationStartDate={setRegisterationStartDate}
            setRegisterationEndDate={setRegisterationEndDate}
            gender={gender}
            setGender={setGender}
            city={city}
            setCity={setCity}
            ageRangeStart={ageRangeStart}
            setAgeRangeStart={setAgeRangeStart}
            ageRangeEnd={ageRangeEnd}
            setAgeRangeEnd={setAgeRangeEnd}
            meetingAttendance={meetingAttendance}
            setMeetingAttendance={setMeetingAttendance}
          />
        </div>
      </div>
      <div>
        <Tabs>
          <TabList>
            <Tab onClick={() => setType("Standard")} className="paragraph">
              Standard User{" "}
              <span className={styles.numberSpan}>{standardUser}</span>
            </Tab>
            <Tab onClick={() => setType("Premium")} className="paragraph">
              Premium User{" "}
              <span className={styles.numberSpan}>{premiumUser}</span>
            </Tab>
            <Tab onClick={() => setType("Deleted")} className="paragraph">
              Deleted User{" "}
              <span className={styles.numberSpan}>{deletedUser}</span>
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Standard
                data={data}
                totalCount={totalCount}
                setPage={setPage}
                loading={loading}
                getData={getData}
                setType={setType}
              />
            </TabPanel>
            <TabPanel>
              <Premium
                data={data}
                totalCount={totalCount}
                setPage={setPage}
                loading={loading}
                getData={getData}
                setType={setType}
              />
            </TabPanel>
            <TabPanel>
              <Deleted
                data={data}
                totalCount={totalCount}
                setPage={setPage}
                loading={loading}
                getData={getData}
              />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </div>
  );
};

export default User;
