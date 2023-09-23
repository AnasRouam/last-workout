import { useState, useEffect } from "react";
import ExerciseCard from "./ExerciseCard";
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Exercise } from "../DataTypes";



export default function Catalog() {
    const navigate = useNavigate();  
    const { type } = useParams();
    const [catalog, setCatalog] = useState<Exercise[]>([]);

    useEffect(() => {
        fetch(`http://localhost:4000/catalog/${type}`)
        .then((response) => response.json())
        .then((data) => setCatalog(data))
    }, [type]);

    return (
        <section>
            <div className='grid gap-4 lg:grid-cols-3 md:grid-cols-2'>
                {catalog.map((exercise, index) => (
                    <Link to={'/editExercise/' + exercise.title} key={index}>
                        <ExerciseCard title={exercise.title} last={exercise.last}/>
                    </Link>
                ))}
            </div>
            
            <div className="m-4 grid place-items-center">
                <Link to={'/addExercise/' + type} >
                    <button>Add Exercise</button>
                </Link>
            </div>

            <div className="flex justify-center items-center mb-4">
                <button onClick={() => navigate(-1)}>Go back</button>
            </div>
            
        </section>
        
    )
}