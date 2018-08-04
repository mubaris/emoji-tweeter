import React, { Component } from 'react';
import { Input, Row, Col, Button, Icon, notification } from 'antd';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import logo from './logo.svg';
import './App.css';

const { TextArea } = Input;

class App extends Component {
  constructor(props) {
    super(props);
    this.tweetQuote = this.tweetQuote.bind(this);
    this.valueChange = this.valueChange.bind(this);
    this.onCopy = this.onCopy.bind(this);
    this.state = {
      'value': 'Wow This is amazing',
      'tweet': '👏 Wow 👏 This 👏 is 👏 amazing 👏',
      'copied': false
    }
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
    const tweet = '👏 ' + value.trim().split(' ').join(' 👏 ') + ' 👏';
    this.setState({ value, tweet, copied: false });
  }
  render() {
    return (
      <div className="center__area">
        <Row type="flex" justify="center" align="middle">
          <Col span={12}>
            <h1 style={{ textAlign: "center" }}>Clap 👏 Tweeter</h1>
          </Col>
        </Row>
        <Row type="flex" justify="center" align="middle">
          <Col span={8}>
            <TextArea data-gramm_editor="false" style={{ margin: "10px" }} value={this.state.value} onChange={this.valueChange} rows={3} />
          </Col>
        </Row>
        <Row type="flex" justify="space-around" align="middle">
          <Col span={8}>
            <TextArea data-gramm_editor="false" style={{ margin: "10px" }} value={this.state.tweet} rows={3} />
          </Col>
        </Row>
        <Row type="flex" justify="space-around" align="middle">
          <Col span={8} style={{ textAlign: "center" }}>
            <CopyToClipboard text={this.state.tweet} onCopy={() => this.onCopy()}>
              <Button style={{ marginRight: "5px" }}  type="primary">Copy To Clipboard</Button>
            </CopyToClipboard>
            <Button type="primary" onClick={this.tweetQuote} >Tweet It</Button>
          </Col>
        </Row>
        <a target="_blank" rel="noopener" class="levelsio-by" href="https://twitter.com/Mubaris_NK"><img src="https://pbs.twimg.com/profile_images/975936934949212161/AySAHTaz_400x400.jpg" /><p>by Mubaris NK</p></a>
      </div>
    );
  }
}

export default App;
