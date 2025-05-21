import { useState } from 'react';
import axiosInstance from '../../instance/axiosInstance';

const PayOfQuota = ({ studentId, onSuccess }) => {
  const [paymentDate, setPaymentDate] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [amount, setAmount] = useState('');
  const [frequency, setFrequency] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!paymentDate) newErrors.paymentDate = 'La fecha de pago es obligatoria';
    if (!expirationDate) newErrors.expirationDate = 'La fecha de vencimiento es obligatoria';
    if (!amount) {
      newErrors.amount = 'El monto es obligatorio';
    } else if (isNaN(amount) || parseFloat(amount) <= 0) {
      newErrors.amount = 'El monto debe ser un número válido';
    }
    if (!frequency) newErrors.frequency = 'El plan es obligatorio';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    const user = JSON.parse(localStorage.getItem('user'));
    const token = user?.token;

    try {
      await axiosInstance.post(
        '/quota/createQuota',
        {
          student_id: studentId,
          paymentDate,
          expirationDate,
          plan: frequency,
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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1" htmlFor="paymentDate">
          Fecha de pago
        </label>
        <input
          type="date"
          id="paymentDate"
          value={paymentDate}
          onChange={(e) => setPaymentDate(e.target.value)}
          className="border border-gray-400 rounded px-4 py-2"
        />
        {errors.paymentDate && <span className="text-red-500 text-sm">{errors.paymentDate}</span>}
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1" htmlFor="expirationDate">
          Fecha de vencimiento
        </label>
        <input
          type="date"
          id="expirationDate"
          value={expirationDate}
          onChange={(e) => setExpirationDate(e.target.value)}
          className="border border-gray-400 rounded px-4 py-2"
        />
        {errors.expirationDate && <span className="text-red-500 text-sm">{errors.expirationDate}</span>}
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1" htmlFor="amount">
          Monto
        </label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Monto"
          className="border border-gray-400 rounded px-4 py-2"
        />
        {errors.amount && <span className="text-red-500 text-sm">{errors.amount}</span>}
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1" htmlFor="frequency">
          Frecuencia
        </label>
        <select
          id="frequency"
          value={frequency}
          onChange={(e) => setFrequency(e.target.value)}
          className="border border-gray-400 rounded px-4 py-2 bg-white"
        >
          <option value="">Plan</option>
          <option value="2 x semana">2 veces por semana</option>
          <option value="3 x semana">3 veces por semana</option>
          <option value="4 x semana">4 veces por semana</option>
          <option value="Libre">Libre</option>
        </select>
        {errors.frequency && <span className="text-red-500 text-sm">{errors.frequency}</span>}
      </div>

      <div className="flex flex-col justify-end">
        <label className="invisible text-sm font-medium ">Invisible</label>
        <button
          onClick={handleSubmit}
          className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition mb-[2px]"
        >
          Registrar
        </button>
      </div>
    </div>
    </div>
  );

};

export default PayOfQuota;
