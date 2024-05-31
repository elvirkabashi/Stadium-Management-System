import React from 'react';
import './Disability.css';
import '@fortawesome/fontawesome-free/css/all.min.css';


const Disability = () => {
  const handleSpeech = () => {
    const text = `Mirë se vini në STADIUM! Çdo jetë ka vlerë, pavarësisht vendndodhjes, moshës, gjinisë apo paaftësisë. Ka një plan dhe një qëllim për secilin. Vende të rezervuara për personat me aftësi të veçantë. Këto hapësira janë të dizajnuara për të akomoduar individë me sfida të lëvizshmërisë ose aftësi të tjera të kufizuara për t'u siguruar që ata të kenë një përvojë komode dhe të këndshme. Nëse ju ose dikush që njihni kërkon këto akomodime, ju lutemi informoni stafin tonë dhe ata do t'ju ndihmojnë për të hyrë në këto vende të rezervuara.`;

    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = 'sq-AL'; // Albanian language code
    window.speechSynthesis.speak(speech);
  };

  return (
    <div className="disability-page">
      <h1>Mirë se vini në STADIUM!</h1>
      <p> 
        <i>Çdo jetë ka vlerë, pavarësisht vendndodhjes, moshës, gjinisë apo paaftësisë. Ka një plan dhe një qëllim për secilin.</i>
      </p>
      <div className="disability-info">
        <h2>Vende të rezervuara për personat me aftësi të veçantë</h2>
        <p>
          Këto hapësira janë të dizajnuara për të akomoduar individë me sfida të lëvizshmërisë ose aftësi të tjera të kufizuara për t'u siguruar që ata të kenë një përvojë komode dhe të këndshme.
          Nëse ju ose dikush që njihni kërkon këto akomodime, ju lutemi informoni stafin tonë dhe ata do t'ju ndihmojnë për të hyrë në këto vende të rezervuara.
        </p>
      </div>
      <button className="speech-button" onClick={handleSpeech}> <i className="fas fa-volume-up"></i> Dëgjoni përmbajtjen</button>
    </div>
  );
}

export default Disability;
