export const getMenuData = [
  {
    category: true,
    title: 'Dashboard',
  },
  {
    title: 'Inicio',
    key: 'Inicio',
    icon: 'fa fa-home',
    url: '/inicio',
  },
  {
    category: true,
    title: 'Servicios',
  },
  {
    title: 'Cotizaciones',
    key: 'Cotizaciones',
    icon: 'fa fa-calculator',
    url: '/servicios/cotizaciones',
  },
  {
    title: 'Orden de trabajo',
    key: 'OrdenDeTrabajo',
    icon: 'fa fa-calendar-check-o',
    url: '/servicios/orden-de-trabajo',
  },
  {
    title: 'Clientes',
    key: 'Clientes',
    icon: 'fa fa-group',
    url: '/seguimientos/clientes',
  },
  {
    category: true,
    title: 'Inventario',
  },
  {
    title: 'Entradas',
    key: 'AsistenciaTecnica',
    icon: 'fa fa-automobile',
    url: '/servicios/asistencia-tecnica',
  },
  {
    title: 'Salidas',
    key: 'Mantenimiento',
    icon: 'fa fa-wrench',
    url: '/servicios/mantenimiento',
  },
  {
    title: 'Materiales',
    key: 'Seguimientos',
    icon: 'fa fa-tty',
    url: '/seguimientos',
  },
  {
    title: 'Proveedores',
    key: 'Clientes',
    icon: 'fa fa-group',
    url: '/clientes',
  },
  {
    category: true,
    title: 'Administración',
  },
  {
    title: 'Configuración',
    key: 'configuracion',
    icon: 'fa fa-gear',
    count: 6,
    children: [
      {
        title: 'Baterías',
        key: 'dashboardAnalytics',
        url: '/dashboard/analytics',
      },
      {
        title: 'Usuarios',
        key: 'usuarios',
        url: '/dashboard/statistics',
      },
    ],
  }
]
