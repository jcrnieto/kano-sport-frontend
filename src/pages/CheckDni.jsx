import { useState } from 'react';
import axios from 'axios';

export default function CheckDni() {
  const [dni, setDni] = useState('');
  const [status, setStatus] = useState(null);
  const [showStatus, setShowStatus] = useState(false);

  const handleCheck = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL_LOCAL}/api/student/dni?dni=${dni}`);
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
    <div className="text-white bg-[radial-gradient(circle_at_bottom_left,_#a09d9d,_#f3b3b3,_transparent_60%),radial-gradient(circle_at_bottom_right,_#ff9999,_#cc0000,_transparent_60%),radial-gradient(circle_at_top_left,_#cc3333,_#990000,_transparent_60%),radial-gradient(circle_at_top_right,_#660000,_#330000)] flex flex-col items-center justify-center min-h-screen px-4 text-center">
      <h2 className="text-5xl font-semibold mb-6 text-black">INGRESE DNI</h2>

      <div className="flex flex-col sm:flex-row items-center gap-4">
        <input
          type="text"
          value={dni}
          onChange={(e) => setDni(e.target.value)}
          placeholder="DNI"
          className="border border-black rounded px-4 py-2 text-black"
        />
        <button
          onClick={handleCheck}
          className="px-5 py-2 bg-black text-white rounded-md hover:bg-neutral-800 transition"
        >
          Consultar
        </button>
      </div>

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
