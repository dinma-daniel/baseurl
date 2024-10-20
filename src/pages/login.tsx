"use client";

import * as ROUTES from '../constants/routes';

import { Link, useNavigate } from 'react-router-dom';
import { initialState, loginReducer } from '../reducers/loginReducer';
import { useAccount, useConnect, useDisconnect, useSignMessage } from 'wagmi';
import { useEffect, useReducer, useState } from 'react';

import { ConnectButton } from '../components/Wallets';
import Header from '../components/header';
import React from 'react';
import { useAuth } from '../context/authContext';
import { useHeader } from '../context/headerContext';

export default function Login() {
  const { setCustomHeader } = useHeader();
  const navigate = useNavigate();
  const { address, isConnected } = useAccount();
  const { connectAsync, connectors } = useConnect();
  const { disconnectAsync } = useDisconnect();
  const { signMessageAsync } = useSignMessage();
  const { login, loginWithWalletAndSetUser, signUpOrLoginWithWallet  } = useAuth();

  const [state, dispatch] = useReducer(loginReducer, initialState);
  const { email, password, error, loading } = state;
  const [walletError, setWalletError] = useState('');


  const invalid = email === '' || password === '';
  const handleWalletLogin = async () => {
    if (!isConnected || !address) {
      setWalletError('Please connect your wallet first');
      return;
    }
    try {
      const message = `Sign this message to log in or create an account: ${Date.now()}`;
      await signMessageAsync({ message });
      await signUpOrLoginWithWallet(address);
      navigate(ROUTES.ADMIN);
    } catch (error) {
      setWalletError('Failed to login or create account with wallet');
    }
  };

  const handleConnect = async () => {
    try {
      if (isConnected) {
        await disconnectAsync();
      }
      const result = await connectAsync({ connector: connectors[0] });
      if (result.accounts) {
        await handleWalletLogin();
      }
    } catch (error) {
      console.error("Failed to connect wallet:", error);
    }
  };

 
  const handleLogIn = async (event: React.FormEvent) => {
    event.preventDefault();
    dispatch({ type: 'login' });
    try {
      await login(email, password);
      navigate(ROUTES.ADMIN);
    } catch (error: any) {
      const message = error.message
        .split(/(?<=\/)(.*?)(?=\))/gm)[1]
        .replace(/-/g, ' ');
      dispatch({ type: 'error', error: message });
    }
  };

 
  useEffect(() => {
    setCustomHeader(null);
    return () => dispatch({ type: 'field', field: 'loading', value: false });
  }, [setCustomHeader]);

  return (
    <div className="h-full w-full bg-gray-200 dark:bg-zinc-900">
      <Header />
      <div className="flex h-screen w-full flex-col items-center justify-center p-4 lg:p-10">
        <div className="flex w-full max-w-lg flex-col items-center justify-center space-y-4 rounded-3xl border border-gray-600 bg-white p-4 font-nunito dark:bg-zinc-800 lg:p-10">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Login to your baseurl account
          </h1>
             {/* Email/Password Login Section */}
             <form className="w-full space-y-4">
            <p className="font-nunito text-base font-semibold text-rose-400">
              {error}
            </p>
            <input
              value={email}
              onChange={(e) => dispatch({ type: 'field', field: 'email', value: e.target.value })}
              type="email"
              className="w-full rounded-full bg-gray-200 p-4 text-gray-800 outline-none dark:bg-zinc-900 dark:text-white"
              placeholder="Email"
            />
            <input
              value={password}
              onChange={(e) => dispatch({ type: 'field', field: 'password', value: e.target.value })}
              type="password"
              className="w-full rounded-full bg-gray-200 p-4 text-gray-800 outline-none dark:bg-zinc-900 dark:text-white"
              placeholder="Password"
            />
            <button
              disabled={invalid || loading}
              onClick={handleLogIn}
              className={`w-full rounded-full px-4 py-2 font-nunito font-bold text-white ${
                invalid ? 'bg-gray-400 dark:bg-gray-800' : 'bg-orange-600 hover:bg-orange-500'
              } ${loading && 'animate-pulse'}`}
            >
              Log In with Email
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
              Connect your wallet to log in or create a new account
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
                onClick={handleWalletLogin}
                className="w-full rounded-md bg-primary-accent px-4 py-2 font-nunito font-bold text-white hover:bg-secondary-accent"
              >
                Login with Wallet
              </button>
            )}
          </div>

          <div className="mt-6 space-y-2 text-center">
            <Link
              to={ROUTES.REGISTER}
              className="block font-nunito text-lg font-semibold text-gray-600 hover:underline dark:text-gray-300"
            >
              Don't have an account? Create one
            </Link>
            <Link
              to={ROUTES.RESET_PASSWORD}
              className="block font-nunito text-sm font-semibold text-gray-600 hover:underline dark:text-gray-300"
            >
              Forgot Password?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );

}
