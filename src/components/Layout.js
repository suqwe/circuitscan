import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { isAddress } from 'viem';

export const clsButton = `
  px-4 py-2 mr-4 mb-4 bg-neutral-100 dark:bg-neutral-900 dark:text-white rounded-md
  hover:bg-neutral-200 active:bg-neutral-300
  dark:hover:bg-neutral-800 dark:active:bg-neutral-700
  border border-neutral-300 dark:border-neutral-600
`;

export const clsInput = `
  px-3 py-1 w-full
  bg-neutral-100 dark:bg-neutral-900
  dark:text-white
  border border-neutral-300 dark:border-neutral-600
  rounded-md
`;

export const clsIconA = `
  hover:text-lightaccent active:text-lightaccent
  dark:hover:text-darkaccent dar:active:text-darkaccent
`;


export function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname.toLowerCase();
  const [searchAddress, setSearchAddress] = useState('');

  async function handleSearch(event) {
    event.preventDefault();
    if(!isAddress(searchAddress)) return;
    navigate(`/address/${searchAddress}`);
    setSearchAddress('');
    document.activeElement.blur();
  }

  return (<>
      <Toaster />
      <a
        href="https://explorer.gitcoin.co/#/round/42161/26/22"
        target="_blank"
        rel="noopener"
        className={`
          bg-lightaccent dark:bg-darkaccent
          text-lightbg dark:text-darkbg
          text-center font-bold
          block p-2
        `}>
        Please support Circuitscan on GG20 before May 7th!
      </a>
      <header className={`
        bg-neutral-50 dark:bg-neutral-900
        border-b border-neutral-300 dark:border-neutral-600
        shadow-xl shadow-neutral-200 dark:shadow-neutral-700
        print:shadow-none
      `}>
        <div id="logo" className={`
          px-3 py-2 sm:py-3
          max-w-7xl mx-auto
          flex-col sm:flex-row items-end sm:items-center
          flex justify-between
        `}>
          <div className="w-full">
            <Link to="/">
              <h1 className={`
                sm:pl-12 sm:w-auto py-2 sm:py-0 print:pl-0
                w-full text-2xl text-right sm:text-left
                text-slate-900 dark:text-slate-200
                tracking-tight
              `}>Circuitscan</h1>
            </Link>
          </div>
          <div className="flex space-x-4 place-items-center print:hidden">
            <form onSubmit={handleSearch}>
              <input
                className={`${clsInput} min-w-72 focus:min-w-80 transition-all`}
                type="search"
                value={searchAddress}
                onChange={(e) => setSearchAddress(e.target.value)}
                placeholder="Go to Contract Address..."
              />
            </form>
          </div>
        </div>
      </header>
      <Outlet />
  </>);
}
