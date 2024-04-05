import axios from 'axios'
import './Contact.css';
import {GrMapLocation} from 'react-icons/gr'
import {HiOutlineMailOpen} from 'react-icons/hi'
import {BsFillTelephoneFill} from 'react-icons/bs'
import {FaFacebookF} from 'react-icons/fa'
import {AiOutlineTwitter} from 'react-icons/ai'
import {FiInstagram} from 'react-icons/fi'
import { useEffect, useState } from 'react';
import Aos from 'aos';
import LoadingSpinner from '../../components/LoadingSpinner';


function Contact() {

    const [newContact,setNewContact] = useState({
        email:'',
        emri:'',
        mbiemri:'',
        tel:'',
        mesazhi:''
      });

      const [submissionStatus, setSubmissionStatus] = useState({
        success: false,
        error: ''
      });

      const[loading,setLoading] = useState(false)

    
      const handleSubmit = async (e) => {
        e.preventDefault();
          try {
            setLoading(true)
            await axios.post('http://localhost:5163/api/Contact', newContact)
        
            setSubmissionStatus({ success: true, error: '' });
            setNewContact({
              emri: '',
              mbiemri: '',
              email: '',
              numriTel: '',
              mesazhi: ''
            });
          } catch (error) {
            console.error('Error adding contact:', error);
            setSubmissionStatus({ success: false, error: error.message });
          }finally {
            setLoading(false);
        }
      };

      useEffect(() => {
        Aos.init({duration: 2000, easing: 'ease-out-back'})
      },[])

  return (
    <>
       <div className="events">
          <h2 data-aos='fade-right'>KONTAKT</h2>
        </div>
        <div className="contactUs">
          <div className="box">
            <div className="contact form" data-aos="flip-up">
              <h3>Shkruani mesazh</h3>
                {submissionStatus.success && <p className='text-success'>Mesazhi u dërgua me sukses!</p>}
                {submissionStatus.error && <p className='text-danger'>Gabimi gjatë dërgimit të mesazhit!</p>}
              <form onSubmit={handleSubmit}>
                <div className="formBox">
                  <div className="row50">
                    <div className="inputBox">
                      <span>Emri</span>
                      <input 
                      type="text" 
                      placeholder="Emri" 
                      id="contact-name" 
                      name="contact-name"
                      value={newContact.emri}
                      onChange={(e) => setNewContact({ ...newContact, emri: e.target.value })}
                      />
                    </div>
                    <div className="inputBox">
                      <span>Mbiemri</span>
                      <input 
                      type="text" 
                      placeholder="Mbiemri" 
                      id="contact-surname" 
                      name="contact-surname" 
                      value={newContact.mbiemri}
                      onChange={(e) => setNewContact({ ...newContact, mbiemri: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="row50">
                    <div className="inputBox">
                      <span>Email Adresa</span>
                      <input 
                      type="text" 
                      placeholder="Email" 
                      id="contact-email" 
                      name="contact-email"  
                      value={newContact.email}
                      onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
                      />
                    </div>
                    <div className="inputBox">
                      <span>Numri telefonit</span>
                      <input 
                      type="text" 
                      placeholder="Telefoni" 
                      id="contact-phone" 
                      name="contact-phone" 
                      value={newContact.tel}
                      onChange={(e) => setNewContact({ ...newContact, tel: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="row100">
                    <div className="inputBox">
                      <span>Mesazhi</span>
                      <textarea 
                      placeholder="Shkruani mesazhin tuaj" 
                      id="contact-message" 
                      name="contact-message" 
                      value={newContact.mesazhi}
                      onChange={(e) => setNewContact({ ...newContact, mesazhi: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="row100">
                    <div className="inputBox">
                      {loading ? (
                        <div className='text-center'>
                          <LoadingSpinner/>
                        </div>
                      ):(
                        <input type="submit" value="Dergo"/>
                      )}
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="contact info" data-aos="flip-down">
              <h3>Na kontaktoni</h3>
              <div className="infoBox">
                <div>
                  <span><GrMapLocation /></span>
                  <p>Prishtinë, Kosovë</p>
                </div>
                <div>
                  <span><HiOutlineMailOpen/></span>
                  <a href="mailto:kosovostadium@gmail.com">kosovostadium@gmail.com</a>
                </div>
                <div>
                  <span><BsFillTelephoneFill /></span>
                  <a href="tel: +38344111222">+383 44 111 222</a>
                </div>
                <ul className="sci">
                <li><a href="https://github.com/RigonP/Sistem-per-menaxhimin-e-stadiumit"><FaFacebookF/></a></li>
                <li><a href="https://github.com/RigonP/Sistem-per-menaxhimin-e-stadiumit"><AiOutlineTwitter/></a></li>
                <li><a href="https://github.com/RigonP/Sistem-per-menaxhimin-e-stadiumit"><FiInstagram /></a></li>
              </ul>
            </div>
          </div>
          {/* Map section */}
          <div className="contact-map" data-aos="flip-up">
            <iframe title="Google Maps" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2933.928454076262!2d21.1544899753821!3d42.662871515918106!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13549ee398234689%3A0x1ecdd21bb52cbd0f!2zU3RhZGl1bSAiIPCdkIXwnZCA8J2Qg_CdkIjwnZCLIPCdkJXwnZCO8J2QivCdkJHwnZCR8J2QiCAiIFByaXN0aW5h!5e0!3m2!1sen!2s!4v1682011069333!5m2!1sen!2s"
                width="600"
                height="450"
                style={{border:"0" }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade">
            </iframe>
          </div>
          
        </div>
        </div>
    </>
  )
}

export default Contact