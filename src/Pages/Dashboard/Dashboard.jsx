import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import Chart from "react-google-charts";
import img1 from "../../assets/img1.png";
import svg2 from "../../assets/svg2.svg";
import svg1 from "../../assets/svg1.svg";
import LogoutArrow from "../../assets/usersDashboard/LogoutArrow.svg";
import { Helmet } from "react-helmet";
import { TbRectangleFilled } from "react-icons/tb";
import { FiLogOut } from "react-icons/fi";
import { LuRectangleHorizontal } from "react-icons/lu";
import { userRequest } from "../../requestMethod";
import { useDispatch } from "react-redux";
import { logout } from "../../Redux/AuthReducer";
import { Dropdown } from "antd";
import { Link } from "react-router-dom";
import { Avatar } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/react";

// import PieChart from './Pie/Pie'

const Dashboard = () => {
  const dispatch = useDispatch();
  const [obj, setData] = useState({
    tp: 0,
    pr: 0,
    categories: [],
    topOrigin: [],
    mostScansData: "",
  });
  const [loading, setLoading] = useState(true);
  const [premiumData, setPremiumData] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("YEARLY");
  const [filter, setFilter] = useState("This year");
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
  });

  const updatePremiumData = async () => {
    try {
      // ... (Previous date logic and API call)
      const response = await userRequest.get(
        `/admin/dashboard/getPartnerDashboardData?graphFilter=${selectedFilter}`
      );

      if (response) {
        const currentData = response.data.chartsData;
        console.log(currentData, "currentDataIsHEre");
        let updatedPremiumData = [["", "", ""]];

        // Update premiumData basebd on the selected filter
        if (selectedFilter === "YEARLY") {
          currentData.forEach((currentMonth) => {
            updatedPremiumData.push([
              currentMonth.month,
              currentMonth.currentYearCount,
              currentMonth.previousYearCount,
            ]);
          });
        } else if (selectedFilter === "MONTHLY") {
          currentData.forEach((currentWeek) => {
            updatedPremiumData.push([
              currentWeek.weekNumber,
              currentWeek.currentCount,
              currentWeek.lastCount,
            ]);
          });
        } else if (selectedFilter === "WEEKLY") {
          currentData.forEach((currentWeek) => {
            updatedPremiumData.push([
              currentWeek.day,
              currentWeek.currentWeek,
              currentWeek.lastWeek,
            ]);
          });
        }
        setPremiumData(updatedPremiumData);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching premium data:", error);
    }
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("userData"));
    if (storedUser) {
      setUser({
        id: storedUser._id,
        name: storedUser.name,
        email: storedUser.email,
      });
    }

    const fetchData = async () => {
      try {
        let startDate = "";
        let endDate = "";

        // Determine start and end dates based on the selected filter
        if (filter === "This year") {
          // Get current year's start and end date
          const currentYear = new Date().getFullYear();
          startDate = `${currentYear}-01-01`;
          endDate = `${currentYear}-12-31`;
        } else if (filter === "This month") {
          // Get current month's start and end date
          const currentDate = new Date();
          const currentYear = currentDate.getFullYear();
          const currentMonth = currentDate.getMonth() + 1; // Months are zero indexed
          const daysInMonth = new Date(currentYear, currentMonth, 0).getDate(); // Get total days in the month
          startDate = `${currentYear}-${currentMonth}-01`;
          endDate = `${currentYear}-${currentMonth}-${daysInMonth}`;
        } else if (filter === "This week") {
          // Get current week's start and end date
          const currentDate = new Date();
          const currentDay = currentDate.getDay();
          const diff =
            currentDate.getDate() - currentDay + (currentDay === 0 ? -6 : 1); // Adjust for Sunday
          const weekStart = new Date(currentDate.setDate(diff));
          const weekEnd = new Date(weekStart);
          weekEnd.setDate(weekStart.getDate() + 6); // Get end of the week
          startDate = weekStart.toISOString().split("T")[0];
          endDate = weekEnd.toISOString().split("T")[0];
        }
        const response = await userRequest.get(
          `/admin/dashboard/getPartnerDashboardData?startDate=${startDate}&endDate=${endDate}`
        );

        if (response) {
          if (
            filter === "This year" ||
            filter === "This month" ||
            filter === "This week"
          ) {
            setData((prev) => ({
              ...prev,
              tp: response.data.totalPartners,
              pr: response.data.totalRequestedPartner,
              categories: response.data.categories,
              topOrigin: response.data.topCities,
              mostScansData: response.data.mostScanned,
            }));
          }
        }
      } catch (error) {
        console.error("Error fetching partner data:", error);
      }
    };

    fetchData();
  }, [filter]);

  useEffect(() => {
    updatePremiumData();
  }, [selectedFilter]);

  const handleFilterChange = (value) => {
    console.log(value, "valuesDataAreHere");
    setSelectedFilter(value); // Update selected filter state
  };

  const handleFilterChange1 = (value) => {
    console.log(value, "valuesDataAreHere");
    setFilter(value); // Update selected filter state
  };

  const topOriginData = [["City", ""]];
  obj.topOrigin &&
    obj.topOrigin.forEach((item) => {
      topOriginData.push([item.city, item.count]);
    });

  // console.log(obj, 'obj');
  const categoriesData = [["Gender", ""]];
  obj.categories &&
    obj.categories.forEach((item) => {
      categoriesData.push([item.category, item.count]);
    });

  const options = {
    chartArea: { left: 10, top: 15, width: "100%", height: "65%" },
    legend: {
      position: "right",
      alignment: "center",
      textStyle: {
        fontSize: 10,
      },
    },
  };

  const options1 = {
    colors: ["#333333", "#15EEB0", "#8CC9E9"],
    chartArea: { left: 10, top: 15, width: "100%", height: "65%" },
    legend: {
      position: "right",
      alignment: "center",
      textStyle: {
        fontSize: 10,
        fontWeight: 800,
      },
    },
  };
  const items = [
    {
      label: (
        <div className={styles.profileDetails}>
          <Avatar name="Name" bg="blue.300" size="md" />
          <div className={styles.profilePic}>
            <p style={{ fontWeight: "700" }}>{user.name}</p>
            <p style={{ fontWeight: "500" }}>{user.email}</p>
          </div>
        </div>
      ),
      key: "0",
    },

    {
      type: "divider",
    },
    {
      label: (
        <span
          className={styles.logout}
          onClick={() => {
            dispatch(logout());
            window.location.reload();
          }}
        >
          {" "}
          <FiLogOut />
          Log Out
        </span>
      ),
      key: "1",
    },
  ];
  const options2 = {
    title: "",
    legend: { position: "none" },
    hAxis: { textPosition: "none" },
    vAxis: { textPosition: "none" },
    chartArea: { left: 0, top: 0, width: "100%", height: "100%" },
    series: {
      0: { color: "#333333", bar: { groupWidth: "10%" } },
      1: { color: "#8CC9E9", bar: { groupWidth: "10%" } },
    },
  };

  const shouldRenderChart = premiumData.length > 1;

  return (
    <div className={styles.MainContainer}>
      <Helmet>
        <title>Dashboard - NETME</title>
      </Helmet>
      <div className={styles.firstContainer}>
        <h1>Dashboard</h1>
        <div>
          <select onChange={(e) => handleFilterChange1(e.target.value)}>
            <option value="This year">This Year</option>
            <option value="This month">This Month</option>
            <option value="This week">This Week</option>
          </select>
          <span>
            <img src={img1} alt="" />
          </span>

          <span id={styles.profileImg}>
            <img src="https://aave.com/aaveSiteLogo.png" alt="" />
          </span>
          <div className={styles.logoutArrow}>
            <Dropdown
              menu={{
                items,
              }}
            >
              <Link onClick={(e) => console.log(e)}>
                <img src={LogoutArrow} alt="" />
              </Link>
            </Dropdown>
          </div>
        </div>
      </div>

      <div className={styles.cards}>
        <div className={styles.maincards}>
          <div className={styles.card}>
            <img src={svg1} alt="" />
            <p>Total Partners</p>
            <h1>{obj.tp ? obj.tp : 0}</h1>
          </div>
          <div className={styles.card}>
            <img src={svg2} alt="" />
            <p>Partners Requests</p>
            <h1>{obj.pr ? obj.pr : 0}</h1>
          </div>
        </div>
        <div className={styles.mainpiediv}>
          <div className={styles.pieDiv}>
            <div className={styles.title}>Top Origin</div>
            <div className={styles.piechartdiv}>
              <Chart
                chartType="PieChart"
                data={topOriginData}
                options={options}
                width="100%"
              />
            </div>
          </div>
          <div className={styles.pieDiv}>
            <div className={styles.title}>Category</div>
            <div className={styles.piechartdiv}>
              <Chart
                chartType="PieChart"
                data={categoriesData}
                options={options1}
                width="100%"
              />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.chartDiv}>
        <div className={styles.chart}>
          <div className={styles.chartHead}>
            <h2>Purchased Subscriptions</h2>
            <div className={styles.innerChartHead}>
              <div className={styles.thisYear}>
                {" "}
                <span
                  style={{
                    backgroundColor: "#8CC9E9",
                    width: "20px",
                    height: "8px",
                    borderRadius: "8px",
                  }}
                >
                  {" "}
                  <TbRectangleFilled color="transparent" />{" "}
                </span>
                This year
              </div>
              <div className={styles.previous}>
                {" "}
                <span
                  style={{
                    backgroundColor: "#333333",
                    width: "20px",
                    height: "8px",
                    borderRadius: "8px",
                  }}
                >
                  <LuRectangleHorizontal color="transparent" />{" "}
                </span>
                Previous year
              </div>
              <select onChange={(e) => handleFilterChange(e.target.value)}>
                <option value="YEARLY">Yearly</option>
                <option value="MONTHLY">Monthly</option>
                <option value="WEEKLY">Weekly</option>
              </select>
            </div>
          </div>
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
            shouldRenderChart && (
              <Chart
                chartType="Bar"
                width="100%"
                height="93%"
                data={premiumData}
                options={options2}
              />
            )
          )}
        </div>
        <div className={styles.sideTable}>
          <h2>Most visited place</h2>
          <div className={styles.tableDiv}>
            <table className={styles.roundedTable}>
              <tr>
                <th>Partners Name</th>
                <th>Most Scans</th>
              </tr>
              {obj.mostScansData &&
                obj.mostScansData.map((data) => {
                  return (
                    <tr>
                      <td>{data.partners.fullName}</td>
                      <td>{data.count}</td>
                    </tr>
                  );
                })}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
