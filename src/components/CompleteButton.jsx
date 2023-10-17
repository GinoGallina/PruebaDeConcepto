import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';


const CompleteButton = ({ id,completed }) => {


    const [completado, setCompletado] = useState({completed}.completed);

    const handleComplete = async () => {
        try {
            const response = await fetch(`/api/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.status === 200) {
            
            const taskElement = document.getElementById(id);

            if (taskElement) {
                taskElement.classList.toggle("text-decoration-line-through");
                //setCompletado(taskElement.classList.contains("text-decoration-line-through"));
                setCompletado(!completado);
            }

            } else {
                alert('Error al completar la tarea');
            }
        } catch (error) {
            console.error('Error al completar la tarea:', error);
        }

    }
    const CompletarName =  () => {
        if ({ completed }.completed) {
            return "Descompletar"
        } else {
            return "Completar"
        }
    }





    return (
        <button className="btn btn-warning col-2 me-2" key={`complete-button-${id}`} id={`Complete-button-${id}`} onClick={handleComplete}>{completado ? "Descompletar" : "Completar"}</button>
    );
};

export default CompleteButton;





