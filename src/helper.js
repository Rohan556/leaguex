
export const prepareData = (data) => {
    let info = {}
    let teams = {}
    let playersOnCategory = {}

    data.forEach((ele, ind) => {
        // console.log(ele);
        if(!teams.hasOwnProperty(ele.team_short_name))
            teams[ele.team_short_name] = 0

        if(playersOnCategory.hasOwnProperty(ele.role)){
            let players = playersOnCategory[ele.role]
            // console.log(players)
            ele.isSelected = false
            players.push(ele)
            playersOnCategory[ele.role] = players
        }else{
            ele.isSelected = false
            let player = [ele]
            playersOnCategory[ele.role] = player
        }
    })

    let selectedCategory = {}

    Object.keys(playersOnCategory).forEach((role) => {
        selectedCategory[role] = 0
    })
    info = {
        teams: Object.keys(teams), playersOnCategory,
        selected: 0,
        teamNumbers: teams,
        selectedCategory,
        credit: 100
    }

    return info
}
