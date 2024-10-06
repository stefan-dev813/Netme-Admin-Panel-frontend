import React, { useEffect, useState } from "react";
import styles from "./style.module.css";
import { Helmet } from "react-helmet";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  InputGroup,
  Input,
  InputRightElement,
  Button,
} from "@chakra-ui/react";
import { BiFilter, BiSearch } from "react-icons/bi";
import Overview from "./Overview/Overview";
import RequestAd from "./RequestAd/RequestAd";
import HistoryAd from "./HistoryAd/HistoryAd";
import CreateAd from "./CreateAd/CreateAd";
import { useDispatch, useSelector } from "react-redux";
import { fetchPartnerAdData } from "../../../Redux/Advertisement/Partner/PartnerAdReducer";
import AdFilter from "../AdFilter/AdFilter";
const PartnerAd = () => {
  const [createAd, setCreateAd] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [type, setType] = useState("Approved");
  const [adType, setAdType] = useState("");
  const [filterApplied, setFilterApplied] = useState(false);
  const [releaseStartDate, setReleaseStartDate] = useState("");
  const [releaseEndDate, setReleaseEndDate] = useState("");
  const [createdStartDate, setCreatedStartDate] = useState("");
  const [createdEndDate, setCreatedEndDate] = useState("");
  const [status, setStatus] = useState("");

  const dispatch = useDispatch();
  const ads =
    useSelector((store) => store?.PartnerAdReducer?.partnerAd?.data) || [];

  const loading =
    useSelector((store) => store?.PartnerAdReducer?.isLoading) || false;
  const { overViewCount, requestedCount, historyCount, totalData } =
    useSelector((store) => store.PartnerAdReducer.partnerAd);
  const total = useSelector(
    (store) => store.PartnerAdReducer.partnerAd.totalData
  );

  useEffect(() => {
    console.log("Fetching data for type:", type);
    dispatch(
      fetchPartnerAdData(
        type,
        search,
        page,
        adType,
        releaseStartDate,
        releaseEndDate,
        createdStartDate,
        createdEndDate
      )
    );
  }, [type, search, dispatch, page]);

  if (createAd) {
    return <CreateAd setCreateAd={setCreateAd} />;
  }
  return (
    <div className={styles.MainContainer}>
      <Helmet>
        <title> Advertisements - NETME</title>
      </Helmet>
      <div className={styles.firstDiv}>
        <h1>Advertisement</h1>

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
          {/* <Button>Filter  <BiFilter fontSize={20} marginLeft={10} /></Button> */}
          <AdFilter
            type={type}
            page={page}
            search={search}
            setAdType={setAdType}
            adType={adType}
            filterApplied={filterApplied}
            setFilterApplied={setFilterApplied}
            setReleaseStartDate={setReleaseStartDate}
            releaseStartDate={releaseStartDate}
            setReleaseEndDate={setReleaseEndDate}
            releaseEndDate={releaseEndDate}
            setCreatedStartDate={setCreatedStartDate}
            createdStartDate={createdStartDate}
            setCreatedEndDate={setCreatedEndDate}
            createdEndDate={createdEndDate}
            setStatus={setStatus}
            status={status}
          />
          <Button bg="#8CC9E9" onClick={() => setCreateAd(true)}>
            Create New Advertisement
          </Button>
        </div>
      </div>
      <div>
        <Tabs>
          <TabList>
            <Tab
              className={styles.tabPanel}
              onClick={() => {
                setType("Approved");
                console.log("Setting type to Approved");
                setPage(1);
              }}
            >
              Overview{" "}
              <span
                id={type === "Approved" ? styles.activeTab : null}
                className={styles.numberSpan}
              >
                {overViewCount}
              </span>
            </Tab>
            {/* &nbsp; &nbsp; &nbsp; */}
            <Tab
              className={styles.tabPanel}
              onClick={() => {
                console.log("Setting type to Requested");
                setType("Requested");
              }}
            >
              Requests{" "}
              <span
                id={type === "Requested" ? styles.activeTab : null}
                className={styles.numberSpan}
              >
                {requestedCount}
              </span>
            </Tab>
            &nbsp; &nbsp; &nbsp;
            <Tab
              className={styles.tabPanel}
              onClick={() => {
                setType("Ended");
              }}
            >
              History{" "}
              <span
                id={type === "Ended" ? styles.activeTab : null}
                className={styles.numberSpan}
              >
                {historyCount}
              </span>
            </Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <Overview
                ads={ads}
                loading={loading}
                setPage={setPage}
                total={total}
                page={page}
                type={type}
              />
            </TabPanel>
            <TabPanel>
              <RequestAd
                ads={ads}
                loading={loading}
                setPage={setPage}
                total={total}
                page={page}
                type={type}
              />
            </TabPanel>
            <TabPanel>
              <HistoryAd
                ads={ads}
                loading={loading}
                setPage={setPage}
                total={total}
                page={page}
                type={type}
              />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </div>
  );
};

export default PartnerAd;
