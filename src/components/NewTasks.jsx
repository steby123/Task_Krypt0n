import React,{useState} from "react";

const NewTask = ({onAdd}) => {
    const [entertedTask, setEnteredTask] = useState('');

    const handleChange = (event) => {
        setEnteredTask(event.target.value);
    }

    const handleClick = () => {
        if (entertedTask.trim() === ""){
            return;
        }
            onAdd(entertedTask);
            setEnteredTask('');  
    }

    return (
        <div className="flex items-center gap-4">
            <input type="text" className="w-64 px-2 py-1 rounded-sm bg-stone-200" onChange={handleChange} value={entertedTask}/>
            <button className="text-stone-700 hover:text-stone-950" onClick={handleClick} > Add Task</button>
        </div>
    )
}

export default NewTask;