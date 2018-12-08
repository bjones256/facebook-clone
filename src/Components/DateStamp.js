import React, {Component} from 'react'

class DateStamp extends Component{


    getDate(){
        let date = Number(this.props.date)
        let displayDate = new Date(date)
        var now = Number(new Date())

        var older = {
            // weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
            // hour: 'numeric'
        };
        var thisWeek = {
            weekday: 'long',
            hour: 'numeric'
        };
        var today = {
            hour: 'numeric'
        };
        var old = displayDate.toLocaleString("en-US",older)
        var insideWeek = displayDate.toLocaleString("en-US",thisWeek)
        var thisDay = "Today @ " + displayDate.toLocaleString("en-US",today)

        if(date + (1000*60*60*24)  > now){
        return thisDay
        }
        else if(date + (1000*60*60*24*7) > now) {

            return <div>{insideWeek}</div>
        }
        else {
            return <div>{old}</div>
        }
        }

render(){
    return (
<div><p class ="post-date">{this.getDate()}</p></div>
    )
}
}
export default DateStamp