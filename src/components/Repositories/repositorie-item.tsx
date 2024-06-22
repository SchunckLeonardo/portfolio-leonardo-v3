interface RepositorieItemProps {
  link: string
  title: string
  description: string
}

export function RepositorieItem({
  link,
  description,
  title,
}: RepositorieItemProps) {
  return (
    <a
      href={link}
      target="__blank"
      className="text- flex h-32 w-full flex-col gap-3 overflow-hidden rounded-lg border border-zinc-100 bg-zinc-800/30 p-5 shadow-lg transition-all hover:scale-105 hover:brightness-150"
    >
      <span className="text-sm text-emerald-500">{title}</span>
      <span className="truncate text-xs">{description}</span>
    </a>
  )
}
