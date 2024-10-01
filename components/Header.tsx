import { cn } from '@/lib/utils'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React, { ReactNode } from 'react'

const Header = ({children, className}: HeaderProps) => {
  return (
    <div className={cn('header', className)}>
        <Link href="/" className='md:w-[150px]'>
            <Image 
                src="/assets/images/folder.png"
                alt="Logo with name"
                width={100}
                height={40}
                className='hidden md:block'
            />
            <Image 
                src="/assets/icons/logo-icon.svg"
                alt="Logo"
                width={40}
                height={40}
                className='mr-2 md:hidden'
            />
        </Link>
        {children}
        <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        

    </div>
  )
}

export default Header