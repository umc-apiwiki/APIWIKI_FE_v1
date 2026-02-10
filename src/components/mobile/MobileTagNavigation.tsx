/**
 * MobileTagNavigation 컴포넌트
 * 모바일 환경에서 태그 네비게이션 표시
 * framer-motion을 사용하여 애니메이션 효과 적용
 */

import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import styles from './MobileTagNavigation.module.scss'

type Tag = {
  id: string
  name: string
  icon?: string
  color?: string
}

const tags: Tag[] = [
  { id: 'public', name: '공개', icon: '🌐', color: 'blue' },
  { id: 'opensource', name: '오픈소스', icon: '📦', color: 'green' },
  { id: 'search', name: '검색', icon: '🔍', color: 'purple' },
  { id: 'translate', name: '번역', icon: '🌍', color: 'pink' },
  { id: 'ai', name: 'AI', icon: '🤖', color: 'indigo' },
  { id: 'finance', name: '금융', icon: '💰', color: 'yellow' },
]

export const MobileTagNavigation = () => {
  return (
    <div className={styles['tag-nav']}>
      <div className={styles['tag-nav__container']}>
        {tags.map((tag, index) => (
          <motion.div key={tag.id} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: index * 0.05 }}>
            <Link
              to={`/explore?tag=${tag.id}`}
              className={`${styles['tag-nav__link']} ${
                styles[`tag-nav__link--${tag.color || 'gray'}`]
              }`}
            >
              {tag.icon && <span className={styles['tag-nav__icon']}>{tag.icon}</span>}
              <span className={styles['tag-nav__text']}>{tag.name}</span>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
