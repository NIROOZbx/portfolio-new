export interface Contribution {
  date: string
  contributionCount: number
  color: string
}

interface JogruberContribution {
  date: string
  count: number
  level: number
}

interface JogruberResponse {
  total: Record<string, number>
  contributions: JogruberContribution[]
}

export async function fetchContributions(): Promise<{ contributions: Contribution[]; total: number }> {
  const res = await fetch('https://github-contributions-api.jogruber.de/v4/NIROOZbx?y=last')
  if (!res.ok) {
    throw new Error(`Failed to fetch GitHub contributions: ${res.statusText}`)
  }
  const data: JogruberResponse = await res.json()

  const rawContributions = data.contributions || []
  const flattened: Contribution[] = rawContributions.map((item) => ({
    date: item.date,
    contributionCount: item.count,
    color: '',
  }))

  const total = data.total?.lastYear ?? flattened.reduce((acc, curr) => acc + curr.contributionCount, 0)

  return { contributions: flattened, total }
}
