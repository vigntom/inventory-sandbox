/* globals EventManager */
import React, { useEffect, useState } from 'react';
import Entity from './Entity'
import Cell from './Cell'

// Example:
// const items = [
//   {
//     name: 'sneaker',
//     type: 'clothes',
//     spriteId: 7,
//     size: 'normal',
//     placeId: 1
//   },
//   {
//     name: 'trousers',
//     type: 'clothes',
//     spriteId: 8,
//     size: 'normal'
//     placeId: 5
//   }
// ]

const [cols, rows] = [3, 9]

function renderCell(i, children) {
  return <Cell key={ i }>{ children }</Cell>
}

export default function Inventory () {
  const [cells, setCells] = useState([])
  const [active, setActive] = useState(false)

  useEffect(() => {
    function toggleInventory (toggle) {
      return setActive(toggle)
    }

    function updateInventory (items) {
      const result = []

      for (let i = 0; i < cols * rows; i++) {
        result.push(renderCell(i, null))
      }

      items.forEach(item => {
        const id = item.placeId
        result[id] = renderCell(id, <Entity { ...item } />)
      })

      setCells(result)
    }

    EventManager.subscribe('inventory:show', toggleInventory)
    EventManager.subscribe('inventory:update', updateInventory)

    updateInventory([])

    return function cleanup () {
      EventManager.unsubscribe('inventory:show', toggleInventory)
      EventManager.unsubscribe('inventory:update', updateInventory)
    }
  }, [])

  if (!active) return null

  return (
    <div className='inventory'>
      { cells }
    </div>
  )
}
