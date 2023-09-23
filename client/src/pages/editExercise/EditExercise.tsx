import { useParams, useNavigate } from "react-router-dom"
import { ChangeEvent, useEffect, useState } from "react";
import { Exercise, WorkoutRecord } from "../DataTypes";

export default function EditExercise() {
    const navigate = useNavigate();
    const { title } = useParams();
    const [ exercise, setExercise ] = useState<Exercise>({
        category: '',
        title: '',
        last: [{
            reps: 0,
            time: 0,
            weight: 0
        }]
    });

    const [ newRecord, setNewRecord ] = useState<WorkoutRecord[]>([]);


    useEffect(() => {
        fetch(`http://localhost:4000/exercise/${title}`)
        .then((response) => response.json())
        .then((data) => {
            const copiedData = JSON.parse(JSON.stringify(data[0]));
            setExercise(copiedData);
            const copiedList = JSON.parse(JSON.stringify(copiedData.last));
            setNewRecord(copiedList);
        })
    }, [title]);


    const handleChange = (event: ChangeEvent<HTMLInputElement>, index: number): void => {
        const record = [...newRecord]
        if (event.target.name in record[index]) {
            record[index][event.target.name] = parseInt(event.target.value);
            setNewRecord(record);
        } else {
            throw new Error(`Custom Error: Invalid workout property ${event.target.name}`);
        }
    }

    
    const handleSubmit = async () => {
        const exerciseCopy = JSON.parse(JSON.stringify(exercise))
        const newRecordCopy = JSON.parse(JSON.stringify(newRecord))
        setExercise({
            ...exerciseCopy,
            last: [...newRecordCopy]
        })
        

        try {
            const response = await fetch('http://localhost:4000/exercise', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                ...exerciseCopy,
                last: [...newRecordCopy]
            }),
            });

            alert('The exercise has been updated successfully')
      
            if (response.ok) {
              const responseData = await response.json();
              console.log(responseData);
            } else {
              console.error('Request failed with status:', response.status);
            }
          } catch (error) {
            console.error('Error:', error);
          }
    }
    

    return (
        <section>
            <div className="bg-white text-slate-800 m-4 border rounded-xl flex flex-col overflow-hidden">
                <div className="p-4 flex flex-col items-center justify-center">
                    <h2 className="text-xl pb-2 font-bold">{exercise.title}</h2>
                    <h3>Last Time</h3>
                    {exercise.last.map((workoutRecord, index) => {
                        if (workoutRecord.reps !== 0) return ( <p key={index}>{+ (index+1) + '. ' + workoutRecord.reps + ' reps of ' + workoutRecord.weight + 'kgs' }</p> )
                        return ( <p key={index}>{'Set ' + index + ': ' + workoutRecord.time + 'seconds with ' + workoutRecord.weight + 'kgs'}</p> )
                    })}

                    <section className="m-4 flex flex-col justify-center items-center">
                    <h2 className="text-md pb-1 font-bold">Add latest workout info</h2>
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
                    <div className="flex justify-center items-center pt-4">
                        <button onClick={handleSubmit}>Save changes</button>
                    </div>
                    </section>
                </div>
            </div>
            <div className="flex justify-center items-center">
                <button onClick={() => navigate(-1)}>Go back</button>
            </div>
        </section>
    )
}