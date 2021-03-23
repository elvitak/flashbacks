import React from "react";
import { FlashbacksApp } from "./FlashbackApp";

enum LoadingState {
  IDLE,
  SIGNING_IN,
  SIGNING_OUT,
}

type GoogleAuthState = {
  signedIn: boolean;
  loadingState: LoadingState;
};

export class GoogleAuth extends React.Component<{}, GoogleAuthState> {
  state = {
    signedIn: gapi.auth2.getAuthInstance().isSignedIn.get(),
    loadingState: LoadingState.IDLE,
  };

  componentDidMount() {
    gapi.auth2
      .getAuthInstance()
      .isSignedIn.listen((isSignedIn: boolean) =>
        this.isSignedInListener(isSignedIn)
      );
  }

  isSignedInListener(isSignedIn: boolean) {
    this.setState({
      signedIn: isSignedIn,
      loadingState: LoadingState.IDLE,
    });
  }

  signOut() {
    this.setState({ ...this.state, loadingState: LoadingState.SIGNING_OUT });
    gapi.auth2.getAuthInstance().signOut();
  }

  signIn() {
    this.setState({ ...this.state, loadingState: LoadingState.SIGNING_IN });
    gapi.auth2.getAuthInstance().signIn();
  }

  render() {
    if (this.state.signedIn) {
      return (
        <>
          <button
            id="btnSignOut"
            onClick={() => this.signOut()}
            disabled={this.state.loadingState === LoadingState.SIGNING_OUT}
          >
            SignOut
          </button>
          <FlashbacksApp />
        </>
      );
    } else {
      return (
        <div className="container">
          <button
            id="btnSignIn"
            onClick={() => this.signIn()}
            disabled={this.state.loadingState === LoadingState.SIGNING_IN}
          >
            SignIn
          </button>
        </div>
      );
    }
  }
}
