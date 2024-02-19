import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_user/technicalHome')({
  component: () => <div>Hello /_user/technicalHome!</div>
})