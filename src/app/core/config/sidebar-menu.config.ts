export const SIDEBAR_MENU = [
  {
    id: 1,
    option: 'Suggestions',
    icon: '/assets/icons/chat.svg',
    children: [
      {
        option: 'dashboard',
        route: '/suggestions/dashboard',
        icon: '/assets/icons/chat.svg',
      },
      {
        option: 'create',
        route: '/suggestions/create-suggestion',
        icon: '/assets/icons/chat.svg',
      },
    ],
  },
  {
    id: 2,
    option: 'Employees',
    route: '/employees',
    icon: '/assets/icons/group.svg',
  },
];
