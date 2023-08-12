/** By Tom Franklin */

import * as Preact from "preact";
import { DummyDataGenerator, GameData } from "../data/GameTypes";
import {
  InventoryData,
  InventoryGridEvent,
} from "../data/InventoryDataHandler";
// classnames is a very useful library for combining strings, json objects to strings etc. and is lightweight.
import { classNames } from "../lib/classNames";

type Props = {
  gridId: number;
  inventoryData: InventoryData;
};

type State = {
  data: GameData.InventoryItem;
  dragging: boolean;
  droppedIn: boolean;

  // usually controller would also be supported, so good habit to trigger the focus styling via js
  focused: boolean;
};

// i have used traditional classes rather than functional classes with hooks, because Coherent uses a older version of Preact.
export class InventoryButton extends Preact.Component<Props, State> {
  componentWillMount() {
    const data = DummyDataGenerator.generateRandomData(this.props.gridId);

    // generate dummy data and add it to the grid. Usually the grid would be handled by gameplay
    this.setState({ data });
    this.props.inventoryData.addGridItem(this.props.gridId, data);

    this.props.inventoryData.onInventoryChange.register(this.onItemUpdate);
  }

  render(props: Props, state: State) {
    const { droppedIn, data, dragging, focused } = state;

    return (
      <div className="InventoryButton_root">
        <div
          className={classNames("InventoryButton_content", { focused })}
          // moved this to content, this way the drop events still appear if the button is empty.
          onDrop={this.onItemDrop}
          onDragOver={this.onDragOver}
          onDragLeave={this.onMouseLeave}
          onDragEnd={this.onDragStop}
          onMouseOver={this.onHover}
          onMouseLeave={this.onMouseLeave}
          onClick={this.onSelect}
        >
          {/* placed the background in its own div so i can animate its opacity easily without touching other stuff. */}
          <div className="InventoryButton_background" />
          <div className="InventoryButton_number">
            {data.amount > 0 && data.typeProps?.isStackable && data.amount}
          </div>
          {data.type != undefined && data.amount > 0 && (
            // seperated into two divs, so that slot can handle the padding to make the entire button clickable, rather than just the icon, while still maintaining correct size.
            <div
              className={classNames("InventoryButton_slot", { droppedIn })}
              onAnimationEnd={this.onDropInAnimationEnd}
              draggable={true}
              onDragStart={this.onDragStart}
            >
              <div
                className={"InventoryButton_icon"}
                style={{
                  backgroundImage: `url("./assets/Images/Icons/${
                    GameData.EInventoryItemType[data.type]
                  }.png")`,
                }}
              ></div>
            </div>
          )}
          {data.type != undefined && !dragging && (
            // this could maybe its own component if it were expanded upon, and used elsewhere.
            // would usually contain loc strings, not raw strings.
            <div className={classNames("InventoryButton_tooltip", { focused })}>
              <div className="InventoryButton_tooltip_title">
                {data.typeProps.name && data.typeProps.name}
              </div>
              <div className="InventoryButton_tooltip_desc">
                {data.typeProps.description && data.typeProps.description}
              </div>
              <div className="InventoryButton_tooltip_weight">150g</div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // depending on your version of Gameface, the onAnimationEnd event support is spotty, so timeouts can be a valid option for when animations finish.
  onDropInAnimationEnd = () => {
    this.setState({ droppedIn: false });
  };

  onItemUpdate = (e: InventoryGridEvent) => {
    // if the item is updated for whatever reason, set the state to this info so it updates in the dom.
    if (e.key === this.props.gridId) {
      if (e.item.amount <= 0) {
        e.item.type = undefined;
        e.item.amount = 0;
      }

      this.setState({ data: e.item, droppedIn: true });
    }
  };

  onItemDrop = () => {
    const { inventoryData, gridId } = this.props;

    // get both items that are being exchanged.
    let gridItem = inventoryData.inventoryGridStorage[gridId];
    const draggedItemEvent = inventoryData.currentSelectedItem;

    inventoryData.onInventoryItemDrop(draggedItemEvent, {
      key: gridId,
      item: gridItem,
    });
  };

  onDragStart = () => {
    const { inventoryData } = this.props;

    const gridItem = inventoryData.inventoryGridStorage[this.props.gridId];

    inventoryData.currentSelectedItem = {
      key: this.props.gridId,
      item: gridItem,
    };

    this.setState({ dragging: true });
  };

  onDragStop = () => {
    this.setState({ dragging: false });
  };

  onDragOver = (ev: Event) => {
    ev.preventDefault();

    // having the "focused" state rather than :hover also gives us the benefit we can do a focus state while dragging, with the drag API
    this.onHover();
  };

  onHover = () => {
    this.setState({ focused: true, dragging: false });
  };

  onMouseLeave = () => {
    this.setState({ focused: false });
  };

  onSelect = () => {
    alert(
      `you activated item: ${this.state.data.typeProps.id}, it is ${this.state.data.typeProps.name}, with a quantity of ${this.state.data.amount}.
      
      Usually, this would maybe open another window, or (most likely) send an event to gameplay, telling them which item has been selected. Maybe if there was a crafting table.. items would go into that.
      `
    );
  };
}
