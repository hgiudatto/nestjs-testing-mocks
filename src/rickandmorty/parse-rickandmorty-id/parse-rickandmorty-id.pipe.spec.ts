import { BadRequestException } from '@nestjs/common'
import { ParseRickandmortyIdPipe } from './parse-rickandmorty-id.pipe'

describe('ParseRickandmortyIdPipe', () => {
  let pipe: ParseRickandmortyIdPipe

  beforeEach(() => {
    pipe = new ParseRickandmortyIdPipe()
  })
  it('should be defined', () => {
    expect(new ParseRickandmortyIdPipe()).toBeDefined()
  })
  it('should throw an error for non numbers', () => {
    const value = () => pipe.transform('hello')
    expect(value).toThrow(BadRequestException)
  })

  it('should throw error if number less than 1', () => {
    const value = () => pipe.transform('-166')
    expect(value).toThrow(BadRequestException)
  })
  it('should throw error if number greater than 826', () => {
    const value = () => pipe.transform('1279')
    expect(value).toThrow(BadRequestException)
  })
  it('should return number if between 1 and 826', () => {
    const value = () => pipe.transform('19')
    expect(value()).toBe(19)
  })
})
