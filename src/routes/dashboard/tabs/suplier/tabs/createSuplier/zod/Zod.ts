import * as z from "zod";

export const supplierSchema = z.object({
    name: z.string().min(1, { message: "El nombre es obligatorio" }),

    phone: z.string().min(6, { message: "Debe ser un teléfono válido" }),

    address: z.object({
        street: z.string().min(1, { message: "La calle es obligatoria" }),
        city: z.string().min(1, { message: "La ciudad es obligatoria" }),
        state: z.string().min(1, { message: "El estado es obligatorio" }),
        zip: z.string().min(1, { message: "El código postal es obligatorio" }),
        country: z.string().min(1, { message: "El país es obligatorio" }),
    }),

    cuil: z
        .string()
        .regex(/^\d{11}$/, { message: "El CUIL debe tener exactamente 11 dígitos" }),

    supplierType: z.enum(["Distribuidor", "Fabricante", "Mayorista", "Otro"], {
        message: "Debes seleccionar un tipo de proveedor válido",
    }),

    email: z.string().email({ message: "Debe ser un email válido" }).optional(),

    website: z
        .string()
        .url({ message: "Debe ser una URL válida" })
        .optional()
        .or(z.literal("")), // Permite que el campo esté vacío

    notes: z.string().max(500, { message: "Máximo 500 caracteres" }).optional(),

    isActive: z.boolean().default(true), // Campo booleano con valor por defecto
});

export type SupplierFormData = z.infer<typeof supplierSchema>;
