// JSX: JavaScript + XML 

import './styles/main.css';
import logoImage from './assets/logo-nlw-esports.svg';
import { GameBanner } from './components/GameBanner';
import { CreateAd } from './components/CreateAd';
import { useState, useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { GameController } from "phosphor-react";
import { Input } from './components/Form/Input';

interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  }
}

function App() {

  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    fetch('http://localhost:3000/games')
      .then(response => response.json())
      .then(data => setGames(data))
  }, [])

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <img src={logoImage} alt="Logo" />

      <h1 className='text-6xl text-white font-black mt-20 bg-'>
        Seu <span className='bg-nlw-gradient bg-clip-text text-transparent'>duo</span> está aqui.
      </h1>

      <div className='grid grid-cols-6 gap-6 mt-16'>
        {games.map(game => {
          return <GameBanner key={game.id} bannerUrl={game.bannerUrl} title={game.title} adsCount={game._count.ads} />
        })}
      </div>
      <Dialog.Root>
        <CreateAd />
        <Dialog.Portal>
          <Dialog.Overlay className='bg-black/60 inset-0 fixed' />
          <Dialog.Content className='fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-black-25'>
            <Dialog.Title className='text-3xl font-black'>Publique um anúncio</Dialog.Title>
            <Dialog.Description>
              <form className="mt-8 flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label htmlFor="game" className="font-semibold">Qual o game?</label>
                  <Input id="game" type="text" placeholder="Selecione o game que deseja jogar" />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="font-semibold">Seu nome (ou nickname)</label>
                  <Input type="text" placeholder="Como te chamam dentro do game?" />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="yearsPlaying" className="font-semibold">Joga há quantos anos?</label>
                    <Input id="" type="number" placeholder="Tudo bem ser ZERO" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="discord" className="font-semibold">Qual seu Discord?</label>
                    <Input id="discord" type="text" placeholder="Usuário#0000"  />
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="weekDays" className="font-semibold">Quando costuma jogar?</label>
                    <div className="flex gap-1 mt-3">
                      <button className="w-6 h-6 rounded bg-zinc-900" title='Domingo'>D</button>
                      <button className="w-6 h-6 rounded bg-zinc-900" title='Segunda-Feira'>S</button>
                      <button className="w-6 h-6 rounded bg-zinc-900" title='Terça-Feira'>T</button>
                      <button className="w-6 h-6 rounded bg-zinc-900" title='Quarta-Feira'>Q</button>
                      <button className="w-6 h-6 rounded bg-zinc-900" title='Quinta-Feira'>Q</button>
                      <button className="w-6 h-6 rounded bg-zinc-900" title='Sexta-Feira'>S</button>
                      <button className="w-6 h-6 rounded bg-zinc-900" title='Sábado'>S</button>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 flex-1">
                    <label htmlFor="hourStart" className="font-semibold">Quando horário do dia?</label>
                    <div className="grid grid-cols-2 gap-6">
                      <Input id="hourStart" type="time" placeholder="De" />
                      <Input id="hourEnd" type="time" placeholder="Até" />
                    </div>
                  </div>
                </div>
                <div className="mt-2 flex gap-2 text-sm">
                  <input type="checkbox" />
                  Costumo me conectar ao chat de voz
                </div>

                <footer className="mt-4 flex justify-end gap-4">
                  <Dialog.Close type="button" className="bg-zinc-500 px-5 h-12 rounded font-semibold hover:bg-zinc-600">Cancelar</Dialog.Close>
                  <button type="submit" className="bg-violet-500 px-5 h-12 rounded font-semibold flex items-center gap-3 hover:bg-violet-600">
                    <GameController className="w-6 h-6" />
                    Encontrar duo
                  </button>
                </footer>
              </form>
            </Dialog.Description>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  )
}

export default App;