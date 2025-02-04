import { useState } from "react";
import { Bardcode } from "./inputs/Bardcode";
import Images from "./inputs/Images";
import { Suplier } from "./inputs/SuplierStockForm";


interface OptionalFormProps {
    errors: any;
    register: any;
    setValue: any

}

const OptionalForm: React.FC<OptionalFormProps> = ({ errors, register, setValue }) => {



    interface DisabledFields {
        barcode: boolean;
        image: boolean;
        color: boolean;
        supplier: boolean;
        model: boolean;
        capacity: boolean;
        purchasePrice: boolean;
        manufactureDate: boolean;
        discount: boolean;
        description: boolean;
    }

    const [disabledFields, setDisabledFields] = useState<DisabledFields>({

        barcode: true,
        image: true,
        color: true,
        supplier: true,
        model: true,
        capacity: true,
        purchasePrice: true,
        manufactureDate: true,
        discount: true,
        description: true,

    });


    const handleCheckboxChange = (field: keyof DisabledFields) => {
        setDisabledFields((prevState) => {
            const newState = {
                ...prevState,
                [field]: !prevState[field],
            };

            if (newState[field] === true) {
                setValue(field, undefined, { shouldValidate: false });
            }

            return newState;
        });
    };

    return (
        <div>
            <Bardcode
                disabledFields={disabledFields}
                errors={errors}
                register={register}
                handleCheckboxChange={handleCheckboxChange}
                setValue={setValue}
            />
            <div>
                <label htmlFor="manufactureDate">Fecha de Fabricación:</label>
                {!disabledFields.manufactureDate && (
                    <input id="manufactureDate" type="date" {...register('manufactureDate')} />
                )}
                {errors.manufactureDate && <p>{errors.manufactureDate.message}</p>}
                <input
                    type="checkbox"
                    checked={!disabledFields.manufactureDate}
                    onChange={() => handleCheckboxChange("manufactureDate")}
                />
            </div>

            <Images disabledFields={disabledFields} errors={errors} register={register} handleCheckboxChange={handleCheckboxChange} />

            <div>
                <label htmlFor="color">Color:</label>
                {!disabledFields.color && (
                    <input id="color" type="text" {...register('color')} />
                )}
                {errors.color && <p>{errors.color.message}</p>}
                <input
                    type="checkbox"
                    checked={!disabledFields.color}
                    onChange={() => handleCheckboxChange("color")}
                />
            </div>

            <Suplier disabledFields={disabledFields} errors={errors} register={register} handleCheckboxChange={handleCheckboxChange} setValue={setValue} />
            <div>
                <label htmlFor="model">Modelo:</label>
                {!disabledFields.model && (
                    <input id="model" type="text" {...register('model')} />
                )}
                {errors.model && <p>{errors.model.message}</p>}
                <input
                    type="checkbox"
                    checked={!disabledFields.model}
                    onChange={() => handleCheckboxChange("model")}
                />
            </div>

            <div>
                <label htmlFor="capacity">Capacidad:</label>
                {!disabledFields.capacity && (
                    <input id="capacity" type="text" {...register('capacity')} />
                )}
                {errors.capacity && <p>{errors.capacity.message}</p>}
                <input
                    type="checkbox"
                    checked={!disabledFields.capacity}
                    onChange={() => handleCheckboxChange("capacity")}
                />
            </div>

            <div>
                <label htmlFor="purchasePrice">Precio de Compra:</label>
                {!disabledFields.purchasePrice && (
                    <input id="purchasePrice" type="number" step="0.01" {...register('purchasePrice')} />
                )}
                {errors.purchasePrice && <p>{errors.purchasePrice.message}</p>}
                <input
                    type="checkbox"
                    checked={!disabledFields.purchasePrice}
                    onChange={() => handleCheckboxChange("purchasePrice")}
                />
            </div>
            <div>
                <label htmlFor="discount">Descuento (%):</label>
                {!disabledFields.discount && (
                    <input id="discount" type="number" step="0.01" {...register('discount')} />
                )}
                {errors.discount && <p>{errors.discount.message}</p>}
                <input
                    type="checkbox"
                    checked={!disabledFields.discount}
                    onChange={() => handleCheckboxChange("discount")}
                />
            </div>

            <div>
                <label htmlFor="description">Descripción:</label>
                {!disabledFields.description && (
                    <textarea id="description" {...register('description')} />
                )}
                {errors.description && <p>{errors.description.message}</p>}
                <input
                    type="checkbox"
                    checked={!disabledFields.description}
                    onChange={() => handleCheckboxChange("description")}
                />
            </div>
        </div>
    )
}

export default OptionalForm