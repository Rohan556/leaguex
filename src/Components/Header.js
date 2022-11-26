import { Box, Typography} from '@mui/material'
import { Stack } from '@mui/system'
import React from 'react'
import "../CSS/header.css"

const Header = ({displayData}) => {

  console.log(displayData)
  return (
    <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    marginBottom="5%"
    >
        <Stack spacing={2}>
            <Typography style={{fontSize: "25px", fontWeight: 700}}>Pick Players</Typography>
            <table>
                <thead>
                  <tr>
                    <td>
                      <Stack>
                        <Typography className='bold'>{displayData ? displayData.selected: 0}/11</Typography>
                        <Typography className='bold'>Players</Typography>
                      </Stack>
                    </td>
                    {
                      displayData ? displayData.teams.map((team) => {
                        return (
                          <td key={team}>
                            <Stack>
                              <Typography className='bold'>{displayData.teamNumbers[team]}</Typography>
                              <Typography className='bold'>{team}</Typography>
                            </Stack>
                          </td> 
                        )
                      }): null
                    }
                    <td>
                      <Stack>
                        <Typography className='bold'>{displayData ? displayData.credit : 100}</Typography>
                        <Typography className='bold'>Cr Left</Typography>
                      </Stack>
                    </td>
                  </tr>
                </thead>
            </table>
        </Stack>
    </Box>
  )
}

export default Header