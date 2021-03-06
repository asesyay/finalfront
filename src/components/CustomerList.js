import React, { useState, useEffect } from 'react'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'
import Button from '@mui/material/Button'
import AddCustomer from "./AddCustomer";
import Snackbar from '@mui/material/Snackbar';
import EditCustomer from './EditCustomer';
import Stack from '@mui/material/Stack';


function CustomerList()
{
    const[customers, setCustomers] = useState([])
        useEffect(() => {
        fetchCustomers()
    }, [])
    const[open, setOpen]= useState(false);
    const[msg, setMsg] = useState('');
    const [gridApi, setGridApi]=useState('');

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
    
    const addCustomer = customer => {
        fetch('https://customerrest.herokuapp.com/api/customers', {
            method: 'POST',
            headers: {
                'Content-type':'application/json'
        },
        body: JSON.stringify(customer)
        })
        .then(response =>  fetchCustomers())
        .catch(err => console.error(err));
        setMsg('Customer Added');
        setOpen(true);
    }

    
    
    const editCustomer = (link, updatedCustomer) => {
        fetch(link,{
            method: 'PUT',
            headers: {
                'Content-type':'application/json'
            },
            body: JSON.stringify(updatedCustomer)
        })
        .then(response => fetchCustomers())
        .catch(err => console.error(err));
        setMsg('Car Updated');
        setOpen(true);
    }
    

    

    const column = [
        {field: 'firstname', sortable: true, filter: true},
        {field: 'lastname', sortable: true, filter: true},
        {field: 'streetaddress', sortable: true, filter: true},
        {field: 'postcode', sortable: true, filter: true},
        {field: 'city', width: 100},
        {field: 'email'},
        {field: 'phone', width: 170},
        
        {
        headerName: '',
        sortable: false,
        filter: false,
        width:120,
        field: 'links.0.href',
        cellRendererFramework: (params) => <EditCustomer editCustomer={editCustomer} row={params}/>
        
        },
        
        {
            headerName: '',
            sortable: false,
            filter: false,
            width: 120,
            
            
            field: 'links.0.href',
            
            cellRendererFramework: (params) => <Button onClick={() => deleteCustomer(params.value)}>Delete</Button>
        },
        {field: 'links.0.href', headerName: 'Link', width: 430},
    ]
    
    const onGridReady=(params)=>{
        setGridApi(params.api);
        console.log(gridApi)
    }
    const onExportClick=()=>{
        gridApi.exportDataAsCsv()
    }
    

    return(
        <div>
            <Stack spacing={2} marginTop={2} direction="row" justifyContent="center">
                <AddCustomer addCustomer={addCustomer} style={{marginTop: 50}}/>
                <Button variant="outlined" onClick={()=>onExportClick()}>Export</Button>
            </Stack>
        <div className="ag-theme-alpine" style={{marginTop: 20, height: 600, width: '100%', margin: 'center'}}>
            <AgGridReact
                rowData={customers}
                columnDefs={column}
                pagination={true}
                paginationPageSize={10}
                suppressCellSelection={true}
                onGridReady={onGridReady}
                enableCellTextSelection={true}
            />
        </div>
        <Snackbar open={open} message={msg}
        autoHideDuration={3000}
        onClose={handleClose} />
        </div>
    )
}

export default CustomerList;