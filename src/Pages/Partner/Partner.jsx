import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
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
import NewPartner from "./NewPartner/NewPartner";
import Active from "./Active/Active";
import DeletePartner from "./DeletePartner/DeletePartner";
import BlackListPartner from "./BlackListPartner/BlackListPartner";
import { useDispatch, useSelector } from "react-redux";
import { fetchActivePartnerData } from "../../Redux/Partner/ActivePartnerReducer";
import ContactDetails from "./ContactDetails/ContactDetails";
import View from "./ViewMeetings/View";
import ViewPartnerProfile from "./Active/Profile/ViewPartnerProfile";
import { Helmet } from "react-helmet";

const Partner = () => {
  const [contact, setContact] = useState(false);
  const [profile, setProfile] = useState(false);
  const [ViewMeatings, setViewMeatings] = useState(false);
  const dispatch = useDispatch();
  const [type, setType] = useState("Requested");
  const partner = useSelector((store) => store?.partner?.partner?.data) || [];
  const {
    totalBlacklisted,
    totalDeleted,
    totalRequested,
    totalActive,
    totalUser,
  } = useSelector((store) => store?.partner?.partner);
  const total = useSelector((store) => store?.partner?.partner?.totalCount);
  const loading = useSelector((store) => store?.partner?.isLoading) || false;
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [tabIndex, setTabIndex] = useState(0);
  const [businessId, setBusinessId] = useState("");
  const [partnerId, setPartnerId] = useState("");
  const [profileId, setProfileId] = useState("");

  console.log("business id", businessId);
  const handleTabsChange = (index) => {
    setTabIndex(index);
    setPage(1);
  };

  useEffect(() => {
    dispatch(fetchActivePartnerData(type, search, page));
  }, [type, search, page]);
  if (profile) {
    return <ViewPartnerProfile setProfile={setProfile} profileId={profileId} />;
  }
  if (contact) {
    return <ContactDetails setContact={setContact} partnerId={partnerId} />;
  }
  if (ViewMeatings) {
    return <View setViewMeatings={setViewMeatings} businessId={businessId} />;
  }
  return (
    <div className={styles.MainContainer}>
      <Helmet>
        <title>Current Partners - NETME</title>
      </Helmet>
      <div className={styles.firstDiv}>
        <div className={styles.heading}>
          <h1>Total Partners </h1>{" "}
          <span className={styles.numberSpan}>{totalUser ? totalUser : 0}</span>
        </div>

        <InputGroup w={200}>
          <Input
            placeholder="Search"
            onChange={(e) => setSearch(e.target.value)}
          />
          <InputRightElement>
            <BiSearch color="green.500" />
          </InputRightElement>
        </InputGroup>
      </div>
      <div>
        <Tabs index={tabIndex} onChange={handleTabsChange}>
          <TabList>
            <Tab
              className={styles.tabPanel}
              onClick={() => setType("Requested")}
            >
              New Partner Requests{" "}
              <span
                id={type === "Requested" ? styles.activeTab : null}
                className={styles.numberSpan}
              >
                {totalRequested ? totalRequested : 0}
              </span>
            </Tab>
            <Tab className={styles.tabPanel} onClick={() => setType("Active")}>
              Active Partners{" "}
              <span
                id={type === "Active" ? styles.activeTab : null}
                className={styles.numberSpan}
              >
                {totalActive ? totalActive : 0}
              </span>
            </Tab>
            <Tab className={styles.tabPanel} onClick={() => setType("Deleted")}>
              Deleted Partners{" "}
              <span
                id={type === "Deleted" ? styles.activeTab : null}
                className={styles.numberSpan}
              >
                {totalDeleted ? totalDeleted : 0}
              </span>
            </Tab>
            <Tab
              className={styles.tabPanel}
              onClick={() => setType("Blacklisted")}
            >
              Blacklist Partners{" "}
              <span
                id={type === "Blacklisted" ? styles.activeTab : null}
                className={styles.numberSpan}
              >
                {totalBlacklisted ? totalBlacklisted : 0}
              </span>
            </Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <NewPartner
                partner={partner}
                loading={loading}
                total={total}
                setPage={setPage}
                setContact={setContact}
              />
            </TabPanel>
            <TabPanel>
              <Active
                partner={partner}
                loading={loading}
                total={total}
                setPage={setPage}
                setContact={setContact}
                setViewMeatings={setViewMeatings}
                setProfile={setProfile}
                setProfileId={setProfileId}
                setPartnerId={setPartnerId}
                setBusinessId={setBusinessId}
              />
            </TabPanel>
            <TabPanel>
              <DeletePartner
                partner={partner}
                loading={loading}
                total={total}
                setPage={setPage}
                setContact={setContact}
                setViewMeatings={setViewMeatings}
                setBusinessId={setBusinessId}
              />
            </TabPanel>
            <TabPanel>
              <BlackListPartner
                partner={partner}
                loading={loading}
                total={total}
                setPage={setPage}
                setContact={setContact}
                setViewMeatings={setViewMeatings}
                setBusinessId={setBusinessId}
              />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </div>
  );
};

export default Partner;
