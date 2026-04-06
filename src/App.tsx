import { Provider } from 'react-redux'
import './App.css'
import { store } from './redux/store'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Plans from './screens/plans/Plans'
import AdminLayout from './layout/AdminLayout'
import Restaurents from './screens/restaurant/Restaurents'
import Setting from './screens/setting/Setting'
import Dashboard from './screens/dashboard/Dashboard'
import Report from './screens/report/Report'
import Reports from './screens/reports/Reports'

function App() {
  return (
    <BrowserRouter>
    <Provider store={store}>
      <Routes>
           < Route element={ <AdminLayout /> }>
           <Route path='/' element={<Dashboard />}/>
           <Route path='/restaurants' element={<Restaurents />}/> 
           <Route path='/plans' element={<Plans />}/> 
           <Route path='/reports' element={<Report />}/>
           <Route path='/settings' element={<Setting />} />
          </Route>     
        </Routes>
    </Provider>
    

        </BrowserRouter>
  )
}

export default App
