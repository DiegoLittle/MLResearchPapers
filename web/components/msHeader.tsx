/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from 'react'
import { Menu, Popover, Transition } from '@headlessui/react'
import {
  MenuIcon,
  XIcon,
} from '@heroicons/react/outline'
import { ChevronDownIcon, CogIcon, LibraryIcon, LogoutIcon } from '@heroicons/react/solid'
import Link from 'next/link'
import Image from 'next/image'

import { useSession, signOut } from 'next-auth/react'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
const navigation = [
  {
    name: 'Home',
    href: '/',
    // icon: EmojiHappyIcon,
    // current: false,
  },
  {
    name: 'Search',
    href: '/search',
  },
  {
    name: 'About',
    href: '/about',
  }
]

export default function Header() {
  const { data: session, status } = useSession()
  console.log(session)
  return (
    <Popover className="w-full relative bg-blue-50">

      <div className="flex justify-between items-center px-4 py-6 sm:px-6 md:justify-start md:space-x-10">
        <div>
          <a href="/" className="flex">
            <span className="font-semibold text-xl ">ML Research Papers</span>
            {/* <img
              className="w-auto h-8"
              src="/logo-cropped.svg"
              alt=""
            /> */}
          </a>
          {navigation.map((link) =>
            <a href={link.href} className="md:hidden text-base font-medium text-black hover:text-gray-900 mx-4">
              {link.name}
            </a>
          )}
        </div>
        {session ? <>
            <Menu as="div" className="md:hidden ml-4 relative flex-shrink-0">
              <div>
                <Menu.Button className="bg-indigo-700 flex text-sm rounded-full text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white">
                  <span className="sr-only">Open user menu</span>
                  {/* <img
                              className="h-8 w-8 rounded-full"
                              src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&h=256&q=80"
                              alt=""
                            /> */}
                  <Image width={40} height={40} className='rounded-full cursor-pointer' src={session.user.image}></Image>
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="origin-top-right absolute z-10 right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  {userNavigation.map((item) => (
                    <>
                    <Link href={item.href}>
                      <Menu.Item key={item.name}>
                        {({ active }) => (
                          <div
                          className={classNames(
                            active ? 'bg-gray-100' : '',
                            'px-4 py-2 text-sm text-gray-700 flex cursor-pointer'
                          )}
                          >
                            {item.icon && <item.icon color='stroke-fountain-blue-600' className="flex-shrink-0 h-6 w-6 text-fountain-blue-600" aria-hidden="true" />}
                            <span className='ml-2'>{item.name}</span>

{/* 
                            <a
                              href={item.href}

                            >
                            </a> */}
                          </div>

                        )}
                      </Menu.Item>
                      </Link>


                    </>

                    // <Menu.Item key={item.name}>
                    //   {({ active }) => (
                    //     <a
                    //       href={item.href}
                    //       className={classNames(
                    //         active ? 'bg-gray-100' : '',
                    //         'block px-4 py-2 text-sm text-gray-700'
                    //       )}
                    //     >
                    //       {item.name}
                    //     </a>
                    //   )}
                    // </Menu.Item>
                  ))}
                  <Menu.Item >
                    {({ active }) => (

                      <div
                        onClick={signOut}
                        className={classNames(
                          active ? 'bg-gray-100' : '',
                          'flex px-4 py-2 text-sm text-gray-700 cursor-pointer'
                        )}
                      >
                     <LogoutIcon color='stroke-fountain-blue-600' className="flex-shrink-0 h-6 w-6 text-fountain-blue-600" aria-hidden="true"></LogoutIcon>
                    <span className='ml-2'>Sign out</span>
                      </div>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>

          </> : <>
            <div className="flex md:hidden items-center md:ml-12">
              {/* <Link href="/auth/signin">
                <a className="text-base  text-center font-medium text-gray-500 hover:text-gray-900">
                  Sign in
                </a>
              </Link> */}
              <Link href="/auth/signup">
                <a
                  className="inline-flex text-center items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-gray-500 hover:bg-gray-600"
                >
                  Sign In
                </a>
              </Link>
            </div>
          </>}
  
        {/* <div className="-mr-2 -my-2 md:hidden">
          <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-inset focus:ring-fountain-blue-500">
            <span className="sr-only">Open menu</span>
            <MenuIcon className="h-6 w-6" aria-hidden="true" />
          </Popover.Button>
        </div> */}
        <div className="hidden md:flex-1 md:flex md:items-center md:justify-between">
          <Popover.Group as="nav" className="flex space-x-10">

            {navigation.map((link) =>
              <a href={link.href} className="text-base font-medium text-black hover:text-gray-800">
                {link.name}
              </a>
            )}

            {/* 
            <a href="#" className="text-base font-medium text-gray-500 hover:text-gray-900">
              Docs
            </a> */}

          </Popover.Group>
          {/* Profile dropdown */}

          {session ? <>
            <Menu as="div" className="ml-4 relative flex-shrink-0">
              <div>
                <Menu.Button className=" flex text-sm rounded-full text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white">
                  <span className="sr-only">Open user menu</span>
                  {/* <img
                              className="h-8 w-8 rounded-full"
                              src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&h=256&q=80"
                              alt=""
                            /> */}
                  <Image width={40} height={40} className='rounded-full cursor-pointer' src={session.user.image}></Image>
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="origin-top-right absolute z-10 right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  {userNavigation.map((item) => (
                    <>
                    <Link href={item.href}>
                      <Menu.Item key={item.name}>
                        {({ active }) => (
                          <div
                          className={classNames(
                            active ? 'bg-gray-100' : '',
                            'px-4 py-2 text-sm text-gray-700 flex cursor-pointer'
                          )}
                          >
                            {item.icon && <item.icon color='stroke-fountain-blue-600' className="flex-shrink-0 h-6 w-6 text-fountain-blue-600" aria-hidden="true" />}
                            <span className='ml-2'>{item.name}</span>

{/* 
                            <a
                              href={item.href}

                            >
                            </a> */}
                          </div>

                        )}
                      </Menu.Item>
                      </Link>


                    </>

                    // <Menu.Item key={item.name}>
                    //   {({ active }) => (
                    //     <a
                    //       href={item.href}
                    //       className={classNames(
                    //         active ? 'bg-gray-100' : '',
                    //         'block px-4 py-2 text-sm text-gray-700'
                    //       )}
                    //     >
                    //       {item.name}
                    //     </a>
                    //   )}
                    // </Menu.Item>
                  ))}
                  <Menu.Item >
                    {({ active }) => (

                      <div
                        onClick={signOut}
                        className={classNames(
                          active ? 'bg-gray-100' : '',
                          'flex px-4 py-2 text-sm text-gray-700 cursor-pointer'
                        )}
                      >
                     <LogoutIcon color='stroke-fountain-blue-600' className="flex-shrink-0 h-6 w-6 text-fountain-blue-600" aria-hidden="true"></LogoutIcon>
                    <span className='ml-2'>Sign out</span>
                      </div>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>

          </> : <>
            <div className="flex items-center md:ml-12">
              <Link href="/auth/signin">
                <a className="text-base text-center font-medium text-gray-500 hover:text-gray-900">
                  Sign in
                </a>
              </Link>
              <Link href="/auth/signup">
                <a
                  className="ml-8 inline-flex text-center items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-gray-500 hover:bg-gray-600"
                >
                  Sign up
                </a>
              </Link>
            </div>
          </>}

        </div>
      </div>

      <Transition
        as={Fragment}
        enter="duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel focus className="absolute z-20 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden">
          <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
            <div className="pt-5 px-5">
              <div className="flex items-center justify-between">
                <Link href='/'>
                  <div>
                    {/* <img
                    className="h-8 w-auto"
                    src="/logo.svg"
                    alt="Mind Sanctuary"
                  /> */}
                  </div>
                </Link>
                <div className="-mr-2">
                  <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-inset focus:ring-fountain-blue-500">
                    <span className="sr-only">Close menu</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>

            </div>
            <div className="py-6 px-5">
              <div class="grid grid-cols-2 gap-y-4 gap-x-8">
                {navigation.map((link) =>
                  <Link key={link.name} href={link.href}>
                    <a className="text-base font-medium text-gray-500 hover:text-gray-900">
                      {link.name}
                    </a>
                  </Link>
                )}
              </div>
              {/* {session && <Image layout="fill" src={session.user.image}></Image>} */}
              {/* <div className="grid grid-cols-2 gap-4">
              </div> */}
              {/*  */}
              {session ? <>
                <Image width={20} height={20} src={session.user.image}></Image>
              </> : <>
                <div className="">
                  <a href="/auth/signin" className="my-2 w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-gray-500 hover:text-gray-900 bg-gray-100">
                    Sign in
                  </a>
                  <a
                    href="/auth/signup"
                    className="my-2 w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-fountain-blue-600 hover:bg-fountain-blue-700"
                  >
                    Sign up
                  </a>
                </div>
              </>}

            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}

const userNavigation = [
  {
    name: 'Your Library',
    href: '/library',
    icon: LibraryIcon
  },
  { name: 'Settings',
   href: '#',
    icon: CogIcon
   },
  // { name: 'Sign out', href: '#' },
]