import React, { useState, useCallback } from 'react';
import debounce from 'lodash.debounce';

interface SuplierFormProps {
    errors: any;
    register: any;
    disabledFields: any;
    handleCheckboxChange: any;
    setValue: any
}

export const Suplier: React.FC<SuplierFormProps> = ({ disabledFields, errors, register, handleCheckboxChange, setValue }) => {
    const [supplierName, setSupplierName] = useState('');
    const [suppliers, setSuppliers] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Función que realiza la llamada a la API
    const fetchSuppliersData = async (name: string) => {
        if (name.trim().length < 4) {
            setSuppliers([]);
            setError(null);
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(`http://localhost:8081/supplier/findByName/${name}`);

            if (!response.ok) {
                const data = await response.json();
                setError(data.message);
                throw new Error(data.message || 'Error al buscar proveedores');
            }

            const data = await response.json();
            setSuppliers(Array.isArray(data) ? data : []);
            setError(null);
        } catch (error: any) {
            setError(error.message);
            setSuppliers([]);
        } finally {
            setLoading(false);
        }
    };

    // Usamos useCallback para evitar que se cree una nueva función en cada render
    const debouncedFetchSuppliersData = useCallback(
        debounce((name: string) => fetchSuppliersData(name), 500),
        []
    );

    // Manejar el cambio en el input
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.value;
        setSupplierName(name);
        debouncedFetchSuppliersData(name); // Solo ejecuta la búsqueda si el usuario deja de escribir
    };

    const handleSupplier = (id: any) => {
        console.log("este es el id del supplier selecionado ", id);
        setValue("supplier", id)
    }
    return (
        <div>
            <label htmlFor="supplier">Proveedor:</label>
            {!disabledFields.supplier && (
                <input
                    id="supplier"
                    type="text"
                    value={supplierName}
                    {...register('supplier')}
                    onChange={handleInputChange}
                />
            )}
            {errors.supplier && <p>{errors.supplier.message}</p>}
            <input
                type="checkbox"
                checked={!disabledFields.supplier}
                onChange={() => handleCheckboxChange("supplier")}
            />

            {loading && <p>Cargando...</p>}

            {/* Mostrar lista de proveedores */}
            {suppliers.length > 0 && (
                <div>
                    <h3>Resultados:</h3>
                    <ul>
                        {suppliers.map((supplier, index) => (
                            <li key={index}>
                                <strong>{supplier.name}</strong> - {supplier.contact}
                                <button onClick={() => handleSupplier(supplier._id)} type="button">seleccionar</button>
                            </li>
                        ))}
                    </ul>


                </div>
            )}

            {/* Mostrar mensaje de error si hay un error */}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};
