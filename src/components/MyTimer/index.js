import { useTimer } from 'react-timer-hook';
import { Notifyer } from '../../services/notifyer';
import './styles.css';
import tomatoIcon from '../../assets/images/tomato.png'
import { useState } from 'react';

export const MyTimer = ({ expiryTimestamp }) => {

    const [statusUser, setStatusUser] = useState("Aguardando");

    const {
        seconds,
        minutes,
        hours,
        days,
        isRunning,
        start,
        pause,
        resume,
        restart,
    } = useTimer({
        expiryTimestamp,
        onExpire: () => {
            if (statusUser == "Trabalhando") {
                Notifyer.notify({ title: "Hora de Descansar!", body: "Muito bem, você já trabalhou o suficiente!\n\nClique em Descansar.", icon: tomatoIcon })
                handleRest();
            } else {
                Notifyer.notify({ title: "Chega de Descansar!", body: "Você já descansou o suficiente... Volte ao trabalho!\n\nClique em Recomeçar.", icon: tomatoIcon })
                handleRestart();
            }

        }, autoStart: false
    });

    const handleStart = () => {
        setStatusUser("Trabalhando");
        resume();
    }

    const handlePause = () => {
        setStatusUser("Aguardando");
        pause();
    }

    const handleRestart = () => {
        console.log("Trabalhando")
        setStatusUser("Trabalhando");
        // Restarts to 25 minutes timer
        const time = new Date();
        time.setSeconds(time.getSeconds() + 25 * 60);
        restart(time)
    }

    const handleRest = () => {
        console.log("Descansando")
        setStatusUser("Descansando");
        // Restarts to 5 minutes timer
        const time = new Date();
        time.setSeconds(time.getSeconds() + 5 * 60);
        restart(time)
    }

    return (
        <div className="box">
            <div className='pomodoro'>
                <div className='logo-pomodoro'>
                    <h1>Pomodoro</h1>
                    <div className='tomato'>
                        <img src={tomatoIcon} />
                    </div>
                </div>
                <div style={{ fontSize: '100px' }}>
                    <span>{String(minutes).padStart(2, "0")}</span>:<span>{String(seconds).padStart(2, "0")}</span>
                </div>
                <p>{isRunning ? 'O tempo está passando...' : 'Pausado'}</p>
                <div className='buttons'>
                    <button className='button-resume' onClick={handleStart}>Comerçar</button>
                    <button className='button-pause' onClick={handlePause}>Pausar</button>
                    <button className='button-restart' onClick={handleRestart}>Recomeçar</button>
                    <button className='button-rest' onClick={handleRest}>Descansar</button>
                </div>
            </div>
        </div>
    )
}