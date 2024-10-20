import Page from "./page";
import React from "react";
import { useAdmin } from "../context/adminContext";
import { useFirestore } from "../context/firestoreContext";

interface PreviewProps {
  preview: boolean;
  tippingEnabled: boolean;
}



const Preview: React.FC<PreviewProps> = ({ preview,tippingEnabled }) => {
  const { userData } = useFirestore();
  const { state } = useAdmin();
  const { imgSrc, profileName, about, links, appearance, web2Socials, web3Socials } = state;

  return (
    <div
      className={`${
        preview
          ? "h-full min-h-screen w-full"
          : "fixed top-0 h-[844px] w-[390px] scale-50 p-4 px-3"
      } flex items-center justify-center rounded-3xl bg-gray-400 dark:bg-zinc-800`}
    >
      {!userData ? (
        <div className="shine h-full w-full rounded-3xl"></div>
      ) : (
        <Page
        styleClasses={`w-full h-full pt-10 p-4 flex flex-col items-center space-y-2 overflow-y-auto s_hide ${
          preview ? "" : "rounded-3xl"
        } `}
        username={userData.username}
        imgSrc={imgSrc}
        profileName={profileName}
        about={about}
        links={links}
        appearance={appearance}
        web2Socials={web2Socials}
        web3Socials={web3Socials}
        hasNFT={userData.hasNFT || false}
        tippingEnabled={tippingEnabled}
      />
      )}
    </div>
  );
};

export default Preview;
