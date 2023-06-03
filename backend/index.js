const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const { dbUrl } = require('./utils/constants')
const StudentModel = require('./models/student')

const app = express()

app.use(cors())
app.use(express.json())

// endpoints start

app.get('/api/students', async (req, res) => {
    res.json({ students: await StudentModel.find() })
})

app.get('/api/payment/:reference', async (req, res) => {
    const reference = req.params.reference
    res.json(await StudentModel.findOne({ reference: reference }))
})

app.post('/api/students', async (req, res) => {
    const student = new StudentModel(req.body)
    res.status(201).json({ student: await student.save() })
})

app.patch('/api/students/:reference', async (req, res) => {

    try {
      const reference = req.params.reference;
      const status = req.body.status;
      const updatedStudent = await StudentModel.findOneAndUpdate(
        { reference: reference },
        { status: status },
        { new: true }
      );
  
      res.json({ student: updatedStudent });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while updating the student.' });
    }
  });
  
// endpoints end

const port = 8081
mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => { console.log('connected') })
    .catch((error) => { console.log('error >> ', error) })
app.listen(port, () => { console.log('Server running') })