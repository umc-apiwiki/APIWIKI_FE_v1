import APICard from '@/components/APICard'
import { apiData } from '@/data/mockData'
import { useBookmark } from '@/context/BookmarkContext'
import BookmarkCarousel from '@/components/BookmarkCarousel'
import type { ApiPreview } from '@/types/api'

const toPreview = (item: (typeof apiData)[number]): ApiPreview => ({
  apiId: item.id,
  name: item.title,
  summary: item.description,
  avgRating: parseFloat(item.star) || 0,
  reviewCount: 0,
  viewCounts: 0,
  pricingType: item.price === 'Free' ? 'FREE' : item.price === 'Mixed' ? 'MIXED' : 'PAID',
  authType: 'API_KEY',
  providerCompany: 'ETC',
  isFavorited: true,
})

const BookmarkPage = () => {
  const { bookmarkedIds } = useBookmark()

  const myBookmarkedItems = apiData.filter((item) => bookmarkedIds.includes(item.id))

  const groupedData = myBookmarkedItems.reduce(
    (acc, item) => {
      if (!acc[item.date]) {
        acc[item.date] = []
      }
      acc[item.date].push(item)
      return acc
    },
    {} as Record<string, typeof apiData>
  )

  const sortedDates = Object.keys(groupedData)

  return (
    <div className="w-full min-h-screen pb-40 overflow-x-hidden mt-10">
      <div className="flex flex-col w-full max-w-[1440px] mx-auto">
        <div className="w-full flex justify-center mb-16">
          <div className="text-slate-900 text-3xl font-medium font-['Pretendard_Variable'] tracking-widest">
            Archive
          </div>
        </div>

        {sortedDates.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-20 text-gray-400">
            <p className="text-xl">아직 찜한 API가 없습니다.</p>
            <p className="text-sm mt-2">Explore 페이지에서 하트를 눌러보세요!</p>
          </div>
        ) : (
          <div className="flex flex-col gap-10 px-4 md:px-10 lg:px-20">
            {sortedDates.map((date) => (
              <BookmarkCarousel key={date} date={date}>
                {groupedData[date].map((item) => (
                  <APICard key={item.id} {...toPreview(item)} />
                ))}
              </BookmarkCarousel>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default BookmarkPage
