import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ToastAndroid } from 'react-native';
import Pause from './PauseButton'
import Start from './StartButton'
import Reset from './ResetButton'
import DateTimePicker from '@react-native-community/datetimepicker'
import { format } from 'date-fns'
import BackgroundJob from 'react-native-background-job'

export default class Timer extends Component {

  constructor(props) {
    super(props)
  }

  state = {
    horas: 0,
    minutos: 0,
    horasView: 0,
    minutosView: 0,
    contaMinutos: 0,
    contaSegundos: 0,
    totalSegundos: 0,
    show: false,
    doisPontos: true,
    buttonStart: true,
    buttonReset: false,
    buttonPause: false,
    selecioneTempo: true,
    tempoSelecionado: false,
  }

  showTime = () => {
    this.setState({ show: true })
  }

  setTime = (event, date) => {
    const horasView = parseInt(format(date, 'HH'), 10)
    const minutosView = parseInt(format(date, 'mm'), 10)
    const totalSegundos = horasView * 60 * 60 + minutosView * 60
    this.setState({ horasView, minutosView, totalSegundos, show: false, selecioneTempo: false })
  }

  _interval = 0

  onStart = () => {
    if (this.state.totalSegundos != 0) {
      this.setState({
        tempoSelecionado: true,
        buttonPause: true,
        buttonReset: false,
        buttonStart: false
      })
      startBackground(this.state)
      this._interval = setInterval(() => {
        if (this.state.totalSegundos == 1) {
          this.setState({ totalSegundos: 0 })
          clearInterval(this._interval)
        }

        this.setState({
          totalSegundos: this.state.totalSegundos - 1,
          contaSegundos: this.state.contaSegundos + 1
        })
        if (this.state.contaSegundos == 60) {
          this.setState({
            contaSegundos: 0,
            contaMinutos: this.state.contaMinutos + 1,
            minutos: this.state.minutos + 1
          })
        }
        if (this.state.contaMinutos == 60) {
          this.setState({
            contaMinutos: 0,
            horas: this.state.horas + 1
          })
        }
        this.setState({ doisPontos: this.state.doisPontos ? false : true })
      }, 1000)

    } else {
      alert('Por favor selecione um tempo antes de começar')
    }
  }

  onPause = () => {
    clearInterval(this._interval);
    this.setState({
      buttonStart: true,
      buttonPause: false,
      buttonReset: true
    })
  }

  onReset = () => {
    this.setState({
      totalSegundos: 0,
      contaMinutos: 0,
      contaSegundos: 0,
      horas: 0,
      tempoSelecionado: false,
      buttonPause: false,
      buttonReset: false,
      buttonStart: true
    });
    clearInterval(this._interval);
  }

  render() {

    const minutos = this.state.minutosView
    const horas = this.state.horasView

    return (
      <View style={styles.container}>
        <View style={styles.containerTimer}>
          <View style={styles.wrapperTimer}>
            <View style={styles.viewTimer}>
              <TouchableOpacity onPress={this.showTime}>
                {this.state.selecioneTempo &&
                  <Text style={styles.timerSelec}>Selecione o tempo teste 1</Text>
                }
                {!this.state.selecioneTempo &&
                  <Text style={styles.timer}>
                    {String(this.state.horas).length == 1 ? '0' + this.state.horas : this.state.horas}
                    {this.state.doisPontos &&
                      <Text>:</Text>}
                    {!this.state.doisPontos &&
                      <Text style={{ color: 'white' }}>:</Text>}
                    {String(this.state.minutos).length == 1 ? '0' + this.state.minutos : this.state.minutos}
                    {this.state.doisPontos &&
                      <Text>:</Text>}
                    {!this.state.doisPontos &&
                      <Text style={{ color: 'white' }}>:</Text>}
                    {String(this.state.contaSegundos).length == 1 ? '0' + this.state.contaSegundos : this.state.contaSegundos}
                  </Text>
                }
              </TouchableOpacity>
              {this.state.show &&
                <DateTimePicker
                  value={new Date('2020-06-12T01:00:00')}
                  mode={'time'}
                  display={'clock'}
                  onChange={this.setTime} />
              }
            </View>
          </View>
        </View>
        <View style={styles.containerTimerSelected}>
          {this.state.tempoSelecionado &&
            <Text style={styles.timerSelec}>Tempo para futricar: {horas}h e {minutos}min</Text>
          }
        </View>
        <View style={styles.containerButtons}>
          <View style={styles.buttons}>
            {this.state.buttonStart &&
              <Start onStart={this.onStart} />
            }
            {this.state.buttonPause &&
              <Pause onPause={this.onPause} />
            }
            {this.state.buttonReset &&
              <Reset onReset={this.onReset} />
            }
          </View>
        </View>
      </View >
    )
  }
}

//Parte de background
function startBackground(state) {

  _interval = 0
  const backgroundJob = {
    jobKey: "tempo",
    job: () => {alert('acabou o tempo')}
  }
  BackgroundJob.register(backgroundJob)

  var backgroundSchedule = {
    jobKey: "tempo",
    timeout: state.totalSegundos * 1000,
    allowExecutionInForeground: true
  }

  BackgroundJob.schedule(backgroundSchedule)

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  containerTimer: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewTimer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#c0c0c0',
    borderWidth: 3,
    borderRadius: 125,
    height: 250,
    width: 250,
    backgroundColor: '#fff'
  },
  wrapperTimer: {
    borderColor: '#d3d3d3',
    borderWidth: 5,
    borderRadius: 128,
    height: 256,
    width: 256,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timer: {
    fontSize: 40,
    color: '#c0c0c0'
  },
  timerSelec: {
    fontSize: 20,
    color: '#c0c0c0'
  },
  containerButtons: {
    flex: 2,
    marginTop: 50
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  containerTimerSelected: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})