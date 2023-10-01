const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
require('dotenv').config();
const mongoURI = process.env.MONGO_URI;
const PORT = 4000;
const exerciceModel = require('./models/exercise');
const { findExercisesByCategory ,deleteExercise, findExerciseByTitle, editExercise, addExercise } = require('./models/functions');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

// To delete afterwards
const add = async () => {
    createExercise(2, "Push", "Bench Press", [4,4,4,4], [0,0,0,0], [40,40,40,40])
}



  
app.get('/', (req, res) => {
    res.status(200).send({ message: 'Hello, world!' });
})

app.get('/catalog/:type', async (req, res) => {
    const type = req.params.type;
    const exercises = await findExercisesByCategory(type);
    res.status(200).send(exercises);
})

app.get('/exercise/:title', async (req, res) => {
    const title = req.params.title;
    const exercise = await findExerciseByTitle(title);
    res.status(200).send(exercise);
})

app.post('/exercise', async (req, res) => {
    editExercise(req.body)
    res.status(200).send({message: 'exercise updated successfully'});
})

app.post('/addExercise', async (req, res) => {
    addExercise(req.body)
    res.status(200).send({message: 'exercise added successfully'});
})

app.listen(PORT, () => {
    console.log('listening on port ' + PORT);
});


module.exports = app;
