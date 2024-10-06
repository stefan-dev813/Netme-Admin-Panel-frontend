import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { userRequest } from "../../../requestMethod";
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function AdChart({ releaseTime }) {
  const [obj, setData] = useState({
    internalClickStats: [],
    internalImpressionStats: [],
    invitesStats: []
  });

  const params = useParams();

  useEffect(() => {
    const fetchSingleAd = async () => {
      try {
        const response = await userRequest.get(`/admin/partner/getAdvtertisementStats?_id=${params.id}&type=INTERNAL`);
        setData(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleAd();
  }, [params.id]);

  // Generate time labels from 12:00 AM to 12:00 PM with hourly intervals
  const labels = [];
  for (let i = 0; i < 25; i++) { // Change the loop to cover 12 hours
    const currentTime = new Date();
    currentTime.setHours(0 + i, 0); // Start from 12:00 AM with hourly increments
    const formattedTime = currentTime.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });
    labels.push(formattedTime);
  }

  // Rest of your code remains unchanged
  const clicksData = {
    label: 'Clicks',
    data: obj.internalClickStats.map((item) => item.count),
    borderColor: '#333333',
    backgroundColor: '#333333',
    fill: false,
  };

  const impressionsData = {
    label: 'Impressions',
    data: obj.internalImpressionStats.map((item) => item.count),
    borderColor: '#8CC9E9',
    backgroundColor: '#8CC9E9',
    fill: false,
  };

  const invitesData = {
    label: 'Invites',
    data: obj.invitesStats.map((item) => item.count),
    borderColor: '#8CE9DB',
    backgroundColor: '#8CE9DB',
    fill: false,
  };

  const data = {
    labels,
    datasets: [impressionsData, clicksData, invitesData],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          boxWidth: 20,
        },
      },
      title: {
        display: false,
      },
    },
  };

  const customWidth = 1000;
  const customHeight = 280;

  return <Line options={options} data={data} width={customWidth} height={customHeight} />;
}
