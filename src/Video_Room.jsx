import React, { useEffect, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

const Video_Room = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const meetingContainerRef = useRef(null);

  // Extract user name from query string (e.g. ?name=Pratham) or default to 'Pratham'
  const searchParams = new URLSearchParams(location.search);
  const userName = searchParams.get('name') || 'Pratham';

  useEffect(() => {
    let zpInstance = null;

    const myMeeting = async () => {
      if (!meetingContainerRef.current || !id) return;

      const appID = 1602398954;
      const serverSecret = "812dd5396537a50c72fd442ab897646b";
      
      // Stable user ID generated with user's name
      const userID = `user_${userName.toLowerCase().replace(/[^a-z0-9]/g, '')}_${Math.floor(Math.random() * 1000)}`;

      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        id,
        userID,
        userName
      );

      zpInstance = ZegoUIKitPrebuilt.create(kitToken);

      zpInstance.joinRoom({
        container: meetingContainerRef.current,
        sharedLinks: [
          {
            name: 'Copy Room Link',
            url: `${window.location.origin}/room/${id}?name=Guest`,
          },
        ],
        scenario: {
          mode: ZegoUIKitPrebuilt.OneONoneCall,
        },
        showPreJoinView: true,
        onLeaveRoom: () => {
          navigate('/');
        },
      });
    };

    myMeeting();

    return () => {
      if (zpInstance && typeof zpInstance.destroy === 'function') {
        try {
          zpInstance.destroy();
        } catch (e) {
          console.log('Cleanup error:', e);
        }
      }
    };
  }, [id, userName, navigate]);

  return (
    <div className="video-room-wrapper">
      <div className="video-room-header">
        <h2>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#09090b" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 10l5-5v14l-5-5M4 19h11a2 2 0 002-2V7a2 2 0 00-2-2H4a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          KPcall &bull; Room Code: <span className="room-tag">{id}</span>
        </h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#475569' }}>
            User: <strong style={{ color: '#09090b' }}>{userName}</strong>
          </span>
          <button className="leave-btn" onClick={() => navigate('/')}>
            Leave Call
          </button>
        </div>
      </div>
      <div className="video-room-content">
        <div ref={meetingContainerRef} style={{ width: '100%', height: '100%' }} />
      </div>
    </div>
  );
};

export default Video_Room;