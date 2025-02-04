import { Box, Typography, Card, CardContent, Button } from "@mui/material";

export const ResumenContent = () => (
    <Box sx={{ py: 4, px: 2 }}>
        <Typography variant="h4" align="center" gutterBottom>
            Inicio
        </Typography>

        <Box
            sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: 3, // This replaces the spacing in Grid
            }}
        >
            {/* Gestión del día */}
            <Box sx={{ width: { xs: "100%", sm: "48%", md: "30%" } }}>
                <Card>
                    <CardContent>
                        <Typography variant="h6">Gestión del día</Typography>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                            Ingreso del día: $500
                        </Typography>
                        <Button variant="contained" color="primary">
                            Vender
                        </Button>
                    </CardContent>
                </Card>
            </Box>

            {/* Calendario */}
            <Box sx={{ width: { xs: "100%", sm: "48%", md: "30%" } }}>
                <Card>
                    <CardContent>
                        <Typography variant="h6">Calendario</Typography>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                            Revisa y gestiona tus eventos
                        </Typography>
                        <Button variant="outlined" color="primary">
                            Ver calendario
                        </Button>
                    </CardContent>
                </Card>
            </Box>

            {/* Stock */}
            <Box sx={{ width: { xs: "100%", sm: "48%", md: "30%" } }}>
                <Card>
                    <CardContent>
                        <Typography variant="h6">Gestión de Stock</Typography>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                            Productos disponibles: 120
                        </Typography>
                        <Button variant="contained" color="secondary">
                            Ir a Stock
                        </Button>
                    </CardContent>
                </Card>
            </Box>

            {/* Clientes */}
            <Box sx={{ width: { xs: "100%", sm: "48%", md: "30%" } }}>
                <Card>
                    <CardContent>
                        <Typography variant="h6">Clientes</Typography>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                            Gestiona tu lista de clientes
                        </Typography>
                        <Button variant="contained" color="secondary">
                            Ver Clientes
                        </Button>
                    </CardContent>
                </Card>
            </Box>

            {/* Información de cuenta */}
            <Box sx={{ width: { xs: "100%", sm: "48%", md: "30%" } }}>
                <Card>
                    <CardContent>
                        <Typography variant="h6">Cuenta</Typography>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                            Gestión de pagos y ajustes
                        </Typography>
                        <Button variant="outlined" color="primary">
                            Ir a Pagos
                        </Button>
                    </CardContent>
                </Card>
            </Box>

            {/* Soporte técnico */}
            <Box sx={{ width: { xs: "100%", sm: "48%", md: "30%" } }}>
                <Card>
                    <CardContent>
                        <Typography variant="h6">Soporte Técnico</Typography>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                            ¿Necesitas ayuda?
                        </Typography>
                        <Button variant="contained" color="primary">
                            Contactar Soporte
                        </Button>
                    </CardContent>
                </Card>
            </Box>


        </Box>
    </Box>
);
