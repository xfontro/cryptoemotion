import React, { Component } from 'react';
import PropTypes from 'prop-types';


class Particles extends Component {
  static PropTypes = {
    type: PropTypes.oneOf['default', 'bubble'],
  };

  static defaultPropss = {
    type: 'default',
  };

  constructor(props) {
    super(props);

    this.scriptLoaded = this.scriptLoaded.bind(this);
    this.loadScript = this.loadScript.bind(this);
  }

  scriptLoaded() {
    particlesJS.load('particles', `/assets/particles-${this.props.type}.json`);
  }

  loadScript(d, script, id) {
    const element = d.getElementsByTagName(script)[0];
    const pjs = element;
    let js = element;

    if (d.getElementById(id)) {
      return;
    }

    js = d.createElement(script);
    js.id = id;
    js.onload = this.scriptLoaded;
    js.src = 'https://cdn.jsdelivr.net/npm/particles.js@2.0.0/particles.min.js';
    pjs.parentNode.insertBefore(js, pjs);
  }

  componentWillMount() {
    if (typeof window !== 'undefined') {
      this.loadScript(document, 'script', 'particles-js');
    }
  }

  render() {
    return null;
  }
}

export default Particles;
