import { MaterialIcon } from '../components/Icon';

export const tripCategories = {
  AD: 'Adventure',
  WN: 'Wildlife & Nature',
  CT: 'Cities',
  RU: 'Ruins & temples',
  RT: 'Road trips',
  HK: 'Hiking',
  FD: 'Food & drink',
  AC: 'Art & culture',
  CI: 'Coasts & islans',
  FA: 'Family',
};

export const tripActivitiesList = [
  // this is the parent or 'item'
  {
    name: 'Main Activities',
    id: 200,
    // these are the children or 'sub items'
    children: [
      {
        name: 'Road trip',
        id: 6,
      },
      {
        name: 'Hiking',
        id: 7,
      },
      {
        name: 'Moantain Biking',
        id: 8,
      },
      {
        name: 'Offroad',
        id: 9,
      },
      {
        name: 'ski',
        id: 10,
      },
      {
        name: 'Boating',
        id: 11,
      },
      {
        name: 'Running',
        id: 12,
      },
      {
        name: 'Rocking',
        id: 13,
      },
      {
        name: 'Ballon',
        id: 14,
      },
      {
        name: 'Paraglider',
        id: 15,
      },
      {
        name: 'Camping',
        id: 16,
      },
      {
        name: 'Horsemanship',
        id: 17,
      },
      {
        name: 'Motorcycle',
        id: 18,
      },
      {
        name: 'Food and drink',
        id: 19,
      },
    ],
  },

  // next parent item
];
