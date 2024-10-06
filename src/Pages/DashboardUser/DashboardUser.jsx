import React, { useEffect, useState } from 'react'
import styles from "./styles.module.css"
import Chart from 'react-google-charts'
import img1 from "../../assets/img1.png"
import img3 from "../../assets/1.svg"
import img4 from "../../assets/2.svg"
import img5 from "../../assets/3.svg"
// import vector from "../../assets/Vector.svg"
import { TbRectangleFilled } from 'react-icons/tb';
import { FiLogOut } from 'react-icons/fi';
import { LuRectangleHorizontal } from 'react-icons/lu';
import { userRequest } from '../../requestMethod'
import { useDispatch } from 'react-redux'
import { logout } from '../../Redux/AuthReducer'
import LogoutArrow from "../../assets/usersDashboard/LogoutArrow.svg"
import { Dropdown } from 'antd';
import { Link } from 'react-router-dom'
import { Avatar } from '@chakra-ui/react'



const DashboardUser = () => {
    const dispatch = useDispatch()
    const [obj, setData] = useState({
        tp: 0,
        pr: 0,
        pp: 0,
        gender:[],
        topOrigin:[],
        currentYearPremium: [],
        lastYearPremium: []
    });
    const [premiumData, setPremiumData] = useState([]);
    const [selectedFilter, setSelectedFilter] = useState('YEARLY');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await userRequest.get(`/admin/dashboard/getUserDashboardData?graphFilter=${selectedFilter}`);
          
                if (response) {
                    const currentData = response.data.chartsData;

                    let updatedPremiumData = [['', '', '']];
                    
                    // Update premiumData basebd on the selected filter
                    if (selectedFilter === 'YEARLY') {
                        currentData.forEach((currentMonth) => {
                            updatedPremiumData.push([
                                currentMonth.month,
                                currentMonth.currentYearCount,
                                currentMonth.previousYearCount
                            ]);
                        });
                    } else if (selectedFilter === 'MONTHLY') {
                        currentData.forEach((currentWeek) => {
                            updatedPremiumData.push([
                                currentWeek.weekNumber,
                                currentWeek.currentCount,
                                currentWeek.lastCount
                            ]);
                        });
                    } else if (selectedFilter === 'WEEKLY') {
                        currentData.forEach((currentWeek) => {
                            updatedPremiumData.push([
                                currentWeek.day,
                                currentWeek.currentWeek,
                                currentWeek.lastWeek
                            ]);
                        });
                    }
    
                    setPremiumData(updatedPremiumData);
    
                    setData((prev) => ({
                        ...prev, 
                        tp: response.data.totalUser,
                        pr: response.data.standardUser,
                        pp: response.data.premiumUser,
                        topOrigin: response.data.topCities,
                        gender: response.data.genders,
                    }));
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
    
        fetchData();
    }, [selectedFilter]);
    
    
    const handleFilterChange = (value) => { 
        setSelectedFilter(value); // Update selected filter state
    };


    const topOriginData = [["City", ""]];
    obj.topOrigin.forEach((item) => {
        const words = item.city.split(' '); // Splitting the city name by spaces
        const lastWord = words[words.length - 1];
        topOriginData.push([lastWord, item.count]);
    });

    const genderData = [["Gender", ""]];
    obj.gender.forEach((item) => {
        genderData.push([item.gender, item.count]);
    });

    const options = {
        title: 'Top Origin',
        legend: {
            position: 'right',
            alignment: "center",
        },
        chartArea: { left: 0, top: 10, right: 50, width: '100%', height: '80%' },
        colors: ['#8CC9E9', '#8CE9DB', '#AA8CE9','#D1E98C','#E98CD5','#DB3B53','#333333'],
    };
    
    const options1 = {
        title: 'Center',
        legend: {
            position: 'right',
            alignment: "center",
            
        },
        chartArea: { left: 0, top: 10, right: 50, width: '100%', height: '80%' },
        colors: ['#333333', '#8CE9DB', '#8CC9E9'],
    };
    const items = [
        {
            label: <div className={styles.profileDetails}>
                <Avatar name='Admin' bg="blue.300" size="md" />
                <div className={styles.profilePic}>

                    <p style={{ fontWeight: "700" }}>Admin</p>
                    <p style={{ fontWeight: "500" }}>admin@gmail.com</p>
                </div>
            </div>,
            key: '0',
        },

        {
            type: 'divider',
        },
        {
            label: <span className={styles.logout} onClick={() => {
                dispatch(logout())
                window.location.reload()
            }}> <FiLogOut />
                Log Out</span>,
            key: '1',
        },
    ];
    const options2 = {
        title: '',
        legend: { position: 'none' },
        hAxis: { textPosition: 'none' },
        vAxis: { textPosition: 'none' },
        chartArea: { left: 0, top: 0, width: '100%', height: '50%' },
        series: {
            0: { color: '#333333', bar: { groupWidth: '10%' } },
            1: { color: '#8CC9E9', bar: { groupWidth: '10%' } },
        },
    };
    const shouldRenderChart = premiumData.length > 1; 
    return (
        <div className={styles.MainContainer}>
            <div className={styles.firstContainer}>
                <h1>Dashboard</h1>
                <div>

                    <span>
                        <img src={img1} alt="" />
                    </span>

                    <span>
                        <img src="https://aave.com/aaveSiteLogo.png" alt="" />
                    </span>
                    <div className={styles.logoutArrow}>
                        <Dropdown
                            menu={{
                                items,
                            }}
                        >
                            <Link onClick={(e) => console.log(e)}>

                                <img src={LogoutArrow} alt='' />
                            </Link>
                        </Dropdown>

                    </div>

                </div>

            </div>

            <div className={styles.cards}>
                <div className={styles.card}>
                    <img src={img3} alt="" />
                    <p>Total Users</p>
                    <h1>{obj.tp ? obj.tp : 0}</h1>
                </div>
                <div className={styles.card}>

                    <img src={img4} alt="" />
                    <p>Standard User</p>
                    <h1>{obj.pr ? obj.pr : 0}</h1>
                </div>
                <div className={styles.card}>

                    <img src={img5} alt="" />
                    <p>Premium Users</p>
                    <h1>{obj.pp ? obj.pp : 0}</h1>
                </div>

            </div>
            <div className={styles.chartDiv}>
                <div className={styles.chart}>
                    <div className={styles.chartHead}>
                        <h2>Purchased Subscriptions</h2>
                        <div className={styles.innerChartHead}>
                            <div className={styles.thisYear}> <span style={{ backgroundColor: "#8CC9E9", width: "30px", borderRadius: "8px" }} > <TbRectangleFilled color='transparent' /> </span>This year</div>
                            <div className={styles.previous}> <span style={{ backgroundColor: "#333333", width: "30px", borderRadius: "8px" }}><LuRectangleHorizontal color='transparent' /> </span>Previous year</div>
                            <select onChange={(e) => handleFilterChange(e.target.value)}>
                            <option value="YEARLY">Yearly</option>
                            <option value="MONTHLY">Monthly</option>
                            <option value="WEEKLY">Weekly</option>
                            </select>
                        </div>
                    </div>
                 { 
                 shouldRenderChart &&
                    <Chart
                        chartType="Bar"
                        width="100%"
                        height="90%"
                        data={premiumData}
                        options={options2}
                    />
                 }
                </div>
                <div className={styles.sideTable}>
                    <div className={styles.sidechart}>
                        <div className={styles.title} >
                            Top Origin
                        </div>

                        <Chart
                            chartType="PieChart"
                            data={topOriginData}
                            options={options}
                            width={"100%"}
                            height={"150px"}
                        />
                    </div>
                    <div className={styles.sidechart}>   
                        <div className={styles.title}>
                            Gender
                        </div>

                        <Chart
                            chartType="PieChart"
                            data={genderData}
                            options={options1}
                            width={"100%"}
                            height={"150px"}
                        />
                    </div>     
                </div>
            </div>
        </div>

    )
}

export default DashboardUser