import React from 'react';
import faker from 'faker';

import './data-table.scss';

const range = len => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const newPart = () => {
  return {
    subId: '2',
    subPart: 'password',
    subVersion: 'question',
    subQuantity: 'answer',
    subMinutes: 'ok',
    partIds: [
      '5bece67b90c80d89d79c84f5',
      '5bece68490c80d89d79c84f6',
      '5bece68e90c80d89d79c84f7',
    ],
    // subId: faker.random.number(100000),
    // subPart: faker.random.number(4444),
    // subVersion: faker.random.number(4444),
    // subQuantity: faker.random.number(4444),
    // subMinutes: faker.random.number(4444),
    // partIds: faker.random.number(4444),
  };
};

export function makeData(len = 1) {
  return range(len).map(d => {
    return {
      ...newPart(),
      children: range(10).map(newPart),
    };
  });
}
