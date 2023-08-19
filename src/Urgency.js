import './Views.css';

const Urgency=({list, setList, setEditTask, setTask})=>{
    const Yearnow=new Date().getFullYear();
    list.sort(function(a,b){
        let y=a.year===b.year;
        let m=a.month===b.month;
        let d=a.day===b.day;
        let h=a.hour===b.hour;
        if(y&&m&&d&&h){
            return (a.minute<b.minute) ? -1 : (a.minute>b.minute) ? 1 : 0;
        }else if(y&&m&&d){
            return (a.hour<b.hour) ? -1 : 1;
        } else if (y&&m){
            return (a.day<b.day) ? -1 : 1;
        } else if(y){
            return (a.month<b.month) ? -1 : 1;
        } else{
            return (a.year<b.year) ? -1 : 1;
        }
    })
    const Months=['','ENE','FEB','MAR','ABR','MAY','JUN','JUL','AGO','SEP','OCT','NOV','DIC'];
    const years=[...new Set(list.map(task=>task.year))];
    function seekanddestroy(task){
        let index= list.indexOf(task);
        var arr=list.slice();
        arr.splice(index,1);
        setList(arr);
    }
    function numberFormat(n){
        if(n<10){
            return "0"+n;
        }else{
            return n;
        }
    }
    function Editing(task,index){
        let d= task.year + '-' + numberFormat(task.month) + '-' + numberFormat(task.day) + 'T' + numberFormat(task.hour) + ':' + numberFormat(task.minute);
        setTask({task:task.task, priority:task.priority, date: d, index: index})
        setEditTask(1);
    }
    return(
        <div className='Urgency'>
            {years.map((Year,index)=>(
                <div key={index}>
                    {Year!==Yearnow&&<h6 className='titleprior principalText white primarybg'>{Year}</h6>}
                    {[...new Set(list.filter(task=>task.year===Year).map(taskY=>taskY.month))].map((Month,index)=>(
                        <div key={index}>
                            {[...new Set(list.filter(task=>task.year===Year&&task.month===Month).map(taskY=>taskY.day))].map((Day,index)=>(
                                <section key={index} className='DateDiv'>
                                    <div className='Date'>
                                        <h5 className='green principalText'>{Months[Month]}</h5>
                                        <h5 className='green title'>{Day}</h5>
                                    </div>
                                    <div className='Grid'>
                                        {list.filter(task=>task.year===Year&&task.month===Month&&task.day===Day).map((filtTask,indexTask)=>(
                                        <article key={indexTask} className='Card2'>
                                            {filtTask.priority===1&&<div className='preline veryhigh'></div>}
                                            {filtTask.priority===2&&<div className='preline high'></div>}
                                            {filtTask.priority===3&&<div className='preline medium'></div>}
                                            {filtTask.priority===4&&<div className='preline low'></div>}
                                            <button onClick={()=>seekanddestroy(filtTask)}></button>
                                            <div onClick={()=>Editing(filtTask,indexTask)} className='Pointer'>
                                                <p className='principalText'>{filtTask.task}</p>
                                                <p className='subtext gray'>
                                                    {numberFormat(filtTask.hour)}:{numberFormat(filtTask.minute)}
                                                </p>
                                            </div>
                                            
                                        </article>
                                        ))}
                                    </div>
                                    <div className='subline'></div>
                                </section>
                            ))}
                        </div>
                    ))}
                    
                </div>
            ))}
        </div>
    );
}
export default Urgency;