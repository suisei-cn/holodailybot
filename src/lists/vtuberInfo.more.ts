// This list is used to put any VTuber not included by the "hololive" and "hololike" list.

import { ItemPickList, ItemPick } from '../types_list'

const exp: ItemPickList = {
  花谱: ['日本の何処かに棲む、何処にでもいる、何処にもいない16才。'],
  理芽: [],
  春猿火: [],
  ヰ世界情绪: [],
  鹤伞Ria: [
    {
      type: 'urlimage',
      // https://t.bilibili.com/396130004857483240?tab=2
      payload: 'https://i0.hdslb.com/bfs/album/c23c249ef2aedfecf9aa683d4e27d8cc1209d2dd.jpg@518w_1e_1c.jpg',
    } as ItemPick
  ]
}

export const info: { [key: string]: any } = {
  花谱: {
    youtube: 'https://www.youtube.com/channel/UCQ1U65-CQdIoZ2_NA4Z4F7A',
    twitter: 'https://twitter.com/virtual_kaf',
    telegram: 'https://t.me/kamitsubaki_kaf',
    telegram_official: false,
    bilibili: 'https://space.bilibili.com/488970166',
    wiki: 'https://zh.moegirl.org/花谱'
  },
  理芽: {
    youtube: 'https://www.youtube.com/channel/UCfBkUgaJ6eqYA9_TX2cmq9A',
    twitter: 'https://twitter.com/Virtual_rime',
    telegram: 'https://t.me/Virtual_rime',
    telegram_official: false,
    bilibili: 'https://space.bilibili.com/489046950',
    wiki: 'https://zh.moegirl.org/理芽'
  },
  春猿火: {
    youtube: 'https://www.youtube.com/channel/UCE7gtjLeZKNXLp5YURzYYeg',
    twitter: 'https://twitter.com/harusaruhi',
    bilibili: 'https://space.bilibili.com/488976992',
    wiki: 'https://zh.moegirl.org/春猿火'
  },
  ヰ世界情绪: {
    youtube: 'https://www.youtube.com/channel/UCah4_WVjmr8XA7i5aigwV-Q',
    twitter: 'https://twitter.com/isekaijoucho',
    bilibili: 'https://space.bilibili.com/488978908',
    wiki: 'https://zh.moegirl.org/异世界情绪'
  },
  鹤伞Ria: {
    youtube: 'https://www.youtube.com/channel/UCC12ijOcPxnRSQPLvjWYXUg',
    twitter: 'https://twitter.com/TsukasaRia',
    telegram: 'https://t.me/kanaria_group',
    bilibili: 'https://space.bilibili.com/2450927',
    wiki: 'https://zh.moegirl.org/鹤伞Ria'
  }
}

export default exp
