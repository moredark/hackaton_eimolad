import React, {useEffect, useRef, useState} from 'react';
import {NFT} from "../../UI/NFT/NFT";
import classes from "./NFTsOfCollect.module.css";
import decor from "../NFTs/decor.png";
import loaderGif from "../../../media/loader.gif";


const getCollectInfo = (collect, nfts) => {
    let nftsCount = 0;
    let wrappedCount = 0;
    for (let nft in nfts) {
        if (nfts[nft]['collection'] === collect) {
            nftsCount++
            if (nfts[nft].metadata.state === 'wrapped') wrappedCount++
        }
    }
    return {nftsCount: nftsCount, wrappedCount: wrappedCount}
}

export const NFTsOfCollect = ({collect, nfts, selected, refresh, setRefresh, setSelected, setSelectedToken, selectedWNTFs, setSelectedWNFTs}) => {
    let loader = true
    let NFTs = []
    let collectInfo = getCollectInfo(collect, nfts ? JSON.parse(nfts) : {})

    if (nfts && (nfts != "{}") && loader) {
            for (let tid in JSON.parse(nfts)) {
                if (JSON.parse(nfts)[tid].collection == collect) {
                    NFTs.push(<NFT nft={JSON.parse(nfts)[tid]} key={tid} selected={selected} setSelected={setSelected} refresh={refresh} setRefresh={setRefresh}
                                     setSelectedToken={setSelectedToken} selectedWNFTs={selectedWNTFs}
                                     setSelectedWNFTs={setSelectedWNFTs}/>) }
            }
            loader = false
    }

    return (
        <div className={classes.root}>
            <div className={classes.header}>
                <div className={classes.collectName}>{collect}</div>
                <div className={classes.count}><span>{collectInfo.nftsCount}</span></div>
            </div>
            <div className={classes.decor}><img src={decor} alt="decor"/></div>
            {!loader && NFTs.length>0 ? <div className={classes.grid}>{NFTs}</div> :
                !loader && NFTs.length == 0 ? null :
                <div className={classes.loader}><img src={loaderGif} alt="loader"/></div> }
                {/*<div className={classes.noNFT}>You have no NFTs of this collection</div> : null}*/}
        </div>
    );
};