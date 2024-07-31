import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_privateRoots/dashboard/')({
  component: () => <div>Hello /_privateRoots/Dashboard/!</div>
})