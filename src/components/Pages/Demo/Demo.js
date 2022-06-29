import React, {useEffect, useState} from 'react';
import Unity, { UnityContext } from "react-unity-webgl";
import classes from "./Demo.module.css"
import bg from "../../../media/bg.png";
import cornerLeft from "./cornerDecorLeft.png";
import cornerRight from "./cornerDecorRight.png";
import {Button} from "../../UI/Button/Button";
import {getAddress} from "../../../utils/utils";

const unityContext = new UnityContext({
    loaderUrl: "Demo/1.loader.js",
    dataUrl: "Demo/1.data",
    frameworkUrl: "Demo/1.framework.js",
    codeUrl: "Demo/1.wasm"
});

export const Demo = ({address, setAddress}) => {
    const [progression, setProgression] = useState(0);
    const [confirm, setConfirm] = useState(false)
    const [play, setPlay] = useState(true)

    useEffect(function () {
        unityContext.on("progress", function (progression) {
            setProgression(progression);
        });
    }, []);

    return (
        <div className={classes.root} style={{backgroundImage: `url(${bg})`}}>
            {play ?
                window.screen.width >= 1100 ?
                        <>
                            <div className={classes.window} style={confirm ? {display: "none"} : {display: "flex"}}>
                                <div className={classes.border}>
                                    <h4>Warning!</h4>
                                    <img className={classes.cornerLeft} src={cornerLeft} alt="Corner Decor"/>
                                    <img className={classes.cornerRight} src={cornerRight} alt="Corner Decor"/>
                                    <p>
                                        We have developed a small test location, the ABANDONED VILLAGE OF THE GRENLYNS. The location is fully deployed by IC-on-chain. We are conducting research to optimize the loads. We invite our Eimoladians to take part in this small event!
                                    </p>
                                    <p style={{textTransform: "uppercase", fontWeight: "bold"}}>
                                        Attention! Available only for PC!
                                    </p>
                                    <div className={classes.progressBar}><span style={{width: `${progression*100}%`}}></span></div>
                                    <p>Loading {progression * 100}%</p>
                                    <Button active={progression == 1 ? true : false} style={{}} buttonType="middleBtn" onClick={() => setConfirm(true)}>Next</Button>
                                </div>
                            </div>

                            <Unity  unityContext={unityContext} style={confirm ? {
                                height: "100vh",
                                width: "100vw",
                            } : {display: "none"}}/>
                        </>
                        :
                        <div className={classes.window} style={{width: "90%"}}>
                            <div className={classes.border}>
                                <h4>Warning!</h4>
                                <img className={classes.cornerLeft} src={cornerLeft} alt="Corner Decor"/>
                                <img className={classes.cornerRight} src={cornerRight} alt="Corner Decor"/>
                                <p>
                                    We have developed a small test location, the ABANDONED VILLAGE OF THE GRENLYNS. The location is fully deployed by IC-on-chain. We are conducting research to optimize the loads. We invite our Eimoladians to take part in this small event!
                                </p>
                                <p style={{textTransform: "uppercase", fontWeight: "bold"}}>
                                    Attention! Available only for PC!
                                </p>
                            </div>
                        </div>

                :
                <div className={classes.window} style={{width: "400px", height: "auto"}}>
                    <div className={classes.border} style={{width: "370px"}}>
                        <h4 style={{margin: "15px auto"}}>Warning!</h4>
                        <img className={classes.cornerLeft} src={cornerLeft} alt="Corner Decor"/>
                        <img className={classes.cornerRight} src={cornerRight} alt="Corner Decor"/>
                        <p style={{textTransform: "uppercase", fontWeight: "bold"}}>
                            You have no wrapped character!
                        </p>
                    </div>
                </div>
            }
        </div>
    );
};
