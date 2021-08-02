import React,{useCallback} from "react";
import "./MultiSelect.scss";
import clearPrimary from "../../assets/images/clear-primary.svg";

export default function Selection({selection,removeSelection}) {

    const onRemoveSelectionClicked = useCallback(event => {
        event.preventDefault();
        removeSelection(selection);
    }, [selection,removeSelection]);

    return (
        <div className="flex selection-tag">
            <div className="flex-item-wide selection-tag-label ellipsis">{selection.label}</div>
            <div className="flex-item">
                <img src={clearPrimary} alt={'remove'} className="clear-primary" onClick={onRemoveSelectionClicked}/>
            </div>
        </div>
);
}
