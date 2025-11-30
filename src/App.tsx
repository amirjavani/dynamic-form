
import { LocalizationProvider } from '@mui/x-date-pickers'
import './App.css'
import { DynamicForm } from './components/form/DynamicForm'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

function App() {


  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DynamicForm />
      </LocalizationProvider>
    </>
  )
}

export default App
