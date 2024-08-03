import Image from 'next/image'
import React from 'react'

const Loader = () => {
  return (
    <div className='loader'>
        <Image
            src="/assets/icons/loader.svg"
            alt="Loader"
            className="animate-spin"
            width={32}
            height={32}
        />
    </div>
  )
}

export default Loader