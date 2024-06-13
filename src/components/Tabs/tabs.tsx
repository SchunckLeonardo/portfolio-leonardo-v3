'use client'

import * as Tabs from '@radix-ui/react-tabs'
import { Skill } from '../skill'
import {
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiJavascript,
  SiNodedotjs,
  SiMysql,
  SiGit,
  SiMongodb,
  SiPostgresql,
  SiCsharp,
  SiDotnet,
  SiC,
  SiAmazonaws,
} from 'react-icons/si'

import { useState } from 'react'
import { TabItem } from './tab-item'

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
          <Skill icon={<SiNextdotjs className="h-7 w-7 text-zinc-900" />} />
          <Skill icon={<SiReact className="h-7 w-7 text-zinc-900" />} />
          <Skill icon={<SiTypescript className="h-7 w-7 text-zinc-900" />} />
          <Skill icon={<SiJavascript className="h-7 w-7 text-zinc-900" />} />
        </div>
      </Tabs.Content>
      <Tabs.Content value="tab2">
        <div className="grid h-full grid-cols-8 items-center justify-center">
          <Skill icon={<SiNodedotjs className="h-7 w-7 text-zinc-900" />} />
          <Skill icon={<SiCsharp className="h-7 w-7 text-zinc-900" />} />
          <Skill icon={<SiDotnet className="h-7 w-7 text-zinc-900" />} />
          <Skill icon={<SiC className="h-7 w-7 text-zinc-900" />} />
        </div>
      </Tabs.Content>
      <Tabs.Content value="tab3">
        <div className="grid h-full grid-cols-8 items-center justify-center">
          <Skill icon={<SiMysql className="h-7 w-7 text-zinc-900" />} />
          <Skill icon={<SiMongodb className="h-7 w-7 text-zinc-900" />} />
          <Skill icon={<SiPostgresql className="h-7 w-7 text-zinc-900" />} />
        </div>
      </Tabs.Content>
      <Tabs.Content value="tab4">
        <div className="grid h-full grid-cols-8 items-center justify-center">
          <Skill icon={<SiGit className="h-7 w-7 text-zinc-900" />} />
        </div>
      </Tabs.Content>
      <Tabs.Content value="tab5">
        <div className="grid h-full grid-cols-8 items-center justify-center">
          <Skill icon={<SiAmazonaws className="h-7 w-7 text-zinc-900" />} />
        </div>
      </Tabs.Content>
    </Tabs.Root>
  )
}
