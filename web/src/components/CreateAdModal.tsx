import { Check, GameController } from "phosphor-react";
import { useState, useEffect, FormEvent } from 'react';

import { Input } from './Form/Input';
import * as Dialog from '@radix-ui/react-dialog';
import * as Checkbox from '@radix-ui/react-checkbox';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import axios from "axios";

interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  }
}

export function CreateAdModal() {

  const [games, setGames] = useState<Game[]>([]);
  const [weekDays, setWeekDays] = useState<string[]>([]);
  const [useVoiceChannel, setUseVoiceChannel] = useState<boolean>(false);

  useEffect(() => {
    axios.get('http://localhost:3000/games')
      .then(response => setGames(response.data))
  }, [])

  async function handleCreateAd(event: FormEvent) {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData);

    try {
      const ad = {
        name: data.name,
        yearPlaying: Number.parseInt(data.yearsPlaying as string),
        discord: data.discord,
        hourStart: data.hourStart,
        hourEnd: data.hourEnd,
        weekDays: weekDays.map(day => Number.parseInt(day as string)),
        useVoiceChannel
      }

      await axios.post(`http://localhost:3000/games/${data.game}/ads`, ad);

      alert("Anúncio criado com sucesso!");
    }
    catch (err) {
      alert("Erro ao criado anúncio.");
      console.error(err);
    }

  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay className='bg-black/60 inset-0 fixed' />
      <Dialog.Content className='fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-black-25'>
        <Dialog.Title className='text-3xl font-black'>Publique um anúncio</Dialog.Title>
        <Dialog.Description>
          <form onSubmit={handleCreateAd} className="mt-8 flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="game" className="font-semibold">Qual o game?</label>
              <select id="game" name="game" defaultValue="" className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500 appearance-none">
                <option disabled value="">Selecione o game que deseja jogar</option>
                {games.map(game => {
                  return <option key={game.id} value={game.id}>{game.title}</option>
                })}
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="font-semibold">Seu nome (ou nickname)</label>
              <Input id="name" name="name" type="text" placeholder="Como te chamam dentro do game?" />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="yearsPlaying" className="font-semibold">Joga há quantos anos?</label>
                <Input id="yearsPlaying" name="yearsPlaying" type="number" placeholder="Tudo bem ser ZERO" />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="discord" className="font-semibold">Qual seu Discord?</label>
                <Input id="discord" name="discord" type="text" placeholder="Usuário#0000" />
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="weekDays" className="font-semibold">Quando costuma jogar?</label>
                <div>
                  <ToggleGroup.Root type="multiple" className="flex gap-1 mt-3" onValueChange={setWeekDays}>
                    <ToggleGroup.Item value="0" className={`w-6 h-6 rounded ${weekDays.includes("0") ? "bg-violet-500" : "bg-zinc-900"}`} title='Domingo'>D</ToggleGroup.Item>
                    <ToggleGroup.Item value="1" className={`w-6 h-6 rounded ${weekDays.includes("1") ? "bg-violet-500" : "bg-zinc-900"}`} title='Segunda-Feira'>S</ToggleGroup.Item>
                    <ToggleGroup.Item value="2" className={`w-6 h-6 rounded ${weekDays.includes("2") ? "bg-violet-500" : "bg-zinc-900"}`} title='Terça-Feira'>T</ToggleGroup.Item>
                    <ToggleGroup.Item value="3" className={`w-6 h-6 rounded ${weekDays.includes("3") ? "bg-violet-500" : "bg-zinc-900"}`} title='Quarta-Feira'>Q</ToggleGroup.Item>
                    <ToggleGroup.Item value="4" className={`w-6 h-6 rounded ${weekDays.includes("4") ? "bg-violet-500" : "bg-zinc-900"}`} title='Quinta-Feira'>Q</ToggleGroup.Item>
                    <ToggleGroup.Item value="5" className={`w-6 h-6 rounded ${weekDays.includes("5") ? "bg-violet-500" : "bg-zinc-900"}`} title='Sexta-Feira'>S</ToggleGroup.Item>
                    <ToggleGroup.Item value="6" className={`w-6 h-6 rounded ${weekDays.includes("6") ? "bg-violet-500" : "bg-zinc-900"}`} title='Sábado'>S</ToggleGroup.Item>
                  </ToggleGroup.Root>
                </div>
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <label htmlFor="hourStart" className="font-semibold">Quando horário do dia?</label>
                <div className="grid grid-cols-2 gap-6">
                  <Input id="hourStart" name="hourStart" type="time" placeholder="De" />
                  <Input id="hourEnd" name="hourEnd" type="time" placeholder="Até" />
                </div>
              </div>
            </div>
            <label>
              <div className="mt-2 flex items-center gap-2 text-sm">
                <Checkbox.Root checked={useVoiceChannel} onCheckedChange={(checked) => {
                  if (checked === true) {
                    setUseVoiceChannel(true)
                  }
                  else {
                    setUseVoiceChannel(false)
                  }
                }} className="w-6 h-6 rounded bg-zinc-900">
                  <Checkbox.Indicator>
                    <Check className="w-6 h-6 p-1 text-emerald-400" />
                  </Checkbox.Indicator>
                </Checkbox.Root>
                Costumo me conectar ao chat de voz
              </div>
            </label>

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
  );
}