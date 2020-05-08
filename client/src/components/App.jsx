import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import MainGallery from './MainGallery.jsx';
import ViewPhotos from './ViewPhotos.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      rows: [],
      viewButton: false,
      attbId: null,
      // LargeBox: false,
      // SmallBox1: false,
      // SmallBox2: false,
      // SmallBox3: false
      // SmallBox4: false
    };
    this.handleViewButton = this.handleViewButton.bind(this);
    this.handleGetAtt = this.handleGetAtt.bind(this)
  }

  componentDidMount() {
    this.getImage();
  }

  getImage() {
    axios.get('/image')
      .then(({ data }) => {
        this.setState({
          data,
          rows: data.rows,
        });
      })
      .catch(this.handleError);
  }

  handleError(error, callback) {
    callback(this.error);
  }

  handleViewButton() { // working
    this.setState({
      viewButton: !this.state.viewButton,
    });
    console.log(this.state.viewButton);
  }

  handleGetAtt(e) {
    console.log(e.target.id)
    this.setState({
      attbId: e.target.id
    })
  }

  render() {
    // console.log(this.state.data,'data');
    // console.log(this.state.rows,'rows');
    console.log(this.state.attbId,'this.state.attbID')
    return (
      <div>
        <div>
          {this.state.viewButton === false
            ? (
              <MainGallery
                handleViewButton={this.handleViewButton}
                data={this.state.data}
                handleGetAtt={this.handleGetAtt}
                // LargeBox={this.state.LargeBox}
                // SmallBox1={this.state.SmallBox1}
              />
            )
            : (
              <ViewPhotos
                handleViewButton={this.handleViewButton}
                data={this.state.data}
                rows={this.state.rows}
                attbId={this.state.attbId}
              />
            )}
        </div>
      </div>
    );
  }
}

export default App;
