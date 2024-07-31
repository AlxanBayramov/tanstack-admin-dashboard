import { createFileRoute } from '@tanstack/react-router'
import { useStore } from 'lib/zustand/store'



function Profile(){





  return (
    <div>Hello /_privateRoots/Profile/!</div>
  )
}

export const Route = createFileRoute('/_privateRoots/profile/')({
  component: Profile
})

