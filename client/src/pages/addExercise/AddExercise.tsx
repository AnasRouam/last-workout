import { useParams, useNavigate } from "react-router-dom"
import { useState, ChangeEvent } from 'react'
import { Exercise, WorkoutRecord } from "../DataTypes";


export default function AddExercise() {
    const navigate = useNavigate();
    const { type } = useParams();
    const [ exercise, setExercise ] = useState<Exercise>({
        title: '',
        category: (type !== undefined) ? type : '',
        last: [{
            reps: 0,
            time: 0,
            weight: 0
        }]
    });

    const handleChange = (event: ChangeEvent<HTMLInputElement>, index: number): void => {
        const record: WorkoutRecord[] = JSON.parse(JSON.stringify(exercise.last))
        record[index][event.target.name] = parseInt(event.target.value);
        setExercise({
            ...exercise,
            last: record
        })
        
    }

    console.log(exercise)

    const handleTitleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setExercise({
            ...exercise,
            title: event.target.value
        })
    }

    const handleAdd = () => {
        const record: WorkoutRecord[] = JSON.parse(JSON.stringify(exercise.last))
        record.push({
            reps: 0,
            time: 0,
            weight: 0 
        })
        setExercise({
            ...exercise,
            last: record
        })
    }

    const handleRemove = () => {
        const record: WorkoutRecord[] = JSON.parse(JSON.stringify(exercise.last))
        record.pop()
        setExercise({
            ...exercise,
            last: record
        })
    }

    const handleSubmit = async () => {
        try {
            const response = await fetch('http://localhost:4000/addExercise', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(exercise),
            });
      
            if (response.ok) {
              const responseData = await response.json();
              console.log(responseData);
            } else {
              console.error('Request failed with status:', response.status);
            }
          } catch (error) {
            console.error('Error:', error);
          }
        
        navigate(-1)
    }
  
    return (
        <section className="flex flex-col justify-center items-center">
            <div className="bg-white text-slate-800 m-4 border rounded-xl flex flex-col overflow-hidden">
                <div className="p-4 flex flex-col items-center justify-center">
                    <h2 className="text-md pb-1 font-bold">New Exercise</h2>
                    <div className="flex gap-2 m-2"> 
                        <label>Exercise name</label>
                        <input name='title' type="text" onChange={handleTitleChange} style={{ width: '20em' }}/>
                    </div>
                    {exercise.last.map((_, index) => {
                        return (
                            <div key={4+index} className="m-1">
                                <label className="px-1">{'Set ' + (index+1) + ' :'} Reps</label>
                                <input name="reps" type="number" placeholder="0" min='0' onChange={(event) => handleChange(event, index)} />
                                <label className="px-1">Time</label>
                                <input name="time" type="number" placeholder="0" min='0' onChange={(event) => handleChange(event, index)} />
                                <label className="px-1">Weight</label>
                                <input name="weight" type="number" placeholder="0" min='0' onChange={(event) => handleChange(event, index)} />
                            </div>
                        )
                    })}
                    <div className="flex justify-center gap-10 items-center pt-4">
                        <button onClick={handleAdd}>Add Set</button>
                        <button onClick={handleRemove}>Remove Set</button>
                    </div>
                    <div className="flex justify-center items-center pt-4">
                        <button onClick={handleSubmit}>Save Exercise</button>
                    </div>
                </div>
            </div>
            <div className="flex justify-center items-center">
                <button onClick={() => navigate(-1)}>Go back</button>
            </div>
        </section>
    )
}