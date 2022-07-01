/* global BigInt */
import React, {useEffect, useState} from 'react';
import {Pair} from "../../UI/Pair/Pair";
import classes from "./ActivePairs.module.css";
import decor from "./decor.png";
import {AuthClient} from "@dfinity/auth-client";
import {Actor, HttpAgent} from "@dfinity/agent";
import kernelDid from "../../../utils/candid/kernel.did";
import loaderGif from "../../../media/loader.gif";


const getStakeFromAID = async (callback) => {
    const authClient = await AuthClient.create({ _storage: localStorage.getItem("ic-delegation") })

    const agent = new HttpAgent({
        host: "https://ic0.app",
        identity: authClient.getIdentity()
    });

    const actor = Actor.createActor(kernelDid, {
        agent: agent,
        canisterId: "ylwtf-viaaa-aaaan-qaddq-cai",
    });

    await actor.getStakeFromAID().then((data) => {
        callback(data)
    });

}

export const ActivePairs = ({nfts, setNfts, setWait, stakedPairs, setStakedPairs}) => {
    return (
        <div className={classes.root}>
            {stakedPairs ?
                <div className={classes.pairs}>
                    {JSON.parse(stakedPairs).map(pair => {
                        return (
                            <Pair pair={pair} nfts={nfts} setNfts={setNfts} stakedPairs={stakedPairs} setStakedPairs={setStakedPairs} key={JSON.stringify(pair)} setWait={setWait}/>
                            )
                    })
                    }
            </div>
                : <>
                    <div className={classes.loader}><img src={loaderGif} alt="loader"/></div>
                    <h4 className={classes.warning}>Please wait. This may take about a minute</h4>
                </>
            }
            <div className={classes.decor}><img src={decor} alt="Decor"/></div>
        </div>
    );
};