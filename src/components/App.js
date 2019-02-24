import React, { Component, Fragment } from 'react';

import Select from 'react-select';
import mentors from '../JSON/data.json';
import Table from './table';
import Description from './description';

import 'font-awesome/css/font-awesome.css';
import '../css/button.css';
import '../css/user.css';
import '../css/app.css';

const colourStyles = {
  
  //  option: styles => ({ ...styles, backgroundColor: 'white', color: 'black' })

  control: styles => ({ ...styles, backgroundColor: 'white' }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    const color = chroma(data.color);
    return {
      ...styles,
      backgroundColor: isDisabled
        ? null
        : isSelected ? data.color : isFocused ? color.alpha(0.1).css() : null,
      color: isDisabled
        ? '#ccc'
        : isSelected
          ? chroma.contrast(color, 'white') > 2 ? 'white' : 'black'
          : data.color,
      cursor: isDisabled ? 'not-allowed' : 'default',
    };
  },
};

class App extends Component {
  state = {
      selectedOption: null,
      user: 'not authorized',
  }

  componentDidMount () {
      const oauthScript = document.createElement('script');
      oauthScript.src = 'https://cdn.rawgit.com/oauth-io/oauth-js/c5af4519/dist/oauth.js';

      document.body.appendChild(oauthScript);

      const selectedOption = JSON.parse(localStorage.getItem('githubMentor'));
      const user = JSON.parse(localStorage.getItem('user'));

      if (selectedOption) {
          this.setState({ selectedOption });
      }

      if (user) {
          this.setState({ user });
      }
  }

  handleChange = (selectedOption) => {
      this.setState({ selectedOption });
      localStorage.setItem('githubMentor', JSON.stringify(selectedOption));
  }

  handleClick(e) {
      e.preventDefault();
      window.OAuth.initialize('cda8ab0b4a7cbf7e90f7bc56a830b8a98ece045b');

      window.OAuth.popup('github').then((provider) => {
          provider.me().then((data) => {
              const number = mentors.findIndex(obj => obj.github === data.alias.toLowerCase());

              if (number !== -1) {
                  const selectedOption = mentors[number];
                  this.setState({ selectedOption });
          
                  localStorage.setItem('githubMentor', JSON.stringify(selectedOption));
          
                  if (!JSON.parse(localStorage.getItem('user')) || JSON.parse(localStorage.getItem('user')) !== data.alias) {
                      alert('Welcome mentor ' + data.alias + '!');
                  }         
              } else {         
                  if (!JSON.parse(localStorage.getItem('user')) || JSON.parse(localStorage.getItem('user')) !== data.alias) {
                      alert('Welcome ' + data.alias + '! You are not a mentor');
                  }   
              } 
        
              this.setState({ user: data.alias });
              localStorage.setItem('user', JSON.stringify(data.alias));
          });
      });
  }

  render() {
      const { selectedOption } = this.state;

      return (
          <Fragment>
              <div class=''>
                  <div className='header'>
                      <div className='enter wrapper'>
                          <Select 
                              value={selectedOption}
                              onChange={this.handleChange}
                              options={mentors}
                              getOptionLabel={({ github }) => github} 
                              styles={colourStyles} />  
                      </div>
                      <div className='button wrapper'>
                          <a href='' onClick={this.handleClick.bind(this)}>
                              <span className='fa fa-github'></span>Login Github
                          </a> 
                      </div>
                  </div>
                  <div className='table'>
                      <Table selectedOption={selectedOption}/> 
                  </div>
                  <div class='description'>
                      <Description selectedOption={selectedOption}/> 
                  </div>
              </div>
          </Fragment>
      );
  }
}

export default App;
