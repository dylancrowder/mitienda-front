import { useState, useEffect } from "react";
import { UseFormRegister, FieldValues } from "react-hook-form";

interface ImageFormProps {
    errors: any;
    register: UseFormRegister<FieldValues>;
    disabledFields: any;
    handleCheckboxChange: any;
}

const Images: React.FC<ImageFormProps> = ({ disabledFields, errors, register, handleCheckboxChange }) => {
    const [previewImages, setPreviewImages] = useState<string[]>([]);

    // Eliminar la vista previa cuando el campo esté deshabilitado
    useEffect(() => {
        if (disabledFields.image) {
            setPreviewImages([]);
        }
    }, [disabledFields.image]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            // Revocar URLs anteriores para liberar memoria
            previewImages.forEach(url => URL.revokeObjectURL(url));

            // Convertir FileList en array y generar URLs
            const files = Array.from(event.target.files);
            const previews = files.map(file => URL.createObjectURL(file));
            setPreviewImages(previews);
        }
    };

    return (
        <div>
            <label htmlFor="image">Subir imágenes:</label>
            {!disabledFields.image && (
                <input
                    id="image"
                    type="file"
                    accept="image/*"
                    {...register("image", { onChange: handleFileChange })} // Registrar el campo y manejar cambios
                />
            )}
            {errors.image && <p>{errors.image.message}</p>}

            <input
                type="checkbox"
                checked={!disabledFields.image}
                onChange={() => handleCheckboxChange("image")}
            />

            {/* Mostrar previsualización de imágenes seleccionadas */}

        </div>
    );
};

export default Images;
