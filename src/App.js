import {Routes, Route} from 'react-router-dom';
import './styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import MainPage from './pages/MainPage';
import SessionsPage from './pages/SessionsPage';
import MachinesPage from './pages/MachinesPage';
import UsersPage from './pages/UsersPage';
import MediaPage from './pages/MediaPage';




const App = () =>
    <div className='App'>
        <Routes>
            <Route path='/' element={<MainPage/>}/>
            <Route path='/sessions' element={<SessionsPage/>}/>
            <Route path='/machines' element={<MachinesPage/>}/>
            <Route path='/users' element={<UsersPage/>}/>
            <Route path='/media' element={<MediaPage/>}/>
            
        </Routes>
    </div>


export default App;
