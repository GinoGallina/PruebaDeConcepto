import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ToDoItem = ({ id, text, completed }) => {
    return (
        <li key={id}>
            {text}
            {completed ? <a href="">finished</a> : null}
        </li>
    );
};

export default ToDoItem;
