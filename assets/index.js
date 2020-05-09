const ROOT_URL = 'https://api.covid19api.com'

function GlobalData(){    
    let dataCountry    
}

GlobalData.prototype.getDataFromAPItoDashboard = function(){
    const SUMMARY_URL = 'summary'
    const url = `${ROOT_URL}/${SUMMARY_URL}`
    return new Promise( (resolve, failure) => {
        $.get(url, function(response) {
            resolve(response)
        }).fail( () => failure(response) )
    })
}

GlobalData.prototype.getDashboardData = function(){
    this.getDataFromAPItoDashboard().then( result => {
        this.setDashboardData(result)
        this.dataCountry = result.Countries
        this.setTableData(result.Countries)
    }).catch( (err) => this.handlerError(err) )
}

GlobalData.prototype.setDashboardData = function(data){
    $('#date-statics').text(data.Date)
    $('#new-confirmed').text(data.NewConfirmed)
    $('#total-confirmed').text(data.Global.TotalConfirmed)
    $('#new-deaths').text(data.NewDeaths)
    $('#total-deaths').text(data.Global.TotalDeaths)
    $('#new-recovered').text(data.NewRecovered)
    $('#total-recovered').text(data.Global.TotalRecovered)
}

GlobalData.prototype.setTableData = function(data){
    let tableData = data.map(item => `<tr><td class="text-center">${item.Country}</td><td class="text-center">${item.NewConfirmed}</td><td class="text-center">${item.TotalConfirmed}</td><td class="text-center">${item.NewDeaths}</td><td class="text-center">${item.TotalDeaths}</td><td class="text-center">${item.NewRecovered}</td><td class="text-center">${item.TotalRecovered}</td></tr>`)
    tableData.forEach( row => {
        $('#covid-table tbody').before(row)
    })
}

GlobalData.prototype.searchData = function(){
    const value = document.getElementById('buscar-input').value
    let data = this.dataCountry.filter( item => item = 'value')
}

GlobalData.prototype.handlerError = function(err){
    console.log(`An error has occured ${err}`)
}

const globalData = new GlobalData()
globalData.getDashboardData()