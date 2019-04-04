import * as uuid from 'uuid';

import * as item from '../actions/item.actions';

export function createPump(): item.AddPayload {
  const id = uuid.v4();
  const canvasAspect = {
    id,
    type: 'rectangle',
    left: 50,
    top: 50,
    strokeWidth: 0,
    width: 20,
    height: 30,
    fill: 'blue'
  };
  const electricalAspect = {
    id,
    powerUsage: 12
  };
  const metaAspect = {
    id,
    type: 'pump',
    name: 'main pump'
  };
  const waterAspect = {
    id,
    heightIncrease: 10,
    previousItems: null,
    followingItems: null,
    isOpen: true
  };

  return {id, aspects: {canvasAspect, electricalAspect, metaAspect, waterAspect}};
}
