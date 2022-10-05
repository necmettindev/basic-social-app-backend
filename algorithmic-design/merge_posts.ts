interface Post {
  id: number;
  description: string;
  image: string;
  created_at: number;
}

// create post array
const firstPosts = [
  {
    id: 0,
    description: 'Hello1',
    image:
      'https://cdn.lolchess.gg/upload/images/items/HextechGunblade_1640058876.png',
    created_at: 1664998711,
  },
  {
    id: 1,
    description: 'Hello2',
    image:
      'https://cdn.lolchess.gg/upload/images/items/HextechGunblade_1640058876.png',
    created_at: 1664998713,
  },
  {
    id: 2,
    description: 'Hello3',
    image:
      'https://cdn.lolchess.gg/upload/images/items/HextechGunblade_1640058876.png',
    created_at: 1664998715,
  },
  {
    id: 3,
    description: 'Hello4',
    image:
      'https://cdn.lolchess.gg/upload/images/items/HextechGunblade_1640058876.png',
    created_at: 1664998719,
  },
  {
    id: 4,
    description: 'Hello5',
    image:
      'https://cdn.lolchess.gg/upload/images/items/HextechGunblade_1640058876.png',
    created_at: 1664998711,
  },
];

const secondPosts: Post[] = [
  {
    id: 5,
    description: 'Hello1',
    image:
      'https://cdn.lolchess.gg/upload/images/items/HextechGunblade_1640058876.png',
    created_at: 1664998721,
  },
  {
    id: 6,
    description: 'Hello2',
    image:
      'https://cdn.lolchess.gg/upload/images/items/HextechGunblade_1640058876.png',
    created_at: 1664998733,
  },
  {
    id: 7,
    description: 'Hello3',
    image:
      'https://cdn.lolchess.gg/upload/images/items/HextechGunblade_1640058876.png',
    created_at: 1664998711,
  },
  {
    id: 8,
    description: 'Hello4',
    image:
      'https://cdn.lolchess.gg/upload/images/items/HextechGunblade_1640058876.png',
    created_at: 1664998709,
  },
  {
    id: 9,
    description: 'Hello5',
    image:
      'https://cdn.lolchess.gg/upload/images/items/HextechGunblade_1640058876.png',
    created_at: 1664998117,
  },
];

const thirdPosts: Post[] = [
  {
    id: 10,
    description: 'Hello1',
    image:
      'https://cdn.lolchess.gg/upload/images/items/HextechGunblade_1640058876.png',
    created_at: 1664998721,
  },
  {
    id: 11,
    description: 'Hello2',
    image:
      'https://cdn.lolchess.gg/upload/images/items/HextechGunblade_1640058876.png',
    created_at: 1664998733,
  },
  {
    id: 12,
    description: 'Hello3',
    image:
      'https://cdn.lolchess.gg/upload/images/items/HextechGunblade_1640058876.png',
    created_at: 1664998711,
  },
  {
    id: 13,
    description: 'Hello4',
    image:
      'https://cdn.lolchess.gg/upload/images/items/HextechGunblade_1640058876.png',
    created_at: 1664998709,
  },
  {
    id: 14,
    description: 'Hello5',
    image:
      'https://cdn.lolchess.gg/upload/images/items/HextechGunblade_1640058876.png',
    created_at: 1664998117,
  },
];

const mergePosts = (listOfPosts: Post[][]): Post[] => {
  const concatList = [].concat(...listOfPosts);

  for (let i = 0; i < concatList.length; i++) {
    for (let j = 0; j < concatList.length; j++) {
      if (concatList[i].created_at > concatList[j].created_at) {
        const temp = concatList[i];
        concatList[i] = concatList[j];
        concatList[j] = temp;
      }
      if (concatList[i].created_at === concatList[j].created_at) {
        if (concatList[i].id > concatList[j].id) {
          const temp = concatList[i];
          concatList[i] = concatList[j];
          concatList[j] = temp;
        }
      }
    }
  }

  return concatList.reverse();
};

const result = mergePosts([firstPosts, secondPosts, thirdPosts]);

console.log(result);
