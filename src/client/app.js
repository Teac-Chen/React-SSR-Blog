import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class App extends React.Component {
  componentWillMount() {
    axios.get('/admin/home')
      .then((result) => {
        console.log(result); //eslint-disable-line
      });
  }

  render() {
    return <div>Hello React!!!~</div>;
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

if (module.hot) {
  module.hot.accept();
}
