import * as uuid from 'uuid';

import * as item from '../actions/item.actions';

export function createPump(): item.AddPayload {
  const id = uuid.v4();
  const canvas = {
    id,
    type: 'rectangle',
    left: 50,
    top: 50,
    strokeWidth: 0,
    width: 20,
    height: 30,
    fill: 'blue'
  };
  const electrical = {
    id,
    powerUsage: 12
  };
  const meta = {
    id,
    type: 'pump',
    name: 'main pump'
  };
  const water = {
    id,
    heightIncrease: 10,
    previousItems: null,
    followingItems: null,
    isOpen: true
  };

  return { id, aspects: { canvas, electrical, meta, water } };
}
