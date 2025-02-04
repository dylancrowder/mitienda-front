import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SupplierFormData, supplierSchema } from "./zod/Zod";

interface ToggleFields {
  email: boolean;
  website: boolean;
  notes: boolean;
}

export const CreateSupplier = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SupplierFormData>({
    resolver: zodResolver(supplierSchema),
  });

  const [toggleFields, setToggleFields] = useState<ToggleFields>({
    email: false,
    notes: false,
    website: false,
  });

  const handleToggle = (field: keyof ToggleFields) => {
    setToggleFields((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  const onSubmit = async (data: SupplierFormData) => {
    try {
      const response = await fetch("http://localhost:8081/supplier/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Error al registrar el proveedor");
      }

      const result = await response.json();
      alert("Proveedor registrado exitosamente");
      console.log("Success:", result);
      reset();
    } catch (error: any) {
      console.error("Error:", error.message);
      alert("Hubo un error al registrar el proveedor");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Nombre:</label>
          <input {...register("name")} />
          {errors.name && <p>{errors.name.message}</p>}
        </div>

        <div>
          <label>Teléfono:</label>
          <input {...register("phone")} />
          {errors.phone && <p>{errors.phone.message}</p>}
        </div>

        <fieldset>
          <legend>Dirección:</legend>
          <div>
            <label>Calle:</label>
            <input {...register("address.street")} />
            {errors.address?.street && <p>{errors.address.street.message}</p>}
          </div>
          <div>
            <label>Ciudad:</label>
            <input {...register("address.city")} />
            {errors.address?.city && <p>{errors.address.city.message}</p>}
          </div>
          <div>
            <label>Estado:</label>
            <input {...register("address.state")} />
            {errors.address?.state && <p>{errors.address.state.message}</p>}
          </div>
          <div>
            <label>Código Postal:</label>
            <input {...register("address.zip")} />
            {errors.address?.zip && <p>{errors.address.zip.message}</p>}
          </div>
          <div>
            <label>País:</label>
            <input {...register("address.country")} />
            {errors.address?.country && <p>{errors.address.country.message}</p>}
          </div>
        </fieldset>

        <div>
          <label>CUIL:</label>
          <input {...register("cuil")} />
          {errors.cuil && <p>{errors.cuil.message}</p>}
        </div>

        <div>
          <label>Tipo de Proveedor:</label>
          <select {...register("supplierType")}>
            <option value="">Seleccionar...</option>
            <option value="Distribuidor">Distribuidor</option>
            <option value="Fabricante">Fabricante</option>
            <option value="Mayorista">Mayorista</option>
            <option value="Otro">Otro</option>
          </select>
          {errors.supplierType && <p>{errors.supplierType.message}</p>}
        </div>

        <div>
          <label>Email (opcional):</label>
          <input
            type="checkbox"
            checked={toggleFields.email}
            onChange={() => handleToggle("email")}
          />{" "}
          Habilitar
          {toggleFields.email && (
            <div>
              <input type="email" {...register("email")} />
              {errors.email && <p>{errors.email.message}</p>}
            </div>
          )}
        </div>

        <div>
          <label>Página Web (opcional):</label>
          <input
            type="checkbox"
            checked={toggleFields.website}
            onChange={() => handleToggle("website")}
          />{" "}
          Habilitar
          {toggleFields.website && (
            <div>
              <input {...register("website")} />
              {errors.website && <p>{errors.website.message}</p>}
            </div>
          )}
        </div>

        <div>
          <label>Notas (opcional):</label>
          <input
            type="checkbox"
            checked={toggleFields.notes}
            onChange={() => handleToggle("notes")}
          />{" "}
          Habilitar
          {toggleFields.notes && (
            <div>
              <textarea {...register("notes")} />
              {errors.notes && <p>{errors.notes.message}</p>}
            </div>
          )}
        </div>

        <button type="submit">Registrar Proveedor</button>
      </form>
    </div>
  );
};
