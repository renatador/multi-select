import React, { useState } from "react";
import categories from "./categories";
import MultiSelect from "./components/multi-select/MultiSelect";
import "./App.scss";

export default function App() {
  const [selectedOptions, setSelectedOptions] = useState([]);

  function onChangeSelect(selected) {
    setSelectedOptions(selected);
  }

  return (
    <div className="App">
      <div className="Modal">
        <form>
          <div className="FormGroup">
            <label>Categories</label>
            <MultiSelect
              onChange={onChangeSelect}
              options={categories}
              selectedOptions={selectedOptions}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
