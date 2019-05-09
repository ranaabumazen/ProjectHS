import React from 'react';
import {
  ListView,
  Text,
  View
} from 'react-native';
import _ from 'lodash';
import { connect } from 'react-redux';
import { fetchAds } from '../actions';
// import console = require('console');

class AdsScreen extends React.Component {
 
  state = {
    Ads: [],
  };

   componentWillMount() {
    
    this.props.fetchAds();
  }

  createDataSource( _data ) {
    const ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      });
    this.dataSource = ds.cloneWithRows(_data);
  }
   
  renderRow(item) {
    const { name } = item;
    return(   
            <Text>{name}</Text>
    );
  }


  render() {
    this.createDataSource(this.props.Ads);
    return (
      <View>
          <ListView
            enableEmptySections={true} 
            renderRow={(item) => this.renderRow(item)}
            dataSource={this.dataSource}
          />        
      </View>
    );
  }

}

const mapStateToProps = ({ fetchAds }) => {
    const {Ads} = fetchAds; 
    console.log('Ads, Ads Screen ', Ads);
    return  {Ads};
};

// export default AdsScreen;

export default connect(mapStateToProps, { fetchAds})(AdsScreen);