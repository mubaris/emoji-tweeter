import React, { Component } from 'react';
import { Input, Row, Col, Button, notification, Progress, Checkbox } from 'antd';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { parseTweet } from 'twitter-text';

import logo from './logo.svg';
import './App.css';

const { TextArea } = Input;

class App extends Component {
  constructor(props) {
    super(props);
    this.toCapitalize = this.toCapitalize.bind(this);
    this.tweetQuote = this.tweetQuote.bind(this);
    this.valueChange = this.valueChange.bind(this);
    this.onCopy = this.onCopy.bind(this);
    this.state = {
      'value': 'Wow This is amazing',
      'tweet': '👏 Wow 👏 This 👏 is 👏 amazing 👏',
      'copied': false,
      'capital': false
    }
  }
  toCapitalize(e) {
    const capital = e.target.checked;
    const value = this.state.value;
    let tweet = '👏 ' + value.trim().split(' ').join(' 👏 ') + ' 👏';
    if (capital) {
      tweet = tweet.toUpperCase();
    }
    this.setState({ capital, tweet });
  }
  tweetQuote() {
    const content = '?text=' + this.state.tweet;
    const url = 'https://twitter.com/intent/tweet' + content;
    window.open(url, '_blank', 'height=500,width=500');
  }
  onCopy() {
    this.setState({copied: true})
    this.openNotificationWithIcon('success');
  }
  openNotificationWithIcon(type)  {
    notification[type]({
      message: 'Copied to Clipboard',
    })
  }
  valueChange(e) {
    const value = e.target.value;
    let tweet = '👏 ' + value.trim().split(' ').join(' 👏 ') + ' 👏';
    if (this.state.capital) {
      tweet = tweet.toUpperCase();
    }
    this.setState({ value, tweet, copied: false });
  }
  render() {
    const len = parseTweet(this.state.tweet).weightedLength;
    const percent = Number((len * 100 / 280).toFixed(2));
    const cap = this.state.capital;
    return (
      <div>
        <Row type="flex" justify="center" align="middle">
          <Col span={12}>
            <h1 style={{ textAlign: "center" }}>Clap 👏 Tweeter</h1>
          </Col>
        </Row>
        <Row type="flex" justify="center" align="middle">
          <Col span={12}>
            <TextArea data-gramm_editor={false} style={{ margin: "10px" }} value={this.state.value} onChange={this.valueChange} rows={3} />
            {/* <Checkbox className="center__area" checked={this.state.capital} onChange={this.toCapitalize}>{cap ? "CAPITALIZE" : "Capitalize"}</Checkbox> */}
            <Checkbox className="center__area" checked={this.state.capital} onChange={this.toCapitalize}>Capitalize</Checkbox>
          </Col>
        </Row>
        <Row type="flex" justify="space-around" align="middle">
          <Col span={12}>
            <TextArea data-gramm_editor={false} style={{ margin: "10px" }} value={this.state.tweet} rows={3} />
            <Progress percent={percent} format={() => len + '/280'}  />
          </Col>
        </Row>
        <Row type="flex" justify="space-around" align="middle">
          <Col span={24} style={{ textAlign: "center", paddingTop: "5px" }}>
            <CopyToClipboard text={this.state.tweet} onCopy={() => this.onCopy()}>
              <Button icon="copy" style={{ marginRight: "5px" }}  type="primary">Copy</Button>
            </CopyToClipboard>
            <Button icon="twitter" type="primary" onClick={this.tweetQuote} >Tweet</Button>
            <div style={{ marginTop: "10px" }}>
              <a className="bmc-button" rel="noopener noreferrer" target="_blank" href="https://www.buymeacoffee.com/mubaris"><img src="https://www.buymeacoffee.com/assets/img/BMC-btn-logo.svg" alt="Buy me a coffee"/><span style={{marginLeft: "5px"}}>Buy me a coffee</span></a>
            </div>
          </Col>
        </Row>
        <a target="_blank" rel="noopener noreferrer" className="levelsio-by" href="https://twitter.com/Mubaris_NK"><img src="https://pbs.twimg.com/profile_images/975936934949212161/AySAHTaz_400x400.jpg" /><p>by Mubaris NK</p></a>
      </div>
    );
  }
}

export default App;
