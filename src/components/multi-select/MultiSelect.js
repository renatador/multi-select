import React, {useState, useEffect, useRef} from "react";
import "./MultiSelect.scss";
import Selection from "./Selection";
import closeWhite from "../../assets/images/close-white.svg"
import arrowStatic from "../../assets/images/arrow-static.svg"

export default function MultiSelect({ options, selectedOptions, onChange }) {
    const multiSelectRef = useRef(null);
    const multiSelectSelectionsRef = useRef(null);
    const [isShowOption, setIsShowOption] = useState(false);
    const [isShowClearBtn, setIsShowClearBtn] = useState(false);
    const [currentOptions, setCurrentOptions] = useState(options);

    useEffect(() => {
        const handleClick = event =>{
            if ((multiSelectRef.current && !multiSelectRef.current.contains(event.target)) &&
                multiSelectSelectionsRef.current && !multiSelectSelectionsRef.current.contains(event.target)) {
                if(isShowOption && currentOptions.length > 0) {
                    setIsShowOption(false);
                }
            } else if (multiSelectSelectionsRef.current && multiSelectSelectionsRef.current.contains(event.target)){
                if(!isShowOption && currentOptions.length > 0 ) {
                    setIsShowOption(true);
                }
            }
        }
        document.addEventListener("mousedown", handleClick);
        return () => {
            document.removeEventListener("mousedown", handleClick);
        };
    }, [multiSelectRef,isShowOption,currentOptions.length]);

    useEffect(()=>{
        if(selectedOptions.length > 0 ) {
            setIsShowClearBtn(true);
        } else {
            setIsShowClearBtn(false);
        }
    },[selectedOptions.length]);

    useEffect(()=>{
        if(currentOptions.length === 0 ) {
            if(isShowOption) {
                setIsShowOption(false);
            }
        }
    },[currentOptions,isShowOption,currentOptions.length]);


    const handleRemoveSelection = selection => {
        const currentRemovedSelection = Array.from(selectedOptions)
        .filter(selectedOption => selectedOption.value !== selection.value);
        const tempCurrentOptions = currentOptions;
        setCurrentOptions(tempCurrentOptions.concat(selection));
        onChange(currentRemovedSelection);
    };

    const handleSelectionChange = event => {
        event.preventDefault();
        const currentSelection = Array.from(event.target.options)
        .filter(option => option.selected);
        const optionsAfterSelection = Array.from(event.target.options)
        .filter(option => !option.selected)
        .map(option => option);
        setCurrentOptions(optionsAfterSelection);
        onChange(selectedOptions.concat(currentSelection));
    };

    const onToggleSelect = event => {
        event.preventDefault();
        setIsShowOption(!isShowOption);
    };

    const onClearAllSelections = event => {
        event.preventDefault();
        onChange([]);
        setCurrentOptions(options);
    };

  return (
      <div className="MultiSelect">
        <div ref={multiSelectSelectionsRef} className="flex selection-container">
            <div className="padding--5 flex-item-wide width--100">
                <div className="flex-wrap">
                    {selectedOptions && (selectedOptions.map(selectedOption => <Selection className="flex-item-wide selection-item" key={selectedOption.value} selection={selectedOption} removeSelection={handleRemoveSelection}></Selection>))}
                </div>

            </div>
            {isShowClearBtn && (<div className="padding--5 flex-item">
                <img src={closeWhite} onClick={onClearAllSelections} alt={'clear'}
                     className="close-white"/>
            </div>)}
            <div className="padding--5 flex-item">
                <img src={arrowStatic} onClick={onToggleSelect} alt={'open'}
                     className={isShowOption?"arrow-static rotate-180":"arrow-static"}/>
            </div>
        </div>
      {isShowOption && (<select
          multiple
          ref={multiSelectRef}
          onChange={handleSelectionChange}
          value={selectedOptions}
          className="select-options-container"
          >
              {currentOptions.sort((a, b) => a.label.localeCompare(b.label)).map((currentOption) => (
              <option className="select-option" key={currentOption.value} value={currentOption.value}>
                  {currentOption.label}
              </option>
              ))}
          </select>)}
  </div>
  );
}
