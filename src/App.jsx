import { useState } from 'react';
import './App.css';
import Dashboard from './components/Dashboard';
import PatientList from './components/PatientList';
import Consultation from './components/Consultation';
import SoapNoteView from './components/SoapNoteView';
import PatientProfile from './components/PatientProfile';
import { Activity, Home, Users, Mic, Clock, Settings, ShieldCheck, Battery, Wifi } from 'lucide-react';

function App() {
  const [activeScreen, setActiveScreen] = useState('dashboard');
  const [selectedPatient, setSelectedPatient] = useState(null);

  const navigateTo = (screen, data = null) => {
    if (data && (screen === 'consultation' || screen === 'patientProfile')) setSelectedPatient(data);
    setActiveScreen(screen);
  };

  return (
    <>
      <div className="status-bar">
        <span>9:41 AM</span>
        <div className="status-bar-icons">
          <Wifi size={14} strokeWidth={2.5} />
          <Battery size={16} fill="currentColor" strokeWidth={1.5} />
        </div>
      </div>
      <div className="secure-header">
        <ShieldCheck size={12} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} />
        Secure · HIPAA compliant · End-to-end encrypted
      </div>
      <div style={{ height: '1px', backgroundColor: '#e2e8f0', width: '100%' }}></div>
      <header className="app-header">
        <div className="header-left">
          <Activity color="var(--primary-color)" size={24} strokeWidth={2.5} />
          <h1 className="header-title">MedScribe AI Pro</h1>
        </div>
        <div className="header-doctor">
          Dr. Smith
        </div>
      </header>

      {activeScreen === 'dashboard' && (
        <Dashboard onStartRecording={() => navigateTo('patientList')} />
      )}
      
      {activeScreen === 'patientList' && (
        <PatientList onSelectPatient={(patient) => navigateTo('patientProfile', patient)} />
      )}
      
      {activeScreen === 'patientProfile' && (
        <PatientProfile 
          patient={selectedPatient}
          onBack={() => navigateTo('patientList')}
          onStartConsultation={() => navigateTo('consultation', selectedPatient)}
        />
      )}
      
      {activeScreen === 'consultation' && (
        <Consultation 
          patient={selectedPatient} 
          onGenerateSoap={(vitals) => {
            setSelectedPatient(prev => ({ ...prev, vitals }));
            navigateTo('soapNote');
          }}
          onBack={() => navigateTo('patientList')}
        />
      )}
      
      {activeScreen === 'soapNote' && (
        <SoapNoteView 
          patient={selectedPatient}
          onBack={() => navigateTo('patientList')} 
        />
      )}

      <nav className="bottom-bar">
        <button
          className={`tab-btn ${activeScreen === 'dashboard' ? 'active' : ''}`}
          onClick={() => navigateTo('dashboard')}
        >
          <Home size={22} fill={activeScreen === 'dashboard' ? 'currentColor' : 'none'} />
          <span>Home</span>
        </button>
        <button
          className={`tab-btn ${activeScreen === 'patientList' ? 'active' : ''}`}
          onClick={() => navigateTo('patientList')}
        >
          <Users size={22} fill={activeScreen === 'patientList' ? 'currentColor' : 'none'} />
          <span>Patients</span>
        </button>
        <button
          className={`tab-btn ${activeScreen === 'consultation' ? 'active' : ''}`}
          onClick={() => {
            if (selectedPatient) navigateTo('consultation');
          }}
        >
          <Mic size={22} fill={activeScreen === 'consultation' ? 'currentColor' : 'none'} />
          <span>Record</span>
        </button>
        <button className="tab-btn" style={{ opacity: 0.5 }}>
          <Clock size={22} />
          <span>History</span>
        </button>
        <button className="tab-btn" style={{ opacity: 0.5 }}>
          <Settings size={22} />
          <span>Settings</span>
        </button>
      </nav>
    </>
  );
}

export default App;
