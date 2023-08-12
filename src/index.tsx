import { render } from "preact";
import { InventoryModule } from "./components/InventoryModule";
import "./style.scss";

export function InventoryBase() {
  return (
    <div className={"App_root"}>
      <div className={"App_background"} />
      <InventoryModule />
    </div>
  );
}

render(<InventoryBase />, document.getElementById("InventoryModule"));
