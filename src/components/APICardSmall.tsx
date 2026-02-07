import { useNavigate } from 'react-router-dom'
import type { ApiPreview } from '@/types/api'

const PRICING_LABEL: Record<string, string> = {
  FREE: 'Free',
  PAID: 'Paid',
  MIXED: 'Free & Paid',
}

export default function APICardSmall({ apiId, name, avgRating, reviewCount, pricingType }: ApiPreview) {
  const navigate = useNavigate()

  return (
    <div
      className="group relative w-[300px] h-36 flex-shrink-0 cursor-pointer"
      onClick={() => navigate(`/apis/${apiId}`)}
    >
      {/* 카드 배경 */}
      <div className="absolute inset-0 rounded-[15px] border-brand-500/30 border-thin bg-white shadow-[1px_5px_10px_0px_var(--tw-shadow-color)] shadow-brand-500/25" />

      {/* 카드 내부 콘텐츠 */}
      <div className="relative pl-8">
        <div className="flex gap-4 h-36">
          {/* 아이콘 placeholder */}
          <div className="flex items-center justify-center flex-shrink-0">
            <div className="w-[70px] h-[70px] rounded-[10px] overflow-hidden flex-shrink-0 bg-white border border-brand-500/50 flex items-center justify-center">
              <span className="text-brand-500 font-semibold text-2xl">
                {name.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>

          {/* 텍스트 정보 */}
          <div className="flex flex-col justify-center pl-2">
            <h3 className="text-info-darker font-medium leading-tight text-xl pb-2">{name}</h3>
            <p className="text-sm font-medium">Star {avgRating.toFixed(1)}</p>
            <p className="text-sm font-medium">{reviewCount} reviews</p>
            <p className="text-[#B0B0B0] text-xs mt-0.5">{PRICING_LABEL[pricingType] ?? pricingType}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
