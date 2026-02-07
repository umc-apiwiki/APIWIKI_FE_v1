import type { AuthType } from '@/types/api'

type AuthFilterProps = {
  value: AuthType[]
  onChange: (next: AuthType[]) => void
}

const OPTIONS: { label: string; value: AuthType }[] = [
  { label: 'OAuth 2.0', value: 'OAUTH2' },
  { label: 'Refresh Token', value: 'REFRESH_TOKEN' },
  { label: 'Access Token', value: 'ACCESS_TOKEN' },
  { label: 'API Key 인증', value: 'API_KEY' },
  { label: 'JWT', value: 'JWT' },
  { label: '쿠키기반 인증', value: 'COOKIE' },
  { label: '기본 인증', value: 'BASIC' },
]

export default function AuthFilter({ value, onChange }: AuthFilterProps) {
  const toggle = (v: AuthType) => {
    const next = value.includes(v) ? value.filter((a) => a !== v) : [...value, v]
    onChange(next)
  }

  return (
    <div className="flex flex-col gap-6">
      {OPTIONS.map(({ label, value: optVal }) => (
        <label
          key={optVal}
          className="flex items-center gap-3 cursor-pointer font-sans font-normal text-lg text-info-darker"
        >
          <input
            type="checkbox"
            checked={value.includes(optVal)}
            onChange={() => toggle(optVal)}
            className="w-4 h-4 accent-brand-500 rounded border border-brand-500"
          />
          {label}
        </label>
      ))}
    </div>
  )
}
