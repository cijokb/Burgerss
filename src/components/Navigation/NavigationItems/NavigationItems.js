import React, { Fragment } from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';


const NavigationItems = (props) => {
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link={"/"} exact>BURGER BUILDER</NavigationItem>

            {!props.isAuthenticated ?
                <NavigationItem link={"/auth"} >Login</NavigationItem>
                : <Fragment>
                     <NavigationItem link={"/orders"} >ORDERS</NavigationItem>
                    <NavigationItem link={"/logout"} >Logout</NavigationItem>
                </Fragment>}
        </ul>
    );
}
export default NavigationItems;