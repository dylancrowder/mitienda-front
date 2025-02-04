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
                    fps: 60,  // Incrementar el FPS para mejor rendimiento
                    qrbox: { width: 450, height: 450 },
                },
                false
            );

            const handleScan = (decodedText: string) => {
                console.log("Código detectado:", decodedText);
                onDetected(decodedText);
            };

            const handleError = (error: string) => {
             console.log(error);
             
            };

            // Iniciar escáner
            scanner.render(handleScan, handleError);

            // Cleanup cuando el componente se desmonte
            return () => {
                scanner.clear();
            };
        }
    }, [onDetected]);

    return <div ref={scannerRef}></div>;
};

export default Scanner;
