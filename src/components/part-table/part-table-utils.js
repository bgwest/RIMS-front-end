import React from 'react';
import faker from 'faker';
import './part-table.scss';

const range = (len) => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const newPerson = () => {
  return {
    partId: 'daniel',
    lastName: 'frey',
    age: 'testing',
    visits: 'broken',
    progress: 'tables fucking SUCK',
  };
};

export function makeData(len = 10) {
  return range(len).map((d) => {
    return {
      ...newPerson(),
      children: range(10).map(newPerson),
    };
  });
}
