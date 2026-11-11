import {
  ArrowRight,
  Camera,
  Clock,
  Ear,
  Feather,
  Heart,
  Mail,
  MessageCircle,
  Music,
  ShieldCheck,
  Sparkles,
  Star,
} from 'lucide-react'

/** Friendly names -> line icons, so siteData.js never imports a component. */
const MAP = {
  ear: Ear,
  heart: Heart,
  clock: Clock,
  message: MessageCircle,
  star: Star,
  shield: ShieldCheck,
  sparkles: Sparkles,
  feather: Feather,
  arrow: ArrowRight,
  instagram: Camera,
  camera: Camera,
  mail: Mail,
  music: Music,
}

export default function Icon({ name, size = 18, strokeWidth = 1.35, ...rest }) {
  const Cmp = MAP[name] || Sparkles
  return <Cmp size={size} strokeWidth={strokeWidth} aria-hidden="true" {...rest} />
}

export { MAP as ICON_MAP }
