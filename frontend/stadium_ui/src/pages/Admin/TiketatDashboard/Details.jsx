import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { format, parseISO } from 'date-fns'; 
import LoadingSpinner from '../../../components/LoadingSpinner';
import './tiketa.scss'
import QRCode from "react-qr-code";

function Details() {
    const { id } = useParams();
    const [tiketa, setTiketa] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BASE_URL_mongo}api/Tiketa/${id}`)
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
    const handlePrint = () => {
        window.print();
    };
    return (
        <div className="container mt-3">
            <div className='tiketa'>
                <div className='header d-flex flex-column'>
                    <h1 className='text-center'>ONLINE TICKET</h1>
                    <p>Merreni me vete tiketen dixhitale. Pranohen edhe tiketa e printuara.</p>
                </div>
                <div className='mainn d-flex'>
                    <div className='line2'>

                    </div>
                    <div className="line px-5 d-flex align-items-center justify-content-end">
                        <p className="mt-3">Kerko detajet e tiketes online</p>
                    </div>
                </div>
                <div className='foter'>
                    <div className='d-flex ju'>
                        <div className='image'>
                            <img src="https://www.epokaere.com/wp-content/uploads/2019/07/fadil-vokrri.jpg" alt='fadil'/>
                        </div>
                        <div className='info'>
                            <ul>
                                <li><span>TiketId:</span> {tiketa.tiketaId}</li>
                                <li><span>Emri:</span> Elvir Kabashi</li>
                                <li><span>Nr.Ulseve:</span> {tiketa.ulset.length} ulse</li>
                                <li><span>Cmimi:</span> {tiketa.total}€</li>
                                <li className='ulset'><span>Ulset:</span></li>
                                <ol className='ulset' style={{listStyle:"inherit"}}>
                                {tiketa.ulset.map(ulse => (
                                     <li key={ulse}>{ulse.emriUlses}</li> 
                                ))}
                                </ol>
                            </ul>
                        </div>
                        <div className='butoni'><button onClick={handlePrint}>Printo Tiketën</button></div>
                        <div className='qrcode'>
                        <QRCode
                            size={256}
                            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                            value={`${import.meta.env.VITE_BASE_URL_mongo}tiketat/${tiketa.tiketaId}`}
                            viewBox={`0 0 256 256`}
                        />
                        </div>
                    </div>
                    <div className='d-flex ju'>
                        <div className='image'>
                            <img src="https://i.ytimg.com/vi/1umhgpNkbKY/maxresdefault.jpg" alt='fadil'/>
                        </div>
                        <div className='info d-flex flex-column p-3'>
                            <span style={{fontWeight:'600',fontSize:"30px"}}>Kosova vs Romania</span>
                            <span style={{fontWeight:'600',fontSize:"18px",color:'#2a4a6c'}}>Friday, August 28 2024 7:30PM</span>
                            <span style={{marginTop:'18px',fontWeight:'600'}}>Fadil Vokrri</span>
                            <span>M574+4RW, Rr. Enver Zymberi, Prishtina</span>
                        </div>
                    </div>                   
                </div>
            </div>
        </div>
    );
}

export default Details;
