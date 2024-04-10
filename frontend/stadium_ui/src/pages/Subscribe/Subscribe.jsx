import { useEffect, useState } from 'react';
import axios from 'axios';
import './Subscribes.scss';
import LoadingSpinner from '../../components/LoadingSpinner';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function Subscribe() {
    const [sub, setSub] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [subToDelete, setSubToDelete] = useState(null); // ID e mesazhit që do të fshihet
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:5163/api/Subscribe')
        .then(res => {
            setSub(res.data);
            setLoading(false); 
        })
    }, []);

    const handleDeleteSubscribes = async () => {
        try {
            await axios.delete(`http://localhost:5163/api/Subscribe/${subToDelete}`);
            
            setSub(sub.filter(m => m.id !== subToDelete));
            setSubToDelete(null); 
            setShowConfirmModal(false); 
        } catch (error) {
            console.error('Error deleting subscribes:', error);
            
            setError('Error deleting subscribes!');
        }
    };

    const openDeleteConfirmation = (subId) => {
        setSubToDelete(subId);
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
                <h4>Subscribes</h4>
            </div>

            <div className="subs">
                {sub.length > 0 ? (
                    sub.map(m => (
                        <div key={m.id} className='d-flex justify-content-between align-items-center px-5'>
                            <span id='email'>{m.email}</span>
                            <div className='date d-flex align-items-center gap-3'>
                                <a href="#" className="bi bi-trash fs-5 mb-1 text-danger" onClick={() => openDeleteConfirmation(m.id)}></a>
                            </div>
                        </div>
                    ))
                ):(
                    <p>Ska asnje subscribes</p>
                )}
            </div>

            {/* Modal për konfirmim të fshirjes */}
            <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this subscribers?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleDeleteSubscribes}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Subscribe;
