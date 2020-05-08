const ROOT_URL = 'https://api.covid19api.com'
const SUMMARY_URL = 'summary'

function GlobalData(url){
    this.url = url
    
    this.generalData = {
        NewConfirmed: 0,
        TotalConfirmed: 0,
        NewDeaths: 0,
        NewRecovered: 0
    }
}

GlobalData.prototype.getDataFromAPI = function(){
    return new Promise( (resolve, failure) => {
        $.get(this.url, function(response) {
            resolve(response)
        }).fail( () => failure(response) )
    })
}

GlobalData.prototype.getDashboardData = function(){
    this.getDataFromAPI().then( result => {        
        this.setDashboardData(result)
    }).catch( (err) => this.handlerError(err) )
}

GlobalData.prototype.setDashboardData = function(data){
    $('#date-statics').text(data.Date)
    $('#new-confirmed').text(data.NewConfirmed)
    $('#total-confirmed').text(data.Global.TotalConfirmed)
}

GlobalData.prototype.handlerError = function(err){
    console.log(`An error has occured ${err}`)
}

const globalData = new GlobalData(`${ROOT_URL}/${SUMMARY_URL}`)
globalData.getDashboardData()