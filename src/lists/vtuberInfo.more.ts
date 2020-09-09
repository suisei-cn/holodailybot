// This list is used to put any VTuber not included by the "hololive" and "hololike" list.

import { ItemPickList } from '../types_list'
import extrasInfo from './extras.info.json'
import { VTuberInfo } from '../types'

const exp: ItemPickList = {
  花谱: ['日本の何処かに棲む、何処にでもいる、何処にもいない16才。'],
  理芽: [],
  春猿火: [],
  ヰ世界情绪: [],
  小雀香奈: [],
  黑狐: [],
  ななひら: [],
}

const builtinInfo: VTuberInfo = {
  花谱: {
    youtube: 'https://www.youtube.com/channel/UCQ1U65-CQdIoZ2_NA4Z4F7A',
    twitter: 'https://twitter.com/virtual_kaf',
    telegram: 'https://t.me/kamitsubaki_kaf',
    telegram_official: false,
    bilibili: 'https://space.bilibili.com/488970166',
    wiki: 'https://zh.moegirl.org.cn/花谱',
  },
  理芽: {
    youtube: 'https://www.youtube.com/channel/UCfBkUgaJ6eqYA9_TX2cmq9A',
    twitter: 'https://twitter.com/Virtual_rime',
    telegram: 'https://t.me/Virtual_rime',
    telegram_official: false,
    bilibili: 'https://space.bilibili.com/489046950',
    wiki: 'https://zh.moegirl.org.cn/理芽',
  },
  春猿火: {
    youtube: 'https://www.youtube.com/channel/UCE7gtjLeZKNXLp5YURzYYeg',
    twitter: 'https://twitter.com/harusaruhi',
    bilibili: 'https://space.bilibili.com/488976992',
    wiki: 'https://zh.moegirl.org.cn/春猿火',
  },
  ヰ世界情绪: {
    youtube: 'https://www.youtube.com/channel/UCah4_WVjmr8XA7i5aigwV-Q',
    twitter: 'https://twitter.com/isekaijoucho',
    bilibili: 'https://space.bilibili.com/488978908',
    wiki: 'https://zh.moegirl.org.cn/异世界情绪',
  },
  小雀香奈: {
    youtube: 'https://www.youtube.com/channel/UCASCjjE-gn1I_eFEsF7XrrA',
    twitter: 'https://twitter.com/KosuzumeKana',
    telegram: 'https://t.me/kanaria_group',
    bilibili: 'https://space.bilibili.com/506074310',
    wiki: 'https://zh.moegirl.org.cn/小雀香奈',
  },
  黑狐: {
    twitter: 'https://twitter.com/BlackFoxSAR',
    telegram: 'https://t.me/kanaria_group',
    bilibili: 'https://space.bilibili.com/245050',
    github: 'https://github.com/blackfoxsar/',
  },
  ななひら: {
    youtube: 'https://www.youtube.com/channel/UC_fYA9QRK-aJnFTgvR_4zug',
    twitter: 'https://twitter.com/nanahira',
    wiki: 'https://zh.moegirl.org.cn/Nanahira',
  },
}

export const info = Object.assign(extrasInfo, builtinInfo)

const emptyItems: ItemPickList = {}
for (const i of Object.keys(extrasInfo)) {
  emptyItems[i] = []
}

export const fullExp = Object.assign(emptyItems, exp)

export default fullExp
