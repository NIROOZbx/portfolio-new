export interface Contribution {
  date: string
  contributionCount: number
  color: string
}

interface GitHubContributionsResponse {
  contributions: Contribution[] | Contribution[][]
  totalContributions: number
}

export async function fetchContributions(): Promise<{ contributions: Contribution[]; total: number }> {
  const res = await fetch('https://github-contributions-api.deno.dev/NIROOZbx.json')
  const data: GitHubContributionsResponse = await res.json()

  const rawContributions = data.contributions
  const flattened: Contribution[] = Array.isArray(rawContributions)
    ? Array.isArray(rawContributions[0])
      ? (rawContributions as Contribution[][]).flat()
      : (rawContributions as Contribution[])
    : []

  return { contributions: flattened, total: data.totalContributions || 0 }
}
