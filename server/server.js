// server/server.js
import express from "express";
import cors from "cors";
const app = express();
const port = 3000;


app.use(express.json());
app.use(cors('http://localhost:4321'));

const tasks = [];

// Métodos para operaciones CRUD en tareas
app.get("/tasks", (req, res) => {
    res.json(tasks);
});

app.post("/tasks", (req, res) => {
    const newTask = req.body;
    tasks.push(newTask);
    res.json(newTask);
});

app.put("/tasks/:id", (req, res) => {
    const taskId = parseInt(req.params.id);
    const task = tasks.find(task => task.id === taskId);
    if (task) {
        task.completed = !task.completed;
        res.json(task);
    } else {
        res.status(404).json({ message: "Tarea no encontrada" });
    }
});


app.delete("/tasks/:id", (req, res) => {
    const taskId = parseInt(req.params.id);
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    if (taskIndex !== -1) {
        const deletedTask = tasks.splice(taskIndex, 1);
        res.json(deletedTask[0]);
    } else {
        res.status(404).json({ message: "Tarea no encontrada" });
    }
});

// Otros métodos para editar y eliminar tareas

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
