import { Provider } from 'react-redux'
import './App.css'
import { Dashboard } from './screens/dashboard/Dashboard'
import { store } from './redux/store'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Support from './screens/Support'
import Reports from './screens/Reports'
import Plans from './screens/plans/Plans'
import AdminLayout from './layout/AdminLayout'
import Restaurents from './screens/Restaurents'
import Setting from './screens/Setting'

function App() {
  return (
    <BrowserRouter>
    <Provider store={store}>
      <Routes>
           < Route element={ <AdminLayout /> }>
           <Route path='/' element={<Dashboard />}/>
           <Route path='/restaurants' element={<Restaurents />}/> 
           <Route path='/plans' element={<Plans />}/> 
           <Route path='/reports' element={<Reports />}/>
           <Route path='/supports' element={<Support/>}/> 
           <Route path='/settings' element={<Setting />} />
          </Route>     
        </Routes>
    </Provider>
    

        </BrowserRouter>
  )
}

export default App
