import {useState} from "react";
import './index.css';

function TodoList(){
    const [task,setTask] = useState([]);    //setting task
    const [newTask,setNewTask] = useState(""); //adding new task
    const [editedTask,setEditedTask] = useState(""); //for editing new task
    const [isEditing, setIsEditing] = useState(false); //to set state of editing
    const [editingIndex, setEditingIndex] = useState (null); //for getting index of edited value
    
    // entering input
    function inputChange(event){
        setNewTask(event.target.value);
    }

    // adding task
    function addTask() {
       if(newTask.trim() !== ""){
        setTask(t => [newTask, ...t]);
        setNewTask("")
        }
    }
    //entering input in editing task
    function handleEditedTaskChange(event) {
        setEditedTask(event.target.value);
    }
    //delete task function
    function deleteTask(index){
        setTask(t => t.filter((_,i) => i !== index));
    }

    function editTask(index) {
        setIsEditing(true);
        setEditingIndex(index);
        setEditedTask(task[index]);
    }
    function saveEditTask() {
        const updatedTasks = [...task];
        updatedTasks[editingIndex] = editedTask;
        setTask(updatedTasks);
        setIsEditing(false);
        setEditingIndex(null);
    }
    function moveTaskUp(index){
        if(index > 0){
            const updatedTasks = [...task];
            [updatedTasks[index], updatedTasks [index - 1]] = [updatedTasks [index - 1], updatedTasks[index]];
            setTask(updatedTasks);
        }
    }
    function moveTaskDown(index){
        if(index < task.length - 1){
            const updatedTasks = [...task];
            [updatedTasks[index], updatedTasks [index + 1]] = [updatedTasks [index + 1], updatedTasks[index]];
            setTask(updatedTasks);
        }
    }
    return(
        <div className="to-do-list">
            <h1 className="fjalla-one-regular">To-Do-List</h1>
            <br />
            <div>
                <input 
                type="text"  
                id="input-value" 
                placeholder="Enter a Task..."
                value={newTask}
                onChange={inputChange}
                onKeyDown={(event) =>{
                    if (event.key === 'Enter'){
                        addTask();
                    }
                  }
                }/>
                <button onClick={addTask} className="add-task-button">Add</button>
                <div className="">
                <ol>
                    {task.map((task, index) => 
                    <li key={index}>
                        {editingIndex === index ? (
                              <input type="text" 
                              id="input-value"
                              placeholder="Edit task here"
                              value={editedTask}
                              onChange={handleEditedTaskChange}
                              onKeyDown={(event) => {
                                if (event.key === 'Enter'){
                                    saveEditTask();
                                }
                              }
                            }/>
                        ):(
                        <span className="todo-task">{task}</span>
                        )}

                        <button onClick={() => deleteTask(index)} className="delete-task-button"> Delete </button>
                        {editingIndex !== index &&(
                            <button onClick={() => editTask(index)} className="edit-task-button"> Edit </button>
                        )}
                        {editingIndex === index && (
                            <button onClick={saveEditTask} className="edit-task-button"> Save </button>
                        )}
                        <button onClick={() =>  moveTaskUp(index)} className="move-button"> UP </button>
                        <button onClick={() =>  moveTaskDown(index)} className="move-button"> DOWN </button>
                        
                    </li> )}
                </ol>
                </div>
            </div>
        </div>
    );

}

export default TodoList