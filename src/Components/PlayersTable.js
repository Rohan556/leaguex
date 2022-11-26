import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import '../CSS/playerstable.css'

const PlayersTable = ({minRequirement, maxRequirement, role, players, handleSelect, viewPage}) => {
  React.useEffect(() => {
    console.log(players);
  })

  return (
    <Box>
        <Typography 
          fontWeight={500}
          fontSize="20px"
          marginLeft="10px"
        >{viewPage ? `Picked Player` : `Pick ${minRequirement} - ${maxRequirement} ${role}`}</Typography>
        <table className='players-table'>
          <thead>
            <tr className="players-row">
              <th>Team</th>
              <th>T. Name</th>
              <th>Player</th>
              <th>Credits</th>
            </tr>
          </thead>
          <tbody>
            {
              !viewPage ? players.map((player) => {
                //console.log(player);
                return(
                  <tr key={player.id} className="players-row" onClick={() => handleSelect(player)} id={player.id} style={{background: player.isSelected ? "grey": "white"}}>
                    <td><img src={player.team_logo} alt="Team Logo"/></td>
                    <td>{player.team_short_name}</td>
                    <td className='players-col'>{player.name}</td>
                    <td className='players-col'>{player["event_player_credit"]}</td>
                  </tr>
                )
              }):
              players.map((player) => {
                console.log(player)
                return(
                  <tr key={player.id} className="players-row">
                    <td><img src={player.team_logo} alt="Team Logo"/></td>
                    <td>{player.team_short_name}</td>
                    <td className='players-col'>{player.name}</td>
                    <td className='players-col'>{player["event_player_credit"]}</td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
    </Box>
  )
}

export default PlayersTable