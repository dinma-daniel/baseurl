import {
  AiFillLinkedin,
  AiFillTwitterCircle,
  AiOutlineWhatsApp,
} from "react-icons/ai";
import { FaFacebook, FaReddit } from "react-icons/fa";
import React, { useState } from "react";

import { IoCopyOutline } from "react-icons/io5";
import Toast from "./commons/toast";

interface ShareModalProps {
  username: string;
}

const ShareModal: React.FC<ShareModalProps> = ({ username }) => {
  const [show, setShow] = useState(false);

  const showToast = () => {
    setShow(true);
    setTimeout(() => {
      setShow(false);
    }, 2000);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(
      `https://baseurl.xyz/${username}`
    );
    showToast();
  };

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <Toast show={show} message="Copied to clipboard" />
      <div className="relative flex w-full max-w-lg flex-col space-y-4 rounded-xl border border-gray-300 bg-white p-4 dark:border-border-dark dark:bg-secondary">
        <h3 className="text-3xl font-semibold text-gray-800 dark:text-white">
          Share via
        </h3>
        <div className="flex items-center justify-around gap-2">
          <IoCopyOutline
            size={45}
            onClick={handleCopy}
            className="cursor-pointer text-gray-700 hover:scale-110 dark:text-gray-50"
          />
          <a
            rel="noreferrer"
            href={`https://twitter.com/intent/tweet?url=https%3A%2F%2Fbaseurl-fefdd.web.app%2F${username}`}
            target="_blank"
            className="cursor-pointer text-gray-700 hover:scale-110 dark:text-gray-50"
          >
            <AiFillTwitterCircle size={45} />
          </a>
          <a
            rel="noreferrer"
            href={`https://www.facebook.com/sharer.php?u=https://baseurl.xyz/${username}`}
            target="_blank"
            className="cursor-pointer text-gray-700 hover:scale-110 dark:text-gray-50"
          >
            <FaFacebook size={45} />
          </a>
          <a
            rel="noreferrer"
            href={`https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Fbaseurl-fefdd.web.app%2F${username}`}
            target="_blank"
            className="cursor-pointer text-gray-700 hover:scale-110 dark:text-gray-50"
          >
            <AiFillLinkedin size={45} />
          </a>
          <a
            rel="noreferrer"
            href={`https://www.reddit.com/submit?url=https%3A%2F%2Fbaseurl-fefdd.web.app%2F${username}`}
            target="_blank"
            className="cursor-pointer text-gray-700 hover:scale-110 dark:text-gray-50"
          >
            <FaReddit size={45} />
          </a>
          <a
            rel="noreferrer"
            href={`https://api.whatsapp.com/send?text=https://baseurl.xyz/${username}`}
            target="_blank"
            className="cursor-pointer text-gray-700 hover:scale-110 dark:text-gray-50"
          >
            <AiOutlineWhatsApp size={45} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
