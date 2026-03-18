import React from 'react';
import { Play, TrendingUp, FileText, Clock, AlertCircle, Calendar } from 'lucide-react';

function Dashboard({ onStartRecording }) {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const today = new Date().toLocaleDateString('en-US', options);

  return (
    <div className="screen-container animate-fade-in">
      <div className="dashboard-header">
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--primary-color)', marginBottom: '4px' }}>
          Good morning, Dr. Priya Nair
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Calendar size={14} />
          {today}
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginTop: '16px' }}>
        <div className="card" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <TrendingUp size={20} color="var(--primary-color)" />
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase' }}>Today's Consultations</p>
          <p style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>8</p>
        </div>
        
        <div className="card" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <FileText size={20} color="var(--success-color)" />
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase' }}>Notes Generated</p>
          <p style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>6</p>
        </div>

        <div className="card" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Clock size={20} color="var(--warning-color)" />
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase' }}>Time Saved Today</p>
          <p style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>2.4 hrs</p>
        </div>

        <div className="card" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <AlertCircle size={20} color="var(--danger-color)" />
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase' }}>Pending Reviews</p>
          <p style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>2</p>
        </div>
      </div>

      <div className="card" style={{ marginTop: '16px', marginBottom: '16px' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '12px' }}>Today's Schedule</h3>
        <div className="timeline" style={{ marginLeft: '12px' }}>
          <div className="timeline-item" style={{ position: 'relative', marginBottom: '16px' }}>
            <div style={{ position: 'absolute', left: '-23px', top: '2px', width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'var(--primary-color)' }}></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <p style={{ fontWeight: 600, fontSize: '0.9rem' }}>Ravi Kumar</p>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}>Follow-up</p>
              </div>
              <span style={{ fontSize: '0.75rem', fontWeight: 500, color: 'var(--primary-color)', backgroundColor: 'var(--primary-glow)', padding: '2px 8px', borderRadius: '12px' }}>10:00 AM</span>
            </div>
          </div>
          
          <div className="timeline-item" style={{ position: 'relative', marginBottom: '16px' }}>
            <div style={{ position: 'absolute', left: '-23px', top: '2px', width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'var(--primary-color)' }}></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <p style={{ fontWeight: 600, fontSize: '0.9rem' }}>Ananya Sharma</p>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}>Routine check</p>
              </div>
              <span style={{ fontSize: '0.75rem', fontWeight: 500, color: 'var(--primary-color)', backgroundColor: 'var(--primary-glow)', padding: '2px 8px', borderRadius: '12px' }}>11:30 AM</span>
            </div>
          </div>
          
          <div className="timeline-item" style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', left: '-23px', top: '2px', width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'var(--border-color)' }}></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <p style={{ fontWeight: 600, fontSize: '0.9rem' }}>Mohan Das</p>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}>Cardiac review</p>
              </div>
              <span style={{ fontSize: '0.75rem', fontWeight: 500, color: 'var(--text-secondary)', backgroundColor: 'var(--bg-color)', padding: '2px 8px', borderRadius: '12px' }}>2:00 PM</span>
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 'auto' }}>
        <button className="btn-primary" onClick={onStartRecording}>
          <Play size={20} fill="currentColor" />
          Start Recording
        </button>
      </div>
    </div>
  );
}

export default Dashboard;