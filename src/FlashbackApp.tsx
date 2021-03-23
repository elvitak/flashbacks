import React from "react";
import { InputData, readGoogleDoc } from "./gdoc";

type FlashbacksAppState = {
  date: string;
  data?: InputData[];
};

export class FlashbacksApp extends React.Component<{}, FlashbacksAppState> {
  // 1. datums
  // 2. doc nolasīšanu
  // 3. doc transformēšanu uz InputData
  // 4. izfiltrēšanu pēc datuma
  state = {
    date: new Date().toLocaleString("lv", {
      day: "numeric",
      month: "long",
    }),
    data: undefined,
  };

  componentDidMount() {
    const gdocDataPromise = readGoogleDoc();
    gdocDataPromise
      .then((gdocData) =>
        gdocData.filter((data) => data.date === this.state.date)
      )
      .then((todayData) => this.setState({ ...this.state, data: todayData }));
  }

  render() {
    const data = this.state.data;

    if (data !== undefined) {
      return (
        <div>
          <Headline date={this.state.date} />
          <Flashbacks data={data} />
        </div>
      );
    } else {
      return (
        <div>
          <Headline date={this.state.date} />
          Loading...
        </div>
      );
    }
  }
}

type HeadlineProps = {
  date: string;
};

class Headline extends React.Component<HeadlineProps> {
  render() {
    return (
      <div>
        <h1>
          Šodien (<span>{this.props.date}</span>) labs notika:
        </h1>
      </div>
    );
  }
}

type FlashbacksProps = {
  data: InputData[];
};

class Flashbacks extends React.Component<FlashbacksProps> {
  render() {
    const events = this.props.data.map((data) => {
      const entries = data.text.map((text) => <li key={text}>{text}</li>);

      return (
        <li key={data.year}>
          <h2>{data.year}</h2>
          <ul>{entries}</ul>
        </li>
      );
    });

    return <ul>{events}</ul>;
  }
}
