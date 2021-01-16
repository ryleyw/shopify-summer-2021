import React, {useState} from 'react'
import {motion, AnimatePresence} from 'framer-motion'
import {IconButton, makeStyles} from '@material-ui/core'
import TheatersIcon from '@material-ui/icons/Theaters';
import RemoveIcon from '@material-ui/icons/Remove'
import Pick from './Pick'

const variants = {
    visible: { opacity: 1, x: 0 },
    hidden: { opacity: 0, x:100 },
    transition: {duration: 3}
}

function DisplayPicks(props) {

    const handleRemove = (info) => {
        props.removePick(info)
    }

    const pickList = props.picks.map((element, index)  => {
        console.log(element)
        return(
                <motion.div
                    initial='hidden'
                    animate='visible'
                    variants={variants}
                >

                    <Pick info={element} key={index} index={index} removePick={handleRemove}/>
                </motion.div>


        )    
    })

    return(
        <div className="displayContainer">
            <div className="listPicks">
                {pickList.length==0 ?
                    <div className="noPicks">
                        <div className="movieIcon">
                            <TheatersIcon fontSize='inherit'/>
                        </div>
                        <div className="noPickText">
                            Your picks will show here!
                        </div>
                    </div>
                :
                    <div>
                    {pickList}
                    </div>

                }
            </div>
        </div>
    )
}

export default DisplayPicks