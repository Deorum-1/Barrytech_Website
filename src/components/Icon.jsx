import * as L from 'lucide-react'
export default function Icon({ name, ...props }) {
  const C = L[name] || L.Circle
  return <C {...props} />
}
