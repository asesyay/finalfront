import React, { useEffect, useState} from 'react';
import { Box } from '@mui/material';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Label } from 'recharts';
import _ from 'lodash';

export default function StatisticsView () {

  const [finalData, setFinalData] = useState([]);

   const fetchData = () => {
    fetch('https://customerrest.herokuapp.com/gettrainings')
    .then(response => response.json())
    .then(data => setTrainings(data))
  }

  const setTrainings = (data) => {
    const mappedData = data.map((item) =>  {
      return {activity: item.activity, duration: item.duration}
    })
    const groupedData = _.groupBy(mappedData,'activity')
    const summedData = Object.entries(groupedData).map((item) => {
      return {activity: item[0], duration: _.sumBy(item[1],'duration')}
    });
    setFinalData(summedData)
  }

  useEffect(() => fetchData(), []);

 

  return (
    <Box style={{height: '75vh', width: '90vw', flex:1, marginLeft: 'auto', marginRight: 'auto'}}>
      <ResponsiveContainer width="100%" height="100%">
          <BarChart width={1000} height={1000} data={finalData} margin={{ top: 40, right: 5, left: 40, bottom: 5 }}>
            <XAxis dataKey="activity" >
              <Label fontSize={20} fontFamily="Calibri" position="bottom" angle={0} value="Activities"/>
            </XAxis>
            <YAxis type="number">
              <Label fontSize={20} fontFamily="Calibri" position="left" angle={270} value="Duration Sum"/>
            </YAxis>            
            <Bar dataKey="duration" fill="#40d9f7" />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  )
}