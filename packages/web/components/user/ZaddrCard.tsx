'use client'
import React, {useState, useEffect} from "react";
// import {copyTextToClipboard } from "../utils/copy";
import QRCode from "@/components/ui/qrcode";
import { useTheme } from "next-themes"
// import {Link} from "react-router-dom"

const copyTextToClipboard = async (text: string) => {
  if (!navigator.clipboard) {
    return;
  }
  return await navigator.clipboard.writeText(text);
}


import proofactive from "@/public/icons/proof-active.png";
import proofinactive from "@/public/icons/proof-inactive.png";
import twitteractive from "@/public/icons/twitter-active.png";
import twitterinactive from "@/public/icons/twitter-inactive.png";
import websiteactive from "@/public/icons/website-active.png";
import websiteinactive  from "@/public/icons/website-inactive.png";
import emailactive from "@/public/icons/email-active.png";
import emailinactive from "@/public/icons/email-inactive.png";
import qricon from "@/public/icons/qr.png"
import qrdark from "@/public/icons/qrdark.png"

// import {UserContext} from "../contexts/UserContext"
import Link from "next/link";
import Image from "next/image";
import EllipsisBoxWrapper from "../ellipsis-box";
import { Icons } from "../icons";

export default function ZaddrCard ({user, copied, setCopied}: any) {
    const [httpsString, setHttpsString] = useState("");
    const [proofHttps, setProofHttps] = useState("");
    const [qrVis, setQrVis] = useState(false);
    const theme = useTheme();
    const darkMode = theme.theme === 'dark';
    // const {darkMode} = React.useContext(UserContext)
    
    useEffect(() => {
        if (user.website && !user.website.includes("http")) {
            setHttpsString("https://")
        }
        if (user.proofposturl && !user.proofposturl.includes("http")) {
            setProofHttps("https://")
        }
    },[user.website, user.proofposturl])

    const handleCopy = (zaddr: string, id: string) => {
        copyTextToClipboard(zaddr)
        // setCopied(user.id)
    }
    const regex = /^(https?:\/\/)?(www\.)?(x\.com|twitter\.com)(\/)?/;
      
    return(
        <div
          className="flex flex-col w-[80%] text-center bg-card my-[1%] mx-[auto] p-4 text-black dark:text-white border border-black dark:border-[#00FF7F]"
        >
            <Link href={`/${user.username}`}><h2 className="username-link text-[22px]">{user.username}</h2></Link>
            {user.description ? <p className="user-description">{user.description}</p> : null }
            <div className="card-top-row">
              {user.zaddr && (
                <div className="flex row bg-gradient dark:bg-gradient-dark w-full p-3 py-2 my-3">
                  <div className="w-full">
                    <div className="text-black">
                      <EllipsisBoxWrapper text={user.zaddr} offset={12} />
                    </div>
                  </div>
                  <Icons.miniQrCode className="ml-3 text-black" />
                  <Icons.miniCopy onClick={() => handleCopy(user.zaddr, user.id)} className="ml-2 text-primary" style={{ filter: 'drop-shadow(1px 1px 0px rgba(0, 0, 0, .7))' }} />
                </div>
              )}
            </div>
            {!qrVis 
                ? null 
                : <QRCode bgColor={darkMode ? "#111111" : '#0a5e55'} fgColor={darkMode ? "#087f73" : '#bec0fe'} includeMargin={true} size={256} value={`zcash:${user.zaddr}?amount=0.001`} />}
            <div className="card-bottom-row flex flex-row justify-between py-5 px-8">              
                {user.proofposturl ? <a className="w-[40px]" target="_new" href={`${proofHttps}${user.proofposturl}`}><Image alt="green check mark" src={darkMode ? proofinactive :proofactive} /></a> : <Image className="w-[40px]" alt="white check mark" src={darkMode ? proofactive : proofinactive} />}
                {user.website ? <a className="w-[40px]" target="_new" href={`${httpsString}${user.website}`}><Image alt="dark connected world" src={darkMode ? websiteinactive :websiteactive} /></a> : <Image className="w-[40px]" alt="light connected world" src={darkMode ? websiteactive : websiteinactive} />}
                {user.twitter ? <a className="w-[40px]" target="_new" href={`https://x.com/${user.twitter.replace(regex, '')}`}><Image alt="dark twitter logo" src={darkMode ? twitterinactive :twitteractive} /></a> : <Image className="w-[40px]" alt="light twitter logo" src={darkMode ? twitteractive : twitterinactive} />}
                {user.email ? <a className="w-[40px]" href={`mailto:${user.email}`}><Image alt="dark envelope" src={darkMode ? emailinactive : emailactive} /></a> : <Image className="w-[40px]" alt="light envelope" src={darkMode ? emailactive : emailinactive} />}
                <Image className="w-[40px]" alt="a qr code" src={darkMode ? qrdark : qricon} onClick={_ => setQrVis(!qrVis) } />
            </div>
        </div>
    )
}