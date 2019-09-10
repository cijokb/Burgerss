import React, { Fragment,memo} from 'react';
import classes from './Modal.module.css';
import BackDrop from '../BackDrop/BackDrop';

const Modal = (props) => (
    <Fragment>
        <BackDrop show={props.show} clicked={props.modalClosed}/>
        <div
            className={classes.Modal}
            style={{
                transform: props.show ? 'translateY(0)' : 'translate(-100vh)',
                opacity: props.show ? '1' : '0'
            }}
        >
            {props.children}
        </div>
    </Fragment>
);

function areEqual(prevProps, nextProps) {
    /*
    return true if passing nextProps to render would return
    the same result as passing prevProps to render,
    otherwise return false
    */
    return !(prevProps.show !== nextProps.show || prevProps.children !== nextProps.children)
  }

export default memo(Modal,areEqual);