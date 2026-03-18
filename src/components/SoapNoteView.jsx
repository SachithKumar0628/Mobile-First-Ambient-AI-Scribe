import { useState, useEffect } from 'react';
import { ArrowLeft, CheckCircle, Copy, Download, Languages, Check, AlertTriangle, Calendar, BarChart2, Loader2, Share2, X, Send, Database, UserPlus } from 'lucide-react';

export default function SoapNoteView({ patient, onBack }) {
  const [showKannada, setShowKannada] = useState(false);
  const [showToast, setShowToast] = useState(false);
  
  const [showShareModal, setShowShareModal] = useState(false);
  const [selectedShareOption, setSelectedShareOption] = useState(null);
  const [isEmrSyncing, setIsEmrSyncing] = useState(false);
  const [emrSuccess, setEmrSuccess] = useState(false);
  
  const [loadingPhase, setLoadingPhase] = useState(0); // 0=none, 1='Analyzing...', 2='Identifying...', 3='Structuring...', 4='Done'
  const [revealedSections, setRevealedSections] = useState({
    s: false, o: false, a: false, p: false
  });

  const data = {
    subjective: "Patient is a 45-year-old male presenting with a dry cough for 3 weeks, worse at night, and chest tightness. Denies fever but reports shortness of breath on exertion. Former smoker with a 15 pack-year history.",
    objective: `Vitals:\nBP: ${patient?.vitals?.bp || '138/88'}\nSpO2: ${patient?.vitals?.spo2 || '96'}%\nHR: ${patient?.vitals?.hr || '82'} bpm\nTemp: ${patient?.vitals?.temp || '98.4'} °F\nWeight: ${patient?.vitals?.weight || '74'} kg`,
    assessment: "1. Persistent dry cough with chest tightness and exertional dyspnea, suggestive of reactive airway disease or asthma exacerbation.\n2. History of tobacco use, raising suspicion for early COPD.",
    plan: "- Order chest X-ray and spirometry to evaluate baseline lung function.\n- Start Salbutamol inhaler PRN for symptomatic relief of chest tightness and dyspnea.\n- Discuss smoking cessation strategies at next visit.\n- Follow up in two weeks after imaging and PFT results are available."
  };

  useEffect(() => {
    // Start fake loading sequence
    setLoadingPhase(1);
    
    const timeouts = [];
    
    timeouts.push(setTimeout(() => setLoadingPhase(2), 500));
    timeouts.push(setTimeout(() => setLoadingPhase(3), 1000));
    timeouts.push(setTimeout(() => setLoadingPhase(4), 1400));
    
    // Reveal sections one by one with 0.3s delay
    timeouts.push(setTimeout(() => setRevealedSections(prev => ({...prev, s: true})), 1400));
    timeouts.push(setTimeout(() => setRevealedSections(prev => ({...prev, o: true})), 1700));
    timeouts.push(setTimeout(() => setRevealedSections(prev => ({...prev, a: true})), 2000));
    timeouts.push(setTimeout(() => setRevealedSections(prev => ({...prev, p: true})), 2300));
    
    timeouts.push(setTimeout(() => {
      setShowToast(true);
      timeouts.push(setTimeout(() => setShowToast(false), 3000));
    }, 3000));

    return () => timeouts.forEach(clearTimeout);
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="screen-container animate-fade-in" style={{ display: 'flex', flexDirection: 'column' }}>
      {showToast && (
        <div className="toast">
          <Check size={18} /> Saved to EMR
        </div>
      )}

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '8px' }}>
        <button className="icon-btn no-print" onClick={onBack}>
          <ArrowLeft size={22} color="var(--text-primary)" />
        </button>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, letterSpacing: '-0.01em', color: 'var(--text-primary)' }}>SOAP Note</h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', fontWeight: 600 }}>{patient?.name}</p>
        </div>
        <div className="no-print" style={{ marginLeft: 'auto', display: 'flex', gap: '8px' }}>
            <button className="icon-btn" style={{ color: 'var(--primary-color)' }} onClick={() => setShowShareModal(true)} title="Share Options">
              <Share2 size={20} />
            </button>
            <button className="icon-btn" style={{ color: 'var(--primary-color)' }} onClick={() => setShowKannada(!showKannada)} title="Translate">
              <Languages size={20} />
            </button>
            <button className="icon-btn" style={{ color: 'var(--primary-color)' }} onClick={handlePrint} title="Export PDF">
              <Download size={20} />
            </button>
        </div>
      </div>

      {loadingPhase < 4 ? (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px', animation: 'fadeIn 0.3s ease' }}>
          <h3 style={{ fontSize: '1.2rem', color: 'var(--primary-color)', fontWeight: 600, animation: 'pulse-ring 2s infinite' }}>
            {loadingPhase === 1 && "Analyzing transcript..."}
            {loadingPhase === 2 && "Identifying clinical entities..."}
            {loadingPhase === 3 && "Structuring SOAP format..."}
          </h3>
        </div>
      ) : (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', flex: 1, marginBottom: '16px' }}>
            
            {/* Subjective */}
            <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '14px', borderTop: '4px solid var(--soap-s)', opacity: revealedSections.s ? 1 : 0, transition: 'opacity 0.6s ease', visibility: revealedSections.s ? 'visible' : 'hidden' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h3 style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    <span style={{ color: 'var(--soap-s)' }}>S</span>ubjective
                </h3>
                <span className="confidence-badge">98% AI</span>
              </div>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: 1.6, flex: 1, backgroundColor: 'var(--bg-color)', padding: '10px', borderRadius: '8px', overflowY: 'auto', border: '1px solid var(--border-color)' }}>
                {data.subjective}
              </p>
            </div>

            {/* Objective */}
            <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '14px', borderTop: '4px solid var(--soap-o)', opacity: revealedSections.o ? 1 : 0, transition: 'opacity 0.6s ease', visibility: revealedSections.o ? 'visible' : 'hidden' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h3 style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    <span style={{ color: 'var(--soap-o)' }}>O</span>bjective
                </h3>
                <span className="confidence-badge">97% AI</span>
              </div>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: 1.6, flex: 1, backgroundColor: 'var(--bg-color)', padding: '10px', borderRadius: '8px', overflowY: 'auto', border: '1px solid var(--border-color)' }}>
                {data.objective}
              </p>
            </div>

            {/* Assessment */}
            <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '14px', borderTop: '4px solid var(--soap-a)', opacity: revealedSections.a ? 1 : 0, transition: 'opacity 0.6s ease', visibility: revealedSections.a ? 'visible' : 'hidden' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h3 style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    <span style={{ color: 'var(--soap-a)' }}>A</span>ssessment
                </h3>
                <span className="confidence-badge">94% AI</span>
              </div>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: 1.6, flex: 1, backgroundColor: 'var(--bg-color)', padding: '10px', borderRadius: '8px', whiteSpace: 'pre-wrap', overflowY: 'auto', border: '1px solid var(--border-color)' }}>
                {data.assessment}
              </p>
            </div>

            {/* Plan */}
            <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '14px', borderTop: '4px solid var(--soap-p)', opacity: revealedSections.p ? 1 : 0, transition: 'opacity 0.6s ease', visibility: revealedSections.p ? 'visible' : 'hidden' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h3 style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    <span style={{ color: 'var(--soap-p)' }}>P</span>lan
                </h3>
                <span className="confidence-badge">99% AI</span>
              </div>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: 1.6, flex: 1, backgroundColor: 'var(--bg-color)', padding: '10px', borderRadius: '8px', whiteSpace: 'pre-wrap', overflowY: 'auto', border: '1px solid var(--border-color)' }}>
                {data.plan}
              </p>
            </div>
            
          </div>

          {/* AI Suggestions */}
          <div style={{ marginBottom: '16px', opacity: revealedSections.p ? 1 : 0, transition: 'opacity 0.6s ease', visibility: revealedSections.p ? 'visible' : 'hidden' }} className="no-print">
            <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              AI Suggestions
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              
              <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderLeft: '4px solid #10b981' }}>
                <div style={{ color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <AlertTriangle size={20} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '2px' }}>Drug Interaction Check</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>No interactions detected between Salbutamol and current medications</div>
                </div>
                <span style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#10b981', padding: '4px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700 }}>Safe</span>
              </div>

              <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderLeft: '4px solid #3b82f6' }}>
                <div style={{ color: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Calendar size={20} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '2px' }}>Follow-up Reminder</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Schedule chest X-ray within 48 hours based on assessment</div>
                </div>
                <span style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6', padding: '4px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700 }}>Recommended</span>
              </div>

              <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderLeft: '4px solid #6b7280' }}>
                <div style={{ color: '#6b7280', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <BarChart2 size={20} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '2px' }}>Similar Cases</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>87% of similar cases responded well to bronchodilator therapy</div>
                </div>
                <span style={{ backgroundColor: 'rgba(107, 114, 128, 0.1)', color: '#6b7280', padding: '4px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700 }}>Insight</span>
              </div>

            </div>
          </div>

          <div style={{ marginTop: 'auto', opacity: revealedSections.p ? 1 : 0, transition: 'opacity 0.6s ease', visibility: revealedSections.p ? 'visible' : 'hidden' }} className="no-print">
            <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                <button className="btn-secondary" style={{ flex: 1 }} onClick={() => setShowShareModal(true)}>
                   <Share2 size={18} /> Share Note
                </button>
                <button className="btn-secondary" style={{ flex: 1 }} onClick={() => setShowKannada(!showKannada)}>
                   <Languages size={18} /> {showKannada ? 'View English' : 'View Kannada'}
                </button>
                <button className="btn-secondary" style={{ flex: 1 }} onClick={handlePrint}>
                   <Download size={18} /> Export PDF
                </button>
            </div>
            <button className="btn-primary" onClick={onBack} style={{ padding: '18px', fontSize: '1.0625rem', width: '100%' }}>
              <CheckCircle size={22} /> Save & Close Note
            </button>
          </div>
        </>
      )}

      {showShareModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
          <div className="card animate-fade-in" style={{ width: '100%', maxWidth: '500px', maxHeight: '90vh', overflowY: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px', position: 'relative', backgroundColor: 'var(--bg-color)', border: '1px solid var(--border-color)', borderRadius: '12px' }}>
            <button 
              className="icon-btn no-print" 
              onClick={() => { setShowShareModal(false); setSelectedShareOption(null); setEmrSuccess(false); setIsEmrSyncing(false); }} 
              style={{ position: 'absolute', top: '16px', right: '16px', color: 'var(--text-secondary)' }}
            >
              <X size={20} />
            </button>
            
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>Share Options</h2>
            
            <div style={{ display: 'flex', gap: '8px' }}>
              <button 
                className={`btn-secondary`} 
                onClick={() => { setSelectedShareOption('patient'); setEmrSuccess(false); setIsEmrSyncing(false); }} 
                style={{ flex: 1, padding: '10px 8px', borderColor: selectedShareOption === 'patient' ? 'var(--primary-color)' : '', backgroundColor: selectedShareOption === 'patient' ? 'rgba(5b, 130, 246, 0.1)' : '' }}
              >
                <Send size={16} /> Patient
              </button>
              <button 
                className={`btn-secondary`} 
                onClick={() => { setSelectedShareOption('specialist'); setEmrSuccess(false); setIsEmrSyncing(false); }} 
                style={{ flex: 1, padding: '10px 8px', borderColor: selectedShareOption === 'specialist' ? 'var(--primary-color)' : '', backgroundColor: selectedShareOption === 'specialist' ? 'rgba(5b, 130, 246, 0.1)' : '' }}
              >
                <UserPlus size={16} /> Specialist
              </button>
              <button 
                className={`btn-secondary`} 
                onClick={() => { setSelectedShareOption('emr'); setEmrSuccess(false); setIsEmrSyncing(false); }} 
                style={{ flex: 1, padding: '10px 8px', borderColor: selectedShareOption === 'emr' ? 'var(--primary-color)' : '', backgroundColor: selectedShareOption === 'emr' ? 'rgba(5b, 130, 246, 0.1)' : '' }}
              >
                <Database size={16} /> EMR
              </button>
            </div>

            {selectedShareOption === 'patient' && (
              <div style={{ backgroundColor: '#e5ddd5', padding: '16px', borderRadius: '8px', minHeight: '150px', display: 'flex', flexDirection: 'column' }}>
                <div style={{ flex: 1 }}></div>
                <div style={{ backgroundColor: '#dcf8c6', padding: '12px 16px', borderRadius: '12px', borderTopRightRadius: 0, maxWidth: '85%', marginLeft: 'auto', color: '#303030', fontSize: '0.9rem', lineHeight: 1.5, position: 'relative', boxShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>
                  <p style={{ margin: 0, marginBottom: '12px' }}>Hi {patient?.name?.split(' ')[0] || 'Ravi'}, here's your visit summary:</p>
                  <p style={{ margin: 0, marginBottom: '6px' }}>You were seen for a cough. Dr. Nair has prescribed an inhaler and ordered some tests.</p>
                  <p style={{ margin: 0 }}>Next visit: 2 weeks.</p>
                  <span style={{ fontSize: '0.65rem', color: '#16a34a', position: 'absolute', bottom: '4px', right: '8px', display: 'flex', alignItems: 'center', gap: '2px' }}>12:45 <Check size={12}/></span>
                </div>
                <button className="btn-primary" style={{ marginTop: '20px', width: '100%', backgroundColor: '#25D366', color: 'white', border: 'none' }} onClick={() => setShowShareModal(false)}>
                  <Send size={18} /> Send via WhatsApp
                </button>
              </div>
            )}

            {selectedShareOption === 'specialist' && (
              <div style={{ backgroundColor: 'var(--bg-color)', border: '1px solid var(--border-color)', padding: '16px', borderRadius: '8px' }}>
                <h4 style={{ margin: '0 0 12px 0', fontSize: '1rem', color: 'var(--text-primary)' }}>Referral Note</h4>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6, display: 'flex', flexDirection: 'column', gap: '8px', backgroundColor: 'var(--surface-color)', padding: '12px', borderRadius: '6px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <strong>To:</strong> Dr. Specialist
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <strong>From:</strong> Dr. Nair
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <strong>Patient:</strong> {patient?.name || 'Ravi Kumar'}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <strong>Diagnosis/Reason:</strong> 
                    <span style={{ color: 'var(--text-primary)' }}>Persistent dry cough, suspect reactive airway disease / early COPD.</span>
                  </div>
                  <hr style={{ border: 'none', borderTop: '1px solid var(--border-color)', margin: '8px 0' }} />
                  <p style={{ margin: 0, whiteSpace: 'pre-wrap' }}>Dear Dr. Specialist,{"\n\n"}I am referring {patient?.name || 'Ravi Kumar'} for further evaluation and management of their recent respiratory symptoms. Please find the clinical notes and pending test details attached.{"\n\n"}Regards,{"\n"}Dr. Nair</p>
                </div>
                <button className="btn-primary" style={{ marginTop: '20px', width: '100%' }} onClick={() => setShowShareModal(false)}>
                  <Send size={18} /> Send to Specialist
                </button>
              </div>
            )}

            {selectedShareOption === 'emr' && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '30px 16px', gap: '16px', minHeight: '250px' }}>
                {!isEmrSyncing && !emrSuccess ? (
                  <>
                    <Database size={48} color="var(--primary-color)" />
                    <p style={{ margin: 0, textAlign: 'center', color: 'var(--text-secondary)' }}>Sync this visit note directly to your configured Hospital EMR system.</p>
                    <button className="btn-primary" style={{ marginTop: '10px', width: '100%' }} onClick={() => {
                      setIsEmrSyncing(true);
                      setTimeout(() => {
                        setIsEmrSyncing(false);
                        setEmrSuccess(true);
                      }, 1500);
                    }}>Sync Now</button>
                  </>
                ) : isEmrSyncing ? (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', animation: 'fadeIn 0.3s ease' }}>
                    <div style={{ animation: 'spin 1s linear infinite', display: 'flex' }}>
                      <Loader2 size={48} color="var(--primary-color)" />
                    </div>
                    <p style={{ margin: 0, color: 'var(--text-secondary)', fontWeight: 600 }}>Syncing with Epic/Cerner...</p>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', animation: 'fadeIn 0.3s ease' }}>
                    <div style={{ color: '#10b981', background: 'rgba(16,185,129,0.1)', borderRadius: '50%', padding: '16px', display: 'flex', animation: 'pulse-ring 2s infinite' }}>
                      <CheckCircle size={48} />
                    </div>
                    <p style={{ margin: 0, fontWeight: 600, color: '#10b981', textAlign: 'center', fontSize: '1.1rem' }}>Successfully synced to hospital EMR system</p>
                  </div>
                )}
              </div>
            )}

            {!selectedShareOption && (
              <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                <Share2 size={32} opacity={0.5} />
                <p style={{ margin: 0 }}>Please select a sharing option above to proceed.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
