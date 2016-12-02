import ReactDOM                         from 'react-dom'
import React,{Component}                from 'react'
import {createStore,applyMiddleware}    from 'redux'
import {Provider,connect}               from 'react-redux'
import createLogger                     from 'redux-logger'

const loggerMiddleware = createLogger()

// ACTION
// var ==> const, let  
// actionClick function return { type: 'CLICK_HELLO' }
const actionClick = _name => {
    if(_name != null && _name != '') {
        return { type: 'CLICK_HELLO', name: _name }
    } else {
        return { type: 'CLICK_HELLO_NONAME' }
    } 
}

// REDUCER
function welcomeMessageReducer (state = {}, action) {
    switch(action.type) {
        case 'CLICK_HELLO': 
            return { welcomeMessage: 'Welcome! ' + action.name }
        case 'CLICK_HELLO_NONAME':
            return { welcomeMessage: 'No welcome there is no one here ... D:' }
        default:
            return { welcomeMessage: 'Welcome! ... Blah!' }
    }
}

// class Hello
class Hello extends Component {
    constructor(props) {
        super(props)

        this.state = { name: '' }

        this.changeName = this.changeName.bind(this)
        this.clickWelcome = this.clickWelcome.bind(this)
    }
    changeName(e) {
        this.setState( { name: e.target.value } )
    }
    clickWelcome(e) {
        this.props.dispatchWelcomeMessage(this.state.name)
    }
    render() {
        return (<div className="form-group">
                <input name="name" onChange={this.changeName} className="form-inline"/> 
                <button className="btn btn-danger" onClick={this.clickWelcome}>Hello</button>
                <div>{ this.props.msg }</div>
                </div>)
    }
}

function mapStateToProps(state) {
    return {
        msg: state.welcomeMessage
    }
}

function mapDispatchToProps(dispatch) {
    return {
        dispatchWelcomeMessage: function(name) {            
            dispatch(actionClick(name))
        } 
    }
}

const ConnectedHello = connect(
    mapStateToProps, 
    mapDispatchToProps
)(Hello)

// Class App 
class Calendar extends Component {
    render() {
        return (
            <div>
                <CalendarHead />
                <CalendarTable />
            </div>
            )
    }
}

class CalendarHead extends Component {
    render() {
        return (
            <div>
                <h3>December 2016</h3>
            </div>
        )
    }
}

class CalendarTable extends Component {
    render() {
        return (
            <div>
                <table className="table">
                    <thead>
                        <CalendarTableHead />
                    </thead>
                    <tbody>
                        <CalendarTableRow skip="4" start="1"/>
                        <CalendarTableRow start="4"/>
                        <CalendarTableRow start="11"/>
                        <CalendarTableRow start="18"/>
                        <CalendarTableRow start="25"/>
                    </tbody>
                </table>
            </div>
        )
    }
}

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
    constructor(props) {
        super(props)
    }

    render() {
        let days = []

        for(let i = this.props.start, j = 0; j < 7; i++, j++) {
            days[j] = i;
        }

        return (
            <tr>
                { 
                    days.map( (value, index) => 
                        <td key={value.toString()} className={ (index == 0 || index == 6) ? "weekend" : "" }>
                            { (value == 0) ? "" : value }
                        </td> 
                    ) 
                }                
            </tr>
        )
    }
}

// Create Store
const store = createStore(
    welcomeMessageReducer, 
    applyMiddleware(loggerMiddleware) 
    )


// <Provider store={store}>
// </Provider>
ReactDOM.render(
    <Calendar />,
    document.getElementById("core")
)