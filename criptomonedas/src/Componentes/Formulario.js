import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Criptomoneda from './Criptomoneda';
import Error from './Error';

function Formulario({ guardarMoneda, guardarCriptomoneda }) {

    const [criptomoneda, guardarCriptoaCotizar] = useState([]);
    const [monedaCotizar, guardarMonedaCotizar] = useState('');
    const [criptoCotizar, guardarCriptoCotizar] = useState('');
    const [error, guardarError] = useState(false);

    useEffect(() => {

        const consultarAPI = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/totaltoptiervolfull?limit=10&tsym=USD';
            const resultado = await axios.get(url);

            guardarCriptoaCotizar(resultado.data.Data);
        }
        consultarAPI();
    }, []);

    const cotizarMoneda = e => {
        e.preventDefault();
        //validar
        if (monedaCotizar === '' || criptoCotizar === '') {
            guardarError(true);
            return;
        }
        guardarError(false);
        guardarMoneda(monedaCotizar);
        guardarCriptomoneda(criptoCotizar);
    }

    const componente = (error) ? <Error mensaje="Ambos campos son obligatorios" /> : null;

    return (
        <form
            onSubmit={cotizarMoneda}
        >
            {componente}
            <div className="row">
                <label>Elige tu moneda</label>
                <select className="u-full-width"
                    onChange={e => guardarMonedaCotizar(e.target.value)}
                >
                    <option value="">Elige tu Moneda</option>
                    <option value="USD">Dolar Estadounidense</option>
                    <option value="GBP">Libras</option>
                    <option value="EUR">Euro</option>
                </select>
            </div>

            <div className="row">
                <label> Elige tu Criptomoneda</label>
                <select className="u-full-width"
                    onChange={e => guardarCriptoCotizar(e.target.value)}>
                    <option value="">Elige tu Criptomoneda </option>
                    {criptomoneda.map(criptomoneda => (
                        <Criptomoneda
                            key={criptomoneda.CoinInfo.Id}
                            criptomoneda={criptomoneda}
                        />
                    ))}

                </select>
            </div>

            <input type="submit" className="button-primary u-full-width" value="Calcular" />
        </form>
    )

}

export default Formulario;