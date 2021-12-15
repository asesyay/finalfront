
import React, {useEffect, useState} from "react";
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import { Box } from '@mui/material';
import "react-big-calendar/lib/css/react-big-calendar.css";



function MyCalendar() {
    const [trainings, setTrainings] = useState([]);
    const localizer = momentLocalizer(moment)
    
    useEffect(()=> {
        const fetchData =() => {
            fetch('https://customerrest.herokuapp.com/gettrainings')
            .then(response=>response.json())
            .then(data=>setTrainings(data))
            .catch(err=>console.log(err));
        };
        fetchData();
     }, []);
    
        

    const trainingsForCalendar = trainings.map((obj) => {
        return {
            title: obj.activity,
            start: new Date(obj.date),
            end: moment(obj.date).add(parseInt(obj.duration)).toDate()
        }
    })

    return (
        <Box style={{ height: '85vh', width: '85vw', flex:1, marginLeft: 'auto', marginRight: 'auto'}}>
        <Calendar
            localizer={localizer}
            events={trainingsForCalendar}
            startAccessor="start"
            endAccessor="end"
            style={{ backgroundColor: 'white' }}
        />
        </Box>
    )


}

export default MyCalendar;
