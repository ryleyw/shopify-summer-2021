import React, {useEffect, useState} from 'react'
import DisplayPicks from './DisplayPicks'
import SearchContainer from './SearchContainer'
import '../css/selections.css'
import {Grid, Row, Col} from 'react-flexbox-grid'
import { SendTwoTone } from '@material-ui/icons'

function SelectionContainer(props) {

    const [numSelected, setNumSelected] = useState(0)
    const [picks, setPicks] = useState([])

    useEffect(()=> {
        const storagePicks = localStorage.getItem("picks")
        if (storagePicks===null) {
            console.log("No local storage found.")
        } else {
            var pickArray = JSON.parse(storagePicks)
            console.log(pickArray)
            setPicks(pickArray)
        }
    }, [])

    useEffect(() => {
        if(picks.length==5) {
            props.setDone(true)
            props.updateRemaining(picks.length)
        } else{
            props.setDone(false)
            props.updateRemaining(picks.length)
        }
    }, [picks])

    const addPick = (info) => {
        console.log(info)
        const newList = [...picks]
        newList.push(info)
        localStorage.setItem("picks", JSON.stringify(newList))
        setPicks(newList)
    }

    const removePick = (info) => {
        var newList = [...picks]
        newList = newList.filter(function(element){
            return element.Title!=info.Title
        })
        localStorage.setItem("picks", JSON.stringify(newList))
        setPicks(newList)
    }

    return(
        <div className="selectionControls">

            <Grid fluid>
                <Row>
                    <Col sm={12} md={6}>
                        <DisplayPicks picks={picks} removePick={removePick}/>
                    </Col>
                    <Col sm={12} md={6}>
                        <SearchContainer lockAdd={props.done} picks={picks} addPick={addPick} removePick={removePick}/>
                    </Col>
                </Row>
            </Grid>
        </div>
    )
}

export default SelectionContainer