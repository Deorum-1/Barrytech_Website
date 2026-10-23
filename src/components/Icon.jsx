import { Server, ScanFace, ShieldCheck, Headset, KanbanSquare, Code2, BrainCircuit, Circle } from 'lucide-react'

// Only the icons referenced in src/data/services.js are bundled
const icons = { Server, ScanFace, ShieldCheck, Headset, KanbanSquare, Code2, BrainCircuit }
export default function Icon({ name, ...props }) {
  const C = icons[name] || Circle
  return <C {...props} />
}
