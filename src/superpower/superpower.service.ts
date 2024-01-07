export class SuperpowerService {
  getSuperpower(): string {
    const superpowers = [
      'Flight',
      'Invisibility',
      'Super Strength',
      'Telepathy',
    ]
    return superpowers[Math.floor(Math.random() * superpowers.length)]
  }
}
