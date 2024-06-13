'use client'

import { Button } from './button'
import { DesktopDialog } from './dialog'
import { Brain } from './svg/brain'
import { Programmer } from './svg/programmer'
import { Repositories } from './svg/repositories'

export function DesktopApps() {
  return (
    <>
      <DesktopDialog
        trigger={
          <Button
            variant="icon"
            className="flex w-28 flex-col items-center justify-center gap-2"
          >
            <Repositories />
            <span>Repositories</span>
          </Button>
        }
      >
        content
      </DesktopDialog>
      <DesktopDialog
        trigger={
          <Button
            variant="icon"
            className="flex w-28 flex-col items-center justify-center gap-2"
          >
            <Programmer />
            <span>About me</span>
          </Button>
        }
      >
        content
      </DesktopDialog>
      <DesktopDialog
        trigger={
          <Button
            variant="icon"
            className="flex w-28 flex-col items-center justify-center gap-2"
          >
            <Brain />
            <span>Skills</span>
          </Button>
        }
      >
        content
      </DesktopDialog>
    </>
  )
}
