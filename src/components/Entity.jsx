import React from 'react';
import Remote from '../lib/ragemp'

export default function Entity ({ name, type, size, spriteId }) {
  const SIZE = 64

  function calcSize (size) {
    if (size === 'medium') return 2 * SIZE
    if (size === 'big') return 3 * SIZE
    return SIZE
  }

  const style = {
    objectPosition: `0 ${-spriteId * SIZE}px`,
    width: calcSize(size)
  }

  return (
    <img
      src={ Remote.getUrl(type)}
      className='inventory-item'
      style={ style }
      draggable={ false }
      alt={ name }
    >
    </img>
  )
}
