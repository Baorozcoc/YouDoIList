import './Views.css';

const Priority=({list, setList, setEditTask, setTask})=>{
    const Months=['','Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
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
    function Editing(task){
        let d= task.year + '-' + numberFormat(task.month) + '-' + numberFormat(task.day) + 'T' + numberFormat(task.hour) + ':' + numberFormat(task.minute);
        setTask({task:task.task, priority:task.priority, date: d})
        setEditTask(1);
    }
    const Yearnow= +new Date().getFullYear().toString();
    return(
        <div className='Priority Grid'>
            {list.some(task=>task.priority===1)&&<section>
                <h6 className="principalText veryhigh titleprior white">Muy Alta</h6>
                {list.filter(task=>task.priority===1).map((filtTask,index)=>(
                    <article key={index} className='Card1'>
                        <button onClick={()=>seekanddestroy(filtTask)}></button>
                        <div onClick={()=>Editing(filtTask)} className='Pointer'>
                            <p className='principalText'>{filtTask.task}</p>
                            <p className='subtext gray'>
                                {numberFormat(filtTask.hour)}:{numberFormat(filtTask.minute)} -  {Months[filtTask.month]} {numberFormat(filtTask.day)}  {Yearnow!==filtTask.year&&filtTask.year}
                            </p>
                        </div>
                        
                    </article>
                ))}
            </section>}
            {list.some(task=>task.priority===2)&&<section>
                <h6 className="principalText high titleprior white">Alta</h6>
                {list.filter(task=>task.priority===2).map((filtTask,index)=>(
                <article key={index} className='Card1'>
                    <button onClick={()=>seekanddestroy(filtTask)}></button>
                    <div onClick={()=>Editing(filtTask)} className='Pointer'>
                        <p className='principalText'>{filtTask.task}</p>
                        <p className='subtext gray'>
                            {numberFormat(filtTask.hour)}:{numberFormat(filtTask.minute)} -  {Months[filtTask.month]} {numberFormat(filtTask.day)}  {Yearnow!==filtTask.year&&filtTask.year}
                        </p>
                    </div>
                    
                </article>
                ))}
            </section>}
            {list.some(task=>task.priority===3)&&<section>
                <h6 className="principalText medium titleprior white">Media</h6>
                {list.filter(task=>task.priority===3).map((filtTask,index)=>(
                    <article key={index} className='Card1'>
                    <button onClick={()=>seekanddestroy(filtTask)}></button>
                    <div onClick={()=>Editing(filtTask)} className='Pointer'>
                        <p className='principalText'>{filtTask.task}</p>
                        <p className='subtext gray'>
                            {numberFormat(filtTask.hour)}:{numberFormat(filtTask.minute)} -  {Months[filtTask.month]} {numberFormat(filtTask.day)}  {Yearnow!==filtTask.year&&filtTask.year}
                        </p>
                    </div>
                    
                </article>
                ))}
            </section>}
            {list.some(task=>task.priority===4)&&<section>
                <h6 className="principalText low titleprior white">Baja</h6>
                {list.filter(task=>task.priority===4).map((filtTask,index)=>(
                    <article key={index} className='Card1'>
                    <button onClick={()=>seekanddestroy(filtTask)}></button>
                    <div onClick={()=>Editing(filtTask)} className='Pointer'>
                        <p className='principalText'>{filtTask.task}</p>
                        <p className='subtext gray'>
                            {numberFormat(filtTask.hour)}:{numberFormat(filtTask.minute)} -  {Months[filtTask.month]} {numberFormat(filtTask.day)}  {Yearnow!==filtTask.year&&filtTask.year}
                        </p>
                    </div>
                    
                </article>
                ))}
            </section>}
        </div>
    );
}
export default Priority;
