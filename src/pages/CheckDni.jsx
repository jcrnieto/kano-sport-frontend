import { useState } from 'react';
import axios from 'axios';

export default function CheckDni() {
  const [dni, setDni] = useState('');
  const [status, setStatus] = useState(null);
  const [showStatus, setShowStatus] = useState(false);

  const handleCheck = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/student/dni?dni=${dni}`);
      const student = response.data.data;

      if (student && student.Quota && student.Quota.length > 0) {
        const lastQuota = student.Quota[student.Quota.length - 1];
        const vencimiento = new Date(lastQuota.expirationDate);
        const hoy = new Date();

        if (vencimiento >= hoy) {
          setStatus(`✅ Estás al día con la cuota (vence el ${vencimiento.toLocaleDateString()})`);
        } else {
          setStatus(`❌ Cuota vencida desde el ${vencimiento.toLocaleDateString()}`);
        }
      } else {
        setStatus('❌ No se encontraron cuotas registradas');
      }
    } catch (error) {
      console.log('error:', error)
      setStatus('❌ Alumno no encontrado');
    }

    setShowStatus(true);
    setTimeout(() => {
      setShowStatus(false);
      setDni('');
    }, 5000);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Página pública - Ingrese DNI</h2>
      <input
        type="text"
        value={dni}
        onChange={(e) => setDni(e.target.value)}
        placeholder="DNI"
        style={{ padding: '10px', fontSize: '16px' }}
      />
      <button onClick={handleCheck} style={{ marginLeft: '10px', padding: '10px 20px' }}>
        Consultar
      </button>

      {showStatus && (
        <div
          style={{
            marginTop: '20px',
            padding: '15px',
            backgroundColor: '#f0f0f0',
            borderRadius: '8px',
            fontWeight: 'bold',
            color:'black'
          }}
        >
          {status}
        </div>
      )}
    </div>
  );
}
