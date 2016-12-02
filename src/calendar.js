import ReactDOM                         from 'react-dom'
import React,{Component}                from 'react'
import {createStore,applyMiddleware}    from 'redux'
import {Provider,connect}               from 'react-redux'
import createLogger                     from 'redux-logger'
import moment                           from 'moment'

const loggerMiddleware = createLogger()

const now = moment()
const initialState = { month: now.month(), year: now.year() }

// REDUCER : PURE FUNCTION
function calendarReducer (state = initialState, action) {
    switch(action.type) {
        case 'GO_PREV_MONTH':
              
            return { 
                month: (state.month == 1) ? 12 : state.month - 1,
                year: (state.month == 1) ? state.year - 1 : state.year,  
            }

        case 'GO_NEXT_MONTH':
            
            return { 
                month: (state.month == 12) ? 1 : state.month + 1,
                year: (state.month == 12) ? state.year + 1 : state.year,  
            }

        default:
            return state
    }
}

// Class App 
class Calendar extends Component {
    render() {
        return (
            <div>
                <ActiveCalendarHead />
                <ActiveCalendarTable />
            </div>
            )
    }
}

class CalendarHead extends Component {
    render() {
        return (
            <div className="row">
                <div className="col-xs-8">
                    <h3>
                        { moment().month(this.props.month - 1).format("MMMM") } { this.props.year }
                    </h3>
                </div>   
                <div className="col-xs-4">
                    <span className="move">
                        <a href="#" onClick={ this.props.prevMonth } >&lt;&lt; Prev</a> 
                        <span>&nbsp;|&nbsp;</span>
                        <a href="#" onClick={ this.props.nextMonth } >Next &gt;&gt;</a>
                    </span>
                </div>         
            </div>
        )
    }
}

const calendarHeadPropsFromState = (state) => {
    return {
        month: state.month,
        year: state.year
    }
}

const calendarHeadPropsDispatch = (dispatch) => {
    return {
        prevMonth: () => { dispatch( { type: 'GO_PREV_MONTH' } ) } ,
        nextMonth: () => { dispatch( { type: 'GO_NEXT_MONTH' } ) }
    }
}

// Create ActiveCalendarHead
const ActiveCalendarHead = connect( 
    calendarHeadPropsFromState, calendarHeadPropsDispatch 
) (CalendarHead)

class CalendarTable extends Component {

    render() {
        let firstDay = moment().year(this.props.year).month(this.props.month - 1).local()
        let lastDay = moment().year(this.props.year).month(this.props.month - 1).local()
        
        firstDay.date(1) // date = 1 
        lastDay.endOf('month') // end of month
        
        let skip = firstDay.day()
        let maxDay = lastDay.date()
        
        let rowsData = [ { start: 1, skip: skip } ]

        for(let i = 8 - skip; i < maxDay; i = i + 7) {            
            rowsData.push({ start: i })
        } 

        rowsData[rowsData.length - 1].end = maxDay        
        console.log(JSON.stringify(rowsData))

        return (
            <div>
                <table className="table">
                    <thead>
                        <CalendarTableHead />
                    </thead>
                    <tbody>
                        { 
                            rowsData.map( 
                                row => 
                                    <CalendarTableRow key={row.start} 
                                    start={row.start} 
                                    skip={row.skip} end={row.end} /> 
                                ) 
                        }                       
                    </tbody>
                </table>
            </div>
        )
    }
}

const ActiveCalendarTable = connect(calendarHeadPropsFromState)(CalendarTable)

class CalendarTableHead extends Component {
    render() {
        return (
            <tr>
                <th>Sun</th>
                <th>Mon</th>
                <th>Tue</th>
                <th>Wed</th>
                <th>Thu</th>
                <th>Fri</th>
                <th>Sat</th>
            </tr>
        )
    }
}

class CalendarTableRow extends Component {
    render() {
        let days = []
        let skip = (this.props.skip != null) ? this.props.skip : 0

        for(let i = this.props.start, j = 0; j < 7; i++, j++) {
            if(j < skip) {
                i = 0 // stop counting for i 
            }

            if(this.props.end != null && i > this.props.end) 
                break
                
            days[j] = i
        }

        if(days.length < 7) {
            for(let i = days.length; i < 7; i++)
                days.push(0)
        }

        return (
            <tr>
                {days.map( 
                    (value, index) => 
                        <td key={index.toString()} className={(index == 0 || index == 6) ? "weekend" : ""}>
                            { (value == 0) ? "" : value }
                        </td> 
                )}                
            </tr>
        )
    }
}

// Create Store
const store = createStore(
    calendarReducer, 
    applyMiddleware(loggerMiddleware) 
    )

// 
ReactDOM.render(
    <Provider store={store}>
        <Calendar />
    </Provider>,
    document.getElementById("core")
)