/**
 * MobileAPICard 컴포넌트
 * 모바일 환경에서 API 카드를 표시
 * Next.js의 Link와 Image를 React Router의 Link로 변환
 */

import { Link } from 'react-router-dom'
import type { MobileAPI } from '../../types/api'
import styles from './MobileAPICard.module.scss'

type MobileAPICardProps = {
  api: MobileAPI
}

export const MobileAPICard = ({ api }: MobileAPICardProps) => {
  // 사용자 수 포맷팅
  const formatUsers = (users?: string) => {
    if (!users) return 'N/A'
    const num = parseFloat(users.replace(/[^\d.]/g, ''))
    if (users.includes('B')) return `${num}B`
    if (users.includes('M')) return `${num}M`
    if (users.includes('K')) return `${num}K`
    return users
  }

  return (
    <Link to={`/api/${api.id}`} className={styles['api-card']}>
      <div className={styles['api-card__container']}>
        {/* Top Section: Image and Info */}
        <div className={styles['api-card__top']}>
          {/* Logo Image */}
          <div className={styles['api-card__logo']}>
            {api.logo ? (
              api.logo.length > 4 ||
              api.logo.startsWith('http') ||
              api.logo.startsWith('/') ||
              api.logo.startsWith('data:') ? (
                <img
                  src={api.logo}
                  alt={api.name}
                  className={styles['api-card__logo-img']}
                />
              ) : (
                <span className={styles['api-card__logo-icon']}>{api.logo}</span>
              )
            ) : (
              <span className={styles['api-card__logo-placeholder']}>📦</span>
            )}
          </div>

          {/* Right Info Column */}
          <div className={styles['api-card__info']}>
            {/* Title */}
            <div className={styles['api-card__title-row']}>
              <h3 className={styles['api-card__title']}>{api.name}</h3>
            </div>

            {/* Metadata Group */}
            <div className={styles['api-card__meta']}>
              {/* Rating */}
              {api.rating && (
                <div className={styles['api-card__rating']}>
                  <span className={styles['api-card__star-icon']}>★</span>
                  <span className={styles['api-card__rating-text']}>{api.rating}</span>
                </div>
              )}

              {/* Used By */}
              {api.users && (
                <span className={styles['api-card__users']}>{formatUsers(api.users)}+ uses</span>
              )}

              {/* Paid/Free Badge */}
              <span
                className={`${styles['api-card__price']} ${
                  styles[
                    `api-card__price--${
                      api.price === 'free' ? 'free' : api.price === 'paid' ? 'paid' : 'mixed'
                    }`
                  ]
                }`}
              >
                {api.price === 'free' ? 'FREE' : api.price === 'paid' ? 'PAID' : 'MIXED'}
              </span>
            </div>
          </div>
        </div>

        {/* Description */}
        {api.description && (
          <div className={styles['api-card__description']}>{api.description}</div>
        )}
      </div>
    </Link>
  )
}
