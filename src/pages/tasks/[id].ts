import type { APIRoute } from 'astro';
import { tasks, setTasks } from './tasks.ts'



export const DELETE: APIRoute = ({ params, request }) => {
    // Elimina la tarea con el ID especificado.
    const id = parseInt(params.id);
    const task = tasks.find((task) => task.id === id);
    tasks.splice(tasks.indexOf(task), 1);
    setTasks(tasks);


    return new Response(
        JSON.stringify({
            data: tasks
        })
    )
}

export const PUT: APIRoute = ({ params, request }) => {
    // Actualiza la tarea con el ID especificado.
    const id = parseInt(params.id);
    const editedTask = tasks.find((task) => task.id === id);
    editedTask.completed = !editedTask.completed;
    console.log(editedTask);

    const updatedTasks = tasks.map(task => {
        if (task.id === id) {
            return editedTask;
        }
        return task;
    });
    setTasks(updatedTasks);

    return new Response(
        JSON.stringify({
            data: tasks
        })
    )
}