# ruya / gonogo — 시운전 Go/No-Go 관리 저장소

> 현장 생산업무 **시운전(commissioning)** 을 세 역할이 함께 진행하기 위한 협업·문서 저장소입니다. 저장소 이름 `gonogo` 는 단계별 **Go / No-Go 판정 게이트**를 뜻합니다.

## 이 저장소가 하는 일

- 시운전 단계별 **Go/No-Go 판정**을 투명하게 기록·관리합니다. (핵심 문서: [docs/team/go-no-go-체크리스트.md](docs/team/go-no-go-체크리스트.md))
- 세 역할이 **같은 문서·같은 규칙**으로 일하도록 협업 기준을 모아 둡니다.
- 일일보고 · 펀치리스트 · 회의록 등 현장 반복 문서의 **템플릿**을 제공합니다.
- Slack + Claude(이 봇) + PR 기반 작업 흐름을 정리합니다.

## 참여 역할 (3개)

| 역할 | 담당자 | 핵심 책임 |
| --- | --- | --- |
| **테크니션** (Technician) | 〈이름〉 | 현장 시운전 실행 — 장비 조작, 시험 수행, 현장 점검·측정, 이상 발견 및 1차 보고 |
| **슈퍼바이저** (Supervisor) | 〈이름〉 | 테크니션 서포트·조직 간 중간다리 — 일정 조율, 안전 관리, 커뮤니케이션 허브, 일일보고 취합, Go/No-Go 판정 진행 주관 |
| **엔지니어링** (Engineering) | 〈이름〉 | 펀치리스트 관리 + 설계(디자인) — 결함 등록·추적·종결, 설계 검토/변경, 기술 판정 근거 제공 |

> 역할은 확정되었습니다. `〈...〉` 로 표시된 **담당자 이름**만 실제 값으로 채워 주세요. (상세 분담: [역할표-RACI.md](docs/team/역할표-RACI.md))

## 문서 안내

모든 협업 문서는 [`docs/team/`](docs/team/) 에 있습니다. 시작점은 [docs/README.md](docs/README.md) (문서 인덱스)입니다.

| 문서 | 용도 |
| --- | --- |
| [docs/team/go-no-go-체크리스트.md](docs/team/go-no-go-체크리스트.md) | **핵심** — 시운전 판정 게이트 체크리스트 |
| [docs/team/로드맵.md](docs/team/로드맵.md) | 시운전 단계별 마일스톤 |
| [docs/team/역할표-RACI.md](docs/team/역할표-RACI.md) | 역할(테크니션·슈퍼바이저·엔지니어링) × 업무 책임 분담(RACI) |
| [docs/team/slack-설정.md](docs/team/slack-설정.md) | Slack 채널 구성·운영 규칙 |
| [docs/team/claude-슬랙-사용가이드.md](docs/team/claude-슬랙-사용가이드.md) | Slack에서 Claude 사용법 |
| [docs/team/templates/](docs/team/templates/) | 회의록 · 일일보고 · 펀치리스트 템플릿 |

## 기여 방법 (요약)

1. 개발 브랜치에서 작업합니다. (직접 `main` 에 커밋 금지)
2. 변경은 **Pull Request** 로 올리고, 관련 역할이 리뷰합니다.
3. 커밋 메시지는 `feat:` `docs:` `fix:` 등 접두사를 붙입니다. (예: `docs: 일일보고 템플릿 추가`)
4. Slack에서 Claude에게 작업을 요청하면 결과를 PR로 받아 리뷰할 수 있습니다. 자세한 흐름은 [claude-슬랙-사용가이드](docs/team/claude-슬랙-사용가이드.md) 참고.

## 사이트 빌드(참고)

이 저장소는 정적 사이트 생성기 [Quartz](https://quartz.jzhao.xyz/) 기반입니다. 공개 사이트는 `content/` 폴더를 발행합니다. 본 협업 문서는 `docs/` 에 두어 **GitHub에서 바로 읽는 용도**로 관리합니다. (공개 사이트에도 노출하고 싶다면 `content/` 로 옮겨야 합니다.)
