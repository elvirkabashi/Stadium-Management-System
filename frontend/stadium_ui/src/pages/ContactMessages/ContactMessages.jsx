import { useEffect, useState } from 'react';
import axios from 'axios';
import './contactMessages.scss';
import LoadingSpinner from '../../components/LoadingSpinner';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function ContactMessages() {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [messageToDelete, setMessageToDelete] = useState(null); // ID e mesazhit që do të fshihet
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:5163/api/Contact')
            .then(res => {
                const formattedMessages = res.data.map(m => ({
                    ...m,
                    formattedDate: formatMessageDate(m.dataKrijimit)
                }));
                setMessages(formattedMessages);
                setLoading(false); 
            })
            .catch(error => {
                console.error('Error fetching messages:', error);
                setError('Error fetching messages!');
                setLoading(false);
            });
    }, []);

    const truncateMessage = (message, maxLength) => {
        if (message && message.length > maxLength) {
            return message.substring(0, maxLength) + '...';
        }
        return message;
    };

    const formatMessageDate = (dateString) => {
        const date = new Date(dateString);
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const monthIndex = date.getMonth();
        const day = date.getDate();
        return `${monthNames[monthIndex]} ${day}`;
    };

    const handleDeleteMessage = async () => {
        try {
            await axios.delete(`http://localhost:5163/api/Contact/${messageToDelete}`);
            
            setMessages(messages.filter(m => m.id !== messageToDelete));
            setMessageToDelete(null); 
            setShowConfirmModal(false); 
        } catch (error) {
            console.error('Error deleting message:', error);
            
            setError('Error deleting message!');
        }
    };

    const openDeleteConfirmation = (messageId) => {
        setMessageToDelete(messageId);
        setShowConfirmModal(true);
    };

    if (loading) {
        return (
            <div className='d-flex justify-content-center mt-5'>
                <LoadingSpinner color={'text-primary'} />
            </div>
        );
    }

    if (error) {
        return <div className='text-danger'>{error}</div>;
    }
    

    return (
        <div className='container d-flex flex-column'>
            <div>
                <h4>Inbox</h4>
            </div>

            <div className="messagess">
                {messages.length > 0 ? (
                    messages.map(m => (
                        <div key={m.id} className='d-flex justify-content-between align-items-center px-5'>
                            <span id='name'>{m.emri} {m.mbiemri}</span>
                            <span id='sms'>{truncateMessage(m.mesazhi, 30)}</span>
                            <div className='date d-flex align-items-center gap-3'>
                                <span>{m.formattedDate}</span>
                                <a href="#" className="bi bi-trash fs-5 mb-1 text-danger" onClick={() => openDeleteConfirmation(m.id)}></a>
                            </div>
                        </div>
                    ))
                ):(
                    <p>Ska asnje mesazh</p>
                )}
            </div>

            {/* Modal për konfirmim të fshirjes */}
            <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this message?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleDeleteMessage}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ContactMessages;
