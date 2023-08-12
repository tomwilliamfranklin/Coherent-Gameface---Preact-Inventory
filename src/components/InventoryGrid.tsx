/** By Tom Franklin */

import * as Preact from "preact";
import { InventoryData } from "../data/InventoryDataHandler";
import { InventoryButton } from "./InventoryButton";

type Props = {};

export class InventoryGrid extends Preact.Component<Props> {
  /** The InventoryData class handles everything to do with the slot/button data updates, rather than any object in the State.
   * The InventoryData contains an observer pattern which signals all the buttons when a change is made, however the button detects whether the change is relevant to it's data,
   * if it is, it redraws - if not it does nothing. This prevents all of the buttons being redrawn from one data change, which is what would happen if it was stored in the State here.
   */
  private inventoryData: InventoryData;

  componentWillMount(): void {
    this.inventoryData = new InventoryData();
  }

  render() {
    return (
      <div className="InventoryGrid_root">
        {this.inventoryData.inventoryGridStorage.map((el, index) => {
          return (
            <InventoryButton
              inventoryData={this.inventoryData}
              gridId={index}
              key={index}
            />
          );
        })}
      </div>
    );
  }
}
