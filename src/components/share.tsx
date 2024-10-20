import React, { useState } from "react";

import { FaRegShareSquare } from "react-icons/fa";
import ShareModal from "./shareModal";

interface ShareProps {
  username: string;
}

const Share: React.FC<ShareProps> = ({ username }) => {
  const [showModal, setShowModal] = useState(false);

  const handleShare = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <div className="flex w-full items-center justify-around space-x-2 border-gray-600 bg-white p-2 px-4 dark:bg-zinc-900 lg:rounded-3xl lg:border">
        <a
          href={`https://baseurl.xyz/${username}`}
          className="flex-1 truncate text-sm text-gray-700 hover:underline dark:text-gray-50"
        >{`https://baseurl.xyz/${username}`}</a>

        <FaRegShareSquare
          size={24}
          className="cursor-pointer text-gray-600 dark:text-gray-400"
          onClick={handleShare}
        />
      </div>
      {showModal ? (
        <div
          onClick={() => setShowModal(!showModal)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
        >
          <ShareModal username={username} />
        </div>
      ) : null}
    </>
  );
};

export default Share;
