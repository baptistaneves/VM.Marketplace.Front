import { MenuItem } from "./menu.model";

export const MENU: MenuItem[] = [
    {
        id: 1,
        label: 'MENUITEMS.MENU.TEXT',
        isTitle: true
    },
    {
        id: 2,
        label: 'Dashboard',
        icon: 'ph-gauge',
        link: '/'
    },
    {
        id: 8,
        label: 'Geral',
        isTitle: true
    },
    {
        id: 12,
        label: 'Opções',
        icon: 'ph-storefront',
        parentId: 8,
        subItems: [
            {
                id: 13,
                label: 'Grupos',
                link: '/geral/grupos',
                parentId: 12
            },
            {
                id: 13,
                label: 'Categorias',
                link: '/geral/categorias',
                parentId: 12
            },
            {
                id: 14,
                label: 'Províncias',
                link: '/geral/provincias',
                parentId: 12
            },
            {
                id: 21,
                label: 'Unidades',
                link: '/geral/unidades',
                parentId: 12
            }
        ]
    },
    {
        id: 60,
        label: 'Configurações',
        isTitle: true
    },
    {
        id: 61,
        label: 'Utilizadores',
        icon: 'ph-user-circle',
        subItems: [
            {
                id: 62,
                label: 'Utilizadores',
                link: '/configuracao/utilizadores',
                parentId: 61,
            },
            {
                id: 62,
                label: 'Níveis de Acesso',
                link: '/configuracao/niveis-de-acesso',
                parentId: 61,
            }
        ]
    }
]