import React, { useEffect, useRef, useState } from "react";
import JsBarcode from "jsbarcode";
import { Button, Box } from "@mui/material";


interface BardCodeFormProps {
  errors: any;
  register: any;
  disabledFields: any;
  handleCheckboxChange: any;
  setValue: any;
}

const BarcodeGenerator: React.FC<{ value: string }> = ({ value }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (value && canvasRef.current) {
      JsBarcode(canvasRef.current, value, {
        format: "EAN13",
        width: 2,
        height: 100,
        displayValue: true,
      });
    }
  }, [value]);

  return <canvas ref={canvasRef}></canvas>;
};

export const Bardcode: React.FC<BardCodeFormProps> = ({
  disabledFields,
  errors,
  register,
  handleCheckboxChange,
  setValue,
}) => {
  const [barcodeValue, setBarcodeValue] = useState<string>("");


  const generateRandomBarcode = (): void => {
    const randomValue = Math.floor(Math.random() * 1000000000000)
      .toString()
      .padStart(12, "0");

    setBarcodeValue(randomValue);
    setValue("barcode", randomValue);
  };

  return (
    <div>
      <label htmlFor="barcode">Código de Barras:</label>

      {!disabledFields.barcode && (
        <div>

          <input
            id="barcode"
            type="text"
            {...register("barcode")}
            value={barcodeValue}

          />

          <Button variant="contained" color="primary" onClick={generateRandomBarcode}>
            Generar Código de Barras
          </Button>

          {barcodeValue && (
            <Box sx={{ marginTop: 4 }}>
              <BarcodeGenerator value={barcodeValue} />
              <p>{`Código de barras: ${barcodeValue}`}</p>
            </Box>
          )}
        </div>
      )}

      {errors.barcode && <p>{errors.barcode.message}</p>}

      <input
        type="checkbox"
        checked={!disabledFields.barcode}
        onChange={() => handleCheckboxChange("barcode")}
      />
    </div>
  );
};
