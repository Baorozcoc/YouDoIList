import './Initial.css';
import { useNavigate } from 'react-router-dom';

function Initial() {
    const navigate = useNavigate();
    const handleClick = () => navigate('/Principal');
    return(
      <div className='Initial'>
        <header className='greatTitle white header1'>You Do I List</header>
        <section className='container section1'>
            <p>
                <strong>You Do I List </strong>
                es una plataforma web que te permite 
                agendar tus actividades diarias, semanales
                y mensuales de forma eficiente, ordenando según
                fecha, relevancia y categoría.
            </p>
            <button className='primarybutton button principalText' onClick={handleClick}>Continuar</button>
        </section>
        <footer className='subtext gray footer1'>
            Un proyecto de Berny Alejandro Orozco
            <br/>
            baorozcoc@unal.edu.co
        </footer>
      </div>  
    );
}
export default Initial;
