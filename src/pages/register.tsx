import * as ROUTES from "../constants/routes";

import { Link, useNavigate } from "react-router-dom";
import { initialState, registerReducer } from "../reducers/registerReducer";
import { useAccount, useConnect, useDisconnect, useSignMessage } from 'wagmi';
import { useEffect, useReducer, useState } from "react";

import { ConnectButton } from '../components/Wallets';
import Header from "../components/header";
import React from "react";
import { useAuth } from "../context/authContext";
import { useFirestore } from "../context/firestoreContext";
import { useHeader } from "../context/headerContext";

export default function Register() {
  const { setCustomHeader } = useHeader();
  const { signup, signUpOrLoginWithWallet } = useAuth();
  const { createUser, getUserDoc } = useFirestore();
  const navigate = useNavigate();
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [usernameError, setUsernameError] = useState('');

  const [state, dispatch] = useReducer(registerReducer, initialState);
  const { username, email, password, error, loading } = state;
  const [walletError, setWalletError] = useState('');

  const invalid = email === "" || password === "";

  const checkWalletExists = async (walletAddress: string) => {
    const walletDoc = await getUserDoc(walletAddress);
    return !!walletDoc;
  };

  const handleSignUp = async (event: React.FormEvent) => {
    event.preventDefault();
    dispatch({ type: "register" });

    if (!validateUsername(username)) {
      return;
    }
    
    const usernameTaken = await getUserDoc(username);

    if (!usernameTaken) {
      try {
        const { user } = await signup(email, password);
        await createUser(user);
        dispatch({ type: "success" });
        navigate(ROUTES.ADMIN);
      } catch (error: any) {
        const message = error.message
          .split(/(?<=\/)(.*?)(?=\))/gm)[1]
          .replace(/-/g, " ");
        dispatch({
          type: "error",
          error: message,
        });
      }
    } else {
      dispatch({ type: "error", error: "username already taken" });
    }
  };

  const handleWalletSignUp = async () => {
    if (!isConnected || !address) {
      setWalletError('Please connect your wallet first');
      return;
    }
    try {
      const message = `Sign this message to create an account: ${Date.now()}`;
      await signMessageAsync({ message });
      await signUpOrLoginWithWallet(address);
      navigate(ROUTES.ADMIN);
    } catch (error) {
      setWalletError('Failed to create account with wallet');
    }
  };

  const validateUsername = (value: string) => {
    const regex = /^[a-zA-Z0-9_]{3,30}$/;
    if (!regex.test(value)) {
      setUsernameError('Username must be 3-30 characters long and can only contain letters, numbers, and underscores.');
      return false;
    }
    setUsernameError('');
    return true;
  };
  
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch({ type: "field", field: "username", value });
    validateUsername(value);
  };
  

  useEffect(() => {
    setCustomHeader(null);
  }, [setCustomHeader]);

  return (
    <div className="h-full w-full bg-gray-200 dark:bg-zinc-900">
      <Header />
      <div className="flex h-screen w-full flex-col items-center justify-center p-4 lg:p-10">
        <div className="flex w-full max-w-lg flex-col items-center justify-center space-y-4 rounded-3xl border border-gray-600 bg-white p-4 font-nunito dark:bg-zinc-800 lg:p-10">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Create your baseurl account
          </h1>
          
          {/* Email/Password Registration Section */}
          <form className="w-full space-y-4">
            <p className="font-nunito text-base font-semibold text-rose-400">
              {error}
            </p>
            {/* <div className="flex items-center space-x-1 rounded-md bg-gray-200 px-4 dark:bg-primary">
              <span className="font-nunito font-semibold text-gray-800 dark:text-white">
                baseurl.xyz/
              </span>
              <input
                      value={username}
                      onChange={handleUsernameChange}
                      className="bg-gray-200 p-4 text-gray-800 outline-none dark:bg-primary dark:text-white"
                      placeholder="yourname"
                    />
                  </div>
                  {usernameError && (
                        <p className="text-sm font-semibold text-rose-400">{usernameError}</p>
                  )} */}
            <input
              value={email}
              onChange={(e) => dispatch({ type: "field", field: "email", value: e.target.value })}
              type="email"
              className="w-full rounded-full bg-gray-200 p-4 text-gray-800 outline-none dark:bg-zinc-900 dark:text-white"
              placeholder="Email"
            />
            <input
              value={password}
              onChange={(e) => dispatch({ type: "field", field: "password", value: e.target.value })}
              type="password"
              className="w-full rounded-full bg-gray-200 p-4 text-gray-800 outline-none dark:bg-zinc-900 dark:text-white"
              placeholder="Password"
            />
            <button
              disabled={invalid || loading}
              onClick={handleSignUp}
              className={`w-full rounded-full px-4 py-2 font-nunito font-bold text-white ${
                invalid ? "bg-gray-400 dark:bg-gray-800" : "bg-orange-600 hover:bg-orange-500"
              } ${loading && "animate-pulse"}`}
            >
              Sign Up with Email
            </button>
          </form>

          <div className="flex w-full items-center">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-4 flex-shrink text-gray-600">Or</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          {/* Wallet Connection Section */}
          <div className="w-full space-y-4">
            <p className="text-center text-sm text-gray-600 dark:text-gray-400">
              Connect your wallet  Below
            </p>
            <div className="flex justify-center">
    <div className="transform transition-transform duration-100 hover:scale-105 active:scale-95">
      <div className="rounded-full hover:shadow-lg bg-purple-600">
        <ConnectButton />
      </div>
    </div>
  </div>
            {walletError && (
              <p className="text-center text-sm font-semibold text-rose-400">{walletError}</p>
            )}
            {isConnected && (
              <button
                onClick={handleWalletSignUp}
                className="w-full rounded-md bg-primary-accent px-4 py-2 font-nunito font-bold text-white hover:bg-secondary-accent"
              >
                Log In with Wallet
              </button>
            )}
          </div>

          <Link
            to={ROUTES.LOGIN}
            className="mt-6 font-nunito text-lg font-semibold text-gray-600 hover:underline dark:text-gray-300"
          >
            Already on baseurl? Log In
          </Link>
        </div>
      </div>
    </div>
  );
}
