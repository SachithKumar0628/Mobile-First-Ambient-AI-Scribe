import React from 'react';
import { Play, TrendingUp, FileText, Clock, AlertCircle, Calendar } from 'lucide-react';

function Dashboard({ onStartRecording }) {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const today = new Date().toLocaleDateString('en-US', options);

  return (
    <div className="screen-container animate-fade-in">
      <div className="dashboard-header">
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0C447C', marginBottom: '4px' }}>
          Good morning, Dr. Priya Nair
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Calendar size={14} />
          {today}
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginTop: '16px' }}>
        <div className="card" style={{ borderLeft: '4px solid var(--primary-color)', padding: '12px', display: 'flex', flexDirection: 'column', gap: '4px', height: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <TrendingUp size={20} color="var(--primary-color)" />
          </div>
          <p style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase', margin: 0 }}>Today's Consultations</p>
          <p style={{ fontSize: '32px', fontWeight: 700, margin: 0, lineHeight: 1 }}>8</p>
          <p style={{ fontSize: '10px', color: 'var(--success-color)', margin: 0, fontWeight: 500 }}>↑ 2 from yesterday</p>
        </div>
        
        <div className="card" style={{ borderLeft: '4px solid var(--success-color)', padding: '12px', display: 'flex', flexDirection: 'column', gap: '4px', height: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <FileText size={20} color="var(--success-color)" />
          </div>
          <p style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase', margin: 0 }}>Notes Generated</p>
          <p style={{ fontSize: '32px', fontWeight: 700, margin: 0, lineHeight: 1 }}>6</p>
          <p style={{ fontSize: '10px', color: 'var(--success-color)', margin: 0, fontWeight: 500 }}>↑ 1 from yesterday</p>
        </div>

        <div className="card" style={{ borderLeft: '4px solid var(--warning-color)', padding: '12px', display: 'flex', flexDirection: 'column', gap: '4px', height: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Clock size={20} color="var(--warning-color)" />
          </div>
          <p style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase', margin: 0 }}>Time Saved Today</p>
          <p style={{ fontSize: '32px', fontWeight: 700, margin: 0, lineHeight: 1 }}>2.4 hrs</p>
          <p style={{ fontSize: '10px', color: 'var(--success-color)', margin: 0, fontWeight: 500 }}>↑ 0.3 hrs</p>
        </div>

        <div className="card" style={{ borderLeft: '4px solid var(--danger-color)', padding: '12px', display: 'flex', flexDirection: 'column', gap: '4px', height: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <AlertCircle size={20} color="var(--danger-color)" />
          </div>
          <p style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase', margin: 0 }}>Pending Reviews</p>
          <p style={{ fontSize: '32px', fontWeight: 700, margin: 0, lineHeight: 1 }}>2</p>
          <p style={{ fontSize: '10px', color: 'var(--success-color)', margin: 0, fontWeight: 500 }}>↓ 1 resolved</p>
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
            <div style={{ position: 'absolute', left: '-23px', top: '2px', width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'var(--success-color)' }}></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <p style={{ fontWeight: 600, fontSize: '0.9rem' }}>Ananya Sharma</p>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}>Routine check</p>
              </div>
              <span style={{ fontSize: '0.75rem', fontWeight: 500, color: 'var(--success-color)', backgroundColor: 'rgba(16, 185, 129, 0.1)', padding: '2px 8px', borderRadius: '12px' }}>11:30 AM</span>
            </div>
          </div>
          
          <div className="timeline-item" style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', left: '-23px', top: '2px', width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'var(--warning-color)' }}></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <p style={{ fontWeight: 600, fontSize: '0.9rem' }}>Mohan Das</p>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}>Cardiac review</p>
              </div>
              <span style={{ fontSize: '0.75rem', fontWeight: 500, color: 'var(--warning-color)', backgroundColor: 'rgba(245, 158, 11, 0.1)', padding: '2px 8px', borderRadius: '12px' }}>2:00 PM</span>
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', marginBottom: '16px', paddingBottom: '4px', whiteSpace: 'nowrap', msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
        <div style={{ backgroundColor: '#e2e8f0', color: 'var(--text-primary)', padding: '6px 12px', borderRadius: '16px', fontSize: '0.8rem', fontWeight: 600 }}>Avg note time: 1.8s</div>
        <div style={{ backgroundColor: '#e2e8f0', color: 'var(--text-primary)', padding: '6px 12px', borderRadius: '16px', fontSize: '0.8rem', fontWeight: 600 }}>Accuracy: 98%</div>
        <div style={{ backgroundColor: '#e2e8f0', color: 'var(--text-primary)', padding: '6px 12px', borderRadius: '16px', fontSize: '0.8rem', fontWeight: 600 }}>This week: 24 notes</div>
      </div>

      <div style={{ marginBottom: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>Recent Notes</h3>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          
          <div className="card" style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem' }}>
                <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Ravi Kumar</span>
                <span style={{ color: 'var(--text-secondary)' }}>·</span>
                <span style={{ color: 'var(--text-secondary)' }}>Today 9:45 AM</span>
              </div>
              <span style={{ fontSize: '0.7rem', color: 'var(--success-color)', backgroundColor: 'rgba(16, 185, 129, 0.1)', padding: '2px 6px', borderRadius: '4px', fontWeight: 700 }}>Complete</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', margin: 0 }}>"Chronic cough, BP elevated"</p>
              <button style={{ color: 'var(--primary-color)', fontSize: '0.8rem', fontWeight: 600 }}>View</button>
            </div>
          </div>

          <div className="card" style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem' }}>
                <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Ananya Sharma</span>
                <span style={{ color: 'var(--text-secondary)' }}>·</span>
                <span style={{ color: 'var(--text-secondary)' }}>Yesterday</span>
              </div>
              <span style={{ fontSize: '0.7rem', color: 'var(--success-color)', backgroundColor: 'rgba(16, 185, 129, 0.1)', padding: '2px 6px', borderRadius: '4px', fontWeight: 700 }}>Complete</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', margin: 0 }}>"Glucose levels stable"</p>
              <button style={{ color: 'var(--primary-color)', fontSize: '0.8rem', fontWeight: 600 }}>View</button>
            </div>
          </div>

        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
        <button className="btn-primary" onClick={onStartRecording} style={{ width: 'auto', padding: '10px 24px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', fontSize: '0.95rem', borderRadius: '24px' }}>
          <Play size={18} fill="currentColor" />
          Start Recording
        </button>
      </div>
    </div>
  );
}

export default Dashboard;