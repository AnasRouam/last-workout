const exerciseModel = require('./exercise');

const findExercisesByCategory = async (category) => {
    const exercises = await exerciseModel.find({ category: category });
    return exercises
}

const findExerciseByTitle = async (title) => {
    const exercise = await exerciseModel.find({ title: title });
    return exercise
}

const editExercise = async (newExercise) => {
    const query = await exerciseModel.findByIdAndUpdate(newExercise._id, { last: newExercise.last})
}

const addExercise = async (newExercise) => {
    const exercise = await exerciseModel.create(newExercise)
}

const deleteExercise = async (id) => {
    const deleted = await exerciseModel.deleteMany({id : id})
    console.log('Deleted: ' + deleted.deletedCount + ' exercice(s)')
}

module.exports = { deleteExercise, findExercisesByCategory, findExerciseByTitle, editExercise, addExercise }