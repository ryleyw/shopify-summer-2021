import React, {useState} from 'react'
import {IconButton, makeStyles} from '@material-ui/core'
import RemoveIcon from '@material-ui/icons/Remove'

const useStyles = makeStyles({
    button: {
        position: 'absolute',
        right: '30px',
        top: '40px',
        backgroundColor: '#181123',
        '&:hover': {
            backgroundColor: '#40384d',
        },
        '&.Mui-disabled': {
            color:'#181123'
        }
    },
    icon: {
        fontSize: '32pt',
        color: '#BF953F',
        borderRadius: '12px'
    }
})

function Pick(props) {

    const classes = useStyles()

    const [posterURL, setPosterURL] = useState(props.info.Poster)

    const handleRemove = () => {
        props.removePick(props.info)
    }

    const addDefaultSrc = (ev) => {
        ev.target.src = process.env.PUBLIC_URL + '/alt.png'
    }

    return  (
        <div className="pickResult">
            <img className="pickPoster" 
                onError={(e) => addDefaultSrc(e)}
                key={posterURL} 
                src={props.info.Poster}/>
            <div className="pickInfo">
                <div className="pickTitle">{props.info.Title}</div>
                <div className="pickYear">{props.info.Year}</div>
            </div>
            <div className="removeContainer">
                <IconButton className={classes.button}>
                    <RemoveIcon className={classes.icon} onClick={handleRemove}/>
                </IconButton>
            </div>
        </div>
    )
}

export default Pick