import { Provider } from 'react-redux'
import './App.css'
import { store } from './redux/store'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Support from './screens/Support'
import Plans from './screens/plans/Plans'
import AdminLayout from './layout/AdminLayout'
import Restaurents from './screens/restaurant/Restaurents'
import Setting from './screens/Setting'
import Report from './screens/report/Report'
import Dashboard from './screens/dashboard/Dashboard'

function App() {
  return (
    <BrowserRouter>
    <Provider store={store}>
      <Routes>
           < Route element={ <AdminLayout /> }>
           <Route path='/' element={<Dashboard />}/>
           <Route path='/restaurants' element={<Restaurents />}/> 
           <Route path='/plans' element={<Plans />}/> 
           {/* <Route path='/report' element={<Report />}/> */}
           <Route path='/supports' element={<Support/>}/> 
           <Route path='/settings' element={<Setting />} />
          </Route>     
        </Routes>
    </Provider>
    

        </BrowserRouter>
  )
}

export default App
