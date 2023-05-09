export const MainNav = [
    {
        icon: 'pe-7s-keypad',
        label: 'Dashboard',
        to: '/dashboards/basic',
    },
];
export const ComponentsNav = [
    {
        icon: 'pe-7s-diamond',
        label: 'Elements',
        content: [
            {
                label: 'Standard Buttons',
                to: '/elements/buttons-standard',
            },
            {
                label: 'Dropdowns',
                to: '/elements/dropdowns',

            },
            {
                label: 'Icons',
                to: '/elements/icons',
            },
            {
                label: 'Badges',
                to: '/elements/badges-labels',
            },
            {
                label: 'Cards',
                to: '/elements/cards',
            },
            {
                label: 'List Groups',
                to: '/elements/list-group',
            },
            {
                label: 'Navigation Menus',
                to: '/elements/navigation',
            },
            {
                label: 'Utilities',
                to: '/elements/utilities',
            },
        ],
    },

];

//Criando um novo menu
export const AdministrativeNav = [
    {
        icon: 'lnr-briefcase',
        label: 'Administrativo',
        content: [

            {
                label: 'Modelo de documentos',
                to: '/administrative/documentTemplate',
            },
            {
                label: 'Agenda',
                //to: '/elements/dropdowns',
                to: '/administrative/schedule',

            },
            {
                label: 'Cadastros',
                //to: '/elements/icons',
                to: '/administrative/register',
            },
            {
                label: 'Relatórios',
                to: '/elements/badges-labels',
            },
            {
                label: 'Documentos Oficiais',
                to: '/elements/cards',
            },
            {
                label: 'Procedimento Padrão',
                to: '/elements/list-group',
            },
            {
                label: 'Navigation Menus',
                to: '/elements/navigation',
            },
            {
                label: 'Utilities',
                to: '/elements/utilities',

            },
        ],
    },

];
export const PedagogicalNav = [
    {
        icon: 'pe-7s-light',
        label: 'Pedagógico',
        content: [
            {
                icon: 'pe-7s-light',
                label: 'Modelo de documentos',
                to: '/forms/controls',
            },
            {
                icon: 'pe-7s-eyedropper',
                label: 'Assessoria Pedagógica',
                to: '/forms/layouts',
            },
            {
                icon: 'pe-7s-pendrive',
                label: 'Capacitações',
                to: '/forms/validation',
            },
            {
                icon: 'pe-7s-pendrive',
                label: 'Calculadora Hora Atividade',
                to: '/forms/validation',
            },
        ]

    }
];
export const HumanResourceNav = [
    {
        icon: 'pe-7s-graph2',
        label: 'Recursos Humanos',
        content: [
            {
                label: 'Tabs',
                to: '/components/tabs',
            },
            {
                label: 'Notifications',
                to: '/components/notifications',
            },
            {
                label: 'Modals',
                to: '/components/modals',
            },
            {
                label: 'Progress Bar',
                to: '/components/progress-bar',
            },
            {
                label: 'Tooltips & Popovers',
                to: '/components/tooltips-popovers',
            },
            {
                label: 'Carousel',
                to: '/components/carousel',
            },
            {
                label: 'Maps',
                to: '/components/maps',
            },
        ],

    }
];
export const PatrimonialNav = [

    {
        icon: 'lnr-apartment',
        label: 'Patrimonio',
        to: '/charts/chartjs',

    },

];
export const ConstructionNav = [
    {
        icon: 'lnr-construction',
        label: 'Serviços | Obras',
        to: '/tables/regular-tables',
    },
];
export const ServiceNav = [
    {
        icon: 'pe-7s-help2',
        label: 'Atendimento',

    },
    {
        icon: 'pe-7s-study',
        label: 'Documentação Escolar',

    },
    {
        icon: 'pe-7s-pendrive',
        label: 'Alimentação Escolar',

    },
];
export const LogisticsNav = [
    {
        icon: 'pe-7s-graph2',
        label: 'Logística & Suprimentos',
        to: '/widgets/dashboard-boxes',
    },
];
export const ChartsNav = [
    {
        icon: 'pe-7s-graph2',
        label: 'Contabilidade e Finanças',
        to: '/charts/chartjs',
    },
];

export const RegistrationNav = [
    {
        icon: 'pe-7s-note2',
        label: 'Cadastros',
        content: [
            {
                label: 'Perfil de Usuário',
                to: '/create/profile',
            },
            {
                label: 'Usuários',
                to: '/create/user',
            },
            {
                label: 'Empresa',

                to: '/create/company',
            },
            {
                label: 'Prestadores de Serviços',
                to: '/charts/chartjs',
            },

        ],


    },
];

export const SettingsNav = [
    {
        icon: 'pe-7s-config',
        label: 'Configurações',
        content: [
            {
                label: 'Perfil de Usuário',
                to: '/create/profile',
            },
        ],
    },
];


