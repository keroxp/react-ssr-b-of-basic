import * as React from "react"
import {postClick} from "../client/api";

export class Index extends React.Component<{
  title, count
}, { count }> {
  state = {
    count: this.props.count
  };
  onClick = async () => {
    const {count} = await postClick();
    this.setState({count});
  };
  render() {
    return (
      <div>
        <h1>{this.props.title}</h1>
        <div>click count: {this.state.count}</div>
        <button onClick={this.onClick}>Click!</button>
      </div>
    )
  }
}