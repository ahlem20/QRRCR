import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';

const QRScanner = () => {
  const [result, setResult] = useState('');
  const [scanning, setScanning] = useState(true);
  const [error, setError] = useState(null);

  const handleScan = (data) => {
    if (data) {
      setResult(data);
      setScanning(false);
    }
  };

  const handleError = (err) => {
    console.error(err);
    setError('Failed to scan the QR code. Please try again.');
    setScanning(false);
  };

  const resetScan = () => {
    setResult('');
    setError(null);
    setScanning(true);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-semibold mb-4">QR Code Scanner</h1>
      <div className="w-80">
        <QrReader
          delay={300}
          onError={handleError}
          onScan={handleScan}
          style={{ width: '100%' }}
        />
      </div>
      {scanning && <p className="mt-4">Scanning...</p>}
      {result && (
        <div className="mt-4">
          <p className="text-lg font-medium">Scanned QR Code:</p>
          <p className="text-xl">{result}</p>
          <button className="mt-2 bg-blue-500 text-white p-2 rounded" onClick={resetScan}>
            Scan Another QR Code
          </button>
        </div>
      )}
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default QRScanner;
