export default function SimplePage() {
  return (
    <div style={{ padding: 40, background: 'linear-gradient(135deg, #FF7F00, #21468B)', color: 'white', minHeight: '100vh' }}>
      <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: 20 }}>🎉 SYNCQLAYER TEST - LIVE!</h1>
      <p style={{ fontSize: '1.5rem', marginBottom: 30 }}>15 AI Skills Mastered • €5M+ Business Value • Dutch MKB Focus</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginTop: 40 }}>
        <div style={{ background: 'white', color: '#FF7F00', padding: 20, borderRadius: 10 }}>
          <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>15</div>
          <div>AI Skills</div>
        </div>
        <div style={{ background: 'white', color: '#21468B', padding: 20, borderRadius: 10 }}>
          <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>€5M+</div>
          <div>Business Value</div>
        </div>
        <div style={{ background: 'white', color: '#00A651', padding: 20, borderRadius: 10 }}>
          <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>34-62%</div>
          <div>Tax Savings</div>
        </div>
      </div>
      
      <p style={{ marginTop: 40, fontSize: '1.2rem' }}>
        🦀 Sovereign Architect Certified • Production Ready • AVG/GDPR Compliant
      </p>
    </div>
  );
}