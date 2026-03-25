'use client'

import { SpadeIcon } from '@/components/icon'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const initialState = { message: '', error: false }

const initialAllPlay: {
  [key: number]: 'object' | 'person' | 'world' | 'action' | 'nature' | 'random'
} = {
  0: 'person',
  1: 'world',
  2: 'random',
  3: 'action',
  4: 'nature',
  5: 'object',
}

export default function CreatePage() {
  const [message, setMessage] = useState<{ message: string; error: boolean }>(initialState)

  const [allPlay, setAllPlay] = useState<
    'object' | 'person' | 'world' | 'action' | 'nature' | 'random' | ''
  >('')

  useEffect(() => {
    const randomInt = Math.floor(Math.random() * 6)
    setAllPlay(initialAllPlay[randomInt])
  }, [])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      person: '',
      world: '',
      object: '',
      action: '',
      nature: '',
      random: '',
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await fetch(
        `api/create?person=${values.person.trim()}&nature=${values.nature.trim()}&object=${values.object.trim()}&action=${values.action.trim()}&world=${values.world.trim()}&random=${values.random.trim()}&allplay=${allPlay}`,
      )
      if (!response.ok) {
        setMessage({ message: 'Something went wrong', error: true })
      } else {
        const result = await response.json()
        if (result?.duplicates) {
          result.duplicates.forEach(
            (duplicate: 'object' | 'person' | 'world' | 'action' | 'nature' | 'random') =>
              form.setError(duplicate, {
                message: `${duplicate} already exists in the set`,
              }),
          )
          return
        }
        setMessage({
          message: 'Submission created successfully',
          error: false,
        })
        form.reset()
        const randomInt = Math.floor(Math.random() * 6)
        setAllPlay(initialAllPlay[randomInt])
      }
    } catch (error) {
      console.error(error)
      setMessage({ message: 'Something went wrong', error: true })
    }
  }

  return (
    <div className="my-20 mx-auto max-w-[600px] text-base px-5 md:px-10 ">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div
            className="bg-white p-5 rounded-xl space-y-2 shadow-xl"
            onClick={() => setMessage(initialState)}
          >
            <div className="flex gap-2">
              <div className="aspect-square bg-person min-w-6 min-h-6 max-w-6 max-h-6 flex items-center justify-center text-center border border-black font-pt">
                P
              </div>
              <FormField
                control={form.control}
                name="person"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Person" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div
                onClick={() => setAllPlay('person')}
                className="cursor-pointer aspect-square bg-person min-w-6 min-h-6 max-w-6 max-h-6 flex items-center justify-center text-center border border-black"
              >
                {allPlay === 'person' && <SpadeIcon />}
              </div>
            </div>
            <div className="flex gap-2">
              <div className="aspect-square bg-world min-w-6 min-h-6 max-w-6 max-h-6 flex items-center justify-center text-center border border-black font-pt">
                W
              </div>
              <FormField
                control={form.control}
                name="world"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="World" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div
                onClick={() => setAllPlay('world')}
                className="cursor-pointer aspect-square bg-world min-w-6 min-h-6 max-w-6 max-h-6 flex items-center justify-center text-center border border-black"
              >
                {allPlay == 'world' && <SpadeIcon />}
              </div>
            </div>
            <div className="flex gap-2">
              <div className="aspect-square bg-object min-w-6 min-h-6 max-w-6 max-h-6 flex items-center justify-center text-center border border-black font-pt">
                O
              </div>
              <FormField
                control={form.control}
                name="object"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Object" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div
                onClick={() => setAllPlay('object')}
                className="cursor-pointer aspect-square bg-object min-w-6 min-h-6 max-w-6 max-h-6 flex items-center justify-center text-center border border-black"
              >
                {allPlay === 'object' && <SpadeIcon />}
              </div>
            </div>
            <div className="flex gap-2">
              <div className="aspect-square bg-action min-w-6 min-h-6 max-w-6 max-h-6 flex items-center justify-center text-center border border-black font-pt">
                A
              </div>
              <FormField
                control={form.control}
                name="action"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Action" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div
                onClick={() => setAllPlay('action')}
                className="cursor-pointer aspect-square bg-action min-w-6 min-h-6 max-w-6 max-h-6 flex items-center justify-center text-center border border-black"
              >
                {allPlay === 'action' && <SpadeIcon />}
              </div>
            </div>
            <div className="flex gap-2">
              <div className="aspect-square bg-nature min-w-6 min-h-6 max-w-6 max-h-6 flex items-center justify-center text-center border border-black font-pt">
                N
              </div>
              <FormField
                control={form.control}
                name="nature"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Nature" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div
                onClick={() => setAllPlay('nature')}
                className="cursor-pointer aspect-square bg-nature min-w-6 min-h-6 max-w-6 max-h-6 flex items-center justify-center text-center border border-black"
              >
                {allPlay === 'nature' && <SpadeIcon />}
              </div>
            </div>
            <div className="flex gap-2">
              <div className="aspect-square bg-random min-w-6 min-h-6 max-w-6 max-h-6 flex items-center justify-center text-center border border-black font-pt">
                R
              </div>
              <FormField
                control={form.control}
                name="random"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Random" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div
                onClick={() => setAllPlay('random')}
                className="cursor-pointer aspect-square bg-random min-w-6 min-h-6 max-w-6 max-h-6 flex items-center justify-center text-center border border-black"
              >
                {allPlay === 'random' && <SpadeIcon />}
              </div>
            </div>
          </div>
          <p className="mt-5 text-sm">
            Make sure you have selected your all-play category, click the checkboxes next to your
            answer.
          </p>
          <Button type="submit" className="my-5">
            Submit
          </Button>
          {message.message && (
            <p
              className={cn('text-lg', {
                'text-red-500': message.error,
              })}
            >
              {message.message}
            </p>
          )}
        </form>
      </Form>
    </div>
  )
}

const formSchema = z.object({
  person: z.string().min(1, { message: 'Required' }),
  world: z.string().min(1, { message: 'Required' }),
  object: z.string().min(1, { message: 'Required' }),
  action: z.string().min(1, { message: 'Required' }),
  nature: z.string().min(1, { message: 'Required' }),
  random: z.string().min(1, { message: 'Required' }),
})
