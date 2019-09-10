import React,{Fragment} from 'react';
import NavigationItems from '../NavigationItems/NavigationItems';
import Logo from '../../Logo/Logo';
import classes from './SideDrawer.module.css';
import BackDrop from '../../UI/BackDrop/BackDrop'

const SideDrawer = (props) => {
    let attachedClasses = [classes.SideDrawer, classes.Close];
    if(props.open) {
        attachedClasses = [classes.SideDrawer, classes.Open];
    }
    return (
        <Fragment>
            <BackDrop show={props.open} clicked={props.closed} />
            <div className={attachedClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo/>
                </div>
                <nav>
                <NavigationItems/>
                </nav>
            </div>
        </Fragment>
    )
};

export default SideDrawer;