/* eslint-disable prettier/prettier */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Injectable,
  BadRequestException,
  Logger,
  InternalServerErrorException,
} from '@nestjs/common'
import { HttpService } from '@nestjs/axios'
import {
  ReadRickandmorty,
  RickAndMortyResponse,
} from './dto/read-rickandmorty.dto'
import { AxiosError, AxiosResponse } from 'axios'
import { Observable, firstValueFrom, forkJoin, throwError } from 'rxjs'
import { catchError, map } from 'rxjs/operators'
import { response } from 'express'
@Injectable()
export class RickandmortyService {
  private readonly logger = new Logger(RickandmortyService.name)
  private readonly RICK_AND_MORTY_API =
    'https://rickandmortyapi.com/api/character'
  constructor(private readonly httpService: HttpService) {}

  sleepFetchRickMortys = (delay: number) =>
    new Promise((resolve) => setTimeout(resolve, delay))

  retrieveRicks = async (rickId: string): Promise<ReadRickandmorty> => {
    return new Promise(async (resolve, reject) => {
      const dateStarted = new Date()
      const millisStart = dateStarted.getMilliseconds()
      const secsStart = dateStarted.getSeconds()
      const minsStart = dateStarted.getMinutes()
      const hourStart = dateStarted.getHours()
      const fullTimeSearchStarted = `${hourStart}:${minsStart}:${secsStart}:${millisStart}`
      this.logger.debug(`Search started out at: ${fullTimeSearchStarted}`)
      try {
        const { data } = await this.httpService.axiosRef({
          url: `https://rickandmortyapi.com/api/character/${rickId}`,
          method: 'GET',
        })
        let rickFound: ReadRickandmorty = new ReadRickandmorty()
        rickFound = data
        resolve(rickFound)
      } catch (err) {
        throw new InternalServerErrorException()
      }
      const dateFinished = new Date()
      const millisFinish = dateFinished.getMilliseconds()
      const secsFinish = dateFinished.getSeconds()
      const minsFinish = dateFinished.getMinutes()
      const hourFinish = dateFinished.getHours()
      const fullTimeSearchFinished = `${hourFinish}:${minsFinish}:${secsFinish}:${millisFinish}`
      this.logger.debug(`Search Finished at: ${fullTimeSearchFinished}`)
    })
  }

  async fetchEveryRickAndMorty(userData) {
    const { rickMortyIds } = userData
    const goodRicks = []

    rickMortyIds.some((rmId: any) => {
      let rm: number = Number(rmId)
      if (rm < 1 || rm > 826) {
        throw new TypeError('Invalid RickAndMorty ID')
      }
    })

    const getSearchedRicks = async (rickMorty) => {
      this.sleepFetchRickMortys(3000)
      return new Promise(async (resolve) => {
        const response: ReadRickandmorty = await this.retrieveRicks(rickMorty)
        const successfulRick = response
        if (!!response) {
          goodRicks.push(successfulRick)
        }
        resolve(response)
      })
    }

    for (const rickMortyId of rickMortyIds) {
      this.logger.debug(`Retrieve rick with id: ${rickMortyId}`)
      await getSearchedRicks(rickMortyId)
    }

    return { goodRicks }
  }

  async fetchOneRickAndMorty(userData) {
    const rickMortyId = userData
    let goodRick

    const getRick = async (rickMorty) => {
      this.sleepFetchRickMortys(3000)

      return new Promise(async (resolve) => {
        const response: ReadRickandmorty = await this.retrieveRicks(rickMorty)
        const successfulRick = response
        if (!!successfulRick) {
          resolve(successfulRick)
        }
      })
    }

    goodRick = getRick(rickMortyId)

    return goodRick
  }

  async fetchFilteredRickAndMorty(name: string, status: string) {
    let goodRicks = []

    const getFilteredRicks = async (): Promise<any[]> => {
      return new Promise(async (resolve, reject) => {
        try {
          const { data } = await this.httpService.axiosRef({
            url: `${this.RICK_AND_MORTY_API}/?name=${name}&status=${status}`,
            method: 'GET',
          })
          let rickFound
          data?.results.map((res) => {
            rickFound = res
            goodRicks.push(rickFound)
          })
          resolve(goodRicks)
        } catch (err) {
          reject()
          throw new InternalServerErrorException()
        }
      })
    }

    await getFilteredRicks()

    return { goodRicks }
  }
}
