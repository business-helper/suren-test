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
    _prevY = 0;

    _onMouseDown = (event) => {
        const { scrollHeight } = this.props;
        if (event.button !== 0 && event.type !== 'touchstart') {
            return;
        }
        const { scrollLeft, scrollTop, clientLeft, clientTop } = document.body; // console.log('[Doc Coord]', scrollLeft, scrollTop, clientLeft, clientTop);
        // Try to avoid calling `getBoundingClientRect` if you know the size
        // of the moving element from the beginning. It forces reflow and is
        // the laggiest part of the code right now. Luckily it's called only
        // once per click.
        const { left, top } = this._ref.current.getBoundingClientRect();

        const e = event.type.includes('touch') ? event.touches[0] : event;
        this._prevY = e.pageY;
        document.addEventListener('mousemove', this._onMouseMove);
        document.addEventListener('touchmove', this._onMouseMove);
        document.addEventListener('mouseup', this._onMouseUp);
        document.addEventListener('touchend', this._onMouseUp);
        document.addEventListener('touchcancel', this._onMouseUp);
        
        event.preventDefault();
    };

    _onMouseUp = (event) => {
        document.removeEventListener('mousemove', this._onMouseMove);
        document.removeEventListener('touchmove', this._onMouseMove);
        document.removeEventListener('mouseup', this._onMouseUp);
        document.removeEventListener('touchend', this._onMouseUp);
        document.removeEventListener('touchcancel', this._onMouseUp);
        event.preventDefault();
    };

    _onMouseMove = (event) => {
        const e = event.type.includes('touch') ? event.touches[0] : event;
        this.props.onMove(
            e.pageY - this._prevY
        );
        this._prevY = e.pageY;
        event.preventDefault();
    };

    _update = throttle(() => {
        const { x, y } = this.props;
        this._ref.current.style.transform = `translate(${x}px, ${y}px)`;
    });

    componentDidMount() {
        this._ref.current.addEventListener('mousedown', this._onMouseDown);
        this._ref.current.addEventListener('touchstart', this._onMouseDown);
        this._update();
    }

    componentDidUpdate() {
        this._update();
    }

    componentWillUnmount() {
        this._ref.current.removeEventListener('mousedown', this._onMouseDown);
        this._ref.current.removeEventListener('touchstart', this._onMouseDown);
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
    constructor(props) {
        super(props);
        this.state = {
            scrollHeight: 0,
            x: -50,
            y: 590,
            percent: '0.00',
            temp: "0.00",
            focusFlag: false,
            topHeight:590,
            defaultHeight:590,
            indicatorHeight:34.5
        }
    }

    componentDidMount() {
        window.addEventListener('scroll', this.updateDimensions);
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.updateDimensions);
    }
    updateDimensions = () => {
        let {defaultHeight} = this.state;
       this.setState({scrollHeight:window.screenY})
       //this.setState({topHeight:defaultHeight +  window.scrollY})
    }
  
    _move = (delY) => {
        let {topHeight, indicatorHeight} = this.state;
        //////////////////
        let y = this.state.y + delY;
        y = Math.min(topHeight, y);
        y = Math.max(0, y);
        let percent = parseFloat((topHeight - y) * 100 / topHeight).toFixed(2);
        this.setState({...this.state, y: y, focusFlag: false, percent: percent, temp: percent});

        ///////////////////
        // var percent = ((560 - y) / 594) * 100;
        // var percent = 100 - (y + indicatorHeight) * 100 / topHeight;
        // percent = parseFloat(percent).toFixed(2);
        // percent = Math.min(100, percent);
        // percent = Math.max(0, percent);
        // this.setState({ percent, temp: percent });
    }

    handleKeyPress = (event) => {
        const { topHeight } = this.state;
        if (event.key === 'Enter') {
            let y = parseFloat((100 - this.state.temp) * topHeight / 100)
            this.setState({y: y, focusFlag: false});
            // this.setState({ percent: this.state.temp, focusFlag: false })
        }
    }
    handleClick = () => {
        this.nameInput.focus();
        this.setState({ focusFlag: true })
    }
    render() {
        let {topHeight, indicatorHeight, focusFlag, scrollHeight} = this.state;
        let y = this.state.y;
        y = Math.min(topHeight, y);
        y = Math.max(0, y);
        let percent = parseFloat((topHeight - y) * 100 / topHeight).toFixed(2);
        return (
            <div className={container}>
                <div className={indicatorComponent}>
                    <Draggable scrollHeight={scrollHeight} x={113.51} y={y - indicatorHeight} className={indicatorComponent} onMove={this._move}>
                        <img src={IndicatorSVG} alt="Indicator SVG" />
                        <input
                            ref={(input) => { this.nameInput = input; }}
                            className={amount}
                            value={!focusFlag ? percent : this.state.temp}
                            type="text"
                            onClick={this.handleClick}
                            onTouchStart={this.handleClick}
                            onChange={(e) => this.setState({ temp: e.target.value })}
                            onKeyPress={this.handleKeyPress} />
                    </Draggable>
                </div>
                <div className={colorBarContainer}>
                    <div className={colorTop}></div>
                    <div className={colorBottom} style={{ height: topHeight - y }}></div>
                </div>
                <label className={maxLabel}>100</label>
                <label className={minLabel}>0</label>
            </div>
        );
    }
}
