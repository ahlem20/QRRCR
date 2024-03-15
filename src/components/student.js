import React from 'react';
import { FaSave } from 'react-icons/fa'; // Import icons from react-icons

function createData(name, calories, fat, carbs, protein, id, subject, title) {
  return { name, calories, fat, carbs, protein, id, subject, title };
}

const rows = [
  createData(44, 159, 6.0, 24, 4.0, 99, 'العربية', 'الاعراب'),
];

function openPdf(pdfUrl) {
  window.open(pdfUrl, '_blank');
}

  function BasicTable() {
    return (
      <div className="overflow-x-auto">
        <div className="flex justify-center">
          <h1 className='text-gray-800 text-5xl font-DM py-2 px-4 rounded mt-4 mb-4 mr-4'>انجزات الطالب</h1>
        </div>
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="px-4 py-2">البحث</th>
              <th className="px-4 py-2">الملاحظة</th>
              <th className="px-4 py-2 text-right">العلامة</th>
              <th className="px-4 py-2 text-right">العنوان</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={row.id}>
                <td className="px-4 py-2 border">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                    onClick={() => openPdf('/pdf-1700409145343.pdf')}
                  >
                    تفقد
                  </button>
                </td>
                <td className="px-4 py-2 border text-right" dir="rtl" contentEditable>
                ممتاز
                </td>
                <td className="px-4 py-2 border text-right" dir="rtl" contentEditable>
                 15
                </td>
                <td className="px-4 py-2 border text-right" dir="rtl">
                  {row.title}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
}

export default BasicTable;
