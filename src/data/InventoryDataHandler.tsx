/** By Tom Franklin */

import { GameData } from "./GameTypes";
import { Subject } from "./Observer";

export type InventoryGridEvent = {
  key: number;
  item: GameData.InventoryItem;
};

export class InventoryData {
  // lets us know when an items value has been updated, to update the individual state.
  public onInventoryChange: Subject<InventoryGridEvent>;

  // keeps track of what slot contains what data. Could be useful when expanding features
  private _inventoryGridStorage: GameData.InventoryItem[];

  private _currentSelectedItem: InventoryGridEvent;

  public set currentSelectedItem(newItem: InventoryGridEvent) {
    this._currentSelectedItem = newItem;
  }

  public get currentSelectedItem(): InventoryGridEvent {
    return this._currentSelectedItem;
  }

  public get inventoryGridStorage(): GameData.InventoryItem[] {
    return this._inventoryGridStorage;
  }

  constructor() {
    // populating the inventory with dummy empty data to be filled later.
    this._inventoryGridStorage = [...Array(40)];

    // initialising observer
    this.onInventoryChange = new Subject();
    this.onInventoryChange.register(this.updateGridStorage);
  }
  // arrow functions are used throughout so that the value of "this" is bound to the InventoryData class, and is not lost when called by the inventory buttons.
  public updateGridStorage = (e: InventoryGridEvent) => {
    this.inventoryGridStorage[e.key] = e.item;
  };

  // called when initialising the buttons of the grid
  public addGridItem = (key: number, item: GameData.InventoryItem) => {
    this.inventoryGridStorage[key] = item;
    this.inventoryGridStorage[key] = {
      type: item.type,
      amount: item.amount,
      typeProps: item.typeProps,
    };
  };

  public onInventoryItemDrop = (
    giverItem: InventoryGridEvent,
    takerItem: InventoryGridEvent
  ) => {
    // if they've dragged an item onto its own self, ignore
    if (takerItem.key === giverItem.key) return;

    // if the item is an equal type to stack, and is stackable.
    if (
      takerItem.item.type === giverItem.item.type &&
      GameData.isStackable(giverItem.item)
    ) {
      // usually calculated by gameplay, i imagine an event would be sent and the value would be updated from there.
      takerItem.item.amount = takerItem.item.amount + giverItem.item.amount;
      giverItem.item.amount = 0;

      // gameplay could call this notify function directly via an event hooked up to the engine.
      this.onInventoryChange.notify(takerItem);
      this.onInventoryChange.notify(giverItem);
    } else {
      // swap the items around
      this.onInventoryChange.notify({
        key: giverItem.key,
        item: takerItem.item,
      });
      this.onInventoryChange.notify({
        key: takerItem.key,
        item: giverItem.item,
      });
    }
  };
}
