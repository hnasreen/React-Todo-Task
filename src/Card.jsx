import './Card.css';
import { useState } from 'react';

const Card = ({onDelete, onUpdateStatus,todo, onEdit}) => {
    
    const { id, name, description, status } = todo;

    const handleDelete = () => {
        onDelete(id);
    };

    const [currentStatus, setCurrentStatus] = useState(status);

    const handleStatusChange = (event) => {
        const newStatus = event.target.value;
        setCurrentStatus(newStatus);
        onUpdateStatus(id, newStatus);
    };

    const handleEditClick = () => {
        onEdit(id, name, description);
      };

    return (
        <div className="card">
            <div className="card-body">
                <label htmlFor="labname">Name: {name}</label>
                <br />
                <label htmlFor="labdesc">Description: {description}</label>
                <br />
                <label htmlFor="labstatus">Status</label>
                <select className="filterStatusdropdown" id="filterStatusDropdown" value={currentStatus} onChange={handleStatusChange} >

                    <option value="completed">Completed</option>
                    <option value="notCompleted">Not Completed</option>
                </select>
                <div className="card-buttons">
                    <button className="edit-btn" type="button" onClick={handleEditClick}>Edit</button>

                    <button className="delete-btn" onClick={handleDelete}>Delete</button>
                </div>
            </div>
        </div>
    )
}

export default Card