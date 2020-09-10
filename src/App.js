import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Reports from "./components/Reports";
import { getData, clearData } from "./redux/actions";
import './App.css';

function App(props) {
    const [barState, setBarState] = useState('open');
    const onClick = function () {
       const newBarState = barState === 'open' ? 'close' : 'open';
       setBarState(newBarState);
    };
    const refresh = function () {
        const { dispatch } = props;
        dispatch(clearData());
        setTimeout(() => dispatch(getData()), 500);
    }
    useEffect(() => {
        refresh();
    }, []);
    return (
        <div className="app">
            <div className={`side-bar-area ${barState}`}>
                <Reports
                    reports={props.reports}
                    onClose={onClick}
                    onRefresh={refresh}/>
            </div>
            <div className="content-area" onClick={onClick}>
                Click here to toggle the side bar!!!
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return state;
};

export default connect(mapStateToProps)(App);
