import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import { tasks } from '../pages/tasks/tasks.ts';


const AddButton = ({ lastId }) => {


    const [newTask, setNewTask] = useState('');




    const handleDAdd = async () => {
        try {
            let id=lastId;
            const response = await fetch(`http://localhost:4321/tasks/tasks`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "id": id,
                    "text": newTask,
                    "completed": false
                }),
            });

            if (response.status === 200) {
                //HAGCER ALGO
                alert('Tarea agregarda')
                window.location.reload();

            } else {
                alert('Error al agregar la tarea');
            }
        } catch (error) {
            console.error('Error al agregar la tarea:', error);
        }




    }

    const handleNewTask = (text)=>{
        setNewTask(text);
    }



    return (
        <div className="row justify-content-center mt-3">
            <input
                id='newTask'
                className="col-4"
                type="text"
                placeholder="Agregar tarea"
                value={newTask}
                onChange={(e) => handleNewTask(e.target.value)}
            />
            <button onClick={handleDAdd} id='btnAdd' className="col-2 btn btn-success  ms-2" >Agregar Tarea</button>
        </div>    );
};

export default AddButton;





/*
  const getLastId = ()=>{
    if(buttonsC.length==0){
      return 0;
    }else{
      const lastButton = buttonsC[buttonsC.length - 1];
      console.log(Number(lastButton.id.slice(16)))
      return Number(lastButton.id.slice(16))+Number(1); 
    }
  }

  const btnAdd=document.getElementById("btnAdd");
  btnAdd.addEventListener("click",async ()=>{
    const newTask=document.getElementById('newTask').value;
    if(newTask!=''){
      let id = getLastId();
      console.log(id);

      const tasksResponse = await fetch(`http://localhost:4321/tasks/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "id":id,
        "text":newTask,
        "completed":false
        })
      });
      const response = await tasksResponse.json();
      console.log(response)
    }
  })


*/