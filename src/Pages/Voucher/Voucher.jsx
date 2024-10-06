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
  Button,
} from "@chakra-ui/react";
import { BiSearch } from "react-icons/bi";
import Current from "./Current/Current";
import History from "./History/History";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentVoucherData } from "../../Redux/Voucher/CurrentVoucherReducer";
import EditVoucher from "./CreateVoucher/CreateVoucher";
import { Helmet } from "react-helmet";
const Voucher = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [edit, setEdit] = useState(false);
  const [type, setType] = useState("Current");
  const [create, setCreate] = useState(false);
  const dispatch = useDispatch();
  const history =
    useSelector(
      (store) => store?.currentVoucherReducer?.currentVoucherData?.data
    ) || [];

  const historyVoucher =
    useSelector(
      (store) =>
        store?.currentVoucherReducer?.currentVoucherData?.historyVoucher
    ) || 0;
  const currentVoucher =
    useSelector(
      (store) =>
        store?.currentVoucherReducer?.currentVoucherData?.currentVoucher
    ) || 0;
  const loading = useSelector(
    (store) => store?.currentVoucherReducer?.isLoading
  );
  useEffect(() => {
    console.log("Fetching data for type:", type);
    dispatch(fetchCurrentVoucherData(type, search));
  }, [type, search]);
  if (edit) {
    return <EditVoucher setCreate={setCreate} setEdit={setEdit} />;
  }
  return (
    <div className={styles.MainContainer}>
      <Helmet>
        <title>Vouchers - NETME</title>
      </Helmet>
      <div className={styles.firstDiv}>
        <h1>Voucher</h1>
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
          <Button bg="#8CC9E9" onClick={() => navigate("/CreateVoucher")}>
            Create New Promotion
          </Button>
        </div>
      </div>
      <div>
        <Tabs
          onChange={() =>
            setType((prev) => (prev === "Current" ? "History" : "Current"))
          }
        >
          <TabList>
            <Tab className={styles.tabPanel}>
              Current Promotion
              <span
                id={type === "Current" ? styles.activeTab : null}
                className={styles.numberSpan}
              >
                {currentVoucher}
              </span>
            </Tab>
            <Tab className={styles.tabPanel}>
              History{" "}
              <span
                id={type === "History" ? styles.activeTab : null}
                className={styles.numberSpan}
              >
                {historyVoucher}
              </span>
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Current
                history={history}
                loading={loading}
                setEdit={setEdit}
                type={type}
              />
            </TabPanel>
            <TabPanel>
              <History
                history={history}
                loading={loading}
                setEdit={setEdit}
                type={type}
              />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </div>
  );
};
export default Voucher;
