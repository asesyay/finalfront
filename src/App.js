import './App.css'
import CustomerList from './components/CustomerList'

import AppBar from '@mui/material/AppBar'
import ToolBar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

function App() {
  return (
    <div className="App">
      <AppBar position='static'>
        <ToolBar>
          <Typography variant='h6'>
            Customer List
          </Typography>
        </ToolBar>
      </AppBar>

      <CustomerList />
    </div>
  )
  }

export default App;