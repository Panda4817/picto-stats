import React from 'react';
import './App.css';
import RoomStats from './components/roomStats/RoomStats';
import WordCloud from './components/wordCloud/WordCloud';


function App() {

  return (
    <div className="container">
      <div className='section'>
        <h1>Rooms and number of players in Picto</h1>
        <div className='content'>
          <RoomStats />
        </div>

      </div>
      <br />

      <div className='section'>
        <h1>Words drawn in Picto</h1>
        <div className='content'>
          <WordCloud />
        </div>
      </div>
    </div>
  );
}

export default App;
