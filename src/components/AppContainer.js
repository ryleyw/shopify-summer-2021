import React, {useState} from 'react'

import SelectionContainer from './SelectionContainer'

function AppContainer(props) {
    const [done, setDone] = useState(false)

    const setBanner = (setTo) => {
        setDone(setTo)
    }

    return(
        <div>
            <div className="headerBar">
                <div className="headerTitle">
                    Shoppies
                </div>
            </div>
            { done &&
             <div className="doneBanner">You have made your selection! Click here for custom page.</div>
            }
            <SelectionContainer setDone={setBanner} done={done} handleFill={setBanner}/>
        </div>
    )
}

export default AppContainer