import { useState } from 'react';
import { Clock, Activity, ChevronDown, ChevronUp, Calendar } from 'lucide-react';

const patients = [
  { 
    id: 1, name: 'Ravi Kumar', age: 42, condition: 'Persistent Cough + Hypertension', time: '09:00 AM', dueToday: true,
    history: [
      { date: '12 Jan 2026', complaint: 'Follow-up for BP medication' },
      { date: '05 Nov 2025', complaint: 'Annual Health Checkup' }
    ]
  },
  { 
    id: 2, name: 'Ananya Sharma', age: 28, condition: 'Gestational Diabetes follow-up', time: '10:30 AM', 
    history: [
      { date: '15 Feb 2026', complaint: 'Initial GDM screening' },
      { date: '20 Jan 2026', complaint: 'Prenatal visit' }
    ]
  },
  { 
    id: 3, name: 'Mohan Das', age: 67, condition: 'Post-op cardiac review', time: '01:15 PM',
    history: [
      { date: '10 Feb 2026', complaint: 'Surgical recovery review' },
      { date: '15 Jan 2026', complaint: 'Coronary artery bypass post-op' }
    ]
  },
];

function getInitials(name) {
  return name.split(' ').map(n => n[0]).join('').substring(0, 2);
}

export default function PatientList({ onSelectPatient }) {
  const [expandedId, setExpandedId] = useState(null);

  const toggleHistory = (e, id) => {
    e.stopPropagation();
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="screen-container animate-fade-in">
      <div>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '6px', letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>Today's Patients</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', fontSize: '0.9375rem' }}>You have 3 upcoming appointments.</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {patients.map((patient) => (
          <div 
            key={patient.id} 
            className="card" 
            onClick={() => onSelectPatient(patient)}
            style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '14px' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ 
                  width: '52px', height: '52px', borderRadius: '50%', 
                  backgroundColor: 'var(--primary-glow)', 
                  display: 'flex', alignItems: 'center', justifyContent: 'center', 
                  color: 'var(--primary-color)', fontSize: '1.25rem', fontWeight: 'bold',
                  position: 'relative'
                }}>
                  {getInitials(patient.name)}
                  {patient.dueToday && (
                    <div style={{ position: 'absolute', top: '0', right: '0', width: '12px', height: '12px', backgroundColor: 'var(--danger-color)', borderRadius: '50%', border: '2px solid white' }} title="Due today" />
                  )}
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--text-primary)' }}>{patient.name}</h3>
                    {patient.dueToday && <span style={{ fontSize: '0.65rem', backgroundColor: '#fee2e2', color: '#b91c1c', padding: '1px 6px', borderRadius: '4px', fontWeight: 800 }}>DUE TODAY</span>}
                  </div>
                  <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', fontWeight: 500 }}>{patient.age} years old</span>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)', fontSize: '0.875rem', padding: '6px 10px', backgroundColor: 'var(--bg-color)', borderRadius: '20px', fontWeight: 600 }}>
                <Clock size={14} color="var(--primary-color)" />
                <span>{patient.time}</span>
              </div>
            </div>
            
            <div style={{ padding: '12px 14px', backgroundColor: 'var(--surface-hover)', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '10px', border: '1px solid var(--border-color)' }}>
              <Activity color="var(--success-color)" size={18} />
              <span style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--text-primary)' }}>{patient.condition}</span>
            </div>

            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '10px' }}>
              <button 
                onClick={(e) => toggleHistory(e, patient.id)}
                style={{ fontSize: '0.8125rem', color: 'var(--primary-color)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}
              >
                {expandedId === patient.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                {expandedId === patient.id ? 'Hide History' : 'View Patient History'}
              </button>

              {expandedId === patient.id && (
                <div className="timeline animate-fade-in">
                  {patient.history.map((visit, idx) => (
                    <div key={idx} className="timeline-item">
                      <div className="timeline-date">{visit.date}</div>
                      <div style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{visit.complaint}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
