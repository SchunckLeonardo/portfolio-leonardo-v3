'use client'

import Image from 'next/image'
import { Button } from './button'
import { DesktopDialog } from './dialog'
import { Brain } from './svg/brain'
import { Programmer } from './svg/programmer'
import { Repositories } from './svg/repositories'
import { ArrowDownToLine } from 'lucide-react'
import { TabsSkills } from './Tabs/tabs'

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
            <span>Sobre mim</span>
          </Button>
        }
      >
        <div className="flex h-full w-full gap-5">
          <section className="flex h-full w-1/3 flex-col items-center justify-start rounded-lg bg-slate-800 shadow-lg">
            <Image
              width={484}
              height={600}
              className="object-contain"
              src="/images/logo.png"
              alt=""
            />
            <div className="flex flex-col items-center justify-center gap-3">
              <h1 className="text-2xl font-semibold">
                Leonardo Schunck Rainha
              </h1>
              <h3 className="text-zinc-200">São Paulo, Brasil</h3>
            </div>
          </section>
          <section className="flex w-2/3 flex-col gap-10">
            <h3 className="font-ibm text-5xl">Sobre mim</h3>
            <div className="flex flex-col gap-4 text-lg text-zinc-300">
              <p>
                Olá! Eu sou o Leonardo Schunck Rainha, estudante de Engenharia
                de Software na FIAP. Sou uma pessoa cheia de confiança, que
                adora aprender e se adapta a qualquer ambiente. Minha paixão por
                tecnologia me levou a participar de diversos hackathons, onde
                aprendi muito e me desafiei constantemente.
              </p>
              <p>
                Sempre estou em busca de novos conhecimentos, por isso realizo
                muitos cursos em plataformas como Rocketseat e Alura, onde
                obtive vários certificados. Adoro colocar o que aprendo em
                prática, e isso fica claro nos diversos projetos acadêmicos que
                desenvolvi para empresas de renome como IBM, Kraft Heinz e
                Hapvida Notredame Intermédica. Essas experiências me ensinaram
                muito sobre o mercado e me ajudaram a crescer tanto pessoal
                quanto profissionalmente.
              </p>
              <p>
                Sou uma pessoa que não foge de desafios e acredito que, com
                minha combinação de habilidades técnicas, adaptabilidade e
                experiência prática, estou sempre pronto para o próximo grande
                projeto. Estou animado para ver onde essa jornada me levará e
                como posso contribuir para o mundo da tecnologia.
              </p>
            </div>
            <a
              href="/files/resume.pdf"
              download
              className="mx-auto flex w-1/4 items-center justify-center gap-4 rounded-full bg-sky-950 py-4 shadow-lg transition-all hover:-translate-y-2 hover:brightness-110"
            >
              <ArrowDownToLine />
              Baixar currículo
            </a>
          </section>
        </div>
      </DesktopDialog>
      <DesktopDialog
        trigger={
          <Button
            variant="icon"
            className="flex w-28 flex-col items-center justify-center gap-2"
          >
            <Brain />
            <span>Habilidades</span>
          </Button>
        }
      >
        <div>
          <TabsSkills />
        </div>
      </DesktopDialog>
    </>
  )
}
