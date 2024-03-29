import { formatTime } from '@/lib/utils/formatTime'
import Link from './Link'
import Tag from './Tag'
import AppIcon from './app-icons'
import Image from 'next/image'

type Props = {
  title: string
  imgSrc: string
  href: string
  tags: string[]
  time: number
}

const Card = ({ title, imgSrc, href, tags, time }: Props) => (
  <div className="overflow-hidden rounded-lg">
    <Link href={href}>
      <div className="relative">
        <Image src={imgSrc} width={960} height={540} alt={title} />
      </div>
    </Link>
    <div className="flex h-24 flex-col justify-between pb-2 dark:border-gray-600">
      <h3 className="text-base font-bold md:text-lg">
        <Link href={href} className="text-gray-900 dark:text-gray-100">
          {title}
        </Link>
      </h3>
      <div className="flex justify-between">
        <div className="flex flex-wrap">
          {tags && tags.length > 0 && <Tag key={tags[0]} text={tags[0]} />}
        </div>
        <div className="flex self-center text-gray-500 dark:text-gray-400">
          <AppIcon kind="clock" size={5} />
          <p className="pl-1 text-sm uppercase">{formatTime(time)}</p>
        </div>
      </div>
    </div>
  </div>
)

export default Card
