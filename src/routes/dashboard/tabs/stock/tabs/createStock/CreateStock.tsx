import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { StockFormData, schema } from './zod/zod';
import OptionalForm from './optionals/OptionalForm';
import { RequiredForm } from './required/RequiredForm';

const CreateStock: React.FC = () => {
    const [stockType, setStockType] = useState<string>('');

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<StockFormData>({
        resolver: zodResolver(schema),
    });

    const onSubmit = (data: any) => {
        console.log("Datos recibidos del formulario:", data);

        let stockData;

        // Crear stockData dependiendo del tipo de stock (packs o unidades)
        if (stockType === 'packs') {
            stockData = {
                unitType: data.stock.unitType,
                packDetails: {
                    packQuantity: data.stock.packDetails?.packQuantity,
                    unitsPerPack: data.stock.packDetails?.unitsPerPack,
                },
            };
        } else {
            stockData = {
                unitType: data.stock.unitType,
                unitQuantity: data.stock.unitQuantity,
            };
        }

        // Crear FormData para enviar los datos
        const formData = new FormData();
        formData.append('uniqueCode', data.uniqueCode);
        formData.append('name', data.name);
        formData.append('salePrice', data.salePrice.toString());
        formData.append('category', data.category);
        formData.append('availability', data.availability.toString());
        formData.append('stock', JSON.stringify(stockData)); // Convertir stockData a string antes de enviarlo

        // Si hay imagen seleccionada, agregarla a FormData
        if (data.image && data.image.length > 0) {
            formData.append('image', data.image[0]); // Solo se envía la primera imagen
        }

        // Agregar campos opcionales al FormData si están presentes
        if (data.barcode) formData.append('barcode', data.barcode);
        if (data.expirationDate) formData.append('expirationDate', data.expirationDate);
        if (data.supplier) formData.append('supplier', data.supplier);
        if (data.color) formData.append('color', data.color);
        if (data.size) formData.append('size', JSON.stringify(data.size));
        if (data.model) formData.append('model', data.model);
        if (data.stockAlert) formData.append('stockAlert', data.stockAlert.toString());
        if (data.capacity) formData.append('capacity', data.capacity);
        if (data.purchasePrice) formData.append('purchasePrice', data.purchasePrice.toString());
        if (data.description) formData.append('description', data.description);
        if (data.discount) formData.append('discount', data.discount.toString());
        if (data.manufactureDate) formData.append('manufactureDate', data.manufactureDate);

        // Verificar el contenido de FormData antes de enviarlo
        console.log("Contenido de FormData antes de enviar:");
        for (let [key, value] of formData.entries()) {
            console.log(key, value);  // Esto debería imprimir cada clave y valor
        }

        // Enviar los datos al servidor
        fetch('http://localhost:8086/create', {
            method: 'POST',
            body: formData, // Enviamos FormData
        })
            .then((response) => response.json())
            .then((result) => {
                console.log("Respuesta del servidor:", result);
            })
            .catch((error) => {
                console.error("Error al enviar los datos:", error);
            });
    };

    return (
        <div>
            <h1>Formulario registro de stock</h1>
            <form onSubmit={handleSubmit(onSubmit)}>

                {/* Formulario requerido */}
                <RequiredForm
                    errors={errors}
                    register={register}
                    stockType={stockType}
                    setStockType={setStockType}
                />

                <h1>Campos opcionales</h1>

                {/* Formulario opcional */}
                <OptionalForm
                    errors={errors}
                    register={register}
                    setValue={setValue}
                />

                <button type="submit">Enviar</button>
            </form>
        </div>
    );
};

export default CreateStock;
