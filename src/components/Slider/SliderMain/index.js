import React from 'react';
import IndicatorSVG from 'assets/images/arrow.svg';
import { container, colorBarContainer, colorTop, colorBottom, indicatorComponent, amount, minLabel, maxLabel } from './style.module.css';

const throttle = (f) => {
    let token = null, lastArgs = null;
    const invoke = () => {
        f(...lastArgs);
        token = null;
    };
    const result = (...args) => {
        lastArgs = args;
        if (!token) {
            token = requestAnimationFrame(invoke);
        }
    };
    result.cancel = () => token && cancelAnimationFrame(token);
    return result;
};

class Draggable extends React.PureComponent {
    _relX = 0;
    _relY = 0;
    _ref = React.createRef();

    _onMouseDown = (event) => {
        if (event.button !== 0) {
            return;
        }
        const { scrollLeft, scrollTop, clientLeft, clientTop } = document.body;
        // Try to avoid calling `getBoundingClientRect` if you know the size
        // of the moving element from the beginning. It forces reflow and is
        // the laggiest part of the code right now. Luckily it's called only
        // once per click.
        const { left, top } = this._ref.current.getBoundingClientRect();
        this._relX = event.pageX - (left + scrollLeft - clientLeft);
        this._relY = event.pageY - (top + scrollTop - clientTop - 70);
        document.addEventListener('mousemove', this._onMouseMove);
        document.addEventListener('mouseup', this._onMouseUp);
        event.preventDefault();
    };

    _onMouseUp = (event) => {
        document.removeEventListener('mousemove', this._onMouseMove);
        document.removeEventListener('mouseup', this._onMouseUp);
        event.preventDefault();
    };

    _onMouseMove = (event) => {
        this.props.onMove(
            event.pageX - this._relX,
            event.pageY - this._relY,
        );
        event.preventDefault();
    };

    _update = throttle(() => {
        const { x, y } = this.props;
        this._ref.current.style.transform = `translate(${x}px, ${y}px)`;
    });

    componentDidMount() {
        this._ref.current.addEventListener('mousedown', this._onMouseDown);
        this._update();
    }

    componentDidUpdate() {
        this._update();
    }

    componentWillUnmount() {
        this._ref.current.removeEventListener('mousedown', this._onMouseDown);
        this._update.cancel();
    }

    render() {
        return (
            <div ref={this._ref}>
                {this.props.children}
            </div>
        );
    }
}
export default class Indicator extends React.PureComponent {
    state = {
        x: -50,
        y: 0,
        percent: '0.00',
        temp: "0.00",
        focusFlag: false,
    };

    _move = (x, y) => {
        // var percent = ((560 - y) / 594) * 100;
        var percent = 100 - (y + 34.5) * 100 / 594;
        percent = parseFloat(percent).toFixed(2);
        percent = Math.min(100, percent);
        percent = Math.max(0, percent);
        this.setState({ percent, temp: percent });
    }
    handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            this.setState({ percent: this.state.temp, focusFlag: false })
        }
    }
    handleClick = () => {
        this.nameInput.focus();
        this.setState({ focusFlag: true })
    }
    render() {
        let { focusFlag } = this.state
        let percent = parseFloat(this.state.percent).toFixed(2);
        percent = Math.min(100, percent);
        percent = Math.max(0, percent);
        // let y = 560 - percent * 594 / 100;
        let y = (100 - percent) * 594 / 100 - 34.5;
        return (
            <div className={container}>
                <div className={indicatorComponent}>
                    <Draggable x={113.51} y={y} className={indicatorComponent} onMove={this._move}>
                        <img src={IndicatorSVG} alt="Indicator SVG" />
                        <input
                            ref={(input) => { this.nameInput = input; }}
                            className={amount}
                            value={!focusFlag ? percent : this.state.temp}
                            type="text"
                            onClick={this.handleClick}
                            onChange={(e) => this.setState({ temp: e.target.value })}
                            onKeyPress={this.handleKeyPress} />
                    </Draggable>
                </div>
                <div className={colorBarContainer}>
                    <div className={colorTop}></div>
                    <div className={colorBottom} style={{ height: 556 - y }}></div>
                </div>
                <label className={maxLabel}>100</label>
                <label className={minLabel}>0</label>
            </div>
        );
    }
}
