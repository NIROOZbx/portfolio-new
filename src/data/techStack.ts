import awsIcon from '../assets/tech-stack/AWS.svg'
import kafkaIcon from '../assets/tech-stack/Apache Kafka.svg'
import dockerIcon from '../assets/tech-stack/Docker.svg'
import gitIcon from '../assets/tech-stack/Git.svg'
import githubActionsIcon from '../assets/tech-stack/GitHub Actions.svg'
import githubIcon from '../assets/tech-stack/GitHub.svg'
import goIcon from '../assets/tech-stack/Go.svg'
import grafanaIcon from '../assets/tech-stack/Grafana.svg'
import helmIcon from '../assets/tech-stack/Helm.svg'
import nginxIcon from '../assets/tech-stack/NGINX.svg'
import postgresIcon from '../assets/tech-stack/PostgresSQL.svg'
import prometheusIcon from '../assets/tech-stack/Prometheus.svg'
import redisIcon from '../assets/tech-stack/Redis.svg'
import tailwindIcon from '../assets/tech-stack/Tailwind CSS.svg'
import typescriptIcon from '../assets/tech-stack/TypeScript.svg'
import k8 from '../assets/tech-stack/kubernetes.png'
import gin from '../assets/tech-stack/gin.png'
import fiber from '../assets/tech-stack/fiber.svg'

export interface TechItem {
  name: string
  image?: string
}

export const techStack: TechItem[] = [
  { name: 'Go', image: goIcon },
  { name: 'Fiber v3', image: fiber },
  { name: 'Gin', image: gin },
  { name: 'Kafka', image: kafkaIcon },
  { name: 'Tailwind', image: tailwindIcon },
  { name: 'TypeScript', image: typescriptIcon },
  { name: 'PostgreSQL', image: postgresIcon },
  { name: 'Kubernetes', image: k8 },
  { name: 'NGINX', image: nginxIcon },
  { name: 'AWS', image: awsIcon },
  { name: 'CI/CD', image: '' },
  { name: 'GitHub Actions', image: githubActionsIcon },
  { name: 'gRPC', image: '' },
  { name: 'Docker', image: dockerIcon },
  { name: 'Grafana', image: grafanaIcon },
  { name: 'Helm', image: helmIcon },
  { name: 'Prometheus', image: prometheusIcon },
  { name: 'React', image: '' },
  { name: 'Redis', image: redisIcon },
  { name: 'Git', image: gitIcon },
  { name: 'GitHub', image: githubIcon }
]
