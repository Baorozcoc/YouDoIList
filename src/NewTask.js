import './Tasks.css';
import { useState } from 'react';

const NewTask=({list,setList,setNewTask})=>{
    const [prior, setprior]= useState(4);
    function setPriority(n){
        if(n!==prior){
            setprior(n);
        let dic=['#muyalta','#alta','#media','#baja'];
        document.querySelector('#baja').classList.remove('selected');
        document.querySelector('#media').classList.remove('selected');
        document.querySelector('#alta').classList.remove('selected');
        document.querySelector('#muyalta').classList.remove('selected');
        document.querySelector(dic[n-1]).classList.add('selected');
        }
    }
    setTimeout(() => {
        let now = new Date();
        now.setMinutes(now.getMinutes() - now.getTimezoneOffset() + 30);     
        document.querySelector('#date').value = now.toISOString().slice(0, -8);
    }, 100);
    function evaluate(){
        let error=document.querySelector('#Error');
        let descrValid=false;
        let dateValid=false;

        let descr= document.querySelector('#task').value;
        if(descr===""){
            error.innerHTML='Porfavor escribe una tarea';
        }else if(descr.length>500){
            error.innerHTML='La descripción puede tener hasta 500 caracteres';
        }else if(descr.length<5){
            error.innerHTML='La descripción debe tener al menos 5 caracteres';
        }else{
            descrValid=true;
        }

        let now= new Date();
        let date= document.querySelector('#date').value;
        let Yearnow=+now.getFullYear().toString(); 
        let Yeardate=+date.split("-")[0].toString();
        let Monthnow=+now.getMonth().toString(); //0 to 11
        let Monthdate=+date.split("-")[1].toString(); //1 to 12
        let Daynow=+now.getDate().toString();
        let Daydate=+date.split("-")[2].split("T")[0];
        let Hournow=+now.getHours().toString();
        let Hourdate=+date.split('-')[2].split('T')[1].split(':')[0].toString();
        let Minutenow=+now.getMinutes().toString();
        let Minutedate=+date.split('-')[2].split('T')[1].split(':')[1].toString();
        if(date===""){
            error.innerHTML='Porfavor elige una fecha';
        }else if(Yeardate<Yearnow){
            error.innerHTML='La tarea es de un año anterior al actual';
        }else if(Yeardate===Yearnow&&Monthdate<Monthnow+1){
            error.innerHTML='La tarea es de un mes anterior al actual';
        }else if(Yeardate===Yearnow&&Monthdate===Monthnow+1&&Daydate<Daynow){
            error.innerHTML='La tarea es de un dia anterior al actual';
        }else if(Yeardate===Yearnow&&Monthdate===Monthnow+1&&Daydate===Daynow&&Hourdate<Hournow){
            error.innerHTML='La tarea es de una hora anterior a la actual';
        }else if(Yeardate===Yearnow&&Monthdate===Monthnow+1&&Daydate===Daynow&&Hourdate===Hournow&&Minutedate<Minutenow){
            error.innerHTML='La tarea es anterior a la hora actual';
        }else{
            dateValid=true;
        }

        if(descrValid&&dateValid){
            addTask();
        }
    }
    function addTask(){
        let descr= document.querySelector('#task').value;
        let date= document.querySelector('#date').value;
        let Yeardate=+date.split("-")[0].toString();
        let Monthdate=+date.split("-")[1].toString();
        let Daydate=+date.split("-")[2].split("T")[0];
        let Hourdate=+date.split('-')[2].split('T')[1].split(':')[0].toString();
        let Minutedate=+date.split('-')[2].split('T')[1].split(':')[1].toString();

        var arr=list.slice();
        arr.push({task:descr,year:Yeardate,month:Monthdate,day:Daydate,hour:Hourdate,minute:Minutedate,priority:prior});
        setList(arr);
        setNewTask(0);
    }
    return(
        <div className="NewTask">
            <div className='Exit' onClick={()=> setNewTask(0)}></div>
            <div className='container Popup'>
                <header className='white title header3'>Nueva Tarea</header>
                <label className='lightgreen principalText'>
                    Descripción de la tarea
                    <input 
                        type="text" 
                        placeholder='Escribe aquí' 
                        spellCheck='false'
                        id='task'>
                    </input>
                    
                </label>
                <label className='lightgreen principalText'>
                    Fecha y Hora <br/>
                    <input type="datetime-local" id='date'></input>
                </label>
                <label className='lightgreen principalText'>
                    Prioridad
                    <div>
                        <button id='baja' onClick={()=> setPriority(4)} className='low button principalText white selected'>Baja</button>
                        <button id='media' onClick={()=> setPriority(3)} className='medium button principalText white'>Media</button>
                        <button id='alta' onClick={()=> setPriority(2)} className='high button principalText white'>Alta</button>
                        <button id='muyalta' onClick={()=> setPriority(1)} className='veryhigh button principalText white'>Muy Alta</button>
                    </div>
                </label>
                
                <p id='Error'></p>
                <div>
                    <button className='secondarybutton button principalText' onClick={()=> setNewTask(0)}>Cancelar</button>
                    <button className='primarybutton button principalText' onClick={()=> evaluate()}>Aceptar</button>
                </div>
            </div>
        </div>
    );
}
export default NewTask;