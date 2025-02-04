import { useState } from "react";


interface RequiredFormProps {
    errors: any;
    register: any;
    stockType: string;
    setStockType: any;

}

export const RequiredForm: React.FC<RequiredFormProps> = ({ errors, register, stockType, setStockType }) => {


    const [packQuantity, setPackQuantity] = useState<number>(0);
    const [unitsPerPack, setUnitsPerPack] = useState<number>(0);
    const [packTotalQuantity, setPackTotalQuantity] = useState<number>(0);
    const handleStockTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setStockType(event.target.value);
    };

    const handlePacksDetails = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.id === "packQuantity") {
            setPackQuantity(Number(event.target.value));
        }
        setUnitsPerPack(Number(event.target.value));
    };

    const setStock = () => {
        const totalQuantity = unitsPerPack * packQuantity;
        setPackTotalQuantity(totalQuantity);
    };

    return (
        <div>
            <div>
                <label htmlFor="uniqueCode">Código Único:</label>
                <input id="uniqueCode" {...register('uniqueCode')} />
                {errors.uniqueCode && <p>{errors.uniqueCode.message}</p>}
            </div>

            <div>
                <label htmlFor="name">Nombre:</label>
                <input id="name" {...register('name')} />
                {errors.name && <p>{errors.name.message}</p>}
            </div>

            <div>
                <label htmlFor="salePrice">Precio de Venta:</label>
                <input id="salePrice" type="number" step="0.01" {...register('salePrice')} />
                {errors.salePrice && <p>{errors.salePrice.message}</p>}
            </div>

            <div>
                <label htmlFor="category">Categoría:</label>
                <input id="category" {...register('category')} />
                {errors.category && <p>{errors.category.message}</p>}
            </div>

            <div>
                <label>Tipo de Unidad:</label>
                <div>
                    <input type="radio" value="unidades" id="unit-unidades" {...register('stock.unitType')} onChange={handleStockTypeChange} />
                    <label htmlFor="unit-unidades" >Unidades</label>
                </div>
                <div>
                    <input type="radio" value="kilos" id="unit-kilos" {...register('stock.unitType')} onChange={handleStockTypeChange} />
                    <label htmlFor="unit-kilos">Kilos</label>
                </div>
                <div>
                    <input type="radio" value="packs" id="unit-packs" {...register('stock.unitType')} onChange={handleStockTypeChange} />
                    <label htmlFor="unit-packs" >Packs</label>
                </div>
                {errors.stock?.unitType && <p>{errors.stock.unitType.message}</p>}

                {stockType === "packs" ? (
                    <div>
                        <div>
                            <label htmlFor="packQuantity">Cantidad de packs:</label>
                            <input
                                id="packQuantity"
                                type="number"
                                {...register('stock.packDetails.packQuantity')}
                                onChange={handlePacksDetails}
                                disabled={stockType !== "packs"}
                            />
                            {errors.stock?.packDetails?.packQuantity && <p>{errors.stock.packDetails.packQuantity.message}</p>}
                        </div>

                        <div>
                            <label htmlFor="unitsPerPack">Unidades por pack:</label>
                            <input
                                id="unitsPerPack"
                                type="number"
                                {...register('stock.packDetails.unitsPerPack')}
                                onChange={handlePacksDetails}
                                disabled={stockType !== "packs"}
                            />
                            {errors.stock?.packDetails?.unitsPerPack && <p>{errors.stock.packDetails.unitsPerPack.message}</p>}
                        </div>
                        <button type="button" onClick={setStock}>Calcular total de unidades</button>

                        {packTotalQuantity !== 0 && <div>Cantidad unitaria: {packTotalQuantity}</div>}
                    </div>
                ) : (
                    <div>
                        <label htmlFor="quantity">Cantidad:</label>
                        <input id="quantity" type="number" {...register('stock.unitQuantity')} />
                        {errors.stock?.unitQuantity && <p>{errors.stock.unitQuantity.message}</p>}
                    </div>
                )}
            </div>

            <div>
                <label htmlFor="availability">Disponibilidad:</label>
                <select
                    id="availability"
                    {...register('availability', {
                        setValueAs: (value: any) => value === "Disponible"
                    })}
                >
                    <option value="Disponible">Disponible</option>
                    <option value="No disponible">No disponible</option>
                </select>
                {errors.availability && <p>{errors.availability.message}</p>}
            </div>


        </div>
    )
}
