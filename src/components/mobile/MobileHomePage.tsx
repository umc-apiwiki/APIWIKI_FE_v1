/**
 * MobileHomePage 컴포넌트
 * 모바일 환경에서 메인 홈 페이지 표시
 * 로직은 useMobileHome Hook으로 완전히 분리
 */

import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../../hooks/useAuth'
import { useMobileHome } from '../../hooks/useMobileHome'
import { MobileBottomNavigation } from './MobileBottomNavigation'
import { MobileSearchModal } from './MobileSearchModal'
import { MobileAPICard } from './MobileAPICard'
import { MobileNewsCard } from './MobileNewsCard'
import styles from './MobileHomePage.module.scss'

export const MobileHomePage = () => {
  const { accessToken } = useAuth()
  const isAuthenticated = !!accessToken
  const {
    scrollProgress,
    isSearchModalOpen,
    isActive,
    popularAPIs,
    suggestedAPIs,
    newsItems,
    categories,
    scrollRef,
    scrollContentRef,
    handleScroll,
    handleScrollToTop,
    handleCategoryClick,
    setIsSearchModalOpen,
    setIsActive,
  } = useMobileHome()

  return (
    <div className={styles['mobile-home']}>
      {/* 상단 헤더 */}
      <header className={styles['mobile-home__header']}>
        <div className={styles['mobile-home__logo']}>
          <img src="/logo.svg" alt="Logo" />
          <span>API Wiki</span>
        </div>
        {isAuthenticated && <span className={styles['mobile-home__points']}>0p</span>}
      </header>

      {/* 메인 컨텐츠 */}
      <main className={styles['mobile-home__main']}>
        {/* 로고 */}
        <motion.div
          className={styles['mobile-home__logo-wrapper']}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <img src="/logo.svg" alt="API Wiki Logo" />
        </motion.div>

        {/* 설명 텍스트 */}
        <motion.p
          className={styles['mobile-home__description']}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          개발자가 함께 만드는 API 지식,
          <br />
          실시간으로 업데이트됩니다
        </motion.p>

        {/* 검색바 - 클릭하면 모달 열림 */}
        <motion.div
          className={styles['mobile-home__search']}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          onClick={() => setIsSearchModalOpen(true)}
        >
          <div className={styles['mobile-home__search-input']}>
            <span>궁금한 API를 검색해보세요</span>
            <img src="/mingcute_search-line.svg" alt="Search" />
          </div>
        </motion.div>

        {/* 카테고리 캐러셀 */}
        <motion.div
          className={styles['mobile-home__carousel']}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className={styles['mobile-home__carousel-scroll']}
          >
            {categories.map((category, index) => (
              <motion.button
                key={category}
                onClick={() => handleCategoryClick(category)}
                className={styles['mobile-home__category-btn']}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.4 + index * 0.03 }}
              >
                {category}
              </motion.button>
            ))}
          </div>

          {/* 프로그레스 인디케이터 */}
          <div className={styles['mobile-home__progress-bar']}>
            <div
              className={styles['mobile-home__progress-indicator']}
              style={{ left: `calc((100% - 0.6rem) * ${scrollProgress / 100})` }}
            />
          </div>
        </motion.div>
      </main>

      {/* 스크롤 인디케이터 - 하단 고정 (메인 화면에서만 표시) */}
      <motion.button
        className={styles['mobile-home__scroll-indicator']}
        onClick={handleScrollToTop}
        animate={{
          opacity: isActive ? 0 : 1,
          y: [0, -6, 0],
        }}
        transition={{
          opacity: { duration: 0.3 },
          y: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
        }}
        style={{
          pointerEvents: isActive ? 'none' : 'auto',
        }}
        aria-label="위로 스크롤"
      >
        <img src="/nav-arrow-up-solid.svg" alt="Scroll to top" />
      </motion.button>

      {/* 스크롤 컨텐츠 섹션 */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            className={styles['mobile-home__scroll-content']}
            ref={scrollContentRef}
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            {/* 내릴 때: 역삼각형 (아래쪽 화살표) */}
            <motion.button
              className={styles['mobile-home__down-arrow']}
              onClick={() => setIsActive(false)}
              animate={{ y: [0, -6, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              aria-label="아래로 스크롤"
            >
              <img src="/nav-arrow-up-solid.svg" alt="Scroll down" />
            </motion.button>

            <div className={styles['mobile-home__content-wrapper']}>
              {/* Latest News */}
              <section className={styles['mobile-home__section']}>
                <h2 className={styles['mobile-home__section-title']}>Latest News</h2>
                <div className={styles['mobile-home__scrollable-section']}>
                  {newsItems.map((news) => (
                    <div key={news.id} className={styles['mobile-home__card-item']}>
                      <MobileNewsCard news={news} />
                    </div>
                  ))}
                </div>
                <div className={styles['mobile-home__progress-bar']} style={{ width: '15%' }}>
                  <div className={styles['mobile-home__progress-indicator']} style={{ width: '0.75rem' }} />
                </div>
              </section>

              {/* Recent Popular */}
              <section className={styles['mobile-home__section']}>
                <h2 className={styles['mobile-home__section-title']}>Recent Popular</h2>
                <div className={styles['mobile-home__scrollable-section']}>
                  {popularAPIs.map((api) => (
                    <div key={api.id} className={styles['mobile-home__card-item']}>
                      <MobileAPICard api={api} />
                    </div>
                  ))}
                </div>
                <div className={styles['mobile-home__progress-bar']} style={{ width: '15%' }}>
                  <div className={styles['mobile-home__progress-indicator']} style={{ width: '0.75rem' }} />
                </div>
              </section>

              {/* Suggest API */}
              <section className={styles['mobile-home__section']}>
                <h2 className={styles['mobile-home__section-title']}>Suggest API</h2>
                <div className={styles['mobile-home__scrollable-section']}>
                  {suggestedAPIs.map((api) => (
                    <div key={api.id} className={styles['mobile-home__card-item']}>
                      <MobileAPICard api={api} />
                    </div>
                  ))}
                </div>
                <div className={styles['mobile-home__progress-bar']} style={{ width: '15%' }}>
                  <div className={styles['mobile-home__progress-indicator']} style={{ width: '0.75rem' }} />
                </div>
              </section>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 하단 네비게이션 */}
      <MobileBottomNavigation />

      {/* 검색 모달 */}
      <MobileSearchModal isOpen={isSearchModalOpen} onClose={() => setIsSearchModalOpen(false)} />
    </div>
  )
}
