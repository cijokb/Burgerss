import React, { Component, Fragment } from 'react';
import Modal from '../components/UI/Modal/Modal';

// const withErroHandler = (WrappedComponent)=>(
//     (props) => (
//         <WrappedComponent {...props} />
//     )
// );


const withErrorHandler = (WrappedComponent, axios, displayError = true) => {
    return class extends Component {
        state = { error: null };
        requestInterceptor = axios.interceptors.request.use(null, (error) => {
            this.setState({ error: error });
            return Promise.reject(error);
        });
        responseInterceptor = axios.interceptors.response.use(null, (error) => {
            if (displayError) {
                this.setState({ error: error });
            }
            return Promise.reject(error);
        });
        componentDidMount() {
            /** Important !!!!!!
             * cannot do interceptor in this life cycle , because componentDidmount
             * will only be called , once the child components are called.Hence the 
             * network request made in the child components mounting phase will not be 
             * intercepted. To avoid that we have to add interceptor in constructor 
             * or componentWillMount method.
             * 
            */

            //    this.requestInterceptor= axios.interceptors.request.use(null, (error) => (
            //         this.setState({ error: error })
            //     ));
            //     this.responseInterceptor= axios.interceptors.response.use(null, (error) => (
            //         this.setState({ error: error })
            //     ));
        }

        errorConfirmedHandler = () => {
            this.setState({ error: null });
        }
        componentWillUnmount() {
            // unsubcribe to prevent memory leakes
            axios.interceptors.request.eject(this.requestInterceptor);
            axios.interceptors.response.eject(this.responseInterceptor);
        }
        render() {
            console.log("this.requestInterceptor ", this.requestInterceptor);
            return (
                <Fragment>
                    <Modal show={this.state.error} modalClosed={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Fragment>
            )
        }
    }
};
export default withErrorHandler;

