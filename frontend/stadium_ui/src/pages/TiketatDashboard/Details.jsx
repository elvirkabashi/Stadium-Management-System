import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { format, parseISO } from 'date-fns'; 
import LoadingSpinner from '../../components/LoadingSpinner';

function Details() {
    const { id } = useParams();
    const [tiketa, setTiketa] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        axios.get(`http://localhost:5163/api/Tiketa/${id}`)
            .then(res => {
                const data = res.data;
                const formattedTiketa = {
                    ...data,
                    dataRezervimit: format(parseISO(data.dataRezervimit), 'dd MMM yyyy, HH:mm')
                };
                setTiketa(formattedTiketa);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching ticket details:', error);
                setError('Error fetching ticket details!');
                setLoading(false);
            });
    }, [id]);

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
        <div className="container mt-3">
            {tiketa ? (
                <div>
                    <h1>Ticket Details</h1>
                    <p><strong>Emri Eventit:</strong> {tiketa.eventName}</p>
                    <p><strong>Data e rezervimit:</strong> {tiketa.dataRezervimit}</p>
                    <p><strong>User ID:</strong> {tiketa.userId}</p>
                    <table className="table table-sm w-auto p-table">
                        <thead>
                            <tr>
                            <th scope="col">#</th>
                            <th scope="col">Ulsja</th>
                            <th scope="col">Cmimi</th>
                            <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tiketa.ulset.map(t => (
                                <tr key={t}>
                                    <th scope="row">1</th>
                                    <td>{t}</td>
                                    <td>50€</td>
                                    <td className='text-center'><i className='bx bx-trash text-danger fs-5' ></i></td>
                                </tr>
                            ))}
                            
                        </tbody>
                        </table>
                </div>
            ) : (
                <p>No ticket found with ID {id}</p>
            )}
        </div>
    );
}

export default Details;
