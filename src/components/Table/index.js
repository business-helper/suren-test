import React, { Component } from 'react';
import gql from 'graphql-tag';
import { useQuery } from 'react-apollo';
import styles from './style.module.css';
import { convertTime } from 'utils/Utilities'
import constants from 'utils/Constants';

const BET_SUBSCRIPTION = gql`
  subscription betAdded {
    betAdded {
      id
      time
      bet
      profit
      payout
    }
  }
`;

const BET_QUERY = gql`
  query Bets {
    bets {
        id
        time
        bet
        profit
        payout
    }
  }
`;

function BetSubscription() {
    const { subscribeToMore, ...result } = useQuery(
        BET_QUERY
    );
    return (
        <BetList
            {...result}
            subscribeToNewBets={() =>
                subscribeToMore({
                    document: BET_SUBSCRIPTION,
                    updateQuery: (prev, { subscriptionData }) => {
                        // console.log(prev);
                        if (!subscriptionData.data) return prev;
                        const newFeedItem = subscriptionData.data.betAdded;

                        //return
                        const newdata = Object.assign({}, prev, {
                            // entry: {
                            bets: ([newFeedItem, ...prev?.bets].slice(0, 10)),
                            //     prev: prev
                            // }
                        });
                        // console.log(newdata);
                        return newdata;
                    }
                })
            }
        />
    );
}

class BetList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            windowWidth: 0,
            windowHeight: 0
        };
        this.updateDimensions = this.updateDimensions.bind(this);
    }

    componentDidMount() {
        this.props.subscribeToNewBets();
        this.updateDimensions();
        window.addEventListener('resize', this.updateDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimensions);
    }

    updateDimensions() {
        let windowWidth = typeof window !== 'undefined' ? window.innerWidth : 0;
        let windowHeight = typeof window !== 'undefined' ? window.innerHeight : 0;
        this.setState({ windowWidth, windowHeight });
    }

    render() {
        const { data } = this.props;
        return (
            <div className={styles.wrapper}>
                <div className={styles.tblHeader}>
                    <div className={styles.tblTh}>TIME</div>
                    {this.state.windowWidth > constants.BREAK_SM && <div className={styles.tblTh}>BET</div>}
                    {this.state.windowWidth > constants.BREAK_SM && <div className={styles.tblTh}>MULTIPLE</div>}
                    <div className={styles.tblTh}>PROFIT</div>
                </div>
                <div className={styles.tblBody}>
                    {
                        data && data.bets.map((bet, i) => (
                            <div className={styles.tblTr} key={`row-${bet.time}`}>
                                <div className={styles.colWhite} key={`time-${i}`}>{convertTime(bet.time)}</div>
                                {this.state.windowWidth > constants.BREAK_SM && <div className={styles.colWhite} key={`bet-${i}`}><label className={styles.bitcoin}>&#8383;</label>{bet.bet / 1000}</div>}
                                {this.state.windowWidth > constants.BREAK_SM && <div className={styles.colWhite} key={`multiple-${i}`}>{bet.payout / 4}</div>}
                                <div className={bet.profit > 0 ? styles.profitPlus : styles.profitMinus} key={`profit-${i}`}><label className={styles.bitcoin}>&#8383;</label>{bet.profit > 0 ? '+' : ''}{bet.profit / 1000}</div>
                            </div>

                        )
                        )
                    }

                    {
                        !data && <div className={styles.tblTr}>Loading...</div>
                    }
                </div>
            </div>
        )
    }
}

export default function Table(props) {
    return (
        <div className={styles.container}>
            <BetSubscription />
        </div>
    );
}