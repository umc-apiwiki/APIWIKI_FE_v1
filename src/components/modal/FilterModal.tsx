import { useState } from 'react'
import Modal from '../modal/Modal'
import PriceFilter from '../filter/PriceFilter'
import RatingFilter from '../filter/RatingFilter'
import AuthFilter from '../filter/AuthFilter'
import DocsFilter from '../filter/DocsFilter'
import ModalButton from './components/ModalButton'
import type { PricingType, AuthType } from '@/types/api'

export type FilterValues = {
  pricingTypes: PricingType[]
  authTypes: AuthType[]
  minRating: number | null
  docs: string[]
}

type FilterModalProps = {
  onClose: () => void
  onApply: (filters: FilterValues) => void
  initialFilters?: Partial<FilterValues>
}

const MENUS = [
  { key: 'A', label: '가격' },
  { key: 'B', label: '평점' },
  { key: 'C', label: 'API 인증 방식' },
  { key: 'D', label: '제공 문서' },
] as const

export default function FilterModal({ onClose, onApply, initialFilters }: FilterModalProps) {
  const [activeMenu, setActiveMenu] = useState<'A' | 'B' | 'C' | 'D'>('A')
  const [filters, setFilters] = useState<FilterValues>({
    pricingTypes: initialFilters?.pricingTypes ?? [],
    authTypes: initialFilters?.authTypes ?? [],
    minRating: initialFilters?.minRating ?? null,
    docs: initialFilters?.docs ?? [],
  })

  const handleApply = () => {
    onApply(filters)
    onClose()
  }

  return (
    <Modal onClose={onClose}>
      <div className="m-8 relative h-full">
        <div className="font-sans text-xl font-medium pb-5">
          <span>Filters</span>
        </div>
        {/* 메뉴 */}
        <div className="flex gap-6 text-lg font-sans font-medium pb-6 m-2">
          {MENUS.map(({ key, label }) => (
            <button
              key={key}
              type="button"
              onClick={() => setActiveMenu(key)}
              className={`relative pb-3 text-lg transition-colors ${activeMenu === key ? 'text-[#0D3C61]' : 'text-[#B0B0B0]'}`}
            >
              {label}
              {activeMenu === key && (
                <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-full h-[1px] bg-[#0D3C61]/80" />
              )}
            </button>
          ))}
        </div>
        {/* 내용물 */}
        <div className="m-2">
          {activeMenu === 'A' && (
            <PriceFilter
              value={filters.pricingTypes}
              onChange={(next) => setFilters((prev) => ({ ...prev, pricingTypes: next }))}
            />
          )}

          {activeMenu === 'B' && (
            <RatingFilter
              value={filters.minRating}
              onChange={(next) => setFilters((prev) => ({ ...prev, minRating: next }))}
            />
          )}

          {activeMenu === 'C' && (
            <AuthFilter
              value={filters.authTypes}
              onChange={(next) => setFilters((prev) => ({ ...prev, authTypes: next }))}
            />
          )}

          {activeMenu === 'D' && (
            <DocsFilter
              value={filters.docs}
              onChange={(next) => setFilters((prev) => ({ ...prev, docs: next }))}
            />
          )}
        </div>
        {/* 필터 적용 버튼 */}
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2">
          <ModalButton onClick={handleApply}>필터 적용</ModalButton>
        </div>
      </div>
    </Modal>
  )
}
