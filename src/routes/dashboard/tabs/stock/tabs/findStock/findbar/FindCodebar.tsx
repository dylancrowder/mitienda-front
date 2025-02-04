import { useState } from "react";
import { Box, Typography, IconButton, Tooltip, TextField, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import BarcodeScannerComponent from "react-qr-barcode-scanner"; // Importa el escáner

const FindCodebar = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [scanning, setScanning] = useState(false);
    const [product, setProduct] = useState<any | null>(null);
    const [error, setError] = useState("");

    // Simulación de base de datos de productos
    const productDatabase = [
        { name: "Coca Cola", description: "Bebida gaseosa", price: 1.5, stock: 50, code: "123456" },
        { name: "Pepsi", description: "Bebida cola", price: 1.4, stock: 40, code: "789012" },
        { name: "Sprite", description: "Bebida lima-limón", price: 1.3, stock: 30, code: "345678" },
    ];

    // Simula la búsqueda de un producto por código
    const findProductByCode = (code: string) => {
        const foundProduct = productDatabase.find((p) => p.code === code);
        if (foundProduct) {
            setProduct(foundProduct);
            setError("");
        } else {
            setProduct(null);
            setError("Producto no encontrado.");
        }
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                m: 2,
            }}
        >
            <Button variant="contained" onClick={() => setScanning(!scanning)}>
                {scanning ? "Cerrar Cámara" : "Abrir Cámara"}
            </Button>

            {scanning && (
                <Box
                    sx={{
                        width: "100%",
                        maxWidth: "500px",
                        height: "300px",
                        overflow: "hidden",
                        mt: 2,
                        borderRadius: "8px",
                    }}
                >
                    <BarcodeScannerComponent
                        width="100%"
                        height="300px"
                        onUpdate={(_err, result:any) => {
                            if (result) {
                                findProductByCode(result.text);
                                setScanning(false);
                            }
                        }}
                    />
                </Box>
            )}

            <Typography variant="h5" gutterBottom>
                Escáner de Código de Barras
            </Typography>

            {product ? (
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        border: "1px solid gray",
                        borderRadius: "8px",
                        padding: 2,
                        m: 2,
                        width: "100%",
                        maxWidth: "800px",
                    }}
                >
                    <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 1 }}>
                        <Typography variant="h6">{product.name}</Typography>
                        <Typography variant="body2" color="textSecondary">{product.description}</Typography>
                        <Typography variant="body1" sx={{ fontWeight: "bold" }}>${product.price}</Typography>
                        <Typography variant="body2">Stock disponible: {product.stock} unidades</Typography>
                        <Typography variant="body2">Código del producto: {product.code}</Typography>
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 1, ml: 2 }}>
                        <Tooltip title="Editar producto">
                            <IconButton color="primary">
                                <EditIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Eliminar producto">
                            <IconButton color="secondary">
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Box>
            ) : error ? (
                <Typography color="error">{error}</Typography>
            ) : (
                <Typography variant="body1">Escanea un código para ver el producto</Typography>
            )}
        </Box>
    );
};

export default FindCodebar;
