import { Visibility } from '@material-ui/icons'
import { AnimatePresence, motion } from 'framer-motion'
import React, {useEffect, useState} from 'react'

import SelectionContainer from './SelectionContainer'

const variantsOne = {
    visible: { opacity: 1, x: 0 },
    hidden: { opacity: 0, x:100 },
    transition: {duration: 3}
}

const variantsTwo = {
    visible: { opacity: 1, x: 0 },
    hidden: { opacity: 0, x:-100 },
    transition: {duration: 3}
}

const variantsThree = {
    visible: { opacity: 1, x: 0, y:0, scaleY: 1},
    hidden: { opacity: 0, y:-100, scaleY: 0},
    transition: {duration: 3}
}

function AppContainer(props) {
    const [done, setDone] = useState(false)
    const [remaining, setRemaining] = useState(5)
    const [increment, setIncrement] = useState(true)

    useEffect(() => {
        const storagePicks = localStorage.getItem("picks")
        if (storagePicks===null) {
            console.log("No local storage found.")
        } else {
            var pickArray = JSON.parse(storagePicks)
            setRemaining(5-pickArray.length)
        }
    }, [])

    const setBanner = (setTo) => {
        setDone(setTo)
    }

    const updateRemaining = (value) => {
        if((5-value) > remaining) {
            setIncrement(true)
        } else {
            setIncrement(false)
        }
        setRemaining(5-value)

    }
    return(
        <div className="appContainer">
            <div className="headerBar">
                <div className="headerTitle">
                    Shoppies
                </div>
                <a href="https://github.com/ryleyw/shopify-summer-2021" target="_blank">
                    <img className="headerImage" src={process.env.PUBLIC_URL + '/github.png'}/>
                </a>
                
            </div>
            { done ?
                <div style={{marginTop: 0, paddingTop:'50px', visibility: 'visible'}}className="doneBanner">You have made your selections! Thank you for participating.</div>
                :
                <div className="doneBanner">You have made your selections! Thank you for participating.</div>
            }
            <div className="spacer">
            <div className="pickCounter">
                {increment ?
                    <motion.div
                    initial='hidden'
                    animate='visible'
                    variants={variantsOne}
                    key={remaining}
                    >
                    <span className="count">{remaining}</span> 
                    </motion.div>
                    :
                    <motion.div
                    initial='hidden'
                    animate='visible'
                    variants={variantsTwo}
                    key={remaining}
                >
                    <span className="count">{remaining}</span> 
                </motion.div>
                }               

                picks left!
                </div> 
            </div>
            <SelectionContainer setDone={setBanner} done={done} handleFill={setBanner} updateRemaining={updateRemaining}/>
        </div>
    )
}

export default AppContainer