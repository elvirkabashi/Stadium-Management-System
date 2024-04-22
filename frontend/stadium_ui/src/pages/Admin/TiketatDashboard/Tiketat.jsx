import { useEffect, useState } from "react";
import axios from 'axios';
import { format, parseISO } from 'date-fns'; 
import LoadingSpinner from "../../../components/LoadingSpinner";


function Tiketat() {
    const [tiketat, setTiketat] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [hoverStates, setHoverStates] = useState({});

    useEffect(() => {
        axios.get('http://localhost:5163/api/Tiketa')
            .then(res => {
                const formattedTiketat = res.data.map(tiketa => {
                    return {
                        ...tiketa,
                        dataRezervimit: format(parseISO(tiketa.dataRezervimit), 'dd MMM yyyy, HH:mm') // Format the date
                    };
                });
                setTiketat(formattedTiketat);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching tickets:', error);
                setError('Error fetching tickets!');
                setLoading(false);
            });
    }, []);

    const handleMouseEnter = (id) => {
        setHoverStates(prev => ({ ...prev, [id]: true }));
    };

    const handleMouseLeave = (id) => {
        setHoverStates(prev => ({ ...prev, [id]: false }));
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
                <h4>Tiketat</h4>
            </div>
            <div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Eventi</th>
                            <th scope="col">Rezervuesi</th>
                            <th scope="col">Nr. Ulseve</th>
                            <th scope="col">Date</th>
                            <th scope="col">Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tiketat.length > 0 ? (
                            tiketat.map(t => (
                                <tr key={t.tiketaId}>
                                    <th scope="row">{t.tiketaId}</th>
                                    <td>{t.eventName}</td>
                                    <td>Filani</td>
                                    <td>{t.nrUlseve} {t.nrUlseve > 1 ? 'persona' : 'person'}</td>
                                    <td>{t.dataRezervimit}</td>
                                    <td onMouseEnter={() => handleMouseEnter(t.tiketaId)}
                                        onMouseLeave={() => handleMouseLeave(t.tiketaId)}>
                                        <a href={`tiketat/${t.tiketaId}`}><i className={`bx ${hoverStates[t.tiketaId] ? 'bx-detail' : 'bxs-detail'} bx-flip-vertical ms-3 fs-5`}></i></a>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <p>No messages</p>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Tiketat;
