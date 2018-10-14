import imageToTextDecoder from 'image-to-text';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import './index.css';

import bg from '../../resources/bg.jpg';
import browse from '../../resources/browse.png';
import drop from '../../resources/drop.png';
import loading from '../../resources/loading.png';

const KEY = 'jSt3iT0osObMD7kU5Ous6g';

class Test extends Component {
  constructor(props) {
    super(props);
    imageToTextDecoder.setAuth(KEY);

    this.state = {
      file: drop,
      loading: false,
      keywords: '',
    };

    this.preventDefault = this.preventDefault.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
    this.handleImage = this.handleImage.bind(this);
  }

  preventDefault(event) {
    event.preventDefault();
  }

  handleChange(event) {
    this.handleImage(event.target.files[0]);
  }

  handleDrop(event) {
    event.preventDefault();
    this.handleImage(event.dataTransfer.files[0]);
  }

  handleImage(f) {
    const file = {
      name: f.name,
      path: f.path.slice(0, f.path.length - f.name.length),
    };
    const fileURL = URL.createObjectURL(f);

    this.setState({
      file: loading,
      loading: true,
      keywords: 'Processing Image...',
    });

    imageToTextDecoder.getKeywordsForImage(file)
      .then(keywords => {
        const msg = new SpeechSynthesisUtterance(keywords);
        window.speechSynthesis.speak(msg);

        this.setState({
          file: fileURL,
          loading: false,
          keywords: keywords });
      }, () => {
        this.setState({
          file: drop,
          loading: false,
          keywords: 'Image Not Read!',
        });
      })
      .catch(() => {
        this.setState({
          file: drop,
          loading: false,
          keywords: 'Image Not Read!',
        });
      });
  }

  render() {
    return (
      <div className='wrapper'>
        <img className='bg' src={bg} />
        <div className='dropGrid' onDragOver={this.preventDefault} onDrop={this.handleDrop}>
          <div className='outer'>
            <div className='middle'>
              <div className='inner'>
                <label>
                  <img className='icon' src={browse} /> Browse<input type='file' onChange={this.handleChange} />
                </label>
                <span>or drag image here</span>
              </div>
            </div>
          </div>
        </div>

        <div className='imageGrid' onDragOver={this.preventDefault} onDrop={this.handleDrop}>
          <span className='helper'></span><img className={`displayImage ${this.state.loading ? 'loading' : ''}`} src={this.state.file} />
        </div>

        <div className='bottomGrid' onDragOver={this.preventDefault} onDrop={this.handleDrop}>
          <div className='outer'>
            <div className='middle'>
              <div className='inner'>
                <p><b>Text:</b> {this.state.keywords}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Test.propTypes = {
  link: PropTypes.string,
};

ReactDOM.render(<Test />, document.querySelector('#app'));
