import React, { useEffect, useState } from "react";

import { Draggable } from "react-beautiful-dnd";
import { GoTrash } from "react-icons/go";
import { HiOutlinePencil } from "react-icons/hi";
import InputField from "./commons/inputField";
import { MdDragIndicator } from "react-icons/md";
import { Switch } from '@headlessui/react';
import { useAdmin } from "../context/adminContext";

interface LinkCardEditableProps {
  id: number;
  Link: {
    title: string;
    link: string;
    description: string;
    active: boolean;
    linkStyle?: string;
    isWeb3: boolean;
  };
}

export default function LinkCardEditable({ id, Link }: LinkCardEditableProps) {
  const { state, dispatch } = useAdmin();
  const { links } = state;

  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState(Link.title);
  const [link, setLink] = useState(Link.link);
  const [description, setDescription] = useState(Link.description);
  const [active, setActive] = useState(Link.active);
  const [isWeb3, setIsWeb3] = useState(Link.isWeb3);

  const handleEdit = (value: any) => {
    const updatedLinks = [...links];
    updatedLinks[id] = value;
    dispatch({ type: "field", field: "links", value: updatedLinks });
  };

  const handleRemoveLink = () => {
    const updatedLinks = links.filter((_: unknown, index: number) => id !== index);
    dispatch({ type: "field", field: "links", value: updatedLinks });
  };

  const handleSave = () => {
    handleEdit({
      title: title,
      link: link,
      description: description,
      active: active,
      isWeb3: isWeb3,
    });
    setEditMode(false);
  };

  const handleCancel = () => {
    setTitle(Link.title);
    setLink(Link.link);
    setDescription(Link.description);
    setActive(Link.active);
    setIsWeb3(Link.isWeb3);
    setEditMode(false);
  };

  const handleChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    setActive(e.target.checked);
    handleEdit({
      title: title,
      link: link,
      description: description,
      active: e.target.checked,
      isWeb3: isWeb3,
    });
  };

  useEffect(() => {
    if (Link) {
      setTitle(Link.title);
      setLink(Link.link);
      setDescription(Link.description);
      setActive(Link.active);
      setIsWeb3(Link.isWeb3);
    }
  }, [Link]);

  return (
    <Draggable key={Link.title || id} draggableId={Link.title || `${id}`} index={id}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          style={{ ...provided.draggableProps.style }}
          className="flex w-full cursor-pointer items-center justify-between first-of-type:mt-2 last-of-type:mb-2"
        >
          <div
            className={`flex flex-1 rounded-xl border border-gray-300 bg-white dark:border-border-dark dark:bg-secondary ${
              snapshot.isDragging ? "shadow-2xl" : ""
            }`}
          >
            {!editMode ? (
              <>
                <div
                  onClick={() => setEditMode(true)}
                  className={`flex flex-1 items-center justify-center px-4 ${Link.linkStyle}`}
                >
                  <HiOutlinePencil size={25} className="text-gray-400" />
                  <div className="flex flex-1 flex-col items-center justify-center space-y-1 p-2">
                    <p className="text-lg font-bold text-gray-800 dark:text-white">
                      {Link.title}
                    </p>
                    <p className="text-center text-sm font-semibold text-gray-800 dark:text-white">
                      {Link.description}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-around space-y-2 p-2">
                  <label
                    htmlFor={id.toString()}
                    className="flex cursor-pointer items-center"
                  >
                    <div className="relative">
                      <input
                        type="checkbox"
                        id={id.toString()}
                        className="sr-only"
                        checked={active}
                        onChange={handleChecked}
                      />
                      <div className="block h-6 w-10 rounded-full bg-gray-400"></div>
                      <div className="dot absolute left-1 top-1 h-4 w-4 rounded-full bg-white transition"></div>
                    </div>
                  </label>
                  <GoTrash
                    size={25}
                    onClick={handleRemoveLink}
                    className="cursor-pointer text-gray-400"
                  />
                </div>
              </>
            ) : (
              <div className="flex flex-1 flex-col space-y-4 rounded-xl bg-white p-4 dark:bg-secondary">
                <InputField
                  label="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <InputField
                  label="URL"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                />
                <InputField
                  label="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <div className="flex items-center justify-between">
                  <span>Web3 Link</span>
                  <Switch
                    checked={isWeb3}
                    onChange={setIsWeb3}
                    className={`${isWeb3 ? 'bg-blue-600' : 'bg-gray-200'} relative inline-flex h-6 w-11 items-center rounded-full`}
                  >
                    <span className="sr-only">Toggle Web3 Link</span>
                    <span
                      className={`${isWeb3 ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition`}
                    />
                  </Switch>
                </div>
                <div className="flex items-center justify-around space-x-2">
                  <button
                    onClick={handleCancel}
                    className="flex-1 rounded-md bg-primary-accent px-10 py-2 font-inter font-bold text-white hover:bg-secondary-accent"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="flex-1 rounded-md bg-primary-accent px-10 py-2 font-inter font-bold text-white hover:bg-secondary-accent"
                  >
                    Save
                  </button>
                </div>
              </div>
            )}
          </div>
          <div
            {...provided.dragHandleProps}
            className="flex items-center justify-center pl-2"
          >
            <MdDragIndicator size={40} className="text-gray-400" />
          </div>
        </div>
      )}
    </Draggable>
  );
}
