import React from 'react';
import { ConnectBtnBlock} from "./ConnectBtnBlock/ConnectBtnBlock";
import {MenuBtnBlock} from "./MenuBtnBlock/MenuBtnBlock";
import decor from "./main_decor.png";
import bg from "./main.png";
import classes from "./Main.module.css";
import {AClient, getAddress, principalToAccountIdentifier} from "../../../utils/utils";

export const Main = ({address, setAddress}) => {

    const init = async () => {
        await AClient((id) => {
            setAddress(principalToAccountIdentifier(id.getPrincipal().toText()))
        })
    }
    if (localStorage.getItem("ic-delegation") && !address) { getAddress(addr => setAddress(addr)) }

    return (
        <div className={classes.root} style={{background: `url(${bg})`}}>
            {!address ?
                <div className={classes.main}>
                    <h2>Connect your Wallet</h2>
                    <div className={classes.decor}><img src={decor} alt=""/></div>
                    <ConnectBtnBlock init={init}/>
                </div>
                :
                <div className={classes.main}>
                    <MenuBtnBlock address={address}/>
                </div>
            }
            {/*<Footer/>*/}
        </div>
    );
}