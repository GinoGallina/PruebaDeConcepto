export const fetchTasks = async ()=>{
    try {
        const response = await fetch("http://localhost:4321/api/tasks");

        console.log('ww')
        console.log(response.json())
        return await response.json();
    } catch (error) {
        return [];
    }
}
