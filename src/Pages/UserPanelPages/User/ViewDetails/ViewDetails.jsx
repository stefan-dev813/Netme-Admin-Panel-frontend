import React, { useEffect, useState } from 'react'
import styles from "./style.module.css"
import { Avatar } from '@chakra-ui/react'
import { BsFillCheckCircleFill } from 'react-icons/bs'
import FeedBackModel2 from './FeedBackModel2'
import { userRequest } from '../../../../requestMethod'
import { useParams ,Link} from 'react-router-dom';
import { HiMiniMinus } from "react-icons/hi2";
import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';

const ViewDetails = () => {
    const [data, setData] = useState([]);
    const [user,setUser] = useState([]);
    
    const newArray = [...Array(10)];
 
    const { id } = useParams();

    useEffect(() => {
        userRequest.get(`/admin/user/findFeedbackforuser/${id}`).then((res) => {
          setData(res.data.findAllFeedback);
        });
    }, []);

    useEffect(() => {
        userRequest.get(`/admin/user/getSingleUser?userId=${id}`).then((res) => {
          setUser(res.data.user);
        });
    }, []);

    console.log(user.userName ,'dataHde');

    return (
        <div className={styles.MainContainer}>
            <span>
                <Link to="/Users">All Users </Link>
                {'>'} <b>Feedback detail</b>
            </span>
            <h1>
                Feedbacks
            </h1>
            <div>
                <p>User Detail</p>

                <div className={styles.profileDiv}>
                <div className={styles.profilePic}>
                                                    <Avatar name='Dan Abrahmov' src={user.images} />
</div>
                    <div className={styles.innerProfile}>
                        <h2>{user.userName}</h2>
                        <h4>{user.email}</h4>
                    </div>
                </div>

            </div>

            <div className={styles.tableDiv}>
            <TableContainer style={{border:'1px solid #D9E1E7', borderRadius:'20px'}}>
      <Table variant='simple'>
      <Thead>
                    <Tr>
                      
                        <Th>
                            Reviewed By
                        </Th>
                        <Th>
                            Stolen Fake photo
                        </Th>
                        <Th>
                         Insult or harassment
                        </Th>
                        <Th>
                         Spam or Fraud
                        </Th>
                        <Th>
                            Pornographic or<br />
                            inappropriate content
                        </Th>
                        <Th>
                         Optional Message
                        </Th>
                        <Th>
                            Review
                        </Th>


                    </Tr>

</Thead>
<Tbody>
                    {
                       data && data.map((el, i) => {
                        console.log(el, 'elDataIsHere');
                            return (
                                <Tr key={i}>
                                  
                                    <Td>
                                        <div className={styles.profileDetails}>
                                            <div className={styles.profilePic}>
                                                <Avatar name='Dan Abrahmov' src={el.reportedBy.images}/>
                                                <p>{el.reportedBy.userName}</p>
                                            </div>
                                            <p>{el.reportedBy.email}</p>
                                        </div>
                                    </Td>

                                    <Td>
                                        {
                                            el.categories === 'Stolen fake photo' ?
                                        <div className={styles.check}>
                                            <BsFillCheckCircleFill fontSize={20} />
                                        </div> :  <div className={styles.check}>
                                            <HiMiniMinus />
                                        </div>
                        }
                                    </Td>
                                    <Td>
                                    {
                                            el.categories === 'Insult or harassment' ?
                                        <div className={styles.check}>
                                            <BsFillCheckCircleFill fontSize={20} />
                                        </div> :  <div className={styles.check}>
                                            <HiMiniMinus />
                                        </div>
                        }

                                    </Td>
                                    <Td>
                                    {
                                            el.categories === 'Spam or Fraud' ?
                                        <div className={styles.check}>
                                            <BsFillCheckCircleFill fontSize={20} />
                                        </div> :  <div className={styles.check}>
                                            <HiMiniMinus />
                                        </div>
                        }

                                    </Td>
                                    <Td>
                                    {
                                            el.categories === 'Pornographic or inappropriate content' ?
                                        <div className={styles.check}>
                                            <BsFillCheckCircleFill fontSize={20} />
                                        </div> :  <div className={styles.check}>
                                            <HiMiniMinus />
                                        </div>
                        }
                                    </Td>
                                    <Td>
                                    {
                                            el.categories === 'Optional Message' ?
                                        <div className={styles.check}>
                                            <BsFillCheckCircleFill fontSize={20} />
                                        </div> :  <div className={styles.check}>
                                            <HiMiniMinus />
                                        </div>
                        }
                                    </Td>
                                    <Td>
                                        <FeedBackModel2 message = {el.message} datas={el.reportedTo} />
                                    </Td>
                                </Tr>
                            )
                        })
                    }
                    </Tbody>
                                </Table>
                                </TableContainer>

            </div>
        </div>
    )
}

export default ViewDetails