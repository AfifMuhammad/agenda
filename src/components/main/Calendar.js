import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import {Agenda} from 'react-native-calendars';
import Login from '../login/Login';
import Edit from '../edit/Edit';



export default class Calendar extends Component {
  constructor(props) {
    super(props);
    this.componentWillMount = this.componentWillMount.bind(this);
    this.state = {
      items: {'2017-10-22': [{name: 'item 1 - any js object', time:'saiki'},{name: 'asdnsdbgjfsfdgjbsgjsdjfgj'}],},
      data : null, jumlah : null
    };
  }

  componentWillMount(){
    
    fetch(`http://rpl.camara.co.id/api/agenda/${this.props.username}`, {
      method: "GET",
      headers: {
        'Authorization': this.props.token
      },
    })
    .then((response) => response.json())
    .then((responseData) => {

      // alert(
      //   JSON.stringify(responseData)
      // )
      //console.log(this.props.token)
      
      this.setState({jumlah : Object.keys(responseData.data).length})
      console.log(this.state.jumlah)
      this.setState({data : responseData})

      for (let j = 0; j < this.state.jumlah; j++) {
        const time = this.state.data.data[j].tgl_mulai;
        const strTime = this.timeToString(time);
        if(!this.state.items[strTime]){
          this.state.items[strTime] = [];
        }
        this.state.items[strTime].push({
          name: this.state.data.data[j].isi_agenda,
          time : this.state.data.data[j].jam_mulai,
          id : this.state.data.data[j].id_agenda
         });
      }

    })
    .done();
  }

  render() {
    //console.log(this.state.id)
    return (
      <Agenda
        items={this.state.items}
        loadItemsForMonth={this.loadItems.bind(this)}
        renderItem={this.renderItem.bind(this)}
        renderEmptyDate={this.renderEmptyDate.bind(this)}
        rowHasChanged={this.rowHasChanged.bind(this)}
        theme={{calendarBackground: 'white', agendaKnobColor: 'green',selectedDayBackgroundColor: '#006400',
        dotColor: '#006400', todayTextColor: '#00FF00', selectedDayBackgroundColor: '#00FF00',  agendaTodayColor: '#00FF00',}}
      />
    );
  }

  loadItems(day) {
    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
      const time = day.timestamp + i * 24 * 60 * 60 * 1000;
      const strTime = this.timeToString(time);
         if (!this.state.items[strTime]) {
           this.state.items[strTime] = [];
        }
      }

      
      const newItems = {};
      Object.keys(this.state.items).forEach(key => {newItems[key] = this.state.items[key];});
      this.setState({
        items: newItems
      });
    });
  }

  renderItem(item) {
    return (
        
        <TouchableOpacity style={[styles.item, {height: item.height}]} onPress={()=>this.getID(item.id)}>
        <Text>
            {item.time} - {item.name}
        </Text>
        </TouchableOpacity>
      
    );
  }
  
  getID=(id_ag)=>{ 
    this.props._goToDetail(id_ag)
  }

  


  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}><Text>Kosong!</Text></View>
    );
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    marginTop : 0,
    marginBottom : 0
  },
  buttonContainer:{
    backgroundColor: "#ffffff",
    paddingVertical:10,
    marginTop:15,
    marginBottom:20,
    minWidth:300,
    flexWrap:'wrap',
    height : 40,
    paddingHorizontal : 10,
  },
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  emptyDate: {
    height: 15,
    flex:1,
    paddingTop: 30
  }
});