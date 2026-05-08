import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/footer.scss"
import { version } from "../../package.json"
import { i18n } from "../i18n"

interface Options {
  links: Record<string, string>
}

export default ((opts?: Options) => {
  const Footer: QuartzComponent = ({ displayClass, cfg }: QuartzComponentProps) => {
    const year = new Date().getFullYear()
    const links = opts?.links ?? []
    return (
      <footer class={`${displayClass ?? ""}`}>
        <p>
          {i18n(cfg.locale).components.footer.createdWith}{" "}
          <a href="https://quartz.jzhao.xyz/">Quartz v{version}</a> © {year}
        </p>
        <ul>
          {Object.entries(links).map(([text, link]) => (
            <li>
              <a href={link}>{text}</a>
            </li>
          ))}
        </ul>
        <p class="footer-visit-counter">📊 방문수: <strong id="footer-page-count">-</strong> · 전체: <strong id="footer-total-count">-</strong></p>
      </footer>
    )
  }

  Footer.css = style
  Footer.afterDOMLoaded = `
(function () {
  const base = 'https://gonogo.goatcounter.com/counter/'
  function enc(path) { return path === 'TOTAL' ? 'TOTAL.json' : encodeURIComponent(path) + '.json' }
  async function get(path) {
    const r = await fetch(base + enc(path), { mode: 'cors', cache: 'no-store' })
    if (!r.ok) throw new Error(String(r.status))
    const j = await r.json()
    return j.count || j.count_unique || '0'
  }
  async function render() {
    const page = document.querySelector('#footer-page-count')
    const total = document.querySelector('#footer-total-count')
    if (!page || !total) return
    try { page.textContent = await get(window.location.pathname) } catch { page.textContent = '설정확인' }
    try { total.textContent = await get('TOTAL') } catch { total.textContent = '설정확인' }
  }
  render()
  document.addEventListener('nav', function () { window.setTimeout(render, 250) })
})()
`
  return Footer
}) satisfies QuartzComponentConstructor
