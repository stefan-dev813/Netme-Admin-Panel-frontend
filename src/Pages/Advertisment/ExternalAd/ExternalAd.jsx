import React, { useEffect, useState } from 'react'
import styles from "./style.module.css"
import { Tabs, TabList, TabPanels, Tab, TabPanel, InputGroup, Input, InputRightElement, Button } from '@chakra-ui/react'
import { BiFilter, BiSearch } from 'react-icons/bi'
import Overview from './Overview/Overview'
import HistoryAd from './HistoryAd/HistoryAd'
import CreateAd from './CreateAd/CreateAd'
import { useDispatch, useSelector } from 'react-redux'
import { fetchExternalAdData } from '../../../Redux/Advertisement/External/ExternalAdReducer';
import ExterNalAdFilter from './ViewStats/ExternalAdFilter';

const ExternalAd = () => {
    const [createAd, setCreateAd] = useState(false)
    const [type, setType] = useState("Overview")
    const [search, setSearch] = useState("")
    const [page, setPage] = useState(1)
    const [adType, setAdType] = useState(""); 
    const [releaseStartDate, setReleaseStartDate] = useState("");
    const [releaseEndDate, setReleaseEndDate] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [status, setStatus] = useState(""); 

    const dispatch = useDispatch()
    const ad = useSelector(store => store.ExternalAdReducer.externalAd.data) || []
    const loading = useSelector(store => store?.ExternalAdReducer?.isLoading) || false
    const { historyCount, overViewCount } = useSelector(store => store.ExternalAdReducer.externalAd)

    useEffect(() => {
        dispatch(fetchExternalAdData(type, search, page, releaseStartDate, releaseEndDate, startDate, endDate))
    }, [search, type, dispatch, page])

    if (createAd) {
        return (
            <CreateAd setCreateAd={setCreateAd} />
        )
    }

    return (
        <div className={styles.MainContainer}>
            <div className={styles.firstDiv}>
                <h1>Advertisement</h1>

                <div className={styles.filterDiv}>
                    <InputGroup w={200}>
                        <Input placeholder='Search' onChange={(e) => setSearch(e.target.value)} />
                        <InputRightElement>
                            <BiSearch color='green.500' />
                        </InputRightElement>
                    </InputGroup>
                    {/* <Button>Filter  <BiFilter fontSize={20} marginLeft={10} /></Button> */}
                    <ExterNalAdFilter 
                    type={type} 
                    page={page}
                    search={search}
                    setAdType = {setAdType}
                    adType = {adType}
                    setReleaseStartDate={setReleaseStartDate}
                    releaseStartDate = {releaseStartDate}
                    setReleaseEndDate = {setReleaseEndDate}
                    releaseEndDate = {releaseEndDate}
                    setStartDate = {setStartDate}
                    startDate = {startDate}
                    setEndDate = {setEndDate}
                    endDate = {endDate}    
                    />
                    <Button bg="#8CC9E9" onClick={() => setCreateAd(true)}>Create New Advertisement</Button>
                </div>

            </div>
            <div>
                <Tabs>
                    <TabList>
                        <Tab className={styles.tabPanel} onClick={() => setType("Overview")}>Overview <span id={type === "Overview" ? styles.activeTab : null} className={styles.numberSpan}>{overViewCount}</span></Tab>
                        &nbsp;
                        &nbsp;
                        &nbsp;

                        <Tab className={styles.tabPanel} onClick={() => setType("History")}>History <span id={type === "History" ? styles.activeTab : null} className={styles.numberSpan}>{historyCount}</span></Tab>

                    </TabList>

                    <TabPanels>
                        <TabPanel>
                            <Overview ad={ad} loading={loading} setPage={setPage} page={page} />
                        </TabPanel>

                        <TabPanel>
                            <HistoryAd loading={loading} ad={ad} setPage={setPage} page={page} />
                        </TabPanel>

                    </TabPanels>
                </Tabs>
            </div>
        </div>
    )
}

export default ExternalAd