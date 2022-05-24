import { RefreshIcon } from '@heroicons/react/outline'
import React, { useState } from 'react'
import { Tweet } from '../typings'
import Tweetbox from './Tweetbox'
import TweetComponent from '../components/Tweet'
import { fetchTweets } from '../utils/fetchTweets'
import toast from 'react-hot-toast'

interface Props {
  tweets: Tweet[]
}

function Feed({ tweets: tweeetsProp }: Props) {
  const [tweets, setTweets] = useState<Tweet[]>(tweeetsProp)

  const handleRefresh = async () => {
    const refreshTotast = toast.loading('Refreshing...')

    const tweets = await fetchTweets()
    setTweets(tweets)

    toast.success('Feed is updated!', {
      id: refreshTotast,
    })
  }

  return (
    <div className="col-span-7 border-x lg:col-span-5">
      <div className="flex items-center justify-between">
        <h1 className="p-5 pb-0 text-xl font-bold">Home</h1>
        <RefreshIcon
          onClick={handleRefresh}
          className="mr-5 mt-5 h-8 w-8 cursor-pointer text-twitter transition-all duration-500 ease-out hover:rotate-180 active:scale-125"
        />
      </div>

      <div>
        <Tweetbox />
      </div>

      {/* Feed */}
      <div>
        {tweets.map((tweet) => (
          <TweetComponent key={tweet._id} tweet={tweet} />
        ))}
      </div>
    </div>
  )
}

export default Feed
