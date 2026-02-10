/**
 * MobileHeader 컴포넌트
 * 모바일 환경에서 상단 헤더 표시
 * Vite 환경에서는 public 폴더의 정적 파일 직접 참조
 */

import { Link } from 'react-router-dom'
import styles from './MobileHeader.module.scss'

export const MobileHeader = () => {
  return (
    <header className={styles['mobile-header']}>
      <div className={styles['mobile-header__container']}>
        {/* 로고 */}
        <Link to="/" className={styles['mobile-header__logo-link']}>
          <div className={styles['mobile-header__logo-wrapper']}>
            <img
              src="/logo.svg"
              alt="API Wiki Logo"
              className={styles['mobile-header__logo-img']}
            />
          </div>
          <span className={styles['mobile-header__logo-text']}>API Wiki</span>
        </Link>
      </div>
    </header>
  )
}
