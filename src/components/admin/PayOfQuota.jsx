import { useState } from 'react';
import axiosInstance from '../../context/axiosInstance';

const PayOfQuota = ({ studentId, onSuccess }) => {
  const [paymentDate, setPaymentDate] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [amount, setAmount] = useState('');
  const [frequency, setFrequency] = useState('');


  const handleSubmit = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user?.token;

    try {
      await axiosInstance.post(
        '/quota/createQuota',
        {
          student_id: studentId,
          paymentDate,
          expirationDate,
          amount: parseFloat(amount),
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      alert('Cuota registrada con éxito');
      onSuccess(); // para que el padre oculte el form y recargue los datos
    } catch (error) {
      console.error('Error al registrar cuota:', error);
    }
  };

  return (
    <div className="w-full max-w-5xl bg-white px-6 py-4 rounded-md shadow-md text-black mx-auto">
      <h3 className="text-xl font-bold mb-4 text-center">Registrar nueva cuota</h3>

      <div className="flex flex-wrap gap-4 justify-center items-center">
        <input
          type="date"
          value={paymentDate}
          onChange={(e) => setPaymentDate(e.target.value)}
          className="border border-gray-400 rounded px-4 py-2 min-w-[150px]"
        />

        <input
          type="date"
          value={expirationDate}
          onChange={(e) => setExpirationDate(e.target.value)}
          className="border border-gray-400 rounded px-4 py-2 min-w-[150px]"
        />

        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Monto"
          className="border border-gray-400 rounded px-4 py-2 min-w-[120px]"
        />

        <select
          value={frequency}
          onChange={(e) => setFrequency(e.target.value)}
          className="border border-gray-400 rounded px-4 py-2 min-w-[150px] bg-white"
        >
          <option value="">Plan</option>
          <option value="2x">2 veces por semana</option>
          <option value="3x">3 veces por semana</option>
          <option value="4x">4 veces por semana</option>
          <option value="free">Libre</option>
        </select>

        <button
          onClick={handleSubmit}
          className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition min-w-[120px]"
        >
          Registrar
        </button>
      </div>
    </div>
  );

};

export default PayOfQuota;
