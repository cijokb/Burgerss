import React, { Fragment,Component } from 'react';
import classes from './Layout.module.css';
import ToolBar from '../Navigation/ToolBar/ToolBar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import {connect}  from 'react-redux';
class Layout extends Component {
    state = {
        showSideDrawer :false
    }
    sideDrawerCloseHandler = ()=>{
        this.setState({showSideDrawer:false});
    }
    sideDrawerToggleHandler = ()=>{
        this.setState((prevState)=>{
            return {showSideDrawer:!prevState.showSideDrawer}
        });   
    }
    render() {
        return (
            <Fragment>
                <ToolBar drawerToggleClicked={this.sideDrawerToggleHandler} isAuthenticated={this.props.isAuthenticated}/>
                <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerCloseHandler} isAuthenticated={this.props.isAuthenticated}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Fragment>
        );
    }
}

const mapStateToProps = (state,ownProps)=> {
    return {
            isAuthenticated : state.auth.token !== null,
    }
}
export default connect(mapStateToProps)(Layout);