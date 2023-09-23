
export type WorkoutRecord = {
    [key: string]: number;
    reps: number,
    time: number,
    weight: number
}

export type Exercise = {
    category: string,
    title: string,
    last: WorkoutRecord[]
}
