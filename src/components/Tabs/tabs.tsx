'use client'

import * as Tabs from '@radix-ui/react-tabs'
import { Skill } from '../skill'

import { useState } from 'react'
import { TabItem } from './tab-item'
import { NextJs } from '../svg/skills/nextjs'
import { ReactJs } from '../svg/skills/reactjs'
import { Typescript } from '../svg/skills/typescript'
import { Javascript } from '../svg/skills/javascript'
import { Nodejs } from '../svg/skills/nodejs'
import { CSharp } from '../svg/skills/c-sharp'
import { DotNet } from '../svg/skills/dot-net'
import { C } from '../svg/skills/c-svg'
import { MySQL } from '../svg/skills/mysql'
import { MongoDB } from '../svg/skills/mongodb'
import { PgSQL } from '../svg/skills/pgSQL'
import { Git } from '../svg/skills/git'
import { Aws } from '../svg/skills/aws'
import { Gcp } from '../svg/skills/gcp'

export function TabsSkills() {
  const [currentTab, setCurrentTab] = useState('tab1')

  return (
    <Tabs.Root
      className="flex h-full w-full flex-col gap-10"
      onValueChange={setCurrentTab}
      value={currentTab}
    >
      <Tabs.List className="flex items-center justify-center gap-6 rounded-lg border border-zinc-200">
        <TabItem
          title="Front-End"
          value="tab1"
          isSelected={currentTab === 'tab1'}
        />
        <TabItem
          title="Back-End"
          value="tab2"
          isSelected={currentTab === 'tab2'}
        />
        <TabItem
          title="Database"
          value="tab3"
          isSelected={currentTab === 'tab3'}
        />
        <TabItem
          title="Tools"
          value="tab4"
          isSelected={currentTab === 'tab4'}
        />
        <TabItem
          title="Cloud"
          value="tab5"
          isSelected={currentTab === 'tab5'}
        />
      </Tabs.List>
      <Tabs.Content value="tab1">
        <div className="grid h-full grid-cols-8 items-center justify-center">
          <Skill icon={<NextJs />} />
          <Skill icon={<ReactJs />} />
          <Skill icon={<Typescript />} />
          <Skill icon={<Javascript />} />
        </div>
      </Tabs.Content>
      <Tabs.Content value="tab2">
        <div className="grid h-full grid-cols-8 items-center justify-center">
          <Skill icon={<Nodejs />} />
          <Skill icon={<CSharp />} />
          <Skill icon={<DotNet />} />
          <Skill icon={<C />} />
        </div>
      </Tabs.Content>
      <Tabs.Content value="tab3">
        <div className="grid h-full grid-cols-8 items-center justify-center">
          <Skill icon={<MySQL />} />
          <Skill icon={<MongoDB />} />
          <Skill icon={<PgSQL />} />
        </div>
      </Tabs.Content>
      <Tabs.Content value="tab4">
        <div className="grid h-full grid-cols-8 items-center justify-center">
          <Skill icon={<Git />} />
        </div>
      </Tabs.Content>
      <Tabs.Content value="tab5">
        <div className="grid h-full grid-cols-8 items-center justify-center">
          <Skill icon={<Aws />} />
          <Skill icon={<Gcp />} />
        </div>
      </Tabs.Content>
    </Tabs.Root>
  )
}
