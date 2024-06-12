interface ProgressBarProps {
  progress: number
}

export function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className="h-1 w-full rounded-full bg-zinc-200">
      <div
        style={{ width: `${progress}%` }}
        className={`relative h-full rounded-full bg-blue-950`}
      >
        <span className="absolute right-0 top-2/4 h-3 w-3 -translate-y-2/4 rounded-full bg-blue-950"></span>
      </div>
    </div>
  )
}
