import React, { useState } from 'react';
import "./styles.css"

const TournamentApp = () => {
  const [tournaments, setTournaments] = useState([]);
  const [participants, setParticipants] = useState([]);

  const [tournamentName, setTournamentName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [participantName, setParticipantName] = useState('');

  const handleCreateTournament = () => {
    const newTournament = {
      id: tournaments.length + 1,
      name: tournamentName,
      startDate,
      endDate,
      participants: [],
      status: 'Upcoming',
    };
    setTournaments([...tournaments, newTournament]);
    clearTournamentForm();
  };

  const handleEditTournament = (id, updatedData) => {
    const updatedTournaments = tournaments.map(tournament =>
      tournament.id === id ? { ...tournament, ...updatedData } : tournament
    );
    setTournaments(updatedTournaments);
    clearTournamentForm();
  };

  const handleDeleteTournament = (id) => {
    const updatedTournaments = tournaments.filter(tournament => tournament.id !== id);
    setTournaments(updatedTournaments);
  };

  const handleCreateParticipant = (tournamentId) => {
    const newParticipant = {
      id: participants.length + 1,
      name: participantName,
    };
    const updatedTournaments = tournaments.map(tournament =>
      tournament.id === tournamentId
        ? { ...tournament, participants: [...tournament.participants, newParticipant] }
        : tournament
    );
    setTournaments(updatedTournaments);
    clearParticipantForm();
  };

  const handleDeleteParticipant = (tournamentId, participantId) => {
    const updatedTournaments = tournaments.map(tournament =>
      tournament.id === tournamentId
        ? {
            ...tournament,
            participants: tournament.participants.filter(participant => participant.id !== participantId),
          }
        : tournament
    );
    setTournaments(updatedTournaments);
  };

  const clearTournamentForm = () => {
    setTournamentName('');
    setStartDate('');
    setEndDate('');
  };

  const clearParticipantForm = () => {
    setParticipantName('');
  };

  return (
    <div className='Tournament'>
      <h1>indiGG Tournament App</h1>
      <div>
        <h2>Create Tournament</h2>
        <input
          type="text"
          placeholder="Enter Tournament Name..."
          value={tournamentName}
          onChange={(e) => setTournamentName(e.target.value)}
        />
        <br/>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <br/>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <br/>
        <button onClick={handleCreateTournament}>Create</button>
      </div>
      <div>
        <h2>Tournaments</h2>
        <ul>
          {tournaments.map(tournament => (
            <li key={tournament.id}>
              <h3>{tournament.name}</h3>
              <p>Start Date: {tournament.startDate}</p>
              <p>End Date: {tournament.endDate}</p>
              <p>Status: {tournament.status}</p>
              <button onClick={() => handleEditTournament(tournament.id, { status: 'Ongoing' })}>
                Start Tournament
              </button>
              <br/>
              <button onClick={() => handleEditTournament(tournament.id, { status: 'Completed' })}>
                End Tournament
              </button>
              <br/>
              <button onClick={() => handleDeleteTournament(tournament.id)}>Delete</button>
              <div>
                <h4>Participants</h4>
                <ul>
                  {tournament.participants.map(participant => (
                    <li key={participant.id}>
                      {participant.name}
                      <button onClick={() => handleDeleteParticipant(tournament.id, participant.id)}>
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
                <input
                  type="text"
                  placeholder="Participant Name"
                  value={participantName}
                  onChange={(e) => setParticipantName(e.target.value)}
                />
                <button onClick={() => handleCreateParticipant(tournament.id)}>
                  Add Participant
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TournamentApp;
