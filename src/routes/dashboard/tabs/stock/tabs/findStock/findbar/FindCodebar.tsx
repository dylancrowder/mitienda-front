import React, { useState, useCallback } from 'react';
import Scanner from './components/Scanner';

const FindCodebar: React.FC = () => {
    const [code, setCode] = useState<string | null>(null);
    const [isProductFound, setIsProductFound] = useState<boolean | null>(null); // Estado para verificar si el producto está en la base de datos

    // Función para manejar la detección del código de barras
    const handleDetected = useCallback(async (detectedCode: string) => {
        if (detectedCode !== code) {
            setCode(detectedCode);
            // Realizar la búsqueda del código en la base de datos
            try {
                const response = await fetch(`/api/products/${detectedCode}`);
                if (response.ok) {
                    const product = await response.json();
                    // Si el producto existe en la base de datos
                    setIsProductFound(true);
                } else {
                    // Si el producto no existe
                    setIsProductFound(false);
                }
            } catch (error) {
                console.error('Error al buscar el código:', error);
                setIsProductFound(false); // Asumir que no se encontró el producto si hay error
            }
        }
    }, [code]);

    return (
        <div style={{ padding: '20px' }}>
            <h1>Escáner de Códigos de Barra</h1>
            <Scanner onDetected={handleDetected} />
            {code && (
                <div>
                    <h2>Código Detectado:</h2>
                    <p>{code}</p>
                </div>
            )}
            {isProductFound === false && (
                <div>
                    <button onClick={() => console.log('Agregar nuevo producto')}>
                        Agregar como nuevo producto al stock
                    </button>
                </div>
            )}
        </div>
    );
};

export default FindCodebar;
