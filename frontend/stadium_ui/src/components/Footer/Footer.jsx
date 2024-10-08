import {useEffect, useState} from 'react'
import './footer.css'
import video2 from '../../Assets/Kosovo_Flag_Loop.mp4'
import {AiOutlineTwitter} from 'react-icons/ai'
import {AiFillYoutube} from 'react-icons/ai'
import {AiFillInstagram} from 'react-icons/ai'
import {BsFacebook} from 'react-icons/bs'
import {FiChevronRight} from 'react-icons/fi'
import {BiFootball} from 'react-icons/bi'
import { Link } from "react-router-dom";
import Aos from 'aos'
import 'aos/dist/aos.css'
import axios from 'axios'; // Import axios here
import LoadingSpinner from '../../components/LoadingSpinner';

const Footer = () => {
  const [newSubscribe,setNewSubscribe] = useState({
    email:''
  });

  const [submissionStatus, setSubmissionStatus] = useState({
    success: false,
    error: ''
  });

  const[loading,setLoading] = useState(false)

  function validateEmailSubscribe() {
    const email = document.getElementById('contact-email').value;

    if (email.length === 0) {
      alert('Email duhet të plotësohet !');
      return false;
    }
    if (!email.match(/^[a-z0-9]+(-[a-z0-9]+)*@[a-z]+(-[a-z]+)*\.(com|net)$/)) {
      alert('Email nuk është valid !');
      return false;
    }
    return true;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = newSubscribe.email;

    if (!validateEmailSubscribe(email)) {
      return; //Ndalo ekzekutimin nese email nuk eshte valid
    }

    try {
      setLoading(true);
      await axios.post('${import.meta.env.VITE_BASE_URL}api/Subscribe', newSubscribe);

      setSubmissionStatus({ success: true, error: '' });
      setNewSubscribe({
        email: '',
      });
    } catch (error) {
      console.error('Error adding subscribe:', error);
      setSubmissionStatus({ success: false, error: error.message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    Aos.init({duration: 2000})
  },[])

  //const form = useRef();
    
  
  return (
    <section className="footer">
      <div className="videoDiv">
        <video src={video2} loop autoPlay muted type="video/mp4"></video>
      </div>

      <div className="secContent container">
      <form onSubmit={handleSubmit}>
        <div className="contactDiv flex">
          <div data-aos="fade-up" className="text">
            <small>Na shkruani</small>
            <h2>KOSOVA</h2>
          </div>
          {submissionStatus.success && <p className='text-success'>Jeni bërë subscribe me sukses !</p>}
          {submissionStatus.error && <p className='text-danger'>Gabim gjatë tentimit për subscribe!</p>}
          <div className="inputDiv flex">
            <input 
            data-aos="fade-up"  
            type="text" 
            placeholder='Shkruani email' 
            id="contact-email"
            value={newSubscribe.email}
            onChange={(e) => setNewSubscribe({ ...newSubscribe, email: e.target.value })}/>
            {loading ? (
                        <div className='text-center'>
                          <LoadingSpinner color={'text-danger'}/>
                        </div>
                      ):(
                        <input type="submit" value="Dergo"/>
                      )}
          </div>
        </div>
        <span id="submit-error-footer"></span>
        </form>

        <div className="footerCard flex">
          <div className="footerIntro flex">
            <div className="logoDiv">
            <a href="/" className="logo flex">
                <BiFootball className="icon" />KOSOVO - Stadium.
              </a>
            </div>

            <div data-aos="fade-up" className="footerParagraph">
            Topi i parë i futbollit në Kosovë mendohet se është sjellë nga një student i Grenoblit më 1919, 
            por burime tjera japin një version se më 1914 është zhvilluar ndeshja e parë e futbollit në Kosovë, 
            ku kanë luajtur Austro-Hungarezët, të cilët kanë shërbyer në atë kohë në vendin tonë. 
            </div>

            <div className="footerSocials flex">
              <a href="https://twitter.com/ffk_ks?lang=en" target='blank'><AiOutlineTwitter className="icon" /></a>
              <a href="https://www.youtube.com/@FederataeFutbolliteKosoves" target='blank'><AiFillYoutube className="icon" /></a>
              <a href="https://www.instagram.com/ffk.kos/?hl=en" target='blank'><AiFillInstagram className="icon" /></a>
              <a href="https://www.facebook.com/FFKKosova/?locale=sq_AL" target='blank'><BsFacebook className="icon" /></a>
            </div>
          </div>

          
          <div className="footerLinks grid">
            {/*Grupi i pare */}
            <div data-aos="fade-up" data-aos-duration="3000" className="linkGroup">
              <span className="groupTitle">
                EVENTET
              </span>

              <li className="footerList flex">
                {/* <FiChevronRight className="icon" />
                Lorem */}
                <FiChevronRight /><Link to="/eventet" className="icon">Futboll</Link>
              </li>

              <li className="footerList flex">
                {/* <FiChevronRight className="icon" />
                Lorem */}
                <FiChevronRight /><Link to="/eventet" className="icon">Koncerte</Link>
              </li>

              <li className="footerList flex">
                {/* <FiChevronRight className="icon" />
                Lorem */}
                <FiChevronRight /><Link to="/eventet" className="icon">Boks</Link>
              </li>

              <li className="footerList flex">
                {/* <FiChevronRight className="icon" />
                Lorem */}
                <FiChevronRight /><Link to="/eventet" className="icon">Arte Marciale</Link>
              </li>

              {/* <li className="footerList flex">
                <FiChevronRight className="icon" />
                Lorem 
                <FiChevronRight /><Link to="/eventet" className="icon">Boks</Link>
              </li> */}

            </div>

            {/*Grupi i dyte */}
            <div data-aos="fade-up" data-aos-duration="4000" className="linkGroup">
              <span className="groupTitle">
                PARTNERET
              </span>

              <li className="footerList flex">
                <FiChevronRight className="icon" />
                UEFA
              </li>

              <li className="footerList flex">
                <FiChevronRight className="icon" />
                FIFA
              </li>

              <li className="footerList flex">
                <FiChevronRight className="icon" />
                IPKO
              </li>

              <li className="footerList flex">
                <FiChevronRight className="icon" />
                Vala
              </li>

              <li className="footerList flex">
                <FiChevronRight className="icon" />
                Adidas
              </li>

            </div>

            {/*Grupi i trete */}
            <div data-aos="fade-up" data-aos-duration="5000" className="linkGroup">
              <span className="groupTitle">
                SHIKO
              </span>

              <li className="footerList flex">
                {/* <FiChevronRight className="icon" />
                Lorem */}
                <FiChevronRight /><Link to="/stadiumi" className="icon">Stadiumi</Link>
              </li>

              <li className="footerList flex">
                {/* <FiChevronRight className="icon" />
                Lorem */}
                <FiChevronRight /><Link to="/tours" className="icon">Tours</Link>
              </li>

              <li className="footerList flex">
                {/* <FiChevronRight className="icon" />
                Lorem */}
                <FiChevronRight /><Link to="/tiketat" className="icon">Tiketat</Link>
              </li>

              <li className="footerList flex">
                {/* <FiChevronRight className="icon" />
                Lorem */}
                <FiChevronRight /><Link to="/shop" className="icon">Shop</Link>
              </li>

              <li className="footerList flex">
                {/* <FiChevronRight className="icon" />
                Payment */}
                <FiChevronRight /><Link to="/contact" className="icon">Kontakti</Link>
              </li>

            </div>
          </div>

          <div className="footerDiv flex">
            <small>BEST STADIUM</small>
            <small>Copyright reserved - UBT 2023</small>
          </div>

        </div>
      </div>
    </section>

    
  )
}

export default Footer