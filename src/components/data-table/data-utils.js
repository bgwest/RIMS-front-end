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
    subId: faker.random.number(100000),
    subPart: faker.random.number(4444),
    subVersion: faker.random.number(4444),
    subQuantity: faker.random.number(4444),
    subMinutes: faker.random.number(4444),
    partIds: faker.random.number(4444),
  };
};

export function makeData(len = 5553) {
  return range(len).map(d => {
    return {
      ...newPart(),
      children: range(10).map(newPart),
    };
  });
}
