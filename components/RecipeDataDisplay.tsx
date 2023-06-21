import { formatTime } from '@/lib/utils/formatTime'
import AppIcon from './app-icons'
import { useState } from 'react'
import { featureFlags } from '@/data/siteMetadata'

type Props = {
  prepTime: number
  cookTime: number
  totalTime: number
  servings: number
}

export const RecipeDataDisplay = ({
  prepTime,
  cookTime,
  totalTime,
  servings: initialServings,
}: Props) => {
  const [servings, setServings] = useState<number>(initialServings)
  const [multiplier, setMultiplier] = useState<number>(1)

  const handleServingsMultiplier = (multiplier: number) => {
    setMultiplier(multiplier)
    setServings(multiplier * initialServings)
  }

  return (
    <>
      {featureFlags.servingsMultiplier ? (
        <div className="flex pt-10">
          <button
            onClick={() => handleServingsMultiplier(1)}
            className={`rounded-l-lg py-2 px-4 text-white ${
              multiplier === 1 ? 'bg-primary-900' : 'bg-primary-700'
            }`}
          >
            1x
          </button>
          <button
            onClick={() => handleServingsMultiplier(2)}
            className={`border-l-4 border-r-4 py-2 px-4 text-white dark:border-black ${
              multiplier === 2 ? 'bg-primary-900' : 'bg-primary-700'
            }`}
          >
            2x
          </button>
          <button
            onClick={() => handleServingsMultiplier(3)}
            className={`rounded-r-lg py-2 px-4 text-white ${
              multiplier === 3 ? 'bg-primary-900' : 'bg-primary-700'
            }`}
          >
            3x
          </button>
        </div>
      ) : null}
      <dl className="flex pt-10">
        <div className="w-1/3 sm:w-1/6">
          <dt className="text-sm text-black dark:text-white">Servings</dt>
          <dd className="flex items-center self-center text-sm font-medium uppercase leading-6 text-gray-500 dark:text-gray-400 sm:text-base">
            <span className="pl-1">{servings ?? initialServings}</span>
          </dd>
        </div>
      </dl>

      <dl className="flex pt-10 text-sm font-medium leading-6 text-gray-500 dark:text-gray-400 sm:text-base">
        <div className="w-1/3 sm:w-1/6">
          <dt className="text-sm text-black dark:text-white">Prep Time</dt>
          <dd className="flex items-center self-center uppercase">
            <AppIcon kind="clock" size={5} />
            <span className="pl-1">{formatTime(prepTime)}</span>
          </dd>
        </div>
        <div className="w-1/3 sm:w-1/6">
          <dt className="text-sm text-black dark:text-white">Cook Time</dt>
          <dd className="flex items-center self-center uppercase">
            <AppIcon kind="clock" size={5} />
            <span className="pl-1">{formatTime(cookTime)}</span>
          </dd>
        </div>
        <div className="w-1/3 sm:w-1/6">
          <dt className="text-sm text-black dark:text-white">Total Time</dt>
          <dd className="flex items-center self-center uppercase">
            <AppIcon kind="clock" size={5} />
            <span className="pl-1">{formatTime(totalTime)}</span>
          </dd>
        </div>
      </dl>
    </>
  )
}
