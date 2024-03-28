// assets
import { IconKey, IconLayoutBoard, IconMicrowave, IconUserCircle } from '@tabler/icons-react';

// constant
const icons = {
  IconKey,
  IconLayoutBoard,
  IconMicrowave,
  IconUserCircle
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
  id: 'pages',
  title: 'Gestion',
  caption: 'Page de Gestion',
  type: 'group',
  children: [
    {
      id: 'Compte',
      title: 'Compte',
      type: 'collapse',
      icon: icons.IconUserCircle,

      children: [
        {
          id: 'ajouter',
          title: 'Ajouter',
          type: 'item',
          url: '/gestion/compte/ajouter',
          target: false
        },
        {
          id: 'modifier',
          title: 'Modifier',
          type: 'item',
          url: '/gestion/compte/modifier',
          target: false
        }
      ]
    },
    {
      id: 'application',
      title: 'Application',
      type: 'item',
      url: '/app',
      icon: icons.IconLayoutBoard,
      breadcrumbs: true
    },
    {
      id: 'projet',
      title: 'Projet',
      type: 'item',
      url: '/projet',
      icon: icons.IconMicrowave,
      breadcrumbs: true
    }
  ]
};

export default pages;
