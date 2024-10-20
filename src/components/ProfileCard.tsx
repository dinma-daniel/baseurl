import React, { useEffect } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

import { BsPersonFill } from "react-icons/bs";
import InputFieldSimple from "./commons/inputFieldSimple";
import { useAdmin } from "../context/adminContext";
import { useFirestore } from "../context/firestoreContext";

const ProfileCard: React.FC = () => {
  const { userData, updateProfile, storage } = useFirestore();
  const { state, dispatch } = useAdmin();
  const { imgFile, imgSrc, profileName, about, loading } = state;

  const handleFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (event.target.files) {
      dispatch({ type: "field", field: "imgFile", value: event.target.files[0] });
    }
  };

  const handleCancel = () => {
    if (userData) {
      dispatch({ type: "field", field: "imgSrc", value: userData.page.imgSrc });
      dispatch({ type: "field", field: "imgFile", value: null });
    }
  };

  const handleRemove = async () => {
    if (userData) {
      dispatch({ type: "field", field: "imgSrc", value: null });
      await updateProfile(userData.userId, {
        page: { ...userData.page, imgSrc: null },
      });
    }
  };

  const handleUpload = () => {
    dispatch({ type: "update" });

    if (imgFile && userData) {
      const imgFileStorageRef = ref(storage, `users/${userData.username}`);
      const imgFileUploadTask = uploadBytesResumable(imgFileStorageRef, imgFile);

      imgFileUploadTask.on(
        "state_changed",
        (snapshot) => {
          // progress
        },
        (error) => {
          console.log((error as Error).message);
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(imgFileUploadTask.snapshot.ref);
            await updateProfile(userData.userId, {
              page: { ...userData.page, imgSrc: downloadURL },
            });
            dispatch({ type: "success" });
          } catch (error) {
            dispatch({ type: "error", error: (error as Error).message });
          }
        }
      );
    }
  };

  useEffect(() => {
    if (imgFile) {
      const reader = new FileReader();
      reader.onload = function (e) {
        dispatch({ type: "field", field: "imgSrc", value: e.target?.result });
      };
      reader.readAsDataURL(imgFile);
    }
  }, [imgFile]);

  return (
    <div className="mt-2 flex w-full flex-col items-center space-y-4 rounded-3xl border border-gray-600 bg-white p-10 pt-2 dark:bg-zinc-800">
      <div className="mt-4 flex w-full flex-col items-center justify-around space-x-4 space-y-2 lg:flex-row">
        {imgSrc ? (
          <img
            src={imgSrc}
            alt=""
            className="h-32 w-32 rounded-full border border-gray-300 object-cover dark:border-border-dark"
          />
        ) : (
          <div className="h-32 w-32 rounded-full border border-gray-300 p-6 dark:border-border-dark">
            <BsPersonFill className="h-full w-full text-gray-400" />
          </div>
        )}
        <div className="flex flex-1 items-center justify-center space-x-1">
          {imgFile ? (
            <>
              <button
                onClick={handleCancel}
                className="w-full rounded-xl bg-primary-accent px-5 py-2 text-center text-sm font-medium text-white hover:bg-secondary-accent"
              >
                Cancel
              </button>
              <button
                onClick={handleUpload}
                className="w-full rounded-xl bg-primary-accent px-5 py-2 text-center text-sm font-medium text-white hover:bg-secondary-accent"
              >
                {loading ? "Uploading" : "Upload"}
              </button>
            </>
          ) : (
            <>
              <button
                disabled={!imgSrc}
                onClick={handleRemove}
                className="w-full rounded-full bg-orange-600 px-5 py-3 text-center text-sm font-medium text-white hover:bg-orange-500"
              >
                Remove
              </button>
              <label className="w-full cursor-pointer rounded-full bg-orange-600 px-5 py-3 text-center text-sm font-medium text-white hover:bg-orange-500">
                Change
                <input
                  className="hidden"
                  aria-label="profile pic"
                  type="file"
                  accept="image/png, image/jpeg"
                  onChange={handleFile}
                />
              </label>
            </>
          )}
        </div>
      </div>
      <div className="w-full space-y-1">
        <InputFieldSimple
          label="Profile Title"
          value={profileName}
          onChange={(e) =>
            dispatch({
              type: "field",
              field: "profileName",
              value: e.target.value,
            })
          }
          placeholder="@yourname"
        />
      </div>
      <div className="w-full space-y-1">
        <label className="font-nunito text-sm text-gray-800 dark:text-white">
          Profile Description
        </label>
        <textarea
          value={about}
          onChange={(e) =>
            dispatch({
              type: "field",
              field: "about",
              value: e.target.value,
            })
          }
          className="w-full rounded-xl bg-zinc-200 p-2 px-4 text-gray-800 outline-none dark:bg-zinc-900 dark:text-white"
          placeholder="Bio"
        ></textarea>
      </div>
    </div>
  );
};

export default ProfileCard;
