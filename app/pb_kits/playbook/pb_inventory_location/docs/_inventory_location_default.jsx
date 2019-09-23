import React from "react"
import InventoryLocation from "../_inventory_location.jsx"

function InventoryLocationDefault() {
  return (
    <div>
      <InventoryLocation type="cart" bin="01" link="#" />
      <InventoryLocation type="rack" bin="C-01-01" link="#" />
      <InventoryLocation type="zone" bin="C" />
    </div>
  )
}

export default InventoryLocationDefault;
