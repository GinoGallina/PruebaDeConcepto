import React, { useState, useEffect } from "react";
import ToDoItem from "./ToDoItem";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const ToDoList = () => {


    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    
    const findLastId = () =>{
        console.log(tasks.length)
        return tasks.length;
    }

    useEffect(() => {
        // Realiza una solicitud al servidor para obtener las tareas
        axios.get('http://localhost:3000/tasks')
            .then((response) => {
                // Procesa la respuesta aquí
                console.log(response.data);
                setTasks(response.data);
            })
            .catch((error) => {
                // Maneja errores aquí
                console.error(error);
            });
    }, []);


    const handleAddTask = () => {

        // Realiza una solicitud al servidor para obtener las tareas
        axios.post('http://localhost:3000/tasks', { id: findLastId(), text: newTask, completed: false })
            .then((response) => {
                // Procesa la respuesta aquí
                console.log(response.data);
                setTasks([...tasks, response.data]);
                setNewTask('');
            })
            .catch((error) => {
                // Maneja errores aquí
                console.error(error);
            });

    };

    const handleNewTask = (text)=>{
        setNewTask(text);
    }
    const handleDeleteTask = (id)=>{
        axios.delete(`http://localhost:3000/tasks/${id}`)
            .then(response => {
                console.log(response.data)
                const updatedTasks = tasks.filter(task => task.id !== id);
                setTasks(updatedTasks);
            })
            .catch(error => console.error(error));
    }

    const handleCompleteTask = (id) => {
        // Realiza una solicitud al servidor para completar una tarea
        axios.put(`http://localhost:3000/tasks/${id}`)
            .then(response => {
                const updatedTasks = tasks.map(task => {
                    if (task.id === id) {
                        return response.data;
                    }
                    return task;
                });
                setTasks(updatedTasks);
            })
            .catch(error => console.error(error));
    }

    return (
        <div>
            <h1 className="text-white mb-4">To Do List</h1>
            <ul className="list-group">
                {tasks.map((task) => (
                    //Cambiar el id del task-id
                    <div className="row mb-3" key={`task-${task.id}`}>
                        <ToDoItem key={task.id} id={task.id} text={task.text} completed={task.completed} />
                        <button className="btn btn-warning col-2 me-2" key={`complete-button-${task.id}`} id={task.id} onClick={() => handleCompleteTask(task.id)}>{(task.completed) ? 'Descompletar' : 'Completar'}</button>
                        <button className="btn btn-danger col-1" key={`delete-button-${task.id}`} id={task.id} onClick={() => handleDeleteTask(task.id)}>Borrar</button>
                    </div>
                ))}
            </ul>

            <div className="row justify-content-center mt-3">
                <input
                    className="col-4"
                    type="text"
                    placeholder="Agregar tarea"
                    value={newTask}
                    onChange={(e) => handleNewTask(e.target.value)}
                />
                <button className="col-2 btn btn-success  ms-2" onClick={handleAddTask}>Agregar Tarea</button>
            </div>
        </div>
    );
};

export default ToDoList;
