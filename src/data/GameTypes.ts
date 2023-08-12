/** By Tom Franklin */

export namespace GameData {
  export type InventoryItem = {
    type: EInventoryItemType;
    amount: number;
    typeProps?: InventoryItemType;
  };

  export class InventoryItemType {
    id: number;
    name?: string;
    description?: string;
    activated?: boolean;
    isStackable: boolean;
  }

  export enum EInventoryItemType {
    None,
    Apple,
    Book,
    Flask,
    Herbs,
    Sword,
  }

  export function isStackable(inventoryItem: GameData.InventoryItem) {
    return inventoryItem.typeProps?.isStackable;
  }
}

// all the stuff in here would only really be for debug mode. Not for real gameplay
export namespace DummyDataGenerator {
  export const bookNames = [
    "Teleport",
    "Invisibility",
    "High Jump",
    "Strength",
    "Kick",
  ];

  export function generateRandomData(gridId: number): GameData.InventoryItem {
    const enumKeys = Object.keys(GameData.EInventoryItemType).filter((item) =>
      isNaN(Number(item))
    );
    // + 1 means that it has a chance of returning undefined, thus producing an empty slot.
    const randomType =
      GameData.EInventoryItemType[
        enumKeys[Math.floor(Math.random() * enumKeys.length + 1)]
      ];

    const isStackable = isTypeStackable(randomType);
    const randomQuantity = isStackable ? Math.floor(Math.random() * 99) : 1;
    const activated = isActivatable(randomType);

    return {
      type: randomType,
      // if randomType is undefined, make it empty.
      amount: randomType ? randomQuantity : 0,
      typeProps: {
        id: gridId, // usually the id of the item would not actually be tied to the grid slot. It would be from the database. This is purely to make sure they all have unique ids rather than random.
        isStackable,
        activated: activated,
        name: generateName(randomType),
        description: generateDescription(randomType, activated),
      },
    };
  }

  // it would be entirely dependant on how the data is set up, on how we establish the Type's properties. We could do classes for the types,
  // but usually gameplay would provide this information directly from the game data so its just about populating each slot with that temp information.
  export function isTypeStackable(type: GameData.EInventoryItemType) {
    switch (type) {
      case GameData.EInventoryItemType.Sword:
      case GameData.EInventoryItemType.Flask:
      case GameData.EInventoryItemType.Book:
        return false;
      default:
        return true;
    }
  }

  export function isActivatable(type: GameData.EInventoryItemType) {
    switch (type) {
      case GameData.EInventoryItemType.Book:
        return Math.random() < 0.5;
      default:
        return undefined;
    }
  }

  export function generateName(type: GameData.EInventoryItemType) {
    switch (type) {
      case GameData.EInventoryItemType.Book:
        return bookNames[Math.floor(Math.random() * bookNames.length)];
      default:
        return GameData.EInventoryItemType[type]; // usually be loc strings
    }
  }

  export function generateDescription(
    type: GameData.EInventoryItemType,
    activated?: boolean
  ) {
    switch (type) {
      case GameData.EInventoryItemType.Book:
        return activated ? "Already Known." : "Open to read."; // usually be loc strings
      default:
        return `${GameData.EInventoryItemType[type]}_DESCRIPTION`;
    }
  }
}
