import React, { useEffect, useState } from "react";

import InputField from "./commons/inputField";
import { Switch } from "@headlessui/react";
import { useAdmin } from "../context/adminContext";

const SocialIconCard: React.FC = () => {
  const { state, dispatch } = useAdmin();
  const { web2Socials, web3Socials } = state;
  console.log("🚀 ~ web3Socials:", web3Socials)
  console.log("🚀 ~ web2Socials:", web2Socials)
  const [isWeb3, setIsWeb3] = useState(false);



  const handleSocialChange = (type: 'web2' | 'web3', field: string, value: string) => {
    dispatch({
      type: "field",
      field: type === 'web2' ? "web2Socials" : "web3Socials",
      value: { ...state[`${type}Socials`], [field]: value },
    });
  };

  return (
    <div className="flex w-full flex-col items-center space-y-4 rounded-3xl border border-gray-600 bg-white p-5 dark:bg-zinc-800 mt-5">
      <span className="font-nunito text-xl text-gray-800 dark:text-white">
        Social Icons
      </span>
      <Switch
        checked={isWeb3}
        onChange={setIsWeb3}
        className={`${isWeb3 ? 'bg-blue-600' : 'bg-gray-200'} relative inline-flex h-6 w-11 items-center rounded-full`}
      >
        <span className="sr-only">Enable Web3 socials</span>
        <span
          className={`${isWeb3 ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition`}
        />
      </Switch>
      <span className="font-nunito text-sm text-gray-600 dark:text-gray-300">
        {isWeb3 ? 'Web3 Socials' : 'Web2 Socials'}
      </span>
      {isWeb3 ? (
        Object.entries(web3Socials).map(([key, value]) => (
          <InputField
            key={key}
            label={`${key} handle`}
            value={value}
            onChange={(e) => handleSocialChange('web3', key, e.target.value)}
          />
        ))
      ) : (
        Object.entries(web2Socials).map(([key, value]) => (
          <InputField
            key={key}
            label={`${key} handle`}
            value={value}
            onChange={(e) => handleSocialChange('web2', key, e.target.value)}
          />
        ))
      )}
    </div>
  );
};

export default SocialIconCard;
