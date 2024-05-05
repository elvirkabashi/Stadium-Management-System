import { useEffect, useState } from 'react';
import axios from 'axios';
import './Subscribes.scss';
import LoadingSpinner from '../../../components/LoadingSpinner';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function Subscribe() {
    const [sub, setSub] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [subToDelete, setSubToDelete] = useState(null);
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BASE_URL}api/Subscribe`)
        .then(res => {
            setSub(res.data);
            setLoading(false); 
        })
    }, []);

    const handleDeleteSubscribes = async () => {
        try {
            await axios.delete(`${import.meta.env.VITE_BASE_URL}api/Subscribe/${subToDelete}`);
            
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
        <div className='container'>
            <h4>Subscribes</h4>

            <table className="table">
                <thead>
                    <tr>
                        <th>Nr.</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {sub.length > 0 ? (
                        sub.map(m => (
                            <tr key={m.id}>
                                <td>{m.id}</td>
                                <td>{m.email}</td>
                                <td>
                                    <button className="btn btn-danger" onClick={() => openDeleteConfirmation(m.id)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3">No subscribers</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Modal për konfirmim të fshirjes */}
            <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this subscriber?</Modal.Body>
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
