import { useEffect, useState } from 'react';
import { SeatsioSeatingChart } from '@seatsio/seatsio-react';
import axios from 'axios';
import Modal from 'react-modal';

const StadiumSeat = () => {

  const userId = "s1sd5w16";
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [error,setError] = useState(null);
  const[ulset,setUlset] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    if(ulset.length <= 0) {
      setError(null);
    }
  },[ulset,selectedSeats])


  const handleSeatSelect = async (selectedObject) => {

    const { label } = selectedObject;
    const price = selectedObject.category.pricing.price;

    const isSeatReserved = async (label) => {
      try {
        const response = await axios.get(`http://localhost:8001/api/Tiketa/Exists/${label}`);
        return response.data;
      } catch (error) {
        console.error('Gabim gjatë kontrollimit të disponueshmërisë së ulësës:', error.message);
        return false;
      }
    };
    
    try{
      const isReserved = await isSeatReserved(label);

      if(isReserved){
        setError(`Ulsa "${label}" është e rezervuar dhe nuk mund të zgjidhet.`)
        setUlset([...ulset,label])
      }else{
        setSelectedSeats(prevSelectedSeats => {

          const exists = prevSelectedSeats.find(seat => seat.label === label);
          if (!exists) {
            return [...prevSelectedSeats, { label, price }];
          }
          return prevSelectedSeats;
        });
      }

    } catch (error) {
      console.error('Gabim gjatë kontrollimit të disponueshmërisë së ulësës:', error.message);
    }

  };
  

  const handleSeatDeselect = (deselectedObject) => {
    const { label } = deselectedObject;
    setSelectedSeats(prevSelectedSeats =>
      prevSelectedSeats.filter(seat => seat.label !== label)
    );
    setUlset(prevSelectedSeats =>
      prevSelectedSeats.filter(seat => seat !== label)
    );
  };
  

  const handleSubmit = async () => {    
    try {

      const total = selectedSeats.reduce((acc, seat) => acc + seat.price, 0);

      const tiketa = {
        tiketaId: "",
        userId: userId,
        eventId:1,
        ulset: selectedSeats.map(seat => (
        {
          emriUlses:seat.label,
          cmimiUlses:seat.price
        }
        )),
        total: total
      }

      
      
      await axios.post('http://localhost:8001/api/Tiketa', JSON.stringify(tiketa), {
        headers: {
          'Content-Type': 'application/json'
        }
      });
        setModalIsOpen(true);
    } catch (error) {
      console.error('Gabim gjatë dërgimit të kërkesës:', error.message);
    }


  };

  const closeModal = () => {
    setModalIsOpen(false);
    window.location.reload();
  };

  return (
    <div style={{ height: '600px' }}>
       <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Rezervimi i Suksesshëm"
        style={{
          content: {
            width: '500px',
            height: 'auto',
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)'
          }
        }}
      
      >
        <h2>Rezervimi i Suksesshëm</h2>
        <p className='text-success'>Ulset u rezervuan me sukses</p>
        <button className='btn btn-primary' onClick={closeModal}>OK</button>
      </Modal>
      <div>
      {selectedSeats.length > 0 && 
        <div style={{
          zIndex:'9', 
          position: 'absolute', 
          left: '77%',
          width:'340px',
          backgroundColor: '#dc3545',
          borderRadius: '5px',
          }}>
          <p className='text-center text-white'>Lista e vendeve</p>
          <div style={{
            maxHeight:'300px',
            overflowY: 'scroll',
            backgroundColor:'white'
          }}>
            <ol>
            {error == null ? 
            (
              <>
                {selectedSeats.map(seat => (
                  <li key={seat.label} style={{listStyle:'inherit'}}>{seat.label} <span className='text-danger'>--&gt;</span>{seat.price}Є</li> 
                ))}
              </>
            )
            :
            (
              <li className="text-danger">{error}</li>
            )}
             
            </ol>
          </div>
          <div className='d-flex justify-content-between align-items-center'>
            {error == null && 
            <>
            <button className='btn btn-primary btn-sm p-1 m-1' onClick={handleSubmit}>Rezervo</button>
            <h5 className='text-white px-3'>Total: {selectedSeats.reduce((acc, seat) => acc + seat.price, 0)}Є</h5>
            </>
            } 
          </div>
        </div>
      }
      

        <SeatsioSeatingChart
          workspaceKey="0f6f6071-f800-42a4-9105-66d8abf35eee"
          event="4748dd74-954c-4a21-96a0-8f1b3cc0a3a7"
          pricing={[
            { category: 'Jug', price: 25 },
            { category: 'Veriu', price: 25 },
            { category: 'Hendikep', price: 35 },
            { category: 'JugPerendim', price: 38 },
            { category: 'VeriPerendim', price: 38 },
            { category: 'JugLindje', price: 38 },
            { category: 'VeriLindje', price: 38 },
            { category: 'Perendim', price: 40 },
            { category: 'Lindje', price: 40 },
            { category: 'VIP', price: 100 },
            { category: 'Ultra VIP', price: 150 }
          ]}
          priceFormatter={(price) => '€' + price}
          region="eu"
          selectedObjects={selectedSeats.map(seat => ({ label: seat.label }))}
          onObjectSelected={handleSeatSelect}
          onObjectDeselected={handleSeatDeselect}
        />
      </div>
    </div>
  );
};

export default StadiumSeat;
