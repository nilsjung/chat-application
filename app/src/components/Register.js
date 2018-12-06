import React from 'react';

import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';

import * as actions from '../actions/registerActions';

class Register extends React.Component {
    handleSubmitButton = (event) => {
        event.preventDefault();
        const user = {
            firstname: document.getElementById('registrationFirstname').value,
            lastname: document.getElementById('registrationLastname').value,
            password: document.getElementById('registrationPassword').value,
            email: document.getElementById('registrationEmail').value,
        };

        return this.props.registerUser(user);
    };

    render() {
        let alert;
        if (this.props.isSuccess === false) {
            alert = (
                <div className="alert alert-danger">
                    {this.props.inforMessage}
                </div>
            );
        } else if (this.props.isSuccess) {
            alert = (
                <div className="alert alert-success">
                    {this.props.infoMessage}
                </div>
            );
            this.props.reset();
            return <Redirect to="/login" />;
        }

        if (this.props.isLoading) {
            alert = <p>loading...</p>;
        }

        return (
            <div className="container">
                <div className="h2">Login/Register</div>
                <div>{alert}</div>

                <div className="container">{this.props.message}</div>

                <form>
                    <div className="form-group">
                        <label htmlFor="registrationEmail">Email address</label>
                        <input
                            type="email"
                            className="form-control"
                            id="registrationEmail"
                            aria-describedby="emailHelp"
                            placeholder="Enter your email"
                        />
                        <small id="emailHelp" className="form-text text-muted">
                            We will never share your email with anyone else.
                        </small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="registrationFirstname">
                            First Name
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="registrationFirstname"
                            aria-describedby=""
                            placeholder="Enter yourt first name"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="registrationLastname">Last Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="registrationLastname"
                            aria-describedby="emailHelp"
                            placeholder="Enter your last name"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="registrationPassword">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="registrationPassword"
                            placeholder="Password"
                        />
                    </div>
                    <button
                        className="btn btn-primary"
                        onClick={this.handleSubmitButton}
                    >
                        Register
                    </button>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        isLoading: state.isLoading,
        isSuccess: state.isSuccess,
        infoMessage: state.infoMessage,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        registerUser: (user) => dispatch(actions.registerUser(user)),
        reset: () => {
            dispatch(actions.registrationIsSuccess(null));
        },
    };
}

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Register)
);