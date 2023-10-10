import React, { useState, useEffect } from "react";
import ToDoItem from "./ToDoItem";

const ToDoList = () => {


    /* const [tasks, setTask] = useState([
         { id: 1, text: "Comprar leche", completed: false },
         { id: 2, text: "Lavar los platos", completed: true },
         { id: 3, text: "Sacar la basura", completed: false },
         { id: 4, text: "Ir al gimnasio", completed: false },
     ]);*/
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    


    useEffect(() => {
        // Recuperar las tareas almacenadas en el almacenamiento local al cargar la página
        const storedTasks = localStorage.getItem('tasks');
        if (storedTasks) {
            setTasks(JSON.parse(storedTasks));
        }
    }, []); // Se ejecuta solo en la primera renderización

    useEffect(() => {
        // Almacenar las tareas en el almacenamiento local cada vez que cambien
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]); // Se ejecuta cuando tasks cambia


    const findLastId = () =>{
        console.log(tasks.length)
        return tasks.length;
    }

    const handleAddTask = () => {
        //VER Q EL ID SEA EL SIGUENTE
        if (newTask.trim() !== '') {
            setTasks([...tasks, { id: findLastId(), text:newTask, completed: false }]);
            setNewTask('');
        }
        console.log(findLastId())
        console.log(tasks)
    };

    const handleNewTask = (text)=>{
        setNewTask(text);
    }
    const handleDeleteTask = (id)=>{
        const updatedTasks = tasks.filter((_, i) => i !== id);
        setTasks(updatedTasks);
    }

    const handleCompleteTask = (id) => {
        setTasks(tasks.map((task) => {
            if (task.id === id) {
                task.completed = !task.completed;
            }
            return task;
        }));
    };

    return (
        <div>
            <h1>To Do List</h1>
            <ul>
                {tasks.map((task) => (
                    //Cambiar el id del task-id
                    <div key={`task-${task.id}`}>
                        <ToDoItem key={task.id} id={task.id} text={task.text} completed={task.completed} />
                        <button key={`delete-button-${task.id}`} id={task.id} onClick={() => handleDeleteTask(task.id)}>Borrar</button>
                        <button key={`complete-button-${task.id}`} id={task.id} onClick={() => handleCompleteTask(task.id)}>Completar</button>
                    </div>
                ))}
            </ul>
            <input
                type="text"
                placeholder="Agregar tarea"
                value={newTask}
                onChange={(e) => handleNewTask(e.target.value)}
            />
            <button onClick={handleAddTask}>Agregar Tarea</button>
        </div>
    );
};

export default ToDoList;
