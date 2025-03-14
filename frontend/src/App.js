import './App.css';
import {useEffect, useState} from 'react';
import Message from './components/Message';

function App({socket}) {
    const [messages, setMessages] = useState([]);
    const [userName, setUserName] = useState('');
    const [textToSend, setTextToSend] = useState('');

    useEffect(() => {
        socket.on('connect', () => {
            setMessages(current => [...current, {user: 'Bot', text: 'Bienvenidx a la sala de chat 👋'}]);
            setUserName(socket.id);
        });

        socket.on('msg', ({user, type, payload}) => {
            if (user != currentUser._id) {
                return;
            }
            if (type === 'INVITATION_RECIVED') {
                // sonidito
            }
            if (type === 'INVITATION_ACCEPTED') {
                // sonidito diferente
            }
            setMessages(current => [...current, {user, payload, type}]);
        });

        return () => {
            socket.off('msg');
        };
    }, []);

    const handleClick = () => {
        if (!userName || !textToSend) return;
        socket.emit('msg', {user: userName, text: textToSend});
    }

    const unread = messages.reduce((a, c) => {if (c.notification.status === 'pending') a++}, 0);


    //esto en el componente de la propia invitación
    const invitation = messages[0];
    
    api.post('/accept', invitation);




    return (
        <div className='App'>
            <div>
                <ul>
                    {messages.length > 0 && messages.map(message => <li><Message user={message.user}
                                                                                 text={message.text}/></li>)}
                </ul>
                <input placeholder='Tu nombre' value={userName} type='text'
                       onChange={(e) => setUserName(e.target.value)}/>
                <input placeholder='Tu mensaje' type='text' onChange={(e) => setTextToSend(e.target.value)}/>
                <button onClick={handleClick}>Enviar mensaje</button>
            </div>

        </div>
    );
}

export default App;
