const ROOT_URL = 'https://api.covid19api.com'

function GlobalData(){    
    let generalData    
}

GlobalData.prototype.getDataFromAPItoDashboard = function(){
    const SUMMARY_URL = 'summary'
    const url = `${ROOT_URL}/${SUMMARY_URL}`
    return new Promise( (resolve, failure) => {
        $.get(url, function(response) {
            resolve(response)
        }).fail( () => {
            alert('An error has occurred. Update the page again.')
        })
    })
}

GlobalData.prototype.getDashboardData = function(){
    this.getDataFromAPItoDashboard().then( result => {
        this.generalData = result        
        this.setDashboardData(this.generalData)        
        this.setTableData(this.generalData.Countries)
    }).catch( (err) => this.handlerError(err) )
}

GlobalData.prototype.setDashboardData = function(data){
    this.setTextToContainerInDOM('#date-statics', this.convertDate(data.Date))
    this.setTextToDashboardCard(data.Global)
}

GlobalData.prototype.convertDate = function(date){
    let thedate = new Date(Date.parse(date))
    return `${thedate.getDate()}/${thedate.getMonth() + 1}/${thedate.getFullYear()} ${thedate.getHours()}:${thedate.getMinutes()}:${thedate.getSeconds()}`
}

GlobalData.prototype.setTextToDashboardCard = function(data){
    this.setTextToContainerInDOM('#new-confirmed', data.NewConfirmed)
    this.setTextToContainerInDOM('#total-confirmed', data.TotalConfirmed)
    this.setTextToContainerInDOM('#new-deaths', data.NewDeaths)
    this.setTextToContainerInDOM('#total-deaths', data.TotalDeaths)
    this.setTextToContainerInDOM('#new-recovered', data.NewRecovered)
    this.setTextToContainerInDOM('#total-recovered', data.TotalRecovered)
}

GlobalData.prototype.setTextToContainerInDOM = function(container, data){
    $(container).text(data)
}

GlobalData.prototype.setTableData = function(data){
    this.restartTable('#covid-table tbody')
    let tableData = data.map(item => `<tr><td class="text-center">${item.Country}</td><td class="text-center">${item.NewConfirmed}</td><td class="text-center">${item.TotalConfirmed}</td><td class="text-center">${item.NewDeaths}</td><td class="text-center">${item.TotalDeaths}</td><td class="text-center">${item.NewRecovered}</td><td class="text-center">${item.TotalRecovered}</td></tr>`)
    tableData.forEach( row => {
        $('#covid-table tbody').append(row)
    })
}

GlobalData.prototype.searchData = function(){
    const value = document.getElementById('buscar-input').value
    let data = this.generalData.Countries.filter( item => item.Country.toUpperCase().includes(value.toUpperCase()))
    this.setTableData(data)
}

GlobalData.prototype.restartTable = function (tableIdentify) {
    $(tableIdentify).html('<tr></tr>')
}

GlobalData.prototype.handlerError = function(err){
    console.log(`An error has occured ${err}`)
}

export default GlobalData