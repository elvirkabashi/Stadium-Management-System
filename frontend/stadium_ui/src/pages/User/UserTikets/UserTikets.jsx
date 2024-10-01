import { useEffect, useState } from "react";
import axios from 'axios';
import { format, parseISO } from 'date-fns'; 
import LoadingSpinner from "../../../components/LoadingSpinner";
import { getAuthToken } from '../../utils/Cookies';
import { jwtDecode } from "jwt-decode";


function UserTikets() { // Accepting userEmail as a prop
    const [tiketat, setTiketat] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [hoverStates, setHoverStates] = useState({});
    const [userEmail, setUserEmail] = useState(''); // State to store user email

    useEffect(() => {
        const authToken = getAuthToken();
        if (authToken) {
            const decodedToken = jwtDecode(authToken);
            const email = decodedToken.unique_name; // Decode email from token
            setUserEmail(email); // Set the email in the state
        }
    }, []);

    useEffect(() => {
        if (!userEmail) return; // Prevent fetching until the userEmail is set

        axios.get(`${import.meta.env.VITE_BASE_URL_mongo}api/Tiketa/user/${userEmail}`)
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

    }, [userEmail]);

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
                <h4>Your reserved tikets</h4>
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
                            <th scope="col">Total</th>
                            <th scope="col">Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tiketat.length > 0 ? (
                            tiketat.map((t, index) => (
                                <tr key={t.tiketaId}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{t.eventId}</td>
                                    <td>{t.users.length > 0 ? t.users[0].email : 'No email'}</td> {/* Display user email */}
                                    <td>{t.ulset.length} {t.ulset.length > 1 ? 'persona' : 'person'}</td>
                                    <td>{t.dataRezervimit}</td>
                                    <td>{t.total}€</td>
                                    <td onMouseEnter={() => handleMouseEnter(t.tiketaId)}
                                        onMouseLeave={() => handleMouseLeave(t.tiketaId)}>
                                        <a href={`tiketat/${t.tiketaId}`}>
                                            <i className={`bx ${hoverStates[t.tiketaId] ? 'bx-detail' : 'bxs-detail'} bx-flip-vertical ms-3 fs-5`}></i>
                                        </a>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <p>No tickets found</p>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default UserTikets;
