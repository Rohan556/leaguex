import './App.css';
import React from 'react';
import { PLAYER_DATA_URL, restrictions } from "./config"
import { prepareData } from './helper';
import axios from "axios"
import Header from './Components/Header';
import PlayersTable from './Components/PlayersTable';
import { Button, Grid, Typography } from '@mui/material';
import {Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";

let details = null
let players_selected = []
function App() {
  //State Variables
  const [data, setData] = React.useState([])
  const [displayData, setDisplayData] = React.useState(null)
  
  const navigate = useNavigate()
  //Lifecycles
  React.useEffect(() => {
    getData(PLAYER_DATA_URL)
  }, [])
  React.useEffect(() => {
    let prepared_data = prepareData(data)
    details = {...prepared_data}
    console.log(prepared_data)
    setDisplayData(prepared_data)
  }, [data])

  React.useEffect(() => {
    console.log("displayData", displayData);
  }, [displayData])

  //handlers
  const getData = async(url) => {
    await axios.get(url).then(res => {
      setData(res.data)
    })
  }

  const handleSelect = (player) => {
    const id = document.getElementById(player.id)
    
    if(id.style.background === "" || id.style.background === "white"){
      let role = player.role

      console.log(details);

      if(details.selected >= 11){
        alert("Maximum limit i.e., 11 is reached!")
        return;
      }

      if(details.teamNumbers[player.team_short_name] >= 7){
        alert("Maximum limit per team is already reached!")
        return;
      }

      let roles_selected = details.selectedCategory[role] 
      let restricted_role_limit = restrictions[role].max

      if(roles_selected >= restricted_role_limit){
        alert(`Maximum role select reached! for role ${role}`)
        return;
      }

      if(details.credit - player.event_player_credit < 0){
        alert("Not enough credit")
        return;
      }
      console.log(details.credit);
      console.log(player.event_player_credit);
      details.credit = details.credit -  player.event_player_credit;
      console.log(details);
      details.selected++;
      details.teamNumbers[player.team_short_name]++;
      details.selectedCategory[role]++;
      details.playersOnCategory[role].forEach((ele, ind) => {
        if(ele.id === player.id){
          details.playersOnCategory[role][ind].isSelected = true
          return;
        }
      })
      console.log(details);
      players_selected.push(player)
      setDisplayData({...details})
      id.style.background = "grey"
    }else{
      let role = player.role

      console.log(details);
      details.credit = details.credit + player.event_player_credit;
      details.selected--;
      details.teamNumbers[player.team_short_name]--;
      details.selectedCategory[role]--;
      players_selected = players_selected.filter((ele) => {
        return ele.id !== player.id
      })
      details.playersOnCategory[role].forEach((ele, ind) => {
        if(ele.id === player.id){
          details.playersOnCategory[role][ind].isSelected = false
          return;
        }
      })
      setDisplayData({...details})
      id.style.background = "white"
    }
  }

  const handleSubmit = () => {
    const roles = Object.keys(details.playersOnCategory)
    console.log(roles)
    const not_met = []
    roles.forEach((role) => {
      if(details.selectedCategory[role] < restrictions[role].min){
        not_met.push(role)
      }
    })

    console.log(not_met.join(",").toString())
    console.log(not_met)
    if(not_met.length){
      alert(`Minimum selection condition not met for ${not_met.join(",").toString()}`)
      return
    }

    navigate("/view")
    console.log(players_selected);

  }

  return (
    <Routes>
      <Route exact path="/" element={<div className="App">
              <header className="App-header">
              <Header displayData={displayData} />
              <Grid container spacing={2}>
              {
                displayData ? Object.keys(displayData.playersOnCategory).map((role) => {
                  return (
                    <Grid item xs={6} md={6} key={role}>
                      <PlayersTable minRequirement={restrictions[role].min} maxRequirement={restrictions[role].max} role={role} players={displayData.playersOnCategory[role]} handleSelect={handleSelect} viewPage={false}/>
                    </Grid>
                  )
                }): null
              }
              </Grid>
              <Typography style={{textAlign: "center"}}>
                <Button style={{width: "60%", background: "green", color: "white", margin: "3% 0"}} onClick={() => handleSubmit()}>Proceed</Button>
              </Typography>
              </header>
            </div>}>
      </Route>
      <Route path='/view' element={<div className="App"><PlayersTable viewPage={true} players={players_selected}/></div>}></Route>
    </Routes>
    
  );
}

export default App;
