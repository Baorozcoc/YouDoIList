import './Tasks.css';
import { useState, useEffect } from 'react';

const EditTask=({list,setList,setEditTask,lastprior,lastdescr,lastdate,realTask})=>{
    useEffect(() => {
        setTimeout(() => {
            if(lastdescr){
                document.querySelector('#task2').value= lastdescr;
            }
            if(lastdate){
                document.querySelector('#date2').value = lastdate;
            }
        }, 100);
    }, [lastdate, lastdescr]);  
    
    const [prior, setprior]= useState(lastprior);    
    function setPriority(priority){
        setprior(priority);
    }
    function evaluate(){
        let error=document.querySelector('#Error2');
        let descrValid=false;
        let dateValid=false;

        let descr= document.querySelector('#task2').value;
        if(descr===""){
            error.innerHTML='Porfavor escribe una tarea';
        }else if(descr.length>100){
            error.innerHTML='La descripción puede tener hasta 100 caracteres';
        }else if(descr.length<5){
            error.innerHTML='La descripción debe tener al menos 5 caracteres';
        }else{
            descrValid=true;
        }

        let now= new Date();
        let date= document.querySelector('#date2').value;
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
            EditTask();
        }
    }
    function EditTask(){
        //Edit
        let descr2= document.querySelector('#task2').value;
        let date= document.querySelector('#date2').value;
        let year2=+date.split("-")[0].toString();
        let month2=+date.split("-")[1].toString();
        let day2=+date.split("-")[2].split("T")[0];
        let hour2=+date.split('-')[2].split('T')[1].split(':')[0].toString();
        let minute2=+date.split('-')[2].split('T')[1].split(':')[1].toString();
        let index= list.indexOf(realTask);
        var arr=list.slice();
        arr.splice(index,1);
        arr.push({task:descr2,year:year2,month:month2,day:day2,hour:hour2,minute:minute2,priority:prior});
        setList(arr);
        setEditTask(0);
    }
    function seekanddestroy() {
        let index= list.indexOf(realTask);
        var arr=list.slice();
        arr.splice(index,1);
        setList(arr);
    }
    return(
        <div className="NewTask">
            <div className='Exit' onClick={()=> setEditTask(0)}></div>
            <div className='container Popup'>
                <header className='white title header3'>Modificar Tarea</header>
                <label className='lightgreen principalText'>
                    Descripción de la tarea
                    <input 
                        type="text" 
                        placeholder={lastdescr}
                        spellCheck='false'
                        id='task2'>
                    </input>
                    
                </label>
                <label className='lightgreen principalText'>
                    Fecha y Hora <br/>
                    <input type="datetime-local" id='date2'></input>
                </label>
                <label className='lightgreen principalText'>
                    Prioridad
                    <div>
                        {prior===4?<button id='baja' onClick={()=> setPriority(4)} className='low button principalText white selected'>Baja</button>:<button id='baja' onClick={()=> setPriority(4)} className='low button principalText white'>Baja</button>}
                        {prior===3?<button id='media' onClick={()=> setPriority(3)} className='medium button principalText white selected'>Media</button>:<button id='media' onClick={()=> setPriority(3)} className='medium button principalText white'>Media</button>}
                        {prior===2?<button id='alta' onClick={()=> setPriority(2)} className='high button principalText white selected'>Alta</button>:<button id='alta' onClick={()=> setPriority(2)} className='high button principalText white'>Alta</button>}
                        {prior===1?<button id='muyalta' onClick={()=> setPriority(1)} className='veryhigh button principalText white selected'>Muy Alta</button>:<button id='muyalta' onClick={()=> setPriority(1)} className='veryhigh button principalText white'>Muy Alta</button>}
                    </div>
                </label>
                
                <p id='Error2'></p>
                <button className='primarybutton button principalText' onClick={()=> evaluate()}>Guardar Cambios</button>
                <div>
                    <button className='secondarybutton button principalText' onClick={()=>seekanddestroy() }>Eliminar</button>
                    <button className='secondarybutton button principalText' onClick={()=> setEditTask(0)}>Cancelar</button>
                </div>
            </div>
        </div>
    );
}
export default EditTask;