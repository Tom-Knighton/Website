/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useContext } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import React, { useState } from "react";
import useUser from "../lib/useUser";
import { useSelector } from "react-redux";
import { StoreState } from "../reducers";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function NavBar({ page }: { page: string }) {

  const appStore = useSelector((state: StoreState) => state.app);
  const { currentChatUUID, currentChat, currentUser, latestChatMessage } =
    appStore;
  const [navigation, setNavigation] = useState([
    { name: "Profile", href: "/", current: page === "Home" },
    { name: "Feed", href: "/feed", current: page === "Feed" },
    { name: "Chat", href: "/chat", current: page === "Chat" },
    {
      name: "Team Hub (Coming Soon!)",
      href: "#",
      current: false,
      disabled: true,
    },
    { name: "Games (Coming Soon!)", href: "#", current: false, disabled: true },
  ]);

  function setCurrent(name: string) {
    let links = [...navigation];
    links.forEach((e) => (e.current = false));
    links.find((e) => e.name === name).current = true;
    setNavigation(links);
  }

  return (
    <Disclosure as="nav" className="bg-gray-800" id="navbarcont">
      {({ open }) => (
        <>
          <div
            className="max-w-7xl mx-auto px-2 md:px-6 lg:px-8"
            id="navbarcont"
          >
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-center md:items-stretch md:justify-start">
                <div className="flex-shrink-0 flex items-center">
                  <img
                    className="block md:hidden h-8 w-auto rounded-md"
                    src="https://cdn.tomk.online/GaryPortal/AppLogo.png"
                    alt="Workflow"
                  />
                  <img
                    className="hidden md:block h-8 w-auto rounded-md"
                    src="https://cdn.tomk.online/GaryPortal/AppLogo.png"
                    alt="Workflow"
                  />
                  <p className="px-5 text-lg font-bold text-white">
                    Gary Portal{" "}
                  </p>
                </div>
                <div className="hidden md:block md:ml-6">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={`${classNames(
                          item.current
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "px-3 py-2 rounded-md text-sm font-regular self-center"
                        )} ${
                          item.disabled
                            ? "cursor-not-allowed opacity-50"
                            : "cursor-pointer"
                        }`}
                        aria-current={item.current ? "page" : undefined}
                        onClick={() => {
                          setCurrent(item.name);
                        }}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 md:static md:inset-auto md:ml-6 md:pr-0">
                {/* Profile dropdown */}
                <Menu as="div" className="ml-3 relative">
                  {({ open }) => (
                    <>
                      <div>
                        <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                          <span className="sr-only">Open user menu</span>
                          <img
                            className="h-8 w-8 rounded-full"
                            src={currentUser?.userProfileImageUrl}
                            alt=""
                          />
                        </Menu.Button>
                      </div>
                      <Transition
                        show={open}
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items
                          static
                          className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                        >
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="#"
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                Your Profile {currentUser?.userName}
                              </a>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="#"
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                Settings
                              </a>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="#"
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                Sign out
                              </a>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </>
                  )}
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`${classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block px-3 py-2 rounded-md text-base font-medium"
                  )} ${
                    item.disabled
                      ? "cursor-not-allowed opacity-50"
                      : "cursor-pointer"
                  }`}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
