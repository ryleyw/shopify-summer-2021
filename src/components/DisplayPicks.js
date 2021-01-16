import React, {useState} from 'react'

function DisplayPicks(props) {
    
    const pickList = props.picks.map((element, index)  => {
        return(
            <div className="pick">
                {element.Title}
            </div>
        )    
    })
    return(
        <div className="displayContainer">
            <div className="listPicks">
                {pickList}
            </div>
        </div>
    )
}

export default DisplayPicks