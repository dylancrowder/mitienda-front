
import { z } from 'zod';



export const schema = z.object({
    uniqueCode: z.string().min(1, "El código único es obligatorio"),
    name: z.string().min(1, "El nombre es obligatorio"),
    salePrice: z.coerce.number().positive("El precio de venta debe ser positivo"),
    category: z.string().min(1, "La categoría es obligatoria"),
    stock: z.object({
        unitType: z.string().min(1, "Elige un tipo de unidad"),
        unitQuantity: z.coerce.number().positive("La cantidad debe ser positiva"),
        packDetails: z
            .object({
                packQuantity: z.coerce.number().positive("La cantidad de packs debe ser positiva"),
                unitsPerPack: z.coerce.number().positive("Las unidades por pack deben ser positivas"),
            })
            .optional(),
    }),
    availability: z.boolean(),


    // Campos opcionales
    barcode: z.string().optional(),
    image: z
    .union([
      z.instanceof(FileList).refine((files) => 
        files.length > 0, "Debes subir al menos una imagen"
      ),
      z.undefined(), // Permitir que el campo sea `undefined`
    ])
    .optional(),
  

    expirationDate: z.string().optional(),
    supplier: z.string().optional(),
    color: z.string().optional(),
    size: z
        .object({
            standardSize: z.array(z.string()).optional(),
            customDimensions: z
                .object({
                    width: z.coerce.number().positive("El ancho debe ser positivo").optional(),
                    length: z.coerce.number().positive("El largo debe ser positivo").optional(),
                })
                .optional(),
        })
        .optional(),
    model: z.string().optional(),
    stockAlert: z.coerce.number().optional(),
    capacity: z.string().optional(),
    purchasePrice: z.coerce.number().optional(),
    description: z.string().optional(), // Campo de descripción
    discount: z.coerce.number().min(0, "El descuento no puede ser negativo").max(100, "El descuento no puede ser mayor a 100").optional(), // Descuento en porcentaje
    manufactureDate: z.string().optional(), // Fecha de fabricación
});


export type StockFormData = z.infer<typeof schema>;
