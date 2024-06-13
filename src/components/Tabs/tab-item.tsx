import * as Tabs from '@radix-ui/react-tabs'
import { motion } from 'framer-motion'

interface TabItemProps {
  isSelected: boolean
  value: string
  title: string
}

export function TabItem({ isSelected, title, value }: TabItemProps) {
  return (
    <Tabs.Trigger
      className="relative h-full w-full flex-1 rounded-lg rounded-bl-full rounded-tl-full p-3 data-[state=active]:text-zinc-900"
      value={value}
    >
      {title}

      {isSelected && (
        <motion.div
          layoutId="activeTab"
          className="absolute left-0 top-0 -z-10 h-full w-full rounded-lg bg-zinc-200"
        ></motion.div>
      )}
    </Tabs.Trigger>
  )
}
