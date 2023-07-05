const express = require('express');
const app = express();
const port = 3500;

app.use(express.json());

let students =[
    {id : 1, namee : 'Sagar', age: 21},
    {id : 2, namee : 'Himanshu', age: 22}
];

app.get('/students', (req, res)=>{
    res.json(students);
});

app.get('/students/:id',(req, res)=>{
    const { id }  = req.params;
    const student = students.find((s)=> s.id == Number(id));

    if(student){
        res.json(student);
    }
    else{
        res.json("Details not found");
    }
});

app.post('/students', (req, res) => {
    const { id, namee, age } = req.body;
    const newStudent = { id, namee, age };
    students.push(newStudent);
    res.json(newStudent);
  });

  app.put('/students/:id', (req, res) => {
    const { id } = req.params;
    const { namee, age } = req.body;
    const studentIndex = students.findIndex((s) => s.id == Number(id));
    if (studentIndex >= 0) {
      students[studentIndex].namee = namee;
      students[studentIndex].age = age;
      res.json(students[studentIndex]);
    } else {
      res.json('Details not found');
    }
  });

  app.patch('/students/:id', (req, res) => {
    const { id } = req.params;
    const { namee } = req.body;
    const studentIndex = students.findIndex((s) => s.id == Number(id));
    if (studentIndex >= 0) {
      students[studentIndex].namee = namee;
      res.json(students[studentIndex]);
    } else {
      res.json('Details not found' );
    }
  });

  app.delete('/students/:id', (req, res) => {
    const { id } = req.params;
    const studentIndex = students.findIndex((s) => s.id == Number(id));
    if (studentIndex >= 0) {
      const deletedStudent = students.splice(studentIndex, 1);
      res.json(deletedStudent);
    } else {
      res.json('Details not found' );
    }
  });

app.listen(port, ()=>{
    console.log(`Server listening on port ${port}`);
});
