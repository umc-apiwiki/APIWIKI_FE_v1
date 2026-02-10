/**
 * MobileSearchModal 컴포넌트
 * 모바일 환경에서 검색 모달 표시
 * 로직은 useMobileSearch Hook으로 완전히 분리
 */

import { AnimatePresence, motion } from 'framer-motion'
import { useMobileSearch } from '../../hooks/useMobileSearch'
import styles from './MobileSearchModal.module.scss'

type MobileSearchModalProps = {
  isOpen: boolean
  onClose: () => void
}

export const MobileSearchModal = ({ isOpen, onClose }: MobileSearchModalProps) => {
  const {
    query,
    recentSearches,
    suggestions,
    modalRef,
    setQuery,
    handleSearch,
    handleKeyPress,
    removeRecentSearch,
  } = useMobileSearch({ isOpen, onClose })

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles['search-modal']}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className={styles['search-modal']} ref={modalRef}>
            {/* 검색바 */}
            <div className={styles['search-modal__header']}>
              <div className={styles['search-modal__search-container']}>
                <div className={styles['search-modal__input-wrapper']}>
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="궁금한 API를 검색해보세요"
                    className={styles['search-modal__input']}
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => handleSearch()}
                    className={styles['search-modal__search-button']}
                    aria-label="검색"
                  >
                    <img src="/mingcute_search-line.svg" alt="Search" width={20} height={20} />
                  </button>
                </div>
              </div>
            </div>

            {/* 검색 제안 또는 Recent 섹션 */}
            <div className={styles['search-modal__content']}>
              {query.trim().length >= 1 ? (
                /* 자동완성 제안 */
                <>
                  {suggestions.length > 0 && (
                    <div className={styles['search-modal__autocomplete-section']}>
                      <div className={styles['search-modal__section-header']}>
                        <span className={styles['search-modal__section-title']}>검색 제안</span>
                      </div>
                      <div className={styles['search-modal__autocomplete-list']}>
                        {suggestions.map((item, idx) => (
                          <button
                            key={`suggestion-${idx}`}
                            className={styles['search-modal__autocomplete-item']}
                            onClick={() => handleSearch(item)}
                          >
                            <div className={styles['search-modal__search-icon']}>
                              <img
                                src="/mingcute_search-line.svg"
                                alt="Search"
                                width={20}
                                height={20}
                              />
                            </div>
                            <span className={styles['search-modal__suggestion-text']}>
                              {item.split(new RegExp(`(${query})`, 'gi')).map((part, i) =>
                                part.toLowerCase() === query.toLowerCase() ? (
                                  <span key={i} className="font-bold text-blue-600">
                                    {part}
                                  </span>
                                ) : (
                                  part
                                )
                              )}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                /* Recent 섹션 */
                recentSearches.length > 0 && (
                  <div className={styles['search-modal__recent-section']}>
                    <div className={styles['search-modal__section-header']}>
                      <span className={styles['search-modal__section-title']}>Recent</span>
                    </div>

                    <div className={styles['search-modal__recent-list']}>
                      {recentSearches.map((item, idx) => (
                        <button
                          key={`recent-${idx}`}
                          className={styles['search-modal__recent-item']}
                          onClick={() => handleSearch(item)}
                        >
                          <div className={styles['search-modal__item-left']}>
                            <div className={styles['search-modal__clock-icon']}>
                              <img src="/mdi_recent.svg" alt="Recent" width={20} height={20} />
                            </div>
                            <span className={styles['search-modal__search-text']}>{item}</span>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              removeRecentSearch(item)
                            }}
                            className={styles['search-modal__delete-button']}
                            aria-label="삭제"
                          >
                            <img
                              src="/search_save_remove.svg"
                              alt="Remove"
                              width={16}
                              height={16}
                            />
                          </button>
                        </button>
                      ))}
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
