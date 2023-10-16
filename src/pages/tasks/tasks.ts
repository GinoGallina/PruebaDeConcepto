import type { APIRoute } from 'astro';

export let tasks = [];

export const GET: APIRoute = ({ params, request }) => {
    return new Response(
        JSON.stringify({
            data: tasks
        })
    )
}

    
export const POST: APIRoute = async ({ request }) => {
    if (request.headers.get("Content-Type") === "application/json") {
        const task = await request.json();
        console.log(task)
        tasks.push(task);
    return new Response(JSON.stringify({
        tasks
    }), {
        status: 200
    })
}
return new Response(null, { status: 400 });
}


export const setTasks=(tasksUpdated)=>{
    tasks = tasksUpdated;
}

export const deleteTasks=(tasksUpdated)=>{
    tasks = tasksUpdated;
}



