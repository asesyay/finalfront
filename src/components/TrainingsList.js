import React, { useState, useEffect} from 'react'
import dayjs from 'dayjs'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'
import Button from '@mui/material/Button'
import Snackbar from '@mui/material/Snackbar'
import AddTraining from './AddTraining'

function TrainingsList()
{
    const[trainings, setTrainings] = useState([])
        useEffect(() => {
        fetchTrainings()
    }, []);
    const[trUrl, setTrUrl] = useState('https://customerrest.herokuapp.com/api/trainings')
    const[open, setOpen]= useState(false);
    const[msg, setMsg] = useState('');

    

    const fetchTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
            .then(response => response.json())
            .then(data => setTrainings(data))
            .catch(err => console.error("err"))
            
    }

    const deleteTraining=(id)=>{
        console.log(trUrl+'/'+id);
        if (window.confirm('Are you sure?')) {
            
            fetch(trUrl+'/'+id, {method: 'DELETE'})
                .then(response => {
                if (response.ok) {
                    setMsg('Training was deleted    ');
                    setOpen(true);                    
                    fetchTrainings()
                }
                else {
                    alert("Something wrong")
                }
            })
            .catch((err) => console.error(err));
        }
    }

    function fullNameGetter(params) {
        return params.data.customer.firstname + ' ' + params.data.customer.lastname;
    }
    function dataFormater(params) {
        return dayjs(params.data.date, 'YYYY-MM-DD')
    }
    const handleClose = () => {
        setOpen(false);
    }
    const addTraining = training => {
        fetch('https://customerrest.herokuapp.com/api/trainings', {
            method: 'POST',
            headers: {
                'Content-type':'application/json'
        },
        body: JSON.stringify(training)
        })
        .then(response =>  fetchTrainings())
        .catch(err => console.error(err));
        setMsg('Training Added');
        setOpen(true);
    }

    const column = [
        {field: 'activity', sortable: true, filter: true},
        {field: 'date', sortable: true, filter: true, valueGetter: dataFormater, width: 300, headerClass: "margin: 'center'"},
        {field: 'duration', sortable: true, filter: true},
        {field: 'customer.firstname&customer.lastname', valueGetter: fullNameGetter, headerName: 'Client'},
        {
            headerName: '',
            sortable: false,
            filter: false,
            width: 120,
            
            
            field: 'id',
            
            cellRendererFramework: (params) => <Button onClick={() => deleteTraining(params.value)}>Delete</Button>
        }
    ]




    return(
        <div>
            <AddTraining addTraining={addTraining} style={{marginTop: 50}}/>
        <div className="ag-theme-alpine" style={{marginTop: 20, height: 600, width: '100%', margin: 'center'}}>
            <AgGridReact
                rowData={trainings}
                columnDefs={column}
                pagination={true}
                paginationPageSize={10}
                suppressCellSelection={true}
            />
            <Snackbar open={open} message={msg}
        autoHideDuration={3000}
        onClose={handleClose} />
        </div>    
        </div>    
    )
}
export default TrainingsList;
