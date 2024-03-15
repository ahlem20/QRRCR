import React, { useState } from 'react';
import Modal from 'react-modal'; // Import the modal library
import Stud from './student';

function createData(name, calories, calories1, calories2, calories3) {
  return {
    name,
    calories,
    calories1,
    calories2,
    calories3,
    history: [
      {
        date: 33050690,
        customerId: 'محمد سلامي ',
        amount: 1919229383,
      },
      {
        date: 1919229383,
        customerId: 'اسلام عبد العزيز',
        amount: 1919229383,
      },
    ],
  };
}

function Students() {
  const [openRow, setOpenRow] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState('');

  const toggleRow = (index) => {
    if (openRow === index) {
      setOpenRow(null);
    } else {
      setOpenRow(index);
    }
  };

  const openModal = (customer) => {
    setSelectedCustomer(customer);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedCustomer('');
    setIsModalOpen(false);
  };

  const rows = [
    createData("الاول", "الاولى ماستر", "قانون اداري", "الحقوق ", 'البويرة',),
    createData("الثالث", "الثاني ماستر", "قانون اداري", "الحقوق ", 'التبسة',),
    createData("الاولى ماستر", "الاولى ماستر", "قانون اداري", "الحقوق ", 'بومرداس',),


  ];

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300">
      <thead>
          <tr>
            <th className="px-4 py-2 border">
              {/* Add border class here */}
            </th>
            <th className="px-4 py-2 border">الفوج</th>
            <th className="px-4 py-2 border text-right">السنة</th>
            <th className="px-4 py-2 border text-right">التخصص</th>
            <th className="px-4 py-2 border text-right">الكلية</th>
            <th className="px-4 py-2 border text-right">الجامعة</th>
          </tr>
        </thead>        <tbody>
          {rows.map((row, index) => (
            <React.Fragment key={row.name}>
              <tr
                className="cursor-pointer hover:bg-gray-100"
                onClick={() => toggleRow(index)}
              >
                <td className="px-4 py-2 border">
                  {openRow === index ? '-' : '+'}
                </td>
                <td className="px-4 py-2 border" dir='rtl'>{row.name}</td>
                
                <td className="px-4 py-2 border text-right">{row.calories}</td>
                <td className="px-4 py-2 border text-right">{row.calories1}</td>
                <td className="px-4 py-2 border text-right">{row.calories2}</td>
                <td className="px-4 py-2 border text-right">{row.calories3}</td>
              </tr>
              {openRow === index && (
                <tr>
                  <td colSpan="6">
                    <div className="px-4 py-2">
                      <h6 className="text-2xl font-DM mb-2 mr-0" dir="rtl">الطلبة:</h6>
                      <table className="min-w-full border border-gray-300">
                        <thead>
                        <tr>
                            <th className="px-4 py-2 border"> التطور</th>
                            <th className="px-4 py-2 border">الاسم</th>
                            <th className="px-4 py-2 border text-right">رقم التسجيل</th>
                          </tr>
                        </thead>
                        <tbody>
                          {row.history.map((historyRow, i) => (
                            <tr key={i}>
                              <td className="px-4 py-2 border">
                                <button
                                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                                  onClick={() => openModal(historyRow.customerId)}
                                >تفقد
                                </button>
                              </td>
                              <td className="px-4 py-2 border" dir='rtl'>{historyRow.customerId}</td>
                              <td className="px-4 py-2 border" dir='rtl'>{historyRow.date}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>

      <Modal // Use the Modal component here
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
      >
        <Stud customerId={selectedCustomer} />
        <div className='flex justify-center'>
        <button onClick={closeModal} className='text-2xl mt-3'>انتهاء</button></div>
      </Modal>
    </div>
  );
}

export default Students;
