import React, { useEffect, useState } from "react";
import Unity, { UnityContext } from "react-unity-webgl";
import classes from "./Play.module.css";
import bg from "../../../media/bgAccount.png";
import { getAddress, clipboardCopy } from "./../../../utils/utils";
import { MenuBar } from "../../Blocks/MenuBar/MenuBar";
import { Button } from "../../UI/Button/Button";
import { NFT } from "../../UI/NFT/NFT";
import { NFTs } from "../..//Blocks/NFTs/NFTs";
import { Actor, HttpAgent } from "@dfinity/agent";
import { AuthClient } from "@dfinity/auth-client";
import kernelDid from "../../../utils/candid/kernel.did";
import { Registration } from "./Registration/Registration";
import { TextField } from "@mui/material";
import dwarvesDid from "../../../utils/candid/dwarves.did";
import { canisters, ICcanister, tokenCanisters } from "./../../../canisters";
import { fromHexString, principalToAccountIdentifier, tokenIdentifier } from "./../../../utils/utils";
import { Null } from "@dfinity/agent/lib/cjs/idl";
import { ModalWindow } from "../../UI/ModalWindow/ModalWindow";
import cornerLeft from "./cornerDecorLeft.png";
import cornerRight from "./cornerDecorRight.png";
import copy from "./copy.png";
import loader from "../../../media/loader.gif";

const saveProgres = async (accountInGame, callback) => {
  const authClient = await AuthClient.create({
    _storage: localStorage.getItem("ic-delegation"),
  });

  const agent = new HttpAgent({
    host: "https://ic0.app",
    identity: authClient.getIdentity(),
  });
  const actor = Actor.createActor(kernelDid, {
    agent: agent,
    canisterId: "ylwtf-viaaa-aaaan-qaddq-cai",
  });

  if (accountInGame) {
    const args = {
      aid: JSON.parse(accountInGame).aid,
      chainmail: JSON.parse(accountInGame).chainmail,
      dialog_count: Number(JSON.parse(accountInGame).dialog_count),
      body: JSON.parse(accountInGame).body,
      head: JSON.parse(accountInGame).head,
      cloak: JSON.parse(accountInGame).cloak,
      name: JSON.parse(accountInGame).name,
      armbands: JSON.parse(accountInGame).armbands,
      experience: Number(JSON.parse(accountInGame).experience),
      shoulder: JSON.parse(accountInGame).shoulder,
      questStep: Number(JSON.parse(accountInGame).questStep),
      gloves: JSON.parse(accountInGame).gloves,
      boots: JSON.parse(accountInGame).boots,
      charId: JSON.parse(accountInGame).charId,
      pants: JSON.parse(accountInGame).pants,
      recipe: JSON.parse(accountInGame).recipe,
    };
    actor.saveProgress(args).then((data) => {
      callback(data);
    });
  }
};

const getTokenInfo = async (collection, tid, callback) => {
  const authClient = await AuthClient.create({
    _storage: localStorage.getItem("ic-delegation"),
  });

  const agent = new HttpAgent({
    host: "https://ic0.app",
    identity: authClient.getIdentity(),
  });

  const actor = Actor.createActor(kernelDid, {
    agent: agent,
    //test canister
    canisterId: "ylwtf-viaaa-aaaan-qaddq-cai",
  });
  const args = {};
  args[collection] = tid;
  await actor.getTokenInfoRare(args).then((data) => {
    callback(data);
  });
};

const getSigned = async (tid, callback) => {
  const authClient = await AuthClient.create({
    _storage: localStorage.getItem("ic-delegation"),
  });

  const agent = new HttpAgent({
    host: "https://ic0.app",
    identity: authClient.getIdentity(),
  });
  const actor = Actor.createActor(kernelDid, {
    agent: agent,
    canisterId: "ylwtf-viaaa-aaaan-qaddq-cai",
  });

  actor.getSigned(tid).then((data) => {
    callback(data);
  });
};

const getAllSignedAccounts = async (nfts, callback) => {
  // console.log(nfts)
  const authClient = await AuthClient.create({
    _storage: localStorage.getItem("ic-delegation"),
  });

  const agent = new HttpAgent({
    host: "https://ic0.app",
    identity: authClient.getIdentity(),
  });

  let fb = {};

  const actor = Actor.createActor(dwarvesDid, {
    agent: agent,
    canisterId: canisters["dwarves"],
  });

  await actor.tokens_ext(principalToAccountIdentifier(authClient.getIdentity().getPrincipal().toText(), 0)).then(async (data) => {
    //console.log(data)
    if (data && data.ok) {
      for (let i = 0; i < data.ok.length; i++) {
        await getSigned(tokenIdentifier(canisters["dwarves"], data.ok[i][0]), (dataSinged) => {
          //console.log(dataSinged)
          if (dataSinged.length != 0) {
            getTokenInfo("dwarves", dataSinged[0].tid, (dataTokenInfo) => {
              //console.log(dataTokenInfo.tokenInfo[Object.keys(dataTokenInfo.tokenInfo)[0]][0]['rase']) //dwarves
              //console.log(dataTokenInfo.tokenInfo[Object.keys(dataTokenInfo.tokenInfo)[0]][0])

              //console.log()
              let nft = {
                name: dataSinged[0].name,
                type: "character",
                index: data.ok[i][0],
                collection: "dwarves",
                rare: dataTokenInfo.tokenRarity[0],
                metadata: dataTokenInfo.tokenInfo[Object.keys(dataTokenInfo.tokenInfo)[0]][0],
              };
              fb[tokenIdentifier(dataTokenInfo.tokenInfo[Object.keys(dataTokenInfo.tokenInfo)[0]][0].ledgerCanister, data.ok[i][0])] = nft;

              //console.log(nft)
              if (JSON.stringify(fb) !== nfts) {
                callback(fb);
              } else {
                callback(null);
              }
            });
          }
        });
      }
    }
  });
  //console.log(fb)
  if (JSON.stringify(fb) !== nfts) {
    callback(fb);
  } else {
    callback(null);
  }
};

const unityContext = new UnityContext({
  loaderUrl: "./webgl/build/eimolad.loader.js",
  dataUrl: "./webgl/build/eimolad.data",
  frameworkUrl: "./webgl/build/eimolad.framework.js",
  codeUrl: "./webgl/build/eimolad.wasm",
});

function Mess(message) {
  unityContext.send("Canvas_Game", "Text_Message", message);
}

const startGame = async (selectedNFTs, callback) => {
  const authClient = await AuthClient.create({
    _storage: localStorage.getItem("ic-delegation"),
  });

  const agent = new HttpAgent({
    host: "https://ic0.app",
    identity: authClient.getIdentity(),
  });

  const actor = Actor.createActor(kernelDid, {
    agent: agent,
    canisterId: "ylwtf-viaaa-aaaan-qaddq-cai",
  });

  let tidCharacter;

  for (let tid in JSON.parse(selectedNFTs)) {
    if (JSON.parse(selectedNFTs)[tid].type == "character") tidCharacter = tid;
  }

  actor.startGame(tidCharacter).then((data) => {
    callback(data);
  });
};

export const Play = ({ address, setAddress, nfts, setTask, signedAccounts, setSignedAccounts, unsignedNFTs, setUnsignedNFTs }) => {
  if (address === null) {
    if (localStorage.getItem("ic-delegation")) {
      getAddress((addr) => setAddress(addr));
    } else {
      window.location.assign("/");
    }
  }

  const [play, setPlay] = useState(true);
  const [NFTsOwned, setNFTsOwned] = useState([]);

  const [clickedMenu, setClickedMenu] = useState(false);
  const [copied, setCopied] = useState(false);

  const [filt, setFilt] = useState(JSON.stringify({ tokens: true, dwarves: true, weapons: true }));
  const [selectedNFTs, setSelectedNFTs] = useState(JSON.stringify({}));
  const [selectedWNFTs, setSelectedWNFTs] = useState(JSON.stringify({}));
  const [selectedToken, setSelectedToken] = useState(null);

  const [modal, setModal] = useState(false);
  const [characterCount, setCharacterCount] = useState(0);
  const [weaponCount, setWeaponCount] = useState(0);
  const [startGameData, setStartGameData] = useState("empty data");
  const [modalWindow, setModalWindow] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [wait, setWait] = useState(false);
  const [progression, setProgression] = useState(0);
  const [confirm, setConfirm] = useState(false);

  const [accountIsRegistered, setAccountIsRegistered] = useState(false);

  // const [signedAccounts,setSignedAccounts] = useState(null)

  // if (address && signedAccounts === null && refresh) {
  //   getAllSignedAccounts(signedAccounts, (data) => {
  //     //console.log(data);
  //     if (data.length !=0) {
  //       setSignedAccounts(JSON.stringify(data));
  //       // setRefresh(false);
  //     }
  //   });
  // }
  console.log(signedAccounts);
  // useEffect(() => {
  //   getAllSignedAccounts(signedAccounts, (data) => {
  //     //console.log(data);
  //     if (data !== null && data.length != 0) {
  //       setSignedAccounts(JSON.stringify(data));
  //       // setRefresh(false);
  //     }
  //   });
  // }, []);

  // useEffect(() => {
  //   setTimeout(() => {
  //     getAllUnsignedAccounts(unsignedNFTs, (data) => {
  //       // console.log(Object.keys(data).length)
  //       if (data!={} && data!=null && data )  {
  //           setUnsignedNFTs(JSON.stringify(data));
  //           setRefresh(false);
  //         }
  //       setRefresh(!refresh);
  //     });
  //   }, 10000);
  // }, [refresh]);

  if (accountIsRegistered) {
    setAccountIsRegistered(false);
    getAllSignedAccounts(signedAccounts, (data) => {
      //console.log(data);
      if (data !== null && data.length != 0) {
        setSignedAccounts(JSON.stringify(data));
      }
    });
  }

  useEffect(function () {
    unityContext.on("Info_Player", function (data) {
      console.log(data);
      if (data != "player?") {
        console.log(JSON.parse(data));
        saveProgres(data, (savedData) => {
          console.log(savedData);
          if (savedData.ok == "successful LGS transfer!") {
            let updatedData = JSON.parse(data);
            updatedData.recipe = "true";
            Mess(JSON.stringify(updatedData));
          }
        });
      }
      if (data == "player?") {
        console.log(startGameData);
        Mess(startGameData);
      }
    });
    return function () {
      //unityContext.removeEventListener("Info_Player");
    };
  });

  useEffect(function () {
    unityContext.on("progress", function (progression) {
      setProgression(progression);
    });
  }, []);

  return (
    <div className={classes.root} style={{ backgroundImage: `url(${bg})` }}>
      {play ? (
        address ? (
          <>
            <ModalWindow active={modalWindow} setActive={setModalWindow}>
              <h2>Account successfully registered</h2>
            </ModalWindow>

            <ModalWindow active={errorModal} setActive={setErrorModal}>
              <h2 style={{ color: "red" }}>ERROR</h2>
              <p>Please make sure your character is wrapped</p>
            </ModalWindow>

            <Registration
              address={address}
              nfts={nfts}
              unsignedNFTs={unsignedNFTs}
              setUnsignedNFTs={setUnsignedNFTs}
              setAccountIsRegistered={setAccountIsRegistered}
              active={modal}
              setActive={setModal}
              setModalWindow={setModalWindow}
            ></Registration>
            <MenuBar address={address} clicked={clickedMenu} setClicked={setClickedMenu} curLink="Play" setTask={setTask}>
              <div className={classes.buttons}>
                <Button
                  active={true}
                  style={{}}
                  buttonType="middleBtn"
                  onClick={() => {
                    setModal(true);
                  }}
                >
                  Create account
                </Button>
                {characterCount == 1 ? (
                  <Button
                    active={true}
                    style={{}}
                    buttonType="middleBtn"
                    onClick={() => {
                      setWait(true);
                      startGame(selectedNFTs, (data) => {
                        console.log(data.ok);
                        if (data.ok) {
                          let gameData = data.ok;
                          setStartGameData(JSON.stringify(gameData, (_, v) => (typeof v === "bigint" ? v.toString() : v)));
                          setPlay(false);
                        } else {
                          setWait(false)
                          setErrorModal(true);
                        }
                      });
                    }}
                  >
                    Play
                  </Button>
                ) : (
                  <Button active={false} style={{}} buttonType="middleBtn">
                    Play
                  </Button>
                )}
                <div
                  className={classes.address}
                  onClick={() => {
                    clipboardCopy(address);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 1000);
                  }}
                >
                  {copied ? <div>Copied</div> : null}
                  <img src={copy} alt="Copy address" />
                  {address.substr(0, 6) + "..." + address.substr(58, 64)}
                </div>
              </div>
            </MenuBar>
            <div>
              <h2 className={classes.depth} title="Select your account">
                Select your account
              </h2>
            </div>

            {wait ? (
              <div className={classes.wait}>
                <img src={loader} alt="Wait" />
              </div>
            ) : null}

            <NFTs
              page={"play"}
              setWeaponCount={setWeaponCount}
              setCharacterCount={setCharacterCount}
              weaponCount={weaponCount}
              characterCount={characterCount}
              accounts={NFTsOwned}
              address={address}
              nfts={signedAccounts}
              filt={filt}
              selected={selectedNFTs}
              setSelected={setSelectedNFTs}
              setSelectedToken={setSelectedToken}
              selectedWNFTs={selectedWNFTs}
              setSelectedWNFTs={setSelectedWNFTs}
            />
          </>
        ) : (
          <></>
        ) 
      ) : (
        <>
          {window.screen.width >= 1100 ? (
            <>
              <div className={classes.window} style={confirm ? { display: "none" } : { display: "flex" }}>
                <div className={classes.border}>
                  <h4>Warning!</h4>
                  <img className={classes.cornerLeft} src={cornerLeft} alt="Corner Decor" />
                  <img className={classes.cornerRight} src={cornerRight} alt="Corner Decor" />
                  <p>
                    The World of Eimolad is still being developed and expanded. There may be some inconveniences and obstacles. We hope for your
                    understanding.
                  </p>
                  <p style={{ textTransform: "uppercase", fontWeight: "bold" }}>Attention! Available only for PC!</p>
                  <div className={classes.progressBar}>
                    <span style={{ width: `${progression * 100}%` }}></span>
                  </div>
                  <p>Loading {progression.toFixed(2) * 100}%</p>
                  <Button active={progression == 1 ? true : false} style={{}} buttonType="middleBtn" onClick={() => setConfirm(true)}>
                    Next
                  </Button>
                </div>
              </div>

              <Unity
                unityContext={unityContext}
                style={
                  confirm
                    ? {
                        height: "100vh",
                        width: "100vw",
                      }
                    : { display: "none" }
                }
              />
            </>
          ) : (
            <>
              <div className={classes.window} style={{ width: "90%" }}>
                <div className={classes.border}>
                  <h4>Warning!</h4>
                  <img className={classes.cornerLeft} src={cornerLeft} alt="Corner Decor" />
                  <img className={classes.cornerRight} src={cornerRight} alt="Corner Decor" />
                  <p>
                    The World of Eimolad is still being developed and expanded. There may be some inconveniences and obstacles. We hope for your
                    understanding.
                  </p>
                  <p style={{ textTransform: "uppercase", fontWeight: "bold" }}>Attention! Available only for PC!</p>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};
