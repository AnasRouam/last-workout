import { WorkoutRecord } from "../DataTypes"


export default function ExerciseCard(props: { title: string, last: WorkoutRecord[] }) {
    return (
        <div className="bg-white text-slate-800 w-80 m-4 border rounded-xl flex flex-col overflow-hidden hover:scale-105 transition-all">
            <div className="p-4 flex flex-col items-center justify-center">
                <h2 className="text-xl pb-2 font-bold">{props.title}</h2>
                <h3>Last Time</h3>
                {props.last.map((workoutRecord, index) => {
                    if (workoutRecord.time === 0) return ( <p key={index}>{+ (index+1) + '. ' + workoutRecord.reps + ' reps of ' + workoutRecord.weight + 'kgs' }</p> )
                    return ( <p key={index}>{'Set ' + index + ': ' + workoutRecord.time + 'seconds with ' + workoutRecord.weight + 'kgs'}</p> )
                })}
            </div>
        </div>
    )
}