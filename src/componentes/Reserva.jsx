import React, { useEffect, useState } from "react";
import '../hojas-de-estilo/Reservas.css'
import { getFirestore, collection, addDoc, getDocs, orderBy, limit } from 'firebase/firestore';

import firebaseApp from '../FireBase/FireBase';
const db = getFirestore(firebaseApp);

function Reserva() {
    const valorInicial = { nombre: '', hora: '', descripcion: '' };
    const [user , setUser] = useState(valorInicial);
    const [ultimaReserva, setUltimaReserva] = useState(null);

    const capturarInputs = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const guardarDatos = async (e) => {
        e.preventDefault();
        try {
            const nuevaReservaRef = await addDoc(collection(db, 'Reservas'), { ...user });
            const nuevaReserva = { id: nuevaReservaRef.id, ...user };
            setUltimaReserva(nuevaReserva); // Establecer la nueva reserva como la última
        } catch (error) {
            console.log(error);
        }
        setUser({ ...valorInicial });
    };

    const getUltimaReserva = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'Reservas'), orderBy('fecha', 'desc'), limit(1));
            querySnapshot.forEach((doc) => {
                setUltimaReserva({ id: doc.id, ...doc.data() }); // Establecer la última reserva
            });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getUltimaReserva();
    }, []);

    return (
        <div className="Formulario">
            <h1>Reservacion:</h1>
            <form onSubmit={guardarDatos}>
                <div className="Nombre">
                    <label>Nombre: </label>
                    <input type="text" name="nombre" onChange={capturarInputs} value={user.nombre} />
                </div>
                <div className="Hora">
                    <label>Hora: </label>
                    <input type="time" name="hora" onChange={capturarInputs} value={user.hora} />
                </div>
                <div className="Descripcion">
                    <label>Descripcion: </label>
                    <br />
                    <textarea name="descripcion" rows="12" cols="65" onChange={capturarInputs} value={user.descripcion}></textarea>
                </div>
                <button className="boton-guardar">Guardar</button>
            </form>
            <div className="ListaReservas">
                <div>
                    <h2>Última Cita</h2>
                    {ultimaReserva && (
                        <div>
                            <p>Nombre: {ultimaReserva.nombre}</p>
                            <p>Hora: {ultimaReserva.hora}</p>
                            <p>Descripcion: {ultimaReserva.descripcion}</p>
                            <button className="boton-Imprimir">Imprimir</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Reserva;
