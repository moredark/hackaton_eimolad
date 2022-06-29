import React, {useEffect, useState, useRef} from 'react';
import {NFTsOfCollect} from "../NFTsOfCollect/NFTsOfCollect";
import classes from "./NFTs.module.css";
import {canisters} from "../../../canisters";

export const NFTs = ({address, nfts, selected, refresh, setRefresh, setSelected, setSelectedToken, selectedWNFTs, setSelectedWNFTs, filt}) => {

    let content = []

    for (let collect in canisters) {
            if (JSON.parse(filt)[collect]) {
                content.push(
                    <div className={classes.root} key={collect}>
                        <NFTsOfCollect collect={collect} nfts={nfts} selected={selected}
                                       refresh={refresh} setRefresh={setRefresh}
                                       setSelected={setSelected} setSelectedToken={setSelectedToken}
                                       selectedWNTFs={selectedWNFTs} setSelectedWNFTs={setSelectedWNFTs}/>
                    </div>
                )
        }
    }

    return (
        <>
            {content.length>0 ? content : null}
        </>
    );
};