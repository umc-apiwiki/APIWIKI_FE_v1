import Review from './Review'

interface RatingData {
  score: number // 별점 (5, 4, 3, 2, 1)
  count: number // 해당 별점의 리뷰 개수
}

interface RatingSummary {
  averageScore: number // 평균 점수 (예: 4.7)
  totalCount: number // 전체 리뷰 개수 (예: 1022)
  ratings: RatingData[]
}

export default function ReviewSection() {
  const reviews = [
    {
      name: '홍길동',
      score: 5,
      text: '너무조아요 밥도 맛잇고 우양ㅇ냘어ㅑㅇㄴ멀아ㅣㄴ멀아ㅣㄴ멀;ㅏ인;머라인ㅁ;ㅓ라인;머라ㅣ;엄나ㅣ렁니마;ㅓㄹ아ㅣㄴ멀아ㅣㄴㅁ;ㅓㄹ이ㅏㄴ머라ㅣㅇ넘리ㅏ어마ㅣ;ㅓㅇ리ㅏㅁ;ㅓㄹ이ㅏㄴ;ㅓㅁ라ㅣ;러;ㅣㄴㅁ아ㅓㄹ;ㅏㅣㅇㅇㄴㅁㄹㅇㄴㄻㄴㅁ',
      date: '2026년 01월 30일',
    },
    { name: '김철수', score: 4, text: '괜찮아요, 만족합니다.', date: '2026년 01월 28일' },
    { name: '이영희', score: 3, text: '보통이에요, 기대보다는 아쉬움.', date: '2026년 01월 25일' },
  ]
  // 임시 데이터 정의
  const data: RatingSummary = {
    averageScore: 4.7,
    totalCount: 1022,
    ratings: [
      { score: 5, count: 800 },
      { score: 4, count: 150 },
      { score: 3, count: 40 },
      { score: 2, count: 20 },
      { score: 1, count: 12 },
    ],
  }

  return (
    <div>
      {/* 실사용자 후기 */}
      <div>
        <span className="font-medium text-info-darker text-[22px]">실사용자 후기</span>
      </div>
      {/* 별점 */}
      <div className="flex items-center h-60">
        {/* 별점 / 막대 그래프 */}
        <div className="flex gap-12 items-start w-full">
          {/* 별점 */}
          <div className="flex flex-col justify-center items-center h-full">
            {/* 평점 */}
            <div>
              <span className="font-normal text-black text-[64px] leading-tight">4.7</span>
            </div>
            {/* 별 아이콘 */}
            <div className="text-xl">별 별 별 별 별</div>
            {/* 리뷰 갯수 */}
            <div>
              <span className="font-medium text-[#a4a4a4] text-[22px] leading-snug">1.022개</span>
            </div>
          </div>
          {/* 막대 그래프 */}
          <div className="flex-1 flex flex-col gap-1">
            {data.ratings.map((item) => {
              // 백분율 계산 수행
              const percentage = (item.count / data.totalCount) * 100
              return (
                <div key={item.score} className="flex items-center gap-4">
                  {/* 별점 수치 표시 */}
                  <span className="text-xl font-medium text-black">{item.score}</span>
                  {/* 전체 바 배경 생성 */}
                  <div className="flex-1 h-4 bg-[#E8EAED] rounded-full overflow-hidden max-w-[945px]">
                    {/* 데이터 비중을 나타내는 유색 바 생성 */}
                    <div
                      className="h-full bg-[#3B82F6] rounded-full"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      {/* 리뷰 영역 */}
      <div className="flex flex-col gap-8">
        {reviews.map((review, index) => (
          <Review
            key={index}
            name={review.name}
            score={review.score}
            text={review.text}
            date={review.date}
          />
        ))}
      </div>
      {/* 리뷰 모두 보기 */}
      <div className="font-medium text-brand-500 text-[22px] mt-10 mb-10">리뷰 모두 보기</div>
    </div>
  )
}
