type RatingFilterProps = {
  value: number | null
  onChange: (next: number | null) => void
}

const OPTIONS = [
  { label: '2점 이상', value: 2 },
  { label: '3점 이상', value: 3 },
  { label: '4점 이상', value: 4 },
]

export default function RatingFilter({ value, onChange }: RatingFilterProps) {
  const toggle = (ratingValue: number) => {
    onChange(value === ratingValue ? null : ratingValue)
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
            checked={value === optVal}
            onChange={() => toggle(optVal)}
            className="w-4 h-4 accent-brand-500 rounded border border-brand-500"
          />
          {label}
        </label>
      ))}
    </div>
  )
}
