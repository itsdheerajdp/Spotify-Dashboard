import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BarChart from './components/BarChart';
import LineChart from './components/LineChart';
import PieChart from './components/PieChart';
import './App.css';

const App = () => {
  const [tracks, setTracks] = useState([]);
  const [filteredTracks, setFilteredTracks] = useState([]);

  const clientID = '75f92a6deb394a809a000fc9f9011725';
  const clientSecret = 'bd331c8fd8c7433c88cd8937eac73519';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tokenResponse = await axios.post('https://accounts.spotify.com/api/token', null, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(`${clientID}:${clientSecret}`)
          },
          params: {
            grant_type: 'client_credentials'
          }
        });

        const accessToken = tokenResponse.data.access_token;

        const tracksResponse = await axios.get('https://api.spotify.com/v1/search', {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          },
          params: {
            q: 'year:2023',
            type: 'track',
            market: 'IN',
            limit: 50
          }
        });

        setTracks(tracksResponse.data.tracks.items);
        setFilteredTracks(tracksResponse.data.tracks.items);
      } catch (error) {
        console.error('Error fetching data from Spotify API', error);
      }
    };

    fetchData();
  }, []);

  const handleFilterChange = (e) => {
    const query = e.target.value.toLowerCase();
    setFilteredTracks(tracks.filter(track => track.name.toLowerCase().includes(query)));
  };

  return (
    <div className="container">
      <h1 className="text-center my-4">Spotify Music Dashboard</h1>
      <input
        type="text"
        className="form-control mb-4"
        placeholder="Filter by track name"
        onChange={handleFilterChange}
      />
      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">Bar Chart</h2>
              <BarChart data={filteredTracks} />
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">Line Chart</h2>
              <LineChart data={filteredTracks} />
            </div>
          </div>
        </div>
        <div className="col-md-12 mb-4">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">Pie Chart</h2>
              <PieChart data={filteredTracks} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
