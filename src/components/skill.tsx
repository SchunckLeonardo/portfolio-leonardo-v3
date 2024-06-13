import { ReactElement } from 'react'

interface SkillProps {
  icon: ReactElement
}

export function Skill({ icon }: SkillProps) {
  return (
    <div className="item flex h-14 w-14 items-center justify-center rounded-lg bg-white shadow-lg">
      {icon}
    </div>
  )
}
