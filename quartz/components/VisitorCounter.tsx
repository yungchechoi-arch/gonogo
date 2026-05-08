import { QuartzComponent } from "./types"

const VisitorCounter: QuartzComponent = () => {
  return (
    <div class="visitor-count-wrap">
      <div class="visitor-count-title">📊 방문 카운터</div>
      <div id="visitor-count">이 페이지 조회수 불러오는 중…</div>
      <div id="visitor-total-count">전체 방문수 불러오는 중…</div>
    </div>
  )
}

VisitorCounter.afterDOMLoaded = `
(function () {
  function renderFallback() {
    const page = document.querySelector('#visitor-count')
    const total = document.querySelector('#visitor-total-count')
    if (page && page.textContent && page.textContent.includes('불러오는 중')) page.textContent = '이 페이지 조회수: 준비 중'
    if (total && total.textContent && total.textContent.includes('불러오는 중')) total.textContent = '전체 방문수: 준비 중'
  }

  function attachCounters() {
    if (!window.goatcounter || !window.goatcounter.visit_count) return false
    const page = document.querySelector('#visitor-count')
    const total = document.querySelector('#visitor-total-count')
    if (!page || !total) return true
    page.textContent = ''
    total.textContent = ''
    try {
      window.goatcounter.visit_count({ append: '#visitor-count', no_branding: true })
      window.goatcounter.visit_count({ append: '#visitor-total-count', path: 'TOTAL', no_branding: true })
    } catch (e) {
      renderFallback()
    }
    return true
  }

  let tries = 0
  const timer = window.setInterval(function () {
    tries += 1
    if (attachCounters() || tries > 80) {
      window.clearInterval(timer)
      if (tries > 80) renderFallback()
    }
  }, 150)

  document.addEventListener('nav', function () {
    window.setTimeout(attachCounters, 250)
  })
})()
`

export default (() => VisitorCounter)
