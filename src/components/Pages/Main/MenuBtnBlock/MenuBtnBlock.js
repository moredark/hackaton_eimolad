import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {Button} from "../../../UI/Button/Button";
import {BackButton} from "../../../UI/BackButton/BackButton";
import bg from "./bg.png";
import classes from "./MenuBtnBlock.module.css";
import copy from "./copy.png"
import {clipboardCopy, principalToAccountIdentifier, tokenIdentifier} from "../../../../utils/utils";

export const MenuBtnBlock = ({address}) => {
    const [copied, setCopied] = useState(false)
    const [play, setPlay] = useState(false)
    // window.screen.width >= 1100 ? true : false

    return (
        <div className={classes.root} style={{background: `url(${bg})`}}>
            <div>
                <BackButton url="/"/>
                <div className={classes.menuItems}>
                    <Link to='/'>
                        <Button style={{}} active={false} buttonType="middleBtn">Play</Button>
                    </Link>
                    <Link to='/wallet'>
                        <Button style={{}} active={true} buttonType="middleBtn">Wallet</Button>
                    </Link>
                    <Link to='/stake'>
                        <Button style={{}} active={true} buttonType="middleBtn">Stake</Button>
                    </Link>
                    <Link to='#'>
                        <Button style={{}} active={false} buttonType="middleBtn">Market</Button>
                    </Link>
                    <div className={classes.address} onClick={() => {
                        clipboardCopy(address);
                        setCopied(true)
                        setTimeout(() => setCopied(false), 1000)
                    }}>
                        {copied ? <div>Copied</div> : null}
                        <img src={copy} alt="Copy address"/>
                        {address.substr(0,6)+"..." + address.substr(58,64)}
                    </div>
                </div>
            </div>
        </div>
    );
};