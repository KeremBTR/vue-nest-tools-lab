export interface Profile {
  id: string
  name: string
  bio: string
}

const mockProfiles: Profile[] = [
  {
    id: '123',
    name: 'Dutch van der Linde',
    bio: 'Always has a plan. Desperate of some goddamn faith. Loves Tahiti.',
  },
  {
    id: '456',
    name: 'Arthur Morgan',
    bio: 'Always stands his ground for the team. Professional horse enthusiast. Loves jellybeans.',
  },
]

const shouldFail = false

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export async function getProfiles(): Promise<Profile[]> {
  await delay(800)

  if (shouldFail) {
    throw new Error('Failed to load profiles.')
  }

  return mockProfiles
}
