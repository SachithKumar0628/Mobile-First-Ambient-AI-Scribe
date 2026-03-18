import React, { useState } from 'react';
import { ChevronLeft, FileText, Activity, Clock, Download, Plus, HeartPulse } from 'lucide-react';

const PatientProfile = ({ patient, onBack, onStartConsultation }) => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="patient-profile">
      <header className="page-header">
        <button className="back-btn" onClick={onBack}>
          <ChevronLeft size={24} />
        </button>
        <h2 className="page-title">Patient Profile</h2>
        <div style={{ width: 44 }}></div> {/* spacer */}
      </header>

      <div className="profile-header" style={{ display: 'flex', alignItems: 'center', padding: '20px 16px', gap: '16px' }}>
        <div className="avatar large" style={{ width: '64px', height: '64px', borderRadius: '32px', backgroundColor: 'var(--primary-color)', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '24px', fontWeight: 'bold' }}>{patient?.name?.[0] || 'U'}</div>
        <div className="profile-info">
          <h3 style={{ margin: '0 0 4px 0', fontSize: '1.2rem' }}>{patient?.name || 'Unknown Patient'}</h3>
          <p style={{ margin: '0 0 8px 0', color: '#666', fontSize: '0.9rem' }}>{patient?.age || 'N/A'} yrs • Blood Group: <span className="highlight-badge" style={{ color: '#e74c3c', fontWeight: 'bold' }}>B+</span></p>
          <div className="allergies" style={{ fontSize: '0.9rem' }}>
            <span className="label" style={{ color: '#666', marginRight: '8px' }}>Allergies:</span> 
            <span className="allergy-tag" style={{ backgroundColor: '#feece5', color: '#e74c3c', padding: '2px 8px', borderRadius: '12px', fontSize: '0.8rem' }}>Penicillin</span>
          </div>
        </div>
      </div>

      <div className="tabs" style={{ display: 'flex', borderBottom: '1px solid #ddd', padding: '0 16px', gap: '16px' }}>
        <button 
          className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
          style={{ background: 'none', border: 'none', padding: '12px 0', borderBottom: activeTab === 'overview' ? '2px solid var(--primary-color)' : '2px solid transparent', color: activeTab === 'overview' ? 'var(--primary-color)' : '#666', fontWeight: activeTab === 'overview' ? '600' : '400', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
        >
          <Activity size={18} /> Overview
        </button>
        <button 
          className={`tab ${activeTab === 'history' ? 'active' : ''}`}
          onClick={() => setActiveTab('history')}
          style={{ background: 'none', border: 'none', padding: '12px 0', borderBottom: activeTab === 'history' ? '2px solid var(--primary-color)' : '2px solid transparent', color: activeTab === 'history' ? 'var(--primary-color)' : '#666', fontWeight: activeTab === 'history' ? '600' : '400', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
        >
          <Clock size={18} /> Visit History
        </button>
        <button 
          className={`tab ${activeTab === 'documents' ? 'active' : ''}`}
          onClick={() => setActiveTab('documents')}
          style={{ background: 'none', border: 'none', padding: '12px 0', borderBottom: activeTab === 'documents' ? '2px solid var(--primary-color)' : '2px solid transparent', color: activeTab === 'documents' ? 'var(--primary-color)' : '#666', fontWeight: activeTab === 'documents' ? '600' : '400', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
        >
          <FileText size={18} /> Documents
        </button>
      </div>

      <div className="tab-content" style={{ padding: '16px' }}>
        {activeTab === 'overview' && (
          <div className="overview-tab">
            <div className="card vitals-card">
              <div className="card-header">
                <h4><HeartPulse size={18} style={{ marginRight: '8px', verticalAlign: '-4px' }}/> Vitals Trend (Last 3 BP)</h4>
              </div>
              <div className="vitals-chart" style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end', height: '140px', paddingBottom: '10px', borderBottom: '1px solid #eaeaea' }}>
                <div className="bar-group" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                  <div className="bar-labels" style={{ fontSize: '0.8rem', fontWeight: '500' }}>142/90</div>
                  <div className="bar" style={{ height: '80px', width: '32px', backgroundColor: '#e74c3c', borderRadius: '4px 4px 0 0' }}></div>
                  <div className="bar-month" style={{ fontSize: '0.85rem', color: '#666' }}>Jan</div>
                </div>
                <div className="bar-group" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                  <div className="bar-labels" style={{ fontSize: '0.8rem', fontWeight: '500' }}>139/88</div>
                  <div className="bar" style={{ height: '70px', width: '32px', backgroundColor: '#f39c12', borderRadius: '4px 4px 0 0' }}></div>
                  <div className="bar-month" style={{ fontSize: '0.85rem', color: '#666' }}>Feb</div>
                </div>
                <div className="bar-group" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                  <div className="bar-labels" style={{ fontSize: '0.8rem', fontWeight: '500' }}>138/88</div>
                  <div className="bar" style={{ height: '65px', width: '32px', backgroundColor: '#2ecc71', borderRadius: '4px 4px 0 0' }}></div>
                  <div className="bar-month" style={{ fontSize: '0.85rem', color: '#666' }}>Mar</div>
                </div>
              </div>
              <p className="trend-note" style={{ color: '#2ecc71', fontSize: '0.85rem', marginTop: '12px', textAlign: 'center' }}>
                Improving trend over last 3 months
              </p>
            </div>

            <div className="card medications-card" style={{ marginTop: '16px' }}>
              <div className="card-header">
                <h4>Current Medications</h4>
              </div>
              <ul className="medication-list" style={{ listStyle: 'none', padding: 0 }}>
                <li style={{ padding: '10px 0', borderBottom: '1px solid #efefef' }}>Atorvastatin 10mg</li>
                <li style={{ padding: '10px 0' }}>Salbutamol inhaler</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="history-tab" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="timeline-card card" style={{ padding: '16px', borderLeft: '4px solid var(--primary-color)' }}>
              <div className="timeline-date" style={{ fontSize: '0.85rem', color: '#666', marginBottom: '4px' }}>Mar 10, 2025</div>
              <h4 style={{ margin: '0 0 8px 0' }}>Follow-up: Hypertension</h4>
              <p style={{ margin: 0, fontSize: '0.9rem', color: '#444', lineHeight: 1.4 }}>BP improved. Advised to continue current medication and reduce sodium intake.</p>
            </div>
            <div className="timeline-card card" style={{ padding: '16px', borderLeft: '4px solid var(--primary-color)' }}>
              <div className="timeline-date" style={{ fontSize: '0.85rem', color: '#666', marginBottom: '4px' }}>Feb 05, 2025</div>
              <h4 style={{ margin: '0 0 8px 0' }}>URI / Cough</h4>
              <p style={{ margin: 0, fontSize: '0.9rem', color: '#444', lineHeight: 1.4 }}>Prescribed short course of antibiotics and cough syrup. Chest sounds clean.</p>
            </div>
            <div className="timeline-card card" style={{ padding: '16px', borderLeft: '4px solid var(--primary-color)' }}>
              <div className="timeline-date" style={{ fontSize: '0.85rem', color: '#666', marginBottom: '4px' }}>Jan 12, 2025</div>
              <h4 style={{ margin: '0 0 8px 0' }}>Initial Consultation</h4>
              <p style={{ margin: 0, fontSize: '0.9rem', color: '#444', lineHeight: 1.4 }}>Diagnosed with mild hypertension. Started on Atorvastatin. Ordered routine blood work.</p>
            </div>
          </div>
        )}

        {activeTab === 'documents' && (
          <div className="documents-tab" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div className="document-item card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px' }}>
              <div className="doc-info" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <FileText size={28} color="#3498db" />
                <div className="doc-details">
                  <h4 style={{ margin: '0 0 4px 0', fontSize: '1rem' }}>Chest X-Ray Jan 2025.pdf</h4>
                  <span style={{ fontSize: '0.8rem', color: '#7f8c8d' }}>2.4 MB • Jan 15, 2025</span>
                </div>
              </div>
              <button className="icon-btn" style={{ background: 'none', border: 'none', color: '#666', cursor: 'pointer' }}><Download size={20} /></button>
            </div>
            <div className="document-item card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px' }}>
              <div className="doc-info" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <FileText size={28} color="#3498db" />
                <div className="doc-details">
                  <h4 style={{ margin: '0 0 4px 0', fontSize: '1rem' }}>Blood Report Feb 2025.pdf</h4>
                  <span style={{ fontSize: '0.8rem', color: '#7f8c8d' }}>1.1 MB • Feb 06, 2025</span>
                </div>
              </div>
              <button className="icon-btn" style={{ background: 'none', border: 'none', color: '#666', cursor: 'pointer' }}><Download size={20} /></button>
            </div>
          </div>
        )}
      </div>

      <div style={{ position: 'fixed', bottom: 80, right: 20 }}>
        <button 
          className="btn-primary" 
          style={{ width: 56, height: 56, borderRadius: '28px', padding: 0, boxShadow: '0 4px 10px rgba(74, 144, 226, 0.4)' }}
          onClick={onStartConsultation}
        >
          <Plus size={24} />
        </button>
      </div>
    </div>
  );
};

export default PatientProfile;