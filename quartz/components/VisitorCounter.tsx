import { QuartzComponent } from "./types"

const VisitorCounter: QuartzComponent = () => {
  return (
    <div class="visitor-count-wrap" aria-live="polite">
      <div class="visitor-count-title">📊 방문 카운터</div>
      <div class="visitor-count-grid">
        <span>이 페이지</span>
        <strong id="visitor-count">불러오는 중…</strong>
        <span>전체</span>
        <strong id="visitor-total-count">불러오는 중…</strong>
      </div>
      <div id="visitor-count-note" class="visitor-count-note"></div>
    </div>
  )
}

VisitorCounter.afterDOMLoaded = `
(function () {
  const base = 'https://gonogo.goatcounter.com/counter/'

  function counterPath(path) {
    if (path === 'TOTAL') return 'TOTAL.json'
    return encodeURIComponent(path) + '.json'
  }

  function setText(sel, text) {
    const el = document.querySelector(sel)
    if (el) el.textContent = text
  }

  function compact(n) {
    if (!n) return '0'
    return String(n)
  }

  async function fetchCount(path) {
    const res = await fetch(base + counterPath(path), { mode: 'cors', cache: 'no-store' })
    if (!res.ok) throw new Error('counter disabled or unavailable: ' + res.status)
    const data = await res.json()
    return data.count || data.count_unique || '0'
  }

  async function renderCounters() {
    const cleanPath = window.location.pathname
    try {
      const pageCount = await fetchCount(cleanPath)
      setText('#visitor-count', compact(pageCount))
    } catch (e) {
      setText('#visitor-count', '설정 필요')
    }

    try {
      const totalCount = await fetchCount('TOTAL')
      setText('#visitor-total-count', compact(totalCount))
      setText('#visitor-count-note', '')
    } catch (e) {
      setText('#visitor-total-count', '설정 필요')
      setText('#visitor-count-note', 'GoatCounter에서 visitor counter 허용 옵션을 켜면 숫자가 표시됩니다.')
    }
  }

  renderCounters()
  document.addEventListener('nav', function () {
    window.setTimeout(renderCounters, 250)
  })
})()
`

export default (() => VisitorCounter)
