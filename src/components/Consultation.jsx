import { useState, useEffect, useRef } from 'react';
import { Mic, FileText, CheckCircle, ArrowLeft, Loader2, Play, Square, Check } from 'lucide-react';

export default function Consultation({ patient, onGenerateSoap, onBack }) {
  const [recordState, setRecordState] = useState('idle');
  const [transcript, setTranscript] = useState('');
  const [isLoadingProcess, setIsLoadingProcess] = useState(false);
  const [vitals, setVitals] = useState({
    bp: '138/88',
    spo2: '96',
    hr: '82',
    temp: '98.4',
    weight: '74'
  });
  const recognitionRef = useRef(null);

  const isRecording = recordState === 'recording';
  const isStopped = recordState === 'stopped';

  useEffect(() => {
    // Initialize Web Speech API
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        let currentTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            setTranscript(prev => {
                const cleaned = prev === "Listening..." ? "" : prev;
                return cleaned + (cleaned ? " " : "") + event.results[i][0].transcript;
            });
          } else {
            // Interim result - could show it but let's keep it simple for now
          }
        }
      };

      recognitionRef.current.onend = () => {
        if (recordState === 'recording') {
          recognitionRef.current.start();
        }
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [recordState]);

  const toggleRecording = () => {
    if (recordState === 'idle') {
      setRecordState('recording');
      setTranscript("Listening...");
      if (recognitionRef.current) {
        recognitionRef.current.start();
      }
    } else if (recordState === 'recording') {
      setRecordState('stopped');
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (transcript === "Listening...") {
        setTranscript("No speech detected. Please try speaking or load mock data.");
      }
    } else if (recordState === 'stopped') {
        setRecordState('recording');
        setTranscript("Listening...");
        if (recognitionRef.current) {
          recognitionRef.current.start();
        }
    }
  };

  const loadMockTranscript = () => {
    setTranscript(`Doctor: Good morning Ravi. What brings you in today?
Patient: I've had a dry cough for 3 weeks, worse at night, with chest tightness.
Doctor: Any fever or shortness of breath?
Patient: No fever but I get breathless on stairs. I've smoked for 15 years, half a pack a day.
Doctor: Vitals show BP 138/88 and SpO2 96%. I'll order a chest X-ray and spirometry.
Doctor: Prescribing Salbutamol inhaler. Let's discuss smoking cessation next visit.
Patient: When should I return?
Doctor: In two weeks once results are ready.`);
    setRecordState('stopped');
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  };

  const generateSoap = () => {
    onGenerateSoap(vitals);
  };

  let btnColor = 'var(--primary-color)';
  let btnIcon = <Mic size={24} color="white" />;
  if (isRecording) {
    btnColor = 'var(--danger-color)';
    btnIcon = <Square size={22} color="white" fill="white" />;
  } else if (isStopped) {
    btnColor = 'var(--success-color)';
    btnIcon = <Check size={28} color="white" strokeWidth={3} />;
  }

  return (
    <div className="screen-container animate-fade-in" style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '8px' }}>
        <button className="icon-btn" onClick={onBack}>
          <ArrowLeft size={22} color="var(--text-primary)" />
        </button>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, letterSpacing: '-0.01em', color: 'var(--text-primary)' }}>{patient?.name}</h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', fontWeight: 600 }}>{patient?.condition}</p>
        </div>
      </div>

      <div className="card" style={{ marginBottom: '8px', padding: '12px' }}>
        <h3 style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px' }}>Quick Vitals</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <label style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Blood Pressure</label>
            <input type="text" name="bp" value={vitals.bp} onChange={(e) => setVitals({ ...vitals, bp: e.target.value })} style={{ padding: '6px', fontSize: '0.875rem', borderRadius: '4px', border: '1px solid var(--border-color)' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <label style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>SpO2 %</label>
            <input type="text" name="spo2" value={vitals.spo2} onChange={(e) => setVitals({ ...vitals, spo2: e.target.value })} style={{ padding: '6px', fontSize: '0.875rem', borderRadius: '4px', border: '1px solid var(--border-color)' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <label style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Heart Rate bpm</label>
            <input type="text" name="hr" value={vitals.hr} onChange={(e) => setVitals({ ...vitals, hr: e.target.value })} style={{ padding: '6px', fontSize: '0.875rem', borderRadius: '4px', border: '1px solid var(--border-color)' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <label style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Temperature °F</label>
            <input type="text" name="temp" value={vitals.temp} onChange={(e) => setVitals({ ...vitals, temp: e.target.value })} style={{ padding: '6px', fontSize: '0.875rem', borderRadius: '4px', border: '1px solid var(--border-color)' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <label style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Weight kg</label>
            <input type="text" name="weight" value={vitals.weight} onChange={(e) => setVitals({ ...vitals, weight: e.target.value })} style={{ padding: '6px', fontSize: '0.875rem', borderRadius: '4px', border: '1px solid var(--border-color)' }} />
          </div>
        </div>
      </div>

      <div className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '8px', minHeight: '280px', border: isRecording ? '1px solid rgba(239, 68, 68, 0.4)' : '1px solid var(--border-color)', boxShadow: isRecording ? '0 0 15px rgba(239, 68, 68, 0.1)' : '0 2px 8px rgba(0,0,0,0.03)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-primary)' }}>
            <FileText size={18} color="var(--primary-color)" /> Live Transcript
          </h3>
          {isRecording && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--danger-color)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Listening...</span>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--danger-color)', animation: 'pulse-ring 1.5s infinite cubic-bezier(0.215, 0.61, 0.355, 1)' }} />
          </div>
          )}
        </div>
        
        <div style={{ flex: 1, backgroundColor: 'var(--bg-color)', borderRadius: '12px', padding: '16px', overflowY: 'auto', fontSize: '0.9375rem', color: transcript && transcript !== "Listening..." ? 'var(--text-primary)' : 'var(--text-secondary)', whiteSpace: 'pre-wrap', lineHeight: 1.6, border: '1px solid var(--border-color)' }}>
          {transcript || 'Press the record button to start real-time transcription or load mock data.'}
        </div>

        {isRecording && (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '4px', height: '32px', padding: '8px 0' }}>
             {[...Array(9)].map((_, idx) => (
                <div 
                  key={idx} 
                  style={{ 
                    width: '4px', 
                    height: '24px', 
                    backgroundColor: 'var(--danger-color)', 
                    borderRadius: '4px', 
                    animation: `wave 1.2s ease-in-out infinite`,
                    animationDelay: `${idx * 0.1}s`
                  }} 
                />
             ))}
          </div>
        )}
      </div>

      {isStopped && (
        <div className="card animate-fade-in" style={{ marginBottom: '8px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyItems: 'center', justifyContent: 'space-between' }}>
            <h3 style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>Recording Summary</h3>
            <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>Total duration: 3:07</span>
          </div>

          <svg width="100%" height="40" viewBox="0 0 400 40" preserveAspectRatio="none" style={{ margin: '4px 0' }}>
            {[...Array(40)].map((_, i) => {
              const heights = [12, 18, 28, 14, 38, 22, 40, 30, 16, 10, 24, 40, 32, 26, 18, 14, 30, 38, 28, 18, 14, 24, 32, 40, 35, 28, 18, 10, 26, 32, 38, 24, 18, 10, 14, 28, 32, 24, 18, 10];
              const h = heights[i];
              return (
                <rect key={i} x={`${i * 2.5}%`} y={40 - h} width="1.5%" height={h} rx="2" fill="var(--primary-color)" opacity={0.6 + (h / 40) * 0.4} />
              );
            })}
          </svg>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.8125rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--success-color)' }} />
              <span style={{ color: 'var(--text-secondary)' }}>Audio quality:</span>
              <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Excellent</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--primary-color)' }} />
              <span style={{ color: 'var(--text-secondary)' }}>Speakers detected:</span>
              <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>2 (Doctor + Patient)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--text-secondary)' }} />
              <span style={{ color: 'var(--text-secondary)' }}>Background noise:</span>
              <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Low</span>
            </div>
          </div>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: 'auto', alignItems: 'center' }}>
        
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px', width: '100%' }}>
            
            <button className="btn-secondary" style={{ flex: 1, padding: '12px' }} onClick={loadMockTranscript} disabled={isLoadingProcess || isRecording}>
                <Play size={18} /> Load Data
            </button>

            <button 
                onClick={toggleRecording}
                disabled={isLoadingProcess}
                style={{ 
                    width: '72px', height: '72px', borderRadius: '50%', 
                    backgroundColor: btnColor, 
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: isRecording ? '0 0 15px rgba(239, 68, 68, 0.3)' : '0 4px 14px rgba(0,0,0,0.15)',
                    animation: isRecording ? 'pulse-ring 2s infinite cubic-bezier(0.215, 0.61, 0.355, 1)' : 'none',
                    transition: 'all 0.3s ease',
                    flexShrink: 0
                }}
            >
                {btnIcon}
            </button>

            <div style={{ flex: 1 }}> </div>
        </div>

        <button 
          className="btn-primary" 
          disabled={((recordState === 'idle') || isRecording || isLoadingProcess)} 
          onClick={generateSoap}
          style={{ padding: '18px', fontSize: '1.0625rem', width: '100%' }}
        >
          {isLoadingProcess ? (
             <><Loader2 className="animate-spin" size={22} /> Processing AI Note...</>
          ) : (
             <><CheckCircle size={22} /> Generate SOAP Note</>
          )}
        </button>
      </div>
    </div>
  );
}
