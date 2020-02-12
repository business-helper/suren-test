import React, { useState, useEffect } from 'react';
// import { DontReadTheComments } from 'utils/ApolloSubscription';
import styles from './style.module.css';
import { convertTime } from 'utils/Utilities'
import gql from 'graphql-tag';
import { useSubscription } from '@apollo/react-hooks'
import { Query, Subscription, useQuery } from 'react-apollo';

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
            subscribeToNewComments={() =>
                subscribeToMore({
                    document: BET_SUBSCRIPTION,
                    updateQuery: (prev, { subscriptionData }) => {
                        if (!subscriptionData.data) return prev;
                        const newFeedItem = subscriptionData.data.betAdded;

                        return Object.assign({}, prev, {
                            bets: ([newFeedItem, ...prev.bets].slice(0, 10))
                        });
                    }
                })
            }
        />
    );
}

function BetList(props) {
    const { data } = props;
    useEffect(() => {
        props.subscribeToNewComments();
    }, [])
    // console.log(data?.bets);
    return (
        <div className={styles.wrapper}>
            <div className={styles.tblHeader}>
                <div className={styles.tblTh}>TIME</div>
                <div className={styles.tblTh}>BET</div>
                <div className={styles.tblTh}>MULTIPLE</div>
                <div className={styles.tblTh}>PROFIT</div>
            </div>
            <div className={styles.tblBody}>
                {data && data.bets.map((bets, i) => {
                    const bet = data.bets[data.bets.length - i -1];
                    return (
                    <div className={styles.tblTr} key={`row-${i}`}>
                        <div className={styles.colWhite} key={`time-${i}`}>{convertTime(bet.time)}</div>
                        <div className={styles.colWhite} key={`bet-${i}`}>{bet.bet / 1000}</div>
                        <div className={styles.colWhite} key={`multiple-${i}`}>{bet.payout / 4}</div>
                        <div className={bet.profit > 0 ? styles.profitPlus : styles.profitMinus} key={`profit-${i}`}>{bet.profit / 1000}</div>
                    </div>
                    )
                })}
                {!data && <div className={styles.tblTr}>Loading...</div>}
            </div>
        </div>
    )
}


export default function Table(props) {
    return (
        <div className={styles.container}>
            <BetSubscription />
        </div>
    );
}