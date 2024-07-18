import './index.css'
import {Component} from 'react'

class DigitalTimer extends Component {
  state = {isTimerOn: false, timeInSeconds: 1500, showtime: 1500}

  reset = () => {
    this.setState({isTimerOn: false, timeInSeconds: 1500, showtime: 1500}, () =>
      this.clear(),
    )
  }

  toggle = () => {
    this.setState(
      prevState => ({isTimerOn: !prevState.isTimerOn}),
      () => {
        const {isTimerOn} = this.state
        if (isTimerOn) {
          this.timerId = setInterval(this.tick, 1000)
        } else {
          this.clear()
        }
      },
    )
  }

  tick = () => {
    this.setState(prevState => {
      const {timeInSeconds, showtime} = prevState
      if (timeInSeconds === 0) {
        this.clear()
        return {isTimerOn: false, timeInSeconds: showtime}
      }
      return {timeInSeconds: timeInSeconds - 1}
    })
  }

  clear = () => {
    clearInterval(this.timerId)
  }

  decrement = () => {
    this.setState(prevState => {
      const {showtime} = prevState
      if (showtime - 60 < 0) {
        return prevState
      }
      return {timeInSeconds: showtime - 60, showtime: showtime - 60}
    })
  }

  increment = () => {
    this.setState(prevState => {
      const {showtime} = prevState
      return {timeInSeconds: showtime + 60, showtime: showtime + 60}
    })
  }

  render() {
    const {isTimerOn, timeInSeconds, showtime} = this.state
    const minutes = Math.floor(timeInSeconds / 60)
    const Stringminutes = minutes <= 9 ? `0${minutes}` : `${minutes}`
    const seconds = timeInSeconds % 60
    const Stringseconds = seconds <= 9 ? `0${seconds}` : `${seconds}`

    return (
      <div className="cont-1">
        <h1>Digital Timer</h1>
        <div className="cont-2">
          <div className="cont-3">
            <div className="cont-4">
              <h1 className="timedisplay">
                {Stringminutes}:{Stringseconds}
              </h1>
              <p>{isTimerOn ? 'Running' : 'Paused'}</p>
            </div>
          </div>
          <div className="cont-5">
            <div className="cont-6">
              <div className="btncont">
                <button
                  className="playbutton"
                  type="button"
                  onClick={this.toggle}
                >
                  {isTimerOn ? (
                    <img
                      className="playbuttonimg"
                      src="https://assets.ccbp.in/frontend/react-js/pause-icon-img.png"
                      alt="pause icon"
                    />
                  ) : (
                    <img
                      className="playbuttonimg"
                      src="https://assets.ccbp.in/frontend/react-js/play-icon-img.png"
                      alt="play icon"
                    />
                  )}
                </button>
                <p>{isTimerOn ? 'Pause' : 'Start'}</p>
              </div>
              <div className="btncont">
                <button
                  className="playbutton"
                  type="button"
                  onClick={this.reset}
                >
                  <img
                    className="playbuttonimg"
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                    alt="reset icon"
                  />
                </button>
                <p>Restart</p>
              </div>
            </div>
            <div className="wholetextcont">
              <p className="timerlabel">Set Timer limit</p>
              <div className="timerlimit">
                <button
                  className="buttonplus"
                  type="button"
                  onClick={isTimerOn ? null : this.decrement}
                >
                  -
                </button>
                <p className="timerlimitpara">{`${Math.floor(
                  showtime / 60,
                )}`}</p>
                <button
                  className="buttonplus"
                  type="button"
                  onClick={isTimerOn ? null : this.increment}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
