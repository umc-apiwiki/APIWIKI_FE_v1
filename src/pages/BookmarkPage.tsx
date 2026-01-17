import { useState } from 'react'
import * as Sentry from '@sentry/react'

const BookmarkPage = () => {
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')

  const handleSendError = async () => {
    setStatus('sending')
    try {
      const eventId = Sentry.captureException(new Error('GlitchTip test error'), {
        tags: { source: 'bookmark-test' },
        level: 'error',
      })

      // Flush to ensure the event is sent before the user navigates away.
      await Sentry.flush(2000)

      setStatus(eventId ? 'done' : 'error')
    } catch (err) {
      console.error('GlitchTip test send failed', err)
      setStatus('error')
    }
  }

  return (
    <div className="flex flex-col gap-3 p-6">
      <button
        type="button"
        className="w-fit rounded-md bg-brand-500 px-4 py-2 text-white shadow hover:bg-brand-600 disabled:cursor-not-allowed disabled:bg-brand-300"
        onClick={handleSendError}
        disabled={status === 'sending'}
      >
        {status === 'sending' ? 'Sending…' : 'Send GlitchTip test error'}
      </button>
      <p className="text-sm text-slate-700">
        상태: {status === 'idle' && '대기 중'}
        {status === 'sending' && '전송 중'}
        {status === 'done' && '전송 완료 (GlitchTip에서 확인하세요)'}
        {status === 'error' && '전송 실패 (콘솔 확인)'}
      </p>
    </div>
  )
}

export default BookmarkPage
