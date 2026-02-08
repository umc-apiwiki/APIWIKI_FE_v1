import Category from './Category'
import type { CategoryItem, ApiPricing } from '@/types/api'

type PricingSectionProps = {
  categories: CategoryItem[]
  pricing: ApiPricing | null
}

export default function PricingSection({ categories, pricing }: PricingSectionProps) {
  // 요금 정보가 없을 경우를 대비한 기본값 처리임
  if (!pricing) return null

  return (
    <div>
      {/* 요금제 */}
      <div className="mb-20">
        <span className="text-[22px] font-medium text-info-darker">요금제</span>
        <div className="mt-2">
          {pricing.pricingType === 'FREE' ? (
            <p className="text-xl font-medium text-info-dark">무료</p>
          ) : (
            <p className="text-xl font-medium text-info-dark">
              {/* CSV 문자열을 분리하여 줄바꿈으로 렌더링함 */}
              {pricing.pricingInfoCsv.split(',').map((info, index) => (
                <span key={index}>
                  {info.trim()}
                  <br />
                </span>
              ))}
            </p>
          )}
        </div>
      </div>
      
      {/* 카테고리 */}
      {categories.length > 0 && (
        <div className="z-10">
          <span className="text-[22px] font-medium text-info-darker">카테고리</span>
          <div className="flex gap-3 mt-3 mb-6">
            {categories.map((cat) => (
              <Category key={cat.categoryId} category={{ id: cat.categoryId, name: cat.name }} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}