/**
 * MobileNewsCard 컴포넌트
 * 모바일 환경에서 뉴스 카드를 표시
 */

import { Link } from 'react-router-dom'
import type { MobileNewsItem } from '../../types/api'
import styles from './MobileNewsCard.module.scss'

type MobileNewsCardProps = {
  news: MobileNewsItem
}

export const MobileNewsCard = ({ news }: MobileNewsCardProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return '오늘'
    if (diffDays === 1) return '어제'
    if (diffDays < 7) return `${diffDays}일 전`
    return date.toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' })
  }

  return (
    <Link to={`/news/${news.id}`} className={styles['news-card']}>
      <div className={styles['news-card__container']}>
        {/* 제목 */}
        <h3 className={styles['news-card__title']}>{news.title}</h3>

        {/* 메타 정보 */}
        <div className={styles['news-card__meta']}>
          <span className={styles['news-card__meta-item']}>{news.author || '익명'}</span>
          <span className={styles['news-card__separator']}>•</span>
          <span className={styles['news-card__meta-item']}>{formatDate(news.date)}</span>
        </div>
      </div>
    </Link>
  )
}
