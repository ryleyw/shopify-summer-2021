import React, {useState} from 'react'
import {IconButton, makeStyles} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import RemoveIcon from '@material-ui/icons/Remove'
import BlockIcon from '@material-ui/icons/Block';

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
    },
    iconDisabled: {
        fontSize: '32pt',
        color: '#997733',
        borderRadius: '12px'
    }
})

function SearchResult(props) {

    const classes = useStyles()
    const [posterURL, setPosterURL] = useState(props.info.Poster)

    const onError = () => {
        setPosterURL(process.env.PUBLIC_URL + '/alt.png')
    }
    
    const handleAdd = () => {
        props.addPick(props.info)
    }
    
    const handleRemove = () => {
        props.removePick(props.info)
    }
    return (

        <div className="searchResult">
            <img className="resultPoster" onError={onError} key={posterURL} src={posterURL}/>
            <div className="resultInfo">
                <div className="resultTitle">{props.info.Title}</div>
                <div className="resultYear">{props.info.Year}</div>
            </div>
            <div className="addContainer">
                {props.added ?
                <IconButton className={classes.button} disabled={props.added}>
                    {/* onClick={handleRemove} */}
                    <BlockIcon className={classes.icon} />
                </IconButton>
                :
                <IconButton className={classes.button} onClick={handleAdd} disabled={props.lockAdd}>
                    {!props.lockAdd ?
                        <AddIcon className={classes.icon}/>
                        :
                        <BlockIcon className={classes.icon}/>
                    }
                </IconButton>
                }
            </div>
        </div>)
}

export default SearchResult