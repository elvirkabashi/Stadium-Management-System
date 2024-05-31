import React from 'react';
import './Objektet.css';
import resto from './images/resto.jpg';

const Objektet = () => {
    return (
        <div className="container">
            <div className="text-container">
                <header className="header">OBJEKTET USHQIMORE MË TË AFËRTA PËR NJË EKSPERIENCE SA MË TË MIRË</header>
                <div className="restaurant-list">
                    <div className="restaurant">
                        <strong>Restorant-Bar "Qebaptore"</strong>
                        <ul>
                            <li>Lokacion: Rruga Mehë Uka, Prishtinë (afër Stadiumit Fadil Vokrri)</li>
                            <li>Kuzhina: Qebap, ushqim tradicional kosovar</li>
                            <li>Ofron ushqim shpejt dhe shërbim në stil fast-food</li>
                        </ul>
                    </div>
                    <div className="restaurant">
                        <strong>Pizza Palace</strong>
                        <ul>
                            <li>Lokacion: Rruga Fehmi Agani, Prishtinë (në afërsi të Stadiumit Fadil Vokrri)</li>
                            <li>Kuzhina: Pizza, ushqim italiane</li>
                            <li>Ofron pica të shumta dhe ushqim shpejt</li>
                        </ul>
                    </div>
                    <div className="restaurant">
                        <strong>Chill Out Bar</strong>
                        <ul>
                            <li>Lokacion: Rruga Fehmi Agani, Prishtinë (brenda Stadiumit Fadil Vokrri)</li>
                            <li>Kuzhina: Ushqim shpejt dhe pije</li>
                            <li>Ofron ambiente të këndshme për të pushuar dhe relaksuar</li>
                        </ul>
                    </div>
                    <div className="restaurant">
                        <strong>Burger King</strong>
                        <ul>
                            <li>Lokacion: Rruga Fehmi Agani, Prishtinë (në afërsi të Stadiumit Fadil Vokrri)</li>
                            <li>Kuzhina: Hamburgere dhe ushqim shpejt</li>
                            <li>Ofron një gamë të gjerë të hamburgereve dhe ushqimeve të shpejta</li>
                        </ul>
                    </div>
                </div>
                <p className="info">
                    <em>Ju rekomandoj të kontrolloni oraret e hapjes së këtyre vendëve dhe të verifikoni informacionin aktual përkatës pasi mund të ndryshojnë. Gjithashtu, ka edhe opsione të tjera për fast-food ose baret në zonën përreth Stadiumit Fadil Vokrri në Prishtinë, kështu që gjithmonë është mirë të shikoni për mundësitë e reja që mund të jenë hapur në afërsi.</em>
                </p>
            </div>
            <div className="image-container">
                <img src={resto} alt="resto.jpg" />
            </div>
        </div>
    );
};

export default Objektet;
