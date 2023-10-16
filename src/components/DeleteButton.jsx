import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';


const DeleteButton = ({ id }) => {


    const [isVisible, setIsVisible] = useState(true);

    const handleDelete= async ()=>{
        try {
            const response = await fetch(`http://localhost:4321/tasks/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.status === 200) {
                setIsVisible(false);
                // La petición fue exitosa.
            } else {
                alert('Error al eliminar la tarea');
            }
        } catch (error) {
            console.error('Error al eliminar la tarea:', error);
        }
        
    }

    useEffect(() => {
        if (!isVisible) {
            const task = document.getElementById(id);
            const parentDiv = task.closest("div");

            console.log(parentDiv)
            if (parentDiv) {
                parentDiv.classList.add("d-none");
            }
        }
    }, [isVisible, id]);


    return (
        <button className="btn btn-danger col-1" onClick={handleDelete} key={`delete-button-${id}`} id={`Delete-button-${id}`} >Borrar</button>
    );
};

export default DeleteButton;


