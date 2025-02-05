import React, { useEffect, useRef } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

interface BarcodeScannerProps {
    onDetected: (code: string) => void;
}

const Scanner: React.FC<BarcodeScannerProps> = ({ onDetected }) => {
    const scannerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scannerRef.current) {
            const scannerId = "scanner-container";

            // Asignar el ID al div
            scannerRef.current.id = scannerId;

            const scanner = new Html5QrcodeScanner(
                scannerId,
                {
                    fps: 10,  // Reducir FPS a 30 para mejorar rendimiento
                    qrbox: { width: 200, height: 200 },  // Reducir el tamaño del área de escaneo
                },
                false
            );

            const handleScan = (decodedText: string) => {
                console.log("Código detectado:", decodedText);
                onDetected(decodedText);
            };

            const handleError = (error: string) => {
                console.log("Error en la detección:", error);
            };

            // Iniciar escáner
            scanner.render(handleScan, handleError);

            // Cleanup cuando el componente se desmonte
            return () => {
                scanner.clear();
            };
        }
    }, [onDetected]);

    return <div ref={scannerRef} >


    </div>;
};

export default Scanner;
