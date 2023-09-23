import './App.css'
import { Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Catalog from './pages/catalog/Catalog';
import EditExercise from './pages/editExercise/EditExercise';
import AddExercise from './pages/addExercise/addExercise';



const App = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/catalog/:type' element={<Catalog />} />
            <Route path='/editExercise/:title' element={<EditExercise />} />
            <Route path='/addExercise/:type' element={<AddExercise />} />
        </Routes>
    )
}


export default App;