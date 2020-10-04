import { describe, it } from 'mocha'
import { expect } from 'chai'
import * as utils from './utils'

describe('extrackQuery', function () {
  it('should work for message', function () {
    expect(
      utils.extractQuery({
        message: {
          text: '/test',
        },
      })
    ).to.deep.eq(['', 'test'])
  })
  it('should work for inline', function () {
    expect(
      utils.extractQuery({
        inline_query: {
          query: 'test',
        },
      })
    ).to.deep.eq(['test', ''])
  })
})

describe('extractCommand', function () {
  it('should just work', function () {
    expect(utils.extractCommand('/msg')).to.eq('msg')
    expect(utils.extractCommand('/msg@anybot')).to.eq('msg')
    expect(utils.extractCommand('/msg@anybot /msg@args')).to.eq('msg')
  })
})
