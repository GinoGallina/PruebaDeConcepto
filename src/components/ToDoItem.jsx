import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import 'bootstrap/dist/css/bootstrap.min.css';



const ToDoItem = ({ id, text, completed }) => {


    const classNames = `text-white col-4 ${completed ? 'text-decoration-line-through text-danger' : ''}`;
    return (
        <li className={classNames} key={id}>
            {text}
        </li>
    );
};

export default ToDoItem;
