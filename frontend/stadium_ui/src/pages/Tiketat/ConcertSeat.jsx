import React from 'react';
import { SeatsioSeatingChart } from '@seatsio/seatsio-react';

const ConcertSeat = () => {
  return( 
  <div style={{ 'height': '600px' }}>
    <SeatsioSeatingChart
    workspaceKey="0f6f6071-f800-42a4-9105-66d8abf35eee"
    event="6a7b5888-52d3-4e01-94f0-1facfcd87b3b"
    pricing={[
      {'category': 'Para', 'price': 30},
      {'category': 'Para-Kati2', 'price': 35},
      {'category': 'VIP', 'price': 80},
      {'category': 'D-Kati-1', 'price': 33},
      {'category': 'D-Kati-2', 'price': 40},
      {'category': 'D-Kati-3', 'price': 45},
      {'category': 'Disabilities', 'price': 40},
      {'category': 'M-Para', 'price': 48},
      {'category': 'M-3', 'price': 45}
    ]}
    priceFormatter={price => '€' + price}
    region="eu"
    />
  </div>
  )
};

export default ConcertSeat;
