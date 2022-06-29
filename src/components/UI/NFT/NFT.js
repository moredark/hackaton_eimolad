import React, {useEffect, useState} from 'react';
import {principalToAccountIdentifier, tokenIdentifier} from "../../../utils/utils"
import "./NFT.css"
import {AuthClient} from "@dfinity/auth-client";
import {Actor, HttpAgent} from "@dfinity/agent";
import {canisters} from "../../../canisters";
import kernelDid from "../../../utils/candid/kernel.did";
import wrapped from "./wrapped.png";
import swords from "./swords.png";

export const NFT = ({nft, selected, refresh, setRefresh, setSelected, setSelectedToken, selectedWNFTs, setSelectedWNFTs, incWrapped}) => {
    // console.log(nft)
    return (
        <>
                <div className={"rootNFT"}>
                    <div className={!JSON.parse(selected)[tokenIdentifier(nft.metadata.ledgerCanister, nft.index)] ? "borderNFT" : "borderNFT ActiveNFT"} onClick={() => {
                        if (nft.metadata.state == 'none') {
                            const sl = JSON.parse(selected);
                            setSelectedToken(null);
                            setSelectedWNFTs("{}")
                            if (sl[tokenIdentifier(nft.metadata.ledgerCanister, nft.index)]) {
                                delete sl[tokenIdentifier(nft.metadata.ledgerCanister, nft.index)];
                            } else {
                                sl[tokenIdentifier(nft.metadata.ledgerCanister, nft.index)] = nft;
                            }
                            setSelected(JSON.stringify(sl));
                        }
                    }}>
                        {nft.metadata.state == 'wrapped' || nft.metadata.state == 'stake' ?
                            <>
                                <div className={!JSON.parse(selectedWNFTs)[tokenIdentifier(nft.metadata.ledgerCanister, nft.index)] ? "lock" : "lock selectedLock"} onClick={() => {
                                    if (nft.metadata.state == 'wrapped') {
                                        setSelectedToken(null);
                                        setSelected(JSON.stringify({}));
                                        const slW = JSON.parse(selectedWNFTs)
                                        if (slW[tokenIdentifier(nft.metadata.ledgerCanister, nft.index)]) {
                                            delete slW[tokenIdentifier(nft.metadata.ledgerCanister, nft.index)];
                                        } else {
                                            slW[tokenIdentifier(nft.metadata.ledgerCanister, nft.index)] = nft;
                                        }
                                        setSelectedWNFTs(JSON.stringify(slW));
                                    }
                                }
                                }>
                                    <div>
                                        <img src={wrapped} alt="Wrapped"/>
                                    </div>
                                    <h4>{nft.metadata.state == 'wrapped' ? "Wrapped" : "Staked"}</h4>
                                </div>
                            </>
                            : null
                        }
                        <div className={!JSON.parse(selected)[tokenIdentifier(nft.metadata.ledgerCanister, nft.index)] ? "indexDesc" : "activeDesc"} onClick={() => {}}>
                            #{nft.index+1}
                            {nft.type == "character" ?
                                <span className={"rarityRate"}>{nft.metadata.rarityRate}%</span>
                            :
                                <span className={"rarityRate swords"}>{nft.rare == 'standart' ?
                                    <img src={swords} alt="swords"/> :
                                    nft.rare == 'rare' ?
                                    <>
                                        <img src={swords} alt="swords"/>
                                        <img src={swords} alt="swords"/>
                                    </> :
                                        <>
                                            <img src={swords} alt="swords"/>
                                            <img src={swords} alt="swords"/>
                                            <img src={swords} alt="swords"/>
                                        </>
                                }</span>
                            }

                        </div>
                        <div className={!JSON.parse(selected)[tokenIdentifier(nft.metadata.ledgerCanister, nft.index)] ? "bgCircleNFT" : "bgCircleNFT SelNFT"}>
                            <img src={"https://" + nft.metadata.ledgerCanister + ".raw.ic0.app/?type=thumbnail&tokenid=" + tokenIdentifier(nft.metadata.ledgerCanister, nft.index)} alt={nft.collection}/>
                        </div>
                    </div>
                </div>
        </>
    );
};