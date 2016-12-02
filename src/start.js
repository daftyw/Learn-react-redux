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
class App extends Component {
    render() {
        return (
            <div>
                <ConnectedHello />
            </div>
            )
    }
}

// Create Store
const store = createStore(
    welcomeMessageReducer, 
    applyMiddleware(loggerMiddleware) 
    )

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("core")
)