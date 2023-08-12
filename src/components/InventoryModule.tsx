/** By Tom Franklin */

import { InventoryGrid } from "./InventoryGrid";

export function InventoryModule() {
  return (
    <div className="InventoryModule_root">
      <div className="InventoryModule_header">
        <div className="InventoryModule_inventoryIcon" />
        <div className="InventoryModule_topDecorShape" />
      </div>
      <div className="InventoryModule_content">
        <div className="InventoryModule_grid">
          <div className="InventoryModule_corner" />
          <div className="InventoryModule_corner topLeft" />
          <div className="InventoryModule_corner topRight" />
          <div className="InventoryModule_corner bottomRight" />
          <div className="InventoryModule_decorShape" />
          <div className="InventoryModule_decorShape right" />
        </div>
        <InventoryGrid />
      </div>
    </div>
  );
}
