
import React, { useEffect, useState } from "react";
import './LiveScore.css';
import Fixture from "./Fixture/Fixture";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import MatchesTable from "./Matches/MatchesTable";
import Footer from "../Footer/Footer";

const LiveScore = () =>{

    const [nextMatchData,setNextMatchData] = useState({});
    const [nextHomeTeam,setNextHomeTeam] = useState({});
    const [nextAwayTeam,setNextAwayTeam] = useState({});

    const [lastMatchData,setLastMatchData] = useState({});
    const [lastHomeTeam,setLastHomeTeam] = useState({});
    const [lastAwayTeam,setLastAwayTeam] = useState({});

    const [showFixture, setShowFixture] = useState('next');


    const showLastMatch = () => {
        setShowFixture('last')
        findClosestPreviousMatch({
            setLastHomeTeam,
            setLastAwayTeam,
            setLastMatchData,
        })

    }

    const showNextMatch = () => {
        setShowFixture('next')
        findClosestNextMatch({
            setNextHomeTeam,
            setNextAwayTeam,
            setNextMatchData,
        })

    }
 

    const findClosestNextMatch = async () => {

        const url = 'https://sportscore1.p.rapidapi.com/teams/5711/events?page=1';
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'aa301af0dbmsh1936a196495c187p1e487ajsn569a4f7f9764',
                'X-RapidAPI-Host': 'sportscore1.p.rapidapi.com'
            }
        };
        
        try {
            const response = await fetch(url, options);
            const result =
             await response.json()
             .then(res=> {
                console.log(res.data[0]);
                const fixtures = res.data;
                const [fixture] =closestNextFixture(fixtures);

                const updatedHomeTeam = {
                    id: fixture.away_team_id,
                    name:fixture.away_team?.name,
                    logo:fixture.away_team?.logo,
                    currentScore:fixture.away_score?.current,
                }

                const updatedAwayTeam = {
                    id: fixture.home_team_id,
                    name:fixture.home_team?.name,
                    logo:fixture.home_team?.logo,
                    currentScore:fixture.home_score?.current,
                }

                const updatedMatchData = {
                    status: fixture.status,
                    league: fixture.league?.name,
                    logo: fixture.league?.logo,
                    result: fixture.home_score?.current + "-" + fixture.away?.current || null,
                    roundInfo : fixture.round_info?.name,
                    start : fixture.start_at
                }

                setNextHomeTeam(team => ({
                    ...team,
                    ...updatedHomeTeam,
                }));
                
                setNextAwayTeam(team => ({
                    ...team,
                    ...updatedAwayTeam,
                }));

                setNextMatchData(nextMatchData => ({
                    ...nextMatchData,
                    ...updatedMatchData,                  
                }));

                console.log(updatedHomeTeam);
                console.log(updatedMatchData);

            });
        } catch (error) {
            console.error(error);
        }
        console.log("NextMatchData : ", nextMatchData);

    };



    const findClosestPreviousMatch = async () => {

        const url = 'https://sportscore1.p.rapidapi.com/teams/5711/events?page=1';
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'aa301af0dbmsh1936a196495c187p1e487ajsn569a4f7f9764',
                'X-RapidAPI-Host': 'sportscore1.p.rapidapi.com'
            }
        };
        
        try {
            const response = await fetch(url, options);
            const result =
             await response.json()
             .then(res=> {
                console.log(res.data[0]);
                const fixtures = res.data;
                const [fixture] =closestPreviousFixture(fixtures);

                const updatedHomeTeam = {
                    id: fixture.away_team_id,
                    name:fixture.away_team?.name,
                    logo:fixture.away_team?.logo,
                    currentScore:fixture.away_score?.current,
                }

                const updatedAwayTeam = {
                    id: fixture.home_team_id,
                    name:fixture.home_team?.name,
                    logo:fixture.home_team?.logo,
                    currentScore:fixture.home_score?.current,
                }

                const updatedMatchData = {
                    status: fixture.status,
                    league: fixture.league?.name,
                    logo: fixture.league?.logo,
                    result: fixture.home_score?.current + "-" + fixture.away?.current || null,
                    roundInfo : fixture.round_info?.name,
                    start : fixture.start_at
                }

                setLastHomeTeam(team => ({
                    ...team,
                    ...updatedHomeTeam,
                }));
                
                setLastAwayTeam(team => ({
                    ...team,
                    ...updatedAwayTeam,
                }));

                setLastMatchData(lastMatchData => ({
                    ...lastMatchData,
                    ...updatedMatchData,                  
                }));

                console.log(updatedHomeTeam);
                console.log(updatedMatchData);

            });
        } catch (error) {
            console.error(error);
        }
        console.log("lastMatchData : ", lastMatchData);
    };



    const closestNextFixture = fixtures => {
        const now = new Date();
        let closestDate = Infinity;
        let closestFixture;

        fixtures.forEach(fixture => {
            const fixtureDate = new Date(fixture.start_at)
            if(fixtureDate >= now && fixtureDate < closestDate){
                closestDate =fixtureDate;
                closestFixture = fixture;
            }
        });
        console.log("closetData :", closestDate);
        console.log("closestFixture :", closestFixture);

        return [closestFixture];
    }

    const closestPreviousFixture = fixtures => {
        const now = new Date();
        let closestDate = -Infinity;
        let closestFixture;

        fixtures.forEach(fixture => {
            const fixtureDate = new Date(fixture.start_at)
            if(fixtureDate < now && fixtureDate >= closestDate){
                closestDate =fixtureDate;
                closestFixture = fixture;
            }
        });
        console.log("closetData :", closestDate);
        console.log("closestFixture :", closestFixture);

        return [closestFixture];
    }




    useEffect(() => {
        console.log(nextMatchData);
    },[nextMatchData]);

    useEffect(() => {
        showLastMatch();
    }, []);


    return (

        <div>

            <div className="events">
                    <h2 data-aos='fade-right'>LiveScore</h2>
            </div>

            
            <div className="container">
            

            <section className="live-score">

       
            <div className="round-controls">
                
                <MdNavigateBefore
                className={"round" + (showFixture === "last" ? "hide-match" : "") }
                onClick={showLastMatch}
                />

                <MdNavigateNext
                className={"round" + (showFixture === "next" ? "hide-match" : "") }
                onClick={showNextMatch}
                />    
            </div>



            <div className="live-container">

            {
                showFixture === "next" ?

                    <Fixture
                    matchData={nextMatchData}
                    homeTeam={nextHomeTeam}
                    awayTeam={nextAwayTeam}
                    />
                    :
                    <Fixture
                    matchData={lastMatchData}
                    homeTeam={lastHomeTeam}
                    awayTeam={lastAwayTeam}
                    />
            }

            </div>
            </section>

            <MatchesTable />

        </div>

        
        <Footer />

        </div>

        
     
    )
}




export default LiveScore;
