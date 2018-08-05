import React, { Component } from 'react';
import { Input, Row, Col, Button, notification, Progress, Checkbox, Popover } from 'antd';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { parseTweet } from 'twitter-text';
import { Picker } from 'emoji-mart';

import 'emoji-mart/css/emoji-mart.css';
import './App.css';

const { TextArea } = Input;

class App extends Component {
  constructor(props) {
    super(props);
    this.handleVisibleChange = this.handleVisibleChange.bind(this);
    this.clickEmoji = this.clickEmoji.bind(this);
    this.toCapitalize = this.toCapitalize.bind(this);
    this.tweetQuote = this.tweetQuote.bind(this);
    this.valueChange = this.valueChange.bind(this);
    this.onCopy = this.onCopy.bind(this);
    this.selectEmoji = this.selectEmoji.bind(this);
    this.state = {
      'value': 'Wow This is amazing',
      'tweet': '👏 Wow 👏 This 👏 is 👏 amazing 👏',
      'emoji': '👏',
      'copied': false,
      'capital': false,
      'showPicker': false
    }
  }
  selectEmoji(e) {
    // this.setState({ emoji: e.native, showPicker: false });
    const value = this.state.value;
    // let tweet = '👏 ' + value.trim().split(' ').join(' 👏 ') + ' 👏';
    const emoji = e.native;
    let tweet = `${emoji} ${value.trim().split(' ').join(` ${emoji} `)} ${emoji}`;
    if (this.state.capital) {
      tweet = tweet.toUpperCase();
    }
    this.setState({ emoji, showPicker: false, value, tweet, copied: false });
  }
  handleVisibleChange = (showPicker) => {
    this.setState({ showPicker });
  }
  clickEmoji(e) {
    this.setState({ posX: e.screenX, posY: e.screenY, showPicker: true })
  }
  toCapitalize(e) {
    const capital = e.target.checked;
    const value = this.state.value;
    const emoji = this.state.emoji;
    // let tweet = '👏 ' + value.trim().split(' ').join(' 👏 ') + ' 👏';
    let tweet = `${emoji} ${value.trim().split(' ').join(` ${emoji} `)} ${emoji}`;
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
    // let tweet = '👏 ' + value.trim().split(' ').join(' 👏 ') + ' 👏';
    const emoji = this.state.emoji;
    let tweet = `${emoji} ${value.trim().split(' ').join(` ${emoji} `)} ${emoji}`;
    if (this.state.capital) {
      tweet = tweet.toUpperCase();
    }
    this.setState({ value, tweet, copied: false });
  }
  render() {
    const len = parseTweet(this.state.tweet).weightedLength;
    const percent = Number((len * 100 / 280).toFixed(2));
    const pickerStyle = {
      position: 'absolute',
      right: '1em',
      bottom: '4em',
      zIndex: 9999
    }
    // const cap = this.state.capital;
    return (
      <div>
        <Row type="flex" justify="center" align="middle">
          <Col span={12}>
            <h1 style={{ textAlign: "center" }}>{`Emoji ${this.state.emoji} Tweeter`}</h1>
          </Col>
        </Row>
        <Row type="flex" justify="center" align="middle">
          <Col span={12}>
            <TextArea data-gramm_editor={false} style={{ margin: "10px" }} value={this.state.value} onChange={this.valueChange} rows={3} />
            {/* <Checkbox className="center__area" checked={this.state.capital} onChange={this.toCapitalize}>{cap ? "CAPITALIZE" : "Capitalize"}</Checkbox> */}
            <div className="center__area">
              <Checkbox className="center__area" checked={this.state.capital} onChange={this.toCapitalize}>Capitalize</Checkbox>
              <Popover
                trigger="click"
                visible={this.state.showPicker}
                placement="bottom"
                onVisibleChange={this.handleVisibleChange}
                content={<Picker onSelect={this.selectEmoji} title='Pick your emoji…' emoji='clap' />}
              >
                <Button icon="heart" style={{ marginRight: "5px" }}  type="">Change Emoji</Button>
              </Popover>
            </div>
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
            {/* {this.state.showPicker && <Picker style={pickerStyle} title='Pick your emoji…' emoji='clap' />} */}
            <CopyToClipboard text={this.state.tweet} onCopy={() => this.onCopy()}>
              <Button icon="copy" style={{ marginRight: "5px" }}  type="primary">Copy</Button>
            </CopyToClipboard>
            <Button icon="twitter" type="primary" onClick={this.tweetQuote} >Tweet</Button>
            <div style={{ marginTop: "10px" }}>
              <a className="bmc-button" rel="noopener noreferrer" target="_blank" href="https://www.buymeacoffee.com/mubaris"><img src="https://www.buymeacoffee.com/assets/img/BMC-btn-logo.svg" alt="Buy me a coffee"/><span style={{marginLeft: "5px"}}>Buy me a coffee</span></a>
            </div>
          </Col>
        </Row>
        <a target="_blank" rel="noopener noreferrer" className="levelsio-by" href="https://twitter.com/Mubaris_NK"><img alt="Mubaris NK" src="https://pbs.twimg.com/profile_images/975936934949212161/AySAHTaz_400x400.jpg" /><p>by Mubaris NK</p></a>
      </div>
    );
  }
}

export default App;
