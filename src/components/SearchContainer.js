import React, {useEffect, useState} from 'react'
import {TextField, IconButton, makeStyles} from '@material-ui/core'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import SearchIcon from '@material-ui/icons/Search';
import SyncLoader from 'react-spinners/SyncLoader'
import axios from 'axios'
import SearchResult from './SearchResult'

const useStyles = makeStyles({
    button: {
        position: 'absolute',
        right: '5px',
        backgroundColor: '#181123',
        '&:hover': {
            backgroundColor: '#40384d',
        }
    },
    icon: {
        fontSize: '19pt',
        color: '#BF953F',
        borderRadius: '12px'
    },
    searchIcon: {
        position: 'absolute',
        left: 10,
        top: 7,
        color: "#BF953F",
        fontSize: '26pt'
    }
})

function SearchContainer(props) {
    const APIKey = "c68cd4f4"

    const [searchTerm, setSearchTerm] = useState("")
    const [searchResults, setSearchResults] = useState([])
    const [searchLoading, setSearchLoading] = useState(false)
    const [notFound, setNotFound] = useState(false)
    const classes = useStyles()

    useEffect(() => {
        if (searchTerm.length > 0) {
            setSearchLoading(true)
            const url = `http://www.omdbapi.com/?apikey=${APIKey}`
            const fullUrl = url.concat(`&s=${searchTerm}&type=movie&r=json`)
            console.log(fullUrl)
            axios.get(fullUrl).then(function(response){
                const data = response.data
                if(data.Response=="True") {
                    console.log(data)
                    setNotFound(false)
                    setSearchResults(data.Search)
                } else {
                    setNotFound(true)
                }
                setSearchLoading(false)
            }).catch(function(error) {
                console.log(error)
            })
        }
    }, [searchTerm])


    const displayResults = searchResults.map(function(element, index){

        var added = false
        props.picks.forEach((pick) => {
            if(element.Title==pick.Title) {
                added = true
            }
        });

        return (
            <SearchResult 
                index={index} 
                info={element}
                key={index}
                added={added}
                removePick={props.removePick}
                addPick={props.addPick}
                lockAdd={props.lockAdd}
            />
        )  
    })

    return(
        <div className="searchContainer">
            <div className="searchBar">
                <SearchIcon className={classes.searchIcon}/>
                <textarea className="searchField" placeholder="Start searching!" onChange={(e)=>setSearchTerm(e.target.value)}/>
            </div>
            <div className="searchResults">
                {searchLoading ?
                    <div className="noneFound">    
                        <SyncLoader color='#BF953F'/>
                    </div>
                :
                    <div className="resultsContainer">
                        {(!notFound || displayResults.length == 0) ?
                            <div>                        
                                {displayResults}
                            </div>
                            :
                            <div className="noneFound">
                                No results found!
                            </div>
                        }
                    </div>
                }
            </div>
        </div>
    )
}

export default SearchContainer