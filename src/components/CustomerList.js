import React, { useState, useEffect} from 'react'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'
import Button from '@mui/material/Button'
//import AddCar from "./AddCar";
import Snackbar from '@mui/material/Snackbar';
//import EditCar from './EditCar';

function CustomerList()
{
    const[customers, setCustomers] = useState([])
        useEffect(() => {
        fetchCustomers()
    }, [])
    const[open, setOpen]= useState(false);
    const[msg, setMsg] = useState('');
    const handleClose = () => {
        setOpen(false);
    };

    const fetchCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
            .then(response => response.json())
            .then(data => setCustomers(data.content))
            .catch(err => console.error("err"))
        
        
    }

    const deleteCustomer = (url) => {
        if (window.confirm('Are you sure')) {
            console.log(url)
            fetch(url, {method: 'DELETE'})
                .then(response => {
                if (response.ok) {
                    setMsg('Customer was deleted    ');
                    setOpen(true);
                    fetchCustomers()
                }
                else {
                    alert("Something wrong")
                }
            })
            .catch((err) => console.error(err));
        }
    }
    /*
    const addCar = car => {
        fetch('http://carrestapi.herokuapp.com/cars', {
            method: 'POST',
            headers: {
                'Content-type':'application/json'
        },
        body: JSON.stringify(car)
        })
        .then(response =>  fetchCars())
        .catch(err => console.error(err));
        setMsg('Car Added');
        setOpen(true);
    }

    const editCar = (link, updatedCar) => {
        fetch(link,{
            method: 'PUT',
            headers: {
                'Content-type':'application/json'
            },
            body: JSON.stringify(updatedCar)
        })
        .then(response => fetchCars())
        .catch(err => console.error(err));
        setMsg('Car Updated');
        setOpen(true);
    }
    */

    

    const column = [
        {field: 'firstname', sortable: true, filter: true},
        {field: 'lastname', sortable: true, filter: true},
        {field: 'streetaddress', sortable: true, filter: true},
        {field: 'postcode', sortable: true, filter: true},
        {field: 'city'},
        {field: 'email'},
        {field: 'phone'},
        /*{
        headerName: '',
        sortable: false,
        filter: false,
        width:120,
        field: '_links.self.href',
        cellRendererFramework: (params) => <EditCar editCar={editCar} row={params}/>
        
        },
        */
        {
            /*headerName: '',
            sortable: false,
            filter: false,
            width: 120,
            */
            
            field: 'links.0.href',
            width: 600,
            //cellRendererFramework: (params) => <Button onClick={() => deleteCustomer(params.value)}>Delete</Button>
        }
    ]

    return(
        <div>
        <div className="ag-theme-alpine" style={{marginTop: 20, height: 600, width: '90%', margin: 'center'}}>
            <AgGridReact
                rowData={customers}
                columnDefs={column}
                pagination={true}
                paginationPageSize={10}
                suppressCellSelection={true}
            />
        </div>
        <Snackbar open={open} message={msg}
        autoHideDuration={3000}
        onClose={handleClose} />
        </div>
    )
}

export default CustomerList;