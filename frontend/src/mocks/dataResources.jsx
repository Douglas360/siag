

export const priorityData = [
    { id:1, text: 'Tipo', color: '#64B5F6' },
    { id: 2, text: 'Eventos', color: '#62b63b' },
    { id:3, text: 'Reunião', color: '#ff2626' },
    { id: 4, text: 'Lembrete', color: '#f4f136' },
    { id: 5, text: 'Tarefa', color: '#5936f4' },
]

export const resourcesData = [
  {
    text: 'Samantha Bright',
    id: 1,
   
  }, {
    text: 'John Heart',
    id: 2,
  
  }, {
    text: 'Todd Hoffman',
    id: 3,
   
  }, {
    text: 'Sandra Johnson',
    id: 4,
   
  },
];

export const groupData = [
  {
    text: 'Administrativo',
    id: 1,
   
  }, {
    text: 'Professores',
    id: 2,
  
  }, {
    text: 'Secretaria',
    id: 3,
   
  }
];

export const appointments = [
    {
        id: 1,
        startDate: '2023-04-13T09:45',
        endDate: '2023-04-13T11:00',
        text: 'Reunião Tes',
        priority: 2,
        description: 'Reunião com o cliente',
        ownerId: [2],
        groupId: [1],
    },
    {
        id: 2,
        startDate: '2023-04-13T12:00',
        endDate: '2023-04-13T13:30',
        text: 'Almoço',
        priority: 2,
        ownerId: [1],
    },
    {
        id: 3,
        startDate: '2023-04-14T14:00',
        endDate: '2023-04-14T15:30',
        text: 'Lanchinho',
        priority: 3,
        ownerId: [4],
    },
    {
        id: 4,
        startDate: '2023-04-14T16:00',
        endDate: '2023-04-14T17:30',
        text: 'Apresentação',
        priority: 4,
        ownerId: [3],
    },
    {
        id: 5,
        startDate: '2023-04-14T17:30',
        endDate: '2023-04-14T17:45',
        text: 'Coffee Break',
        priority: 1,
        ownerId: [2],
    },
    {
        id: 6,
        startDate: '2023-04-14T17:45',
        endDate: '2023-04-14T18:00',
        text: 'Apresentação',
        priority: 2,
        ownerId: [1, 2],
    },
    {
        id: 7,
        startDate: '2023-04-15T17:45',
        endDate: '2023-04-14T18:00',
        text: 'Formação',
       
    },
];


