import { useState } from 'react';
import axiosInstance from '../../context/axiosInstance';

const PayOfQuota = ({ studentId, onSuccess }) => {
  const [paymentDate, setPaymentDate] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user?.token;

    try {
      await axiosInstance.post(
        'http://localhost:3000/api/quota/createQuota',
        {
          student_id: studentId,
          paymentDate,
          expirationDate,
          amount: parseFloat(amount)
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
    <div>
      <h3>Registrar nueva cuota</h3>
      <input type="date" value={paymentDate} onChange={(e) => setPaymentDate(e.target.value)} />
      <input type="date" value={expirationDate} onChange={(e) => setExpirationDate(e.target.value)} />
      <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Monto" />
      <button onClick={handleSubmit}>Registrar</button>
    </div>
  );
};

export default PayOfQuota;
