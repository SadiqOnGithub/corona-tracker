import React, { useEffect, useState } from 'react';
import styles from './Charts.module.css'
import { fetchDailyData } from '../../api'
import { Line, Bar } from 'react-chartjs-2';
// import { faker } from '@faker-js/faker';

export function Charts({ data, country }) {

  let [dailyData, setDailyData] = useState([]);

  useEffect(() => {

    let fetchAPI = async () => {
      setDailyData(await fetchDailyData());
    }

    fetchAPI();
  }, [])

  // console.log(dailyData.map(({ date }) => date));


  const lineChart = (
    true
      ? (< Line
        data={{
          labels: dailyData.map(({ date }) => date),
          datasets: [
            {
              label: 'Infected',
              data: dailyData.map(({ confirmed }) => confirmed),
              borderColor: 'rgb(255, 99, 132)',
              // backgroundColor: 'rgba(255, 99, 132, 0.5)',
              fill: false,
            },
            {
              label: 'Deaths',
              data: dailyData.map(({ deaths }) => deaths),
              borderColor: 'rgb(53, 162, 235)',
              // backgroundColor: 'rgba(53, 162, 235, 0.5)',
              // fill: false,
            },
          ],
        }}
      />) : null
  )

  const barChart = (
    data.confirmed ? (
      <Bar
        data={{
          labels: ['Infected', 'Recovered', 'Deaths'],
          datasets: [{
            label: 'People',
            backgroundColor: [
              'rgba(0, 0, 255, 0.5)',
              'rgba(0, 255, 0, 0.5)',
              'rgba(255, 0, 0, 0.5)',
            ],
            data: [data.confirmed.value, data.recovered.value, data.deaths.value],
          }]

        }}
        option={{
          legend: { display: 0 },
          titile: { display: 1, text: `Current state in ${country}` }
        }}
      />
    ) : null
  )

  return (
    <div className={styles.container}>
      {country ? barChart : lineChart}
    </div>
  );
}
