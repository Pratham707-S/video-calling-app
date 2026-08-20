import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ZeoCloud = () => {
  const [name, setName] = useState('Pratham');
  const [roomId, setRoomId] = useState('');
  const navigate = useNavigate();

  const handleJoinRoom = (e) => {
    if (e) e.preventDefault();
    if (!roomId.trim()) return;
    const userName = name.trim() || 'Pratham';
    navigate(`/room/${roomId.trim()}?name=${encodeURIComponent(userName)}`);
  };

  const handleCreateRandomRoom = () => {
    const randomId = Math.random().toString(36).substring(2, 9);
    const userName = name.trim() || 'Pratham';
    navigate(`/room/${randomId}?name=${encodeURIComponent(userName)}`);
  };

  return (
    <div className="app-container">
      <div className="background-glow" />

      <div className="join-card">
        <div className="brand-badge">
          <span /> KPvideo call 
        </div>

        <h1>KPcall</h1>
        <p className="subtitle">
          Simple, secure, and crystal-clear video calling. Enter your name and room code to start.
        </p>

        <form onSubmit={handleJoinRoom} className="form-group">
          <div className="input-group">
            <label className="input-label">Your Name</label>
            <input
              type="text"
              className="room-input"
              placeholder="Enter your name (e.g. Pratham)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label className="input-label">Room Code</label>
            <input
              type="text"
              className="room-input"
              placeholder="Enter Room Code (e.g. room-101)"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="btn-primary"
            disabled={!roomId.trim()}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 10l5-5v14l-5-5M4 19h11a2 2 0 002-2V7a2 2 0 00-2-2H4a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Join Meeting
          </button>
        </form>

        <div className="divider">OR</div>

        <button type="button" className="btn-secondary" onClick={handleCreateRandomRoom}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Create Instant Room
        </button>
      </div>
    </div>
  );
};

export default ZeoCloud;
