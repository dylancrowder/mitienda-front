import React, { useEffect, useRef, useState } from 'react';
import JsBarcode from 'jsbarcode';
import { Button, Box } from '@mui/material';

// Componente para generar el código de barras
const BarcodeGenerator: React.FC<{ value: string }> = ({ value }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (value && canvasRef.current) {
      JsBarcode(canvasRef.current, value, {
        format: "EAN13", // Formato EAN-13 estándar
        width: 2,
        height: 100,
        displayValue: true,
      });
    }
  }, [value]);

  return <canvas ref={canvasRef}></canvas>;
};

const BarcodeApp: React.FC = () => {
  const [barcodeValue, setBarcodeValue] = useState<string>(''); // Valor del código de barras

  // Función para generar un código de barras aleatorio
  const generateRandomBarcode = (): void => {
    const randomValue = Math.floor(Math.random() * 1000000000000).toString().padStart(12, "0");
    setBarcodeValue(randomValue); // Establecer el código de barras generado
  };

  return (
    <Box sx={{ textAlign: 'center', marginTop: '50px' }}>
      <Button
        variant="contained"
        color="primary"
        onClick={generateRandomBarcode}
      >
        Generar Código de Barras
      </Button>

      {barcodeValue && (
        <Box sx={{ marginTop: 4 }}>
          <BarcodeGenerator value={barcodeValue} />
          <p>{`Código de barras: ${barcodeValue}`}</p>
        </Box>
      )}
    </Box>
  );
};

export default BarcodeApp;
