import './Principal.css';
import Priority from './Priority';
import Urgency from './Urgency';
import NewTask from './NewTask';
import EditTask from './EditTask';
import { useState } from 'react';

function Principal(){
    const [mode, setMode]=useState(0);
    const [list, setList]=useState([]);
    const [newTask, setNewTask]=useState(0);
    const [editTask, setEditTask]=useState(0);
    const [task, setTask]=useState();
    return(
        <div className='Principal'>
            <header className='white title header2'>
                You Do I List
                <button onClick={()=> setNewTask(1)}
                    className='primarybutton button principalText'
                > Nueva Tarea</button>
            </header>
            <section className='container section2'>
                <h2 className='green header2'>{list.length?mode===0?"Tareas ordenadas por Importancia":"Tareas ordenadas por Fecha":""}</h2>
                {mode===0?<Priority list={list} setList={setList} setEditTask={setEditTask} setTask={setTask}/>:<Urgency list={list} setList={setList} setEditTask={setEditTask} setTask={setTask}/>}
            </section>
            {mode===0
            ?<button className='button secondarybutton principalText floating' onClick={()=> setMode(1)}>
                Ordenar por fecha
            </button>
            :<button className='button secondarybutton principalText floating' onClick={()=> setMode(0)}>
                Ordenar por importancia
             </button>}
            {newTask===1&&<NewTask list={list} setList={setList} setNewTask={setNewTask}/>}
            {editTask===1&&<EditTask list={list} setList={setList} setEditTask={setEditTask} lastprior={task.priority} lastdescr={task.task} lastdate={task.date}/>}
        </div>
    );
}
export default Principal;