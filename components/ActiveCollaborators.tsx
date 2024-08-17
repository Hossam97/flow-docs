import { useOthers } from '@liveblocks/react/suspense'
import Image from 'next/image';

const ActiveCollaborators = () => {
  const others = useOthers();

  interface Collaborator{
      id: string,
      avatar: string,
      email: string,
      color: string
    }
    const collaborators: Collaborator[] = others.map((other) => other.info as Collaborator);

  return (
    <ul className="collaborators-list">
      {collaborators.map(( {id, avatar, email, color}) => (
        <li key={id}>
          <Image 
            src={avatar}
            alt={email}
            width={100}
            height={100}
            className='inline-block size-8 rounded-full ring-2 ring-dark-100'
            style={{border: `3px solid ${color}`}}
          />
        </li>
      ))}
    </ul>
  )
}

export default ActiveCollaborators