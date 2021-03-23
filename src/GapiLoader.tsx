import React from "react";
import { GoogleAuth } from "./GoogleAuth";
import { gapi } from "gapi-script";

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const API_KEY = process.env.REACT_APP_API_KEY;
// Array of API discovery doc URLs for APIs used by the quickstart
const DISCOVERY_DOCS = [
  "https://docs.googleapis.com/$discovery/rest?version=v1",
];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
const SCOPES = "https://www.googleapis.com/auth/documents.readonly";

type GapiLoaderState = {
  loading: boolean;
};

export class GapiLoader extends React.Component<{}, GapiLoaderState> {
  state = { loading: true };

  componentDidMount() {
    gapi.load("client:auth2", () => this.whenGapiLoadHasCompleted());
  }

  whenGapiLoadHasCompleted() {
    gapi.client
      .init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      })
      .then(() => {
        this.setState({ loading: false });
      });
  }

  render() {
    if (this.state.loading) {
      return "Loading...";
    } else {
      return <GoogleAuth />;
    }
  }
}
