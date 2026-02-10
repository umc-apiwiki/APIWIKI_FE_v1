import { useParams } from 'react-router-dom'
import { useDeleteReview } from '@/hooks'
import profileImg from '@/assets/default_profile.png'
import StarFilled from '@/assets/icons/common/ic_star_filled.svg'
import StarEmpty from '@/assets/icons/common/ic_star_empty.svg'

interface MobileReviewProps {
  reviewId: number
  name: string
  score: number
  text: string
  date: string
  isMine?: boolean
  onDeleteSuccess?: () => void
}

const MAX_SCORE = 5

export default function MobileReview({
  reviewId,
  name,
  score,
  text,
  date,
  isMine,
  onDeleteSuccess,
}: MobileReviewProps) {
  const { apiId } = useParams<{ apiId: string }>()
  const { removeReview, isLoading } = useDeleteReview()

  const handleDelete = () => {
    if (!apiId) return
    if (window.confirm('정말로 이 리뷰를 삭제하시겠습니까?')) {
      removeReview(Number(apiId), reviewId, () => {
        alert('리뷰가 삭제되었습니다.')
        onDeleteSuccess?.()
      })
    }
  }

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm">
      {/* 프로필 및 삭제 버튼 */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <img
            src={profileImg}
            alt="사용자 프로필"
            className="w-10 h-10 rounded-full object-cover"
          />
          <span className="font-semibold text-black text-sm">{name}</span>
        </div>

        {isMine && (
          <button
            onClick={handleDelete}
            disabled={isLoading}
            className="text-gray-400 hover:text-red-500 text-sm font-medium transition-colors disabled:opacity-50"
          >
            {isLoading ? '삭제 중...' : '삭제'}
          </button>
        )}
      </div>

      {/* 별점 및 날짜 */}
      <div className="flex items-center gap-2 mb-2">
        <div className="flex gap-0.5">
          {Array.from({ length: MAX_SCORE }).map((_, idx) => (
            <img
              key={idx}
              src={idx < score ? StarFilled : StarEmpty}
              alt={idx < score ? 'Filled star' : 'Empty star'}
              className="w-4 h-4"
            />
          ))}
        </div>
        <span className="text-[#6A6A6A] text-xs">{date}</span>
      </div>

      {/* 리뷰 본문 */}
      <p className="text-[#6A6A6A] text-sm leading-relaxed mb-3">{text}</p>

      {/* 피드백 영역 */}
      <div className="flex flex-col gap-2">
        <span className="text-[#b0b0b0] text-xs">이 리뷰가 유용했나요?</span>
        <div className="flex gap-2">
          <button
            type="button"
            className="rounded-full border border-info-dark/70 bg-white h-7 px-3 text-info-dark text-xs hover:bg-info-dark hover:text-white transition-colors duration-200"
          >
            예
          </button>
          <button
            type="button"
            className="rounded-full border border-info-dark/70 bg-white h-7 px-3 text-info-dark text-xs hover:bg-info-dark hover:text-white transition-colors duration-200"
          >
            아니요
          </button>
        </div>
      </div>
    </div>
  )
}
