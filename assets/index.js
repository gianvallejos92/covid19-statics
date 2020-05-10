import GlobalData from './GlobalData.js'

$(document).ready(function(){
    const globalData = new GlobalData()
    globalData.getDashboardData()

    $('#buscar-input').on('keyup', function(e){
        e.preventDefault
        globalData.searchData()
    })

    $('#btn-update').on('click', (e) => {
        e.preventDefault
        location.reload()
    })
})