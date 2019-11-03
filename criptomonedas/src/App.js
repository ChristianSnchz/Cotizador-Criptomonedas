import React ,{useState,useEffect} from 'react';
import imagen from './cryptomonedas.png';
import Formulario from './Componentes/Formulario';
import Spinner from './Componentes/Spinner';
import Cotizacion from './Componentes/Cotizacion';
import Axios from 'axios';

function App() {

  const [moneda,guardarMoneda] = useState(''); 
  const [criptomoneda,guardarCriptomoneda] = useState('');
  const [cargando,guardarCargando] = useState(false);
  const [resultado,guardarResultado] = useState ({});

  useEffect( () => {

    if(moneda === '') return;

    const cotizarCriptomoneda = async () => {

      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
      const resultado = await Axios.get(url);

      guardarResultado(resultado.data.DISPLAY[criptomoneda][moneda]);
    }
    cotizarCriptomoneda();
    guardarCargando(true);

    setTimeout( () => {
      guardarCargando(false);
    },2000);


  },[criptomoneda,moneda]);

  //spinner

  const componente = (cargando) ? <Spinner /> : <Cotizacion resultado={resultado}/>;

  return (
    <div className="container">
      <div className="row">
        <div className="one-half column">
          <img src={imagen} alt="image criptomonedas" 
          className="logotipo"/>
        </div>
        <div className="one-half column">
          <h1>Cotiza criptomonedas al instante</h1>

          <Formulario
            guardarMoneda = {guardarMoneda}
            guardarCriptomoneda = {guardarCriptomoneda}
          />

          {componente}
        </div>
      </div>
    </div>
  );
}

export default App;
