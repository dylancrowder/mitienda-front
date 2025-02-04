import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import { AppProvider, type Navigation } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { useDemoRouter } from '@toolpad/core/internal';
import HomeIcon from '@mui/icons-material/Home';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ListAltIcon from '@mui/icons-material/ListAlt';
import InventoryIcon from '@mui/icons-material/Inventory';
import PeopleIcon from '@mui/icons-material/People';
import EventIcon from '@mui/icons-material/Event';
import { ResumenContent } from './tabs/home/Home';
import { VentasContent } from './tabs/sales/Sales';
import { Stock } from './tabs/stock/Stock';
import { Suplier } from './tabs/suplier/Supplier';


// Navegación
const NAVIGATION: Navigation = [
  { kind: 'header', title: 'Secciones principales' },
  { segment: 'panel', title: 'Inicio', icon: <HomeIcon /> },
  { kind: 'header', title: 'Operaciones' },
  { segment: 'ventas', title: 'Vender', icon: <AttachMoneyIcon /> },
  { segment: 'gestionar-ventas', title: 'Gestionar Ventas', icon: <ListAltIcon /> },
  { kind: 'header', title: 'Datos' },
  { segment: 'inventario', title: 'Inventario', icon: <InventoryIcon /> },
  { segment: 'clientes', title: 'Clientes', icon: <PeopleIcon /> },
  { segment: 'suplier', title: 'Proveedores', icon: <EventIcon /> },
  { segment: 'calendario', title: 'Calendario', icon: <EventIcon /> },

];

// Tema
const temaProduccion = createTheme({
  cssVariables: { colorSchemeSelector: 'data-toolpad-color-scheme' },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: { xs: 0, sm: 600, md: 600, lg: 1200, xl: 1536 },
  },
});


const GestionVentasContent = () => (
  <Box sx={{ py: 4, textAlign: 'center' }}>
    <Typography variant="h4">Gestionar Ventas</Typography>
    <p>Administra las ventas realizadas con mayor detalle.</p>
  </Box>
);



const ClientesContent = () => (
  <Box sx={{ py: 4, textAlign: 'center' }}>
    <Typography variant="h4">Clientes</Typography>
    <p>Gestiona la información de tus clientes.</p>
  </Box>
);

const CalendarioContent = () => (
  <Box sx={{ py: 4, textAlign: 'center' }}>
    <Typography variant="h4">Calendario</Typography>
    <p>Consulta y organiza eventos en el calendario.</p>
  </Box>
);

const NotFoundContent = () => (
  <Box sx={{ py: 4, textAlign: 'center' }}>
    <Typography variant="h4">Página no encontrada</Typography>
  </Box>
);

// Contenido dinámico
function PageContent({ pathname }: { pathname: string }) {
  switch (pathname) {
    case '/panel':
      return <ResumenContent />;
    case '/ventas':
      return <VentasContent />;
    case '/gestionar-ventas':
      return <GestionVentasContent />;
    case '/inventario':
      return <Stock />;
    case '/clientes':
      return <ClientesContent />;
    case '/calendario':
      return <CalendarioContent />;
    case '/suplier':
      return <Suplier />;
    default:
      return <NotFoundContent />;
  }
}

// Componente principal
export default function DashboardLayoutProduccion() {
  const router = useDemoRouter('/panel');

  return (
    <AppProvider navigation={NAVIGATION} router={router} theme={temaProduccion}>
      <DashboardLayout>
        <PageContent pathname={router.pathname} />
      </DashboardLayout>
    </AppProvider>
  );
}
