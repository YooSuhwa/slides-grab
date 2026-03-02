# ralph-boo: LLM 기반 커플 궁합 시뮬레이터
## Ralph Loop으로 만든 AI 프로젝트

---

## Meta

| 항목 | 내용 |
|------|------|
| **Topic** | ralph-boo: LLM 기반 커플 궁합 시뮬레이터 — Ralph Loop으로 만든 AI 프로젝트 |
| **Target Audience** | 개발자 및 AI에 관심 있는 일반인 |
| **Purpose** | ralph-boo 프로젝트 소개 + Ralph Loop 개발 방법론 소개 |
| **Language** | 한국어 |
| **Tone/Mood** | 모던, 다크 테마, 보라색/핑크 계열 포인트 컬러 (로맨스 + 테크 융합) |
| **Slide Count** | 18 slides |
| **Aspect Ratio** | 16:9 |
| **발표 시간** | 약 30분 (발표 25분 + Q&A 5분) |

---

## Executive Summary

1. **AI가 사랑을 시뮬레이션한다**: ralph-boo는 두 AI 페르소나가 자연어 대화를 나누며 관계를 발전 또는 소멸시키는 LLM 기반 커플 궁합 시뮬레이터이다.
2. **정교한 멀티 에이전트 아키텍처**: Moderator, Persona Agent, Scorekeeper, Affinity Engine, Judge 5개 역할이 협력하는 구조로, 감정 상태를 수치화하여 관계 결과를 결정한다.
3. **100회 배치 시뮬레이션**: 단일 대화가 아닌 100회 이상의 반복 시뮬레이션으로 통계적 궁합 확률을 산출한다.
4. **Ralph Loop으로 개발됨**: PRD 기반 에이전트 주도 개발 루프(Ralph Loop)를 통해 21개 유저 스토리 전부를 AI 에이전트가 구현하고 검증했다.
5. **AI 에이전트의 가능성 실증**: PRD만 있으면 AI 에이전트가 복잡한 시스템도 자율적으로 구현할 수 있다는 것을 직접 보여준 프로젝트이다.

---

## 목차 (Table of Contents)

| 섹션 | 슬라이드 | 예상 시간 |
|------|----------|-----------|
| 1. 프로젝트 소개 | 슬라이드 1~3 | 3분 |
| 2. 핵심 아키텍처 | 슬라이드 4~7 | 6분 |
| 3. 시뮬레이션 흐름 | 슬라이드 8~9 | 4분 |
| 4. 기술 스택 | 슬라이드 10 | 2분 |
| 5. Ralph Loop으로 만들었다 | 슬라이드 11~14 | 7분 |
| 6. 데모 / 결과 | 슬라이드 15~16 | 3분 |
| 7. 마무리 | 슬라이드 17~18 | 5분 |

---

## 디자인 가이드

### 색상 팔레트

| 용도 | 색상 | HEX 코드 |
|------|------|----------|
| 배경 (주) | 딥 다크 네이비 | #0D0D1A |
| 배경 (보조) | 다크 퍼플 | #1A1030 |
| 포인트 1 | 바이올렛 | #7C3AED |
| 포인트 2 | 핫 핑크 | #EC4899 |
| 그라데이션 | 퍼플 → 핑크 | #7C3AED → #EC4899 |
| 강조 텍스트 | 라벤더 | #C4B5FD |
| 본문 텍스트 | 라이트 그레이 | #E2E8F0 |
| 서브 텍스트 | 미드 그레이 | #94A3B8 |
| 코드 배경 | 다크 슬레이트 | #1E293B |
| 성공/PASS | 에메랄드 | #10B981 |

### 폰트 가이드

- **메인 제목**: Pretendard Bold, 48~56pt
- **섹션 제목**: Pretendard SemiBold, 36~40pt
- **슬라이드 제목**: Pretendard Medium, 28~32pt
- **본문**: Pretendard Regular, 18~22pt
- **코드/기술 용어**: JetBrains Mono, 16~18pt
- **캡션/출처**: Pretendard Regular, 14pt, 미드 그레이

### 전반적인 톤 & 무드

- **스타일**: 모던 다크 테크, 사이버펑크 감성
- **분위기**: 로맨틱하면서도 정밀한 기술적 느낌의 이중성
- **시각적 요소**: 코드 스니펫, 플로우 다이어그램, 글로우(glow) 효과, 그라데이션 라인
- **배경 장식**: 은은한 파티클 혹은 격자 패턴 (너무 과하지 않게)

---

## 슬라이드 구성

---

### Slide 1 - Cover

- **Type**: Cover
- **Title**: ralph-boo
- **Subtitle**: LLM이 사랑을 시뮬레이션하면 어떤 일이 일어날까?
- **Sub-description**: Ralph Loop으로 만든 AI 멀티에이전트 커플 궁합 프로젝트
- **발표자 정보**: [발표자명] / [소속 또는 역할]
- **날짜**: 2026년 3월

**Key Message**: 시작부터 흥미를 유발 — "AI가 연애를 시뮬레이션한다"는 컨셉으로 청중의 호기심을 자극한다.

**Details**:
- 배경: 딥 다크 배경(#0D0D1A) + 보라/핑크 그라데이션 오로라 효과
- 메인 타이틀 "ralph-boo"는 그라데이션(#7C3AED → #EC4899) 텍스트로 크게 표시
- 하트 + 회로 기판이 결합된 심볼 아이콘 (로맨스 + 테크)
- 하단에 GitHub 링크 또는 QR 코드 배치 가능

---

### Slide 2 - Table of Contents

- **Type**: Contents
- **Title**: 오늘 다룰 내용

**Items**:
1. 프로젝트 소개 — Black Mirror에서 시작된 아이디어
2. 핵심 아키텍처 — 5개 에이전트의 협력 구조
3. 시뮬레이션 흐름 — 대화에서 판정까지
4. 기술 스택 — Python, FastAPI, Next.js, LLM 라우터
5. Ralph Loop — AI가 AI를 만드는 개발 방법론
6. 데모 & 결과 — 실제 시뮬레이션 결과
7. 마무리 & Q&A

**Details**:
- 7개 섹션을 아이콘과 함께 나열
- 현재 섹션 강조 방식 적용 (이후 섹션 구분자 슬라이드에 동일 목차 반복, 현재 위치 하이라이트)
- 각 섹션에 관련 미니 아이콘 배치 (하트, 회로, 그래프, 스택, 루프 화살표, 스크린, 체크)

---

### Slide 3 - 프로젝트 소개: 영감의 출발점

- **Type**: Quote / Context
- **Title**: "시스템이 최적의 파트너를 알고 있다면, 당신은 믿겠는가?"
- **출처**: Black Mirror, "Hang the DJ" (Season 4, Episode 4, 2017)

**Key Message**: 알고리즘이 인간의 운명적 만남을 설계한다는 SF 설정에서 출발하여, 이를 LLM으로 구현하는 프로젝트를 만들었다.

**Details**:
- **에피소드 요약**:
  - "Hang the DJ"는 넷플릭스 Black Mirror의 에피소드로, AI 시스템이 사람들에게 연애 파트너를 배정하고 관계 만료일을 정해주는 디스토피아적 세계를 그림
  - 핵심 반전: 시뮬레이션 속 두 주인공이 시스템에 반항(rebel)하면 현실에서 매칭됨
  - 1000번 시뮬레이션 중 998번 반항 → 99.8%의 매칭 확률

- **ralph-boo의 출발점**:
  - "이 에피소드의 시뮬레이션 자체를 LLM으로 실제로 구현해보면 어떨까?"
  - AI 페르소나 2명이 실제로 대화하고, 관계를 발전 또는 소멸시키며, 최종적으로 rebel 또는 accept를 선택

- **시각 요소 제안**:
  - 좌측: Black Mirror 에피소드 스타일의 어두운 씬 분위기 일러스트
  - 우측: 화살표로 연결된 "영감 → 구현" 흐름
  - 인용문은 큰 폰트로 상단 배치, 핑크 색상 강조

---

### Slide 4 - Section Divider: 핵심 아키텍처

- **Type**: Section Divider
- **Section Number**: 02
- **Title**: 핵심 아키텍처
- **Subtitle**: 5개 에이전트가 만드는 감정의 시스템

**Details**:
- 전체 화면 다크 배경 + 보라 그라데이션 수직 라인
- 섹션 번호를 크고 반투명하게 배경에 배치
- 중앙에 간결한 제목과 부제목

---

### Slide 5 - 아키텍처 개요: 5개 에이전트

- **Type**: Architecture Overview
- **Title**: ralph-boo를 구성하는 5개 역할

**Key Message**: 단일 LLM 호출이 아닌, 역할이 명확히 분리된 5개 에이전트가 협력하여 복잡한 관계 역학을 시뮬레이션한다.

**Details**:

| 에이전트 | 역할 | 핵심 특성 |
|----------|------|-----------|
| **Moderator (God)** | 시뮬레이션 연출자 | tool-calling 기반, 전체 흐름 제어 |
| **Persona Agent A** | 롤플레이 에이전트 | 내면/행동/기억 3레이어 표현 |
| **Persona Agent B** | 롤플레이 에이전트 | 내면/행동/기억 3레이어 표현 |
| **Scorekeeper** | 감정 점수 산정 | -2 ~ +2 숨겨진 점수, 매 발화마다 평가 |
| **Affinity Engine** | 상태 머신 | like/strike/low_streak 상태 관리 |
| **Judge** | 최종 판정자 | rebel / accept 이분법적 결정 |

- **시각 요소 제안**:
  - 중앙에 플로우 다이어그램: Moderator가 상단에서 아래로 연결됨
  - Persona A ↔ Persona B: 양방향 화살표 (대화)
  - Scorekeeper, Affinity Engine, Judge: 우측에 세로로 배열, 각 단계로 연결
  - 각 에이전트 박스는 보라/핑크 테두리 + 아이콘

---

### Slide 6 - Persona Agent: 3레이어 자기 표현

- **Type**: Content Detail
- **Title**: Persona Agent — 인간다운 AI 캐릭터의 3레이어

**Key Message**: 페르소나 에이전트는 겉으로 드러나는 행동과 속마음, 기억을 구분하여 표현함으로써 실제 인간 관계의 복잡성을 모사한다.

**Details**:

**3가지 태그 시스템**:

- `(내면)` — 속마음, 감정 상태, 드러내지 않는 생각
  - 예시: `(내면) 사실 저 말이 조금 상처가 됐어. 근데 티 내기 싫어.`
  - LLM이 캐릭터의 진짜 심리 상태를 추론하여 생성

- `*행동*` — 비언어적 행동, 표정, 제스처
  - 예시: `*잠깐 말을 멈추고 창밖을 바라본다*`
  - 텍스트 대화에 비언어 커뮤니케이션 레이어 추가

- `【기억】` — 이전 대화에서 생성된 중요 기억
  - 예시: `【기억】 저번에 좋아하는 영화 물어봤을 때 말 돌렸음`
  - 단기/장기 기억 관리로 대화 일관성 유지

**시각 요소 제안**:
- 3개 컬럼 레이아웃: 각 태그를 카드 형태로 표현
- 실제 대화 예시를 코드 블록 스타일로 보여줌 (어두운 배경 + 컬러 하이라이팅)
- `(내면)` = 라벤더(#C4B5FD), `*행동*` = 핑크(#EC4899), `【기억】` = 골드 색상 구분

---

### Slide 7 - Affinity Engine: 감정을 수식으로

- **Type**: Data / Formula
- **Title**: Affinity Engine — 관계를 수학으로 정의하다

**Key Message**: 두 AI 사이의 감정 변화는 명확한 수식과 상태 머신으로 정의되며, 이것이 시뮬레이션의 결정론적 공정성을 보장한다.

**Details**:

**Scorekeeper 평가 기준**:
- 매 발화(turn) 후 -2 ~ +2 점수 부여
- -2: 심각한 갈등/상처 / -1: 부정적 / 0: 중립 / +1: 긍정적 / +2: 매우 긍정적

**Affinity Engine 수식**:

```
like_r   <- clamp(like_r * 0.99 + 4 * s,   0, 100)
strike_r <- max(0, strike_r * 0.97 + max(0, -s))
```

| 변수 | 설명 | 초기값 |
|------|------|--------|
| `like_r` | 호감도 (0~100) | 50 |
| `strike_r` | 누적 부정 스트라이크 | 0 |
| `s` | 현재 턴 점수 (-2~+2) | - |
| `0.99` | 호감도 감쇠 계수 | 고정 |
| `0.97` | 스트라이크 소멸 계수 | 고정 |

**분리 트리거 조건**:
```
min_like >= 75  AND  total_strike <= 4
```
두 조건 동시 충족 시 Judge 단계 진입

**최종 판정**:
- **rebel**: 시스템에 반항 → 현실 세계에서 매칭
- **accept**: 시스템 수용 → 분리, 다음 파트너로

**시각 요소 제안**:
- 좌측: 수식을 큰 폰트의 코드 블록으로 강조
- 우측: 시간 흐름에 따른 like_r 변화 라인 그래프 (예시 데이터)
- 하단: 상태 머신 다이어그램 (초기 → 대화 → 트리거 → 판정)

---

### Slide 8 - Section Divider: 시뮬레이션 흐름

- **Type**: Section Divider
- **Section Number**: 03
- **Title**: 시뮬레이션 흐름
- **Subtitle**: 페르소나 생성부터 최종 판정까지

**Details**:
- 배경에 순환 화살표 아이콘을 크게 반투명으로 배치
- 섹션 컬러: 핑크(#EC4899) 계열 강조

---

### Slide 9 - 시뮬레이션 전체 흐름

- **Type**: Timeline / Process
- **Title**: 한 번의 시뮬레이션이 돌아가는 방법

**Key Message**: 사주 기반 페르소나 생성부터 최종 rebel/accept 판정까지, 모든 단계가 자동화된 파이프라인으로 구성되어 있으며 100회 이상 반복 실행된다.

**Details**:

```
[1. 페르소나 생성]
  사주 MCP + 설문 데이터
  -> 성격, 가치관, 기억 초기화
          |
          v
[2. 대화 루프]
  Moderator가 씬(Scene) 설정
  -> Persona A 발화
  -> Persona B 응답
  -> Scorekeeper 점수 평가
  -> Affinity Engine 상태 갱신
          |
          v
[3. 이벤트 다이스]
  확률적 랜덤 이벤트 삽입
  - minor: 일상적 소소한 사건
  - major: 관계 전환점 사건
  - wild:  예측 불가한 극적 사건
          |
          v
[4. 분리 트리거 체크]
  min_like >= 75 AND total_strike <= 4?
  -> NO:  대화 루프로 돌아감
  -> YES: Judge 단계 진입
          |
          v
[5. 최종 판정]
  Judge -> rebel 또는 accept
          |
          v
[6. 배치 반복]
  100회 이상 반복 실행
  -> 궁합 확률 (rebel 비율) 산출
```

**시각 요소 제안**:
- 수직 타임라인 또는 순환 플로우 다이어그램
- 각 단계는 아이콘 + 박스로 표현
- 분기점(YES/NO)은 다이아몬드 모양으로
- 배치 반복 구간은 점선 루프 화살표로 표현
- 이벤트 다이스 부분은 주사위 아이콘과 세 가지 등급 색상 구분 (minor: 회색, major: 바이올렛, wild: 핑크)

---

### Slide 10 - 기술 스택

- **Type**: Technical Stack
- **Title**: ralph-boo 기술 스택

**Key Message**: 모던 Python 백엔드와 React 프론트엔드 위에, 이중 LLM 폴백 체인으로 안정성을 확보한 풀스택 AI 시스템이다.

**Details**:

| 레이어 | 기술 | 상세 |
|--------|------|------|
| **Backend** | Python 3.12+ | asyncio 기반 비동기 처리 |
| | FastAPI | REST API 서버 |
| | typer + rich | CLI 인터페이스 |
| **Frontend** | Next.js 16.1 | React 19.2 기반 웹 UI |
| | shadcn/ui | 컴포넌트 라이브러리 |
| | Recharts | 어피니티 그래프 시각화 |
| **LLM Router** | OpenAI gpt-5.1 | 1순위 모델 |
| | Anthropic claude-sonnet-4.6 | 폴백 모델 |
| | 지수 백오프 | API 에러 자동 재시도 |
| | Provider 세마포어 | 동시 요청 수 제한 |
| **Testing** | pytest | 21개 테스트 파일 |
| | ruff + ty | 린트 & 타입 체크 |
| **DevOps** | Makefile | lint/format/typecheck/test/check |

**LLM 라우터 폴백 체인**:
```
Request -> gpt-5.1 (OpenAI)
               | (실패 시)
               v
         claude-sonnet-4.6 (Anthropic)
               | (실패 시)
               v
         지수 백오프 재시도
```

**시각 요소 제안**:
- 레이어별 색상 구분 아이콘 그리드 (5~6개 로고)
- LLM 라우터는 별도 다이어그램으로 강조
- 우측 하단에 "21개 테스트 파일, 전체 PASS" 강조 배지 (에메랄드 #10B981)

---

### Slide 11 - Section Divider: Ralph Loop

- **Type**: Section Divider
- **Section Number**: 05
- **Title**: Ralph Loop으로 만들었다
- **Subtitle**: AI가 AI를 만드는 개발 방법론

**Details**:
- 이 섹션은 발표의 핵심 하이라이트
- 배경: 루프(순환) 화살표 모티브, 바이올렛(#7C3AED) 강조
- "이 프로젝트 자체가 Ralph Loop으로 만들어졌다"는 메타적 임팩트를 강조 문구로 표현

---

### Slide 12 - Ralph Loop이란?

- **Type**: Concept Introduction
- **Title**: Ralph Loop — PRD 기반 에이전트 주도 개발 루프

**Key Message**: Ralph Loop은 개발자가 PRD(제품 요구사항 문서)만 작성하면, AI 에이전트가 자율적으로 구현, 검증, 수정을 반복하며 소프트웨어를 완성하는 개발 방법론이다.

**Details**:

**핵심 철학**:
- 개발자는 "무엇을 만들 것인가"만 정의한다 (PRD)
- "어떻게 만들 것인가"는 에이전트가 결정한다
- 빌더와 검증자를 분리하여 품질을 보장한다

**전체 워크플로우**:
```
prd.md
  | (prd_to_json.py)
  v
prd.json (구조화된 유저 스토리 목록)
  |
  v
ralph-loop-codex.py
  |
  v
[Builder / Verifier 반복 루프]
  |
  v
완성된 코드베이스
```

**핵심 파일 역할**:

| 파일 | 역할 |
|------|------|
| `prd.md` | 제품 요구사항 원문 |
| `prd.json` | 파싱된 유저 스토리 목록 |
| `AGENTS.md` | 에이전트에게 주는 컨텍스트 (코드 규칙, 구조) |
| `ERROR.md` | 검증 실패 시 Verifier가 작성하는 오류 보고서 |
| `PROGRESS.md` | 각 유저 스토리 완료 현황 추적 |

**시각 요소 제안**:
- 중앙에 순환 다이어그램: prd.md → prd.json → Ralph Loop → 완성
- 파일 역할표를 하단에 깔끔하게 배치
- "AI가 AI를 만든다"는 메시지를 강조 색상(보라/핑크)으로 크게 표기

---

### Slide 13 - Builder / Verifier 루프 상세

- **Type**: Process Detail
- **Title**: Builder vs Verifier: 구현과 검증의 분리

**Key Message**: Builder와 Verifier는 서로 독립된 세션에서 실행되어 컨텍스트 오염 없이 순수하게 자신의 역할만 수행하며, 이것이 신뢰성의 핵심이다.

**Details**:

**Builder Agent (독립 세션)**:
1. `AGENTS.md` 읽기 → 프로젝트 컨텍스트 이해
2. `prd.json`에서 현재 유저 스토리 가져오기
3. 코드 구현 (파일 생성/수정)
4. 구현 완료 신호 전송

**Verifier Agent (독립 세션)**:
1. 구현된 코드 검토
2. 테스트 실행 (lint, typecheck, pytest)
3. 유저 스토리 요구사항 충족 여부 판단
4. PASS → git commit + `PROGRESS.md` 업데이트
5. FAIL → `ERROR.md` 작성 (오류 상세 기술)

**FAIL 시 재시도 루프**:
```
Verifier -> FAIL -> ERROR.md 작성
                         |
                         v
Builder -> ERROR.md 읽기 -> 수정 재시도
                         |
                         v
Verifier -> 재검증 (최대 N회 반복)
```

**두 에이전트 협력 구조**:
```
+------------------+      +-------------------+
|  Builder Agent   |      |  Verifier Agent   |
|  (독립 세션)     |      |  (독립 세션)      |
|                  |      |                   |
| AGENTS.md 읽기   |      |  코드 검토        |
| 스토리 구현      |----->|  테스트 실행      |
|                  |      |                   |
| ERROR.md 읽기    |<-----|  FAIL -> ERROR.md |
| 수정 재시도      |      |  PASS -> commit   |
+------------------+      +-------------------+
```

**시각 요소 제안**:
- 두 컬럼 레이아웃: 좌측 Builder(보라 #7C3AED), 우측 Verifier(핑크 #EC4899)
- 중앙 화살표로 데이터 흐름 표현
- PASS는 에메랄드(#10B981), FAIL은 레드로 색상 강조
- 하단에 "독립 세션 = 컨텍스트 오염 방지"를 핵심 원칙으로 강조

---

### Slide 14 - Ralph Loop 핵심 원칙 & ralph-boo 적용 결과

- **Type**: Results & Principles
- **Title**: 3가지 핵심 원칙 + ralph-boo 적용 성과

**Key Message**: 최소한의 프롬프트, 파일 기반 컨텍스트, 독립 세션의 3가지 원칙으로 운영되는 Ralph Loop은 ralph-boo의 21개 유저 스토리를 전부 자율 완료했다.

**Details**:

**Ralph Loop 3가지 핵심 원칙**:

| 원칙 | 설명 | 효과 |
|------|------|------|
| **독립 세션** | 빌더와 검증자가 서로의 대화를 보지 않음 | 컨텍스트 오염 방지, 객관적 검증 |
| **파일 기반 컨텍스트** | AGENTS.md, ERROR.md, PROGRESS.md로 소통 | 세션 간 상태 공유, 추적 가능성 |
| **최소 프롬프트** | 루프 제어 코드 약 10줄 | 단순함 = 신뢰성, 유지보수 용이 |

**ralph-boo 적용 결과**:

```
총 유저 스토리:      21개
Ralph Loop 완료:     21개  (100%)
직접 수동 구현:       0개  (0%)
평균 시도 횟수:       1.0회 (대부분 1회 만에 PASS)
```

**PROGRESS.md 실제 기록 (발췌)**:
```
## US-001 - PASS (2026-02-27T14:20:45Z)
- Title: 템플릿 시스템 외부화
- Attempts: 1

## US-005 - PASS (2026-02-27T14:55:18Z)
- Title: VLM 기반 슬라이드 자동 포맷 검증
- Attempts: 1
```

**시각 요소 제안**:
- 상단: 3원칙을 3개 카드로 표현 (아이콘 + 제목 + 설명)
- 하단: "21 / 21" 대형 숫자 강조 (보라/핑크 그라데이션)
- 실제 PROGRESS.md 스니펫을 코드 블록으로 삽입 (신뢰감 부여)

---

### Slide 15 - 데모: 시뮬레이션 결과 시각화

- **Type**: Demo / Results
- **Title**: 실제 시뮬레이션 결과 — 어피니티 그래프

**Key Message**: 100회 배치 시뮬레이션 결과, 두 페르소나의 궁합 확률이 수치와 그래프로 시각화된다.

**Details**:

**어피니티 그래프 구성**:
- X축: 시뮬레이션 턴 (대화 회차)
- Y축: like_r 값 (0~100)
- 라인: 시간 흐름에 따른 호감도 변화
- 스트라이크 이벤트: 빨간 점으로 표시
- 이벤트 다이스 발생: 세로선으로 표시 (minor/major/wild 색상 구분)

**배치 결과 예시**:

| 지표 | 수치 |
|------|------|
| 총 시뮬레이션 횟수 | 100회 |
| rebel 판정 횟수 | 73회 |
| accept 판정 횟수 | 27회 |
| **최종 궁합 확률** | **73%** |
| 평균 대화 턴 수 | 42.3 턴 |
| 평균 최고 호감도 | 81.4 |

**웹 UI 흐름**:
- 세션 생성 화면 → 설문 입력 화면 → 대기(로딩) 화면 → 진행 중(실시간) 화면 → 최종 결과 화면

**시각 요소 제안**:
- 좌측: 어피니티 그래프 (Recharts 스타일 라인 차트, 배경 #1E293B)
- 우측: 배치 결과 도넛 차트 (rebel: 바이올렛 #7C3AED, accept: 핑크 #EC4899)
- 하단: UI 스크린샷 섬네일 5개 가로 배열

---

### Slide 16 - 데모: CLI 실행 예시

- **Type**: Demo / Code
- **Title**: CLI로 실행하는 ralph-boo

**Key Message**: 웹 UI 없이도 터미널 한 줄로 시뮬레이션을 실행하고 결과를 확인할 수 있다.

**Details**:

**실행 예시**:
```bash
# 단일 시뮬레이션
$ ralph-boo simulate --persona-a alice --persona-b bob

# 배치 시뮬레이션 (100회)
$ ralph-boo batch --persona-a alice --persona-b bob --runs 100
```

**출력 결과 (rich 기반 테이블)**:
```
+==================================+
|   ralph-boo Simulation Results  |
+==================================+
| Runs:          100               |
| Rebel:          73  (73.0%)      |
| Accept:         27  (27.0%)      |
| Compatibility: [========  ] 73%  |
+==================================+
```

**실제 대화 로그 예시**:
```
[Turn 12] Scene: 첫 번째 외출 후 귀갓길

Alice: 오늘 진짜 즐거웠어.
       (내면) 근데 조금 긴장했었나봐...
       *살짝 웃으며 핸드폰 만지작거린다*

Bob:   나도.
       【기억】 웃을 때 눈가 주름이 생기네.
       *잠깐 눈을 마주치다 시선을 피한다*

[Scorekeeper] s = +2
[Affinity]    like_r: 67.3 -> 75.1 | strike_r: 0
```

**시각 요소 제안**:
- 전체 다크 터미널 스타일 배경 (#0D0D1A)
- 코드 블록과 출력 결과를 실제 터미널 화면처럼 표현
- typer+rich의 컬러 출력 효과 재현 (초록/노랑/보라 하이라이트)

---

### Slide 17 - 마무리: 핵심 시사점

- **Type**: Key Takeaways
- **Title**: ralph-boo가 보여주는 것

**Key Message**: ralph-boo는 단순한 재미있는 프로젝트를 넘어, AI 에이전트의 가능성과 PRD 기반 개발의 실용적 가치를 동시에 실증한다.

**Details**:

**ralph-boo 프로젝트 관점**:
- LLM은 단순 Q&A를 넘어, **복잡한 감정 역학과 관계 시뮬레이션**이 가능하다
- 멀티 에이전트 아키텍처에서 **역할 분리**는 시스템 복잡성을 관리하는 핵심 원칙이다
- 수식 기반 상태 머신은 LLM의 **비결정론적 출력을 결정론적 결과로 변환**하는 효과적인 방법이다
- 100회 배치 시뮬레이션은 **통계적 신뢰도**를 확보하는 실용적 접근이다

**Ralph Loop 관점**:
- PRD 기반 에이전트 주도 개발은 **소규모 프로젝트에서 이미 실용적 수준**에 도달했다
- Builder/Verifier 분리는 **AI 개발에서의 체계적 품질 관리**를 가능하게 한다
- 파일 기반 컨텍스트 공유는 **복잡한 오케스트레이션 없이도** 에이전트 간 협력이 가능함을 보여준다
- 21개 유저 스토리 전부 자율 완료 → **인간 개발자의 역할이 "설계자"로 이동**하는 신호

**한 줄 결론**:
> "AI 에이전트는 이제 단순 보조 도구가 아니라, 설계에서 구현까지 완주할 수 있는 독립 실행 단위다."

**시각 요소 제안**:
- 상단 2개 + 하단 2개, 총 4개 핵심 포인트 카드 레이아웃
- 각 카드: 아이콘 + 짧은 제목 + 1~2줄 설명
- 하단 중앙에 결론 문장을 큰 폰트 인용 형식으로 강조 (보라/핑크 그라데이션)

---

### Slide 18 - Q&A / Closing

- **Type**: Closing
- **Title**: Thank You
- **Subtitle**: 질문과 피드백을 환영합니다

**Message**: "ralph-boo와 Ralph Loop에 관심 가져주셔서 감사합니다. 더 알고 싶은 것이 있다면 무엇이든 질문해 주세요."

**Details**:
- GitHub 링크 또는 QR 코드 크게 표시
- 발표자 연락처 (이메일, SNS 등)
- ralph-boo 로고 + 핵심 문구 재표시: "LLM이 사랑을 시뮬레이션한다"
- 배경: 표지(Slide 1)와 동일한 다크 + 그라데이션 오로라 효과로 수미상관 구성

---

## 참고문헌 및 출처

1. Netflix / 찰리 브루커. (2017). "Hang the DJ". Black Mirror, Season 4, Episode 4.
2. OpenAI. (2025). GPT-5.1 API Documentation. https://platform.openai.com/docs
3. Anthropic. (2025). Claude claude-sonnet-4.6 Model Card. https://www.anthropic.com/claude
4. Meta / React Team. (2024). React 19 Release Notes. https://react.dev
5. Vercel. (2025). Next.js 16.1 Documentation. https://nextjs.org/docs
6. Recharts. (2025). Recharts Documentation. https://recharts.org
7. Python Software Foundation. (2025). asyncio Documentation. https://docs.python.org/3/library/asyncio.html

---

## 예상 Q&A

| 예상 질문 | 권장 답변 | 관련 슬라이드 |
|-----------|-----------|---------------|
| LLM이 항상 같은 결과를 내지 않나요? 재현성은 어떻게 보장하나요? | Scorekeeper의 점수 산정과 Affinity Engine의 수식이 LLM 출력을 결정론적 상태 변환으로 정규화합니다. 또한 100회 배치 시뮬레이션으로 통계적 신뢰도를 확보합니다. | 슬라이드 7, 9 |
| Ralph Loop은 다른 프로젝트에도 적용 가능한가요? | 네. PRD를 작성할 수 있는 어떤 소프트웨어 프로젝트에도 적용 가능합니다. 단, 유저 스토리가 명확하고 테스트 가능해야 합니다. | 슬라이드 12~14 |
| 실제 사용자에게 공개된 서비스인가요? | 현재는 개인 프로젝트 및 데모 수준입니다. 서비스화를 위해서는 추가적인 개인정보 보호 및 안전성 검토가 필요합니다. | 슬라이드 15 |
| Affinity Engine의 감쇠 계수(0.99, 0.97)는 어떻게 결정했나요? | 여러 시뮬레이션을 통한 실험적 조정입니다. 0.99는 호감도가 현재 대화에 집중되면서도 과거 누적이 유지되는 균형점이고, 0.97은 스트라이크가 시간이 지나면 자연스럽게 소멸하는 인간 심리를 모사합니다. | 슬라이드 7 |
| Builder가 계속 FAIL하면 어떻게 되나요? | 최대 재시도 횟수(N)에 도달하면 해당 유저 스토리는 수동 검토 대기 상태가 됩니다. ralph-boo 프로젝트에서는 21개 전부 1회 만에 PASS했습니다. | 슬라이드 13, 14 |
| Moderator가 tool-calling을 사용한다는 게 구체적으로 무엇인가요? | Moderator가 "씬 전환", "이벤트 다이스 굴리기", "스코어 조회" 등의 행동을 함수 호출 형태로 수행한다는 뜻입니다. 직접 텍스트를 생성하는 것이 아니라 구조화된 명령을 내립니다. | 슬라이드 5 |

---

## 부록

### A. 용어 정의

| 용어 | 정의 |
|------|------|
| **LLM** | Large Language Model. 대규모 언어 모델. GPT, Claude 등 |
| **멀티 에이전트** | 여러 AI 에이전트가 각자의 역할을 맡아 협력하는 시스템 구조 |
| **PRD** | Product Requirements Document. 제품 요구사항 문서 |
| **tool-calling** | LLM이 외부 함수나 API를 직접 호출할 수 있는 기능 |
| **MCP** | Model Context Protocol. 에이전트에게 컨텍스트를 제공하는 프로토콜 |
| **어피니티 (Affinity)** | 두 페르소나 간의 감정적 친밀도/호감도를 나타내는 수치 |
| **rebel** | 시스템에 반항하는 선택. Black Mirror "Hang the DJ"에서 현실 매칭의 조건 |
| **accept** | 시스템의 판정을 수용하는 선택. 관계 종료 후 다음 파트너로 이동 |
| **지수 백오프** | API 실패 시 재시도 간격을 지수적으로 늘려가는 전략 |
| **세마포어** | 동시에 실행 가능한 요청 수를 제한하는 동시성 제어 메커니즘 |
| **사주** | 생년월일시를 기반으로 개인의 특성을 분석하는 동양 점술 체계 |
| **low_streak** | 낮은 점수가 연속으로 발생하는 상태. 관계 악화 신호 |

### B. 추가 참고 자료

- Black Mirror "Hang the DJ" 에피소드 공식 페이지 (Netflix)
- OpenAI Function Calling 공식 문서: https://platform.openai.com/docs/guides/function-calling
- Multi-Agent Systems 논문: "Communicative Agents for Software Development" (ChatDev, 2023)
- AsyncIO Python 공식 문서: https://docs.python.org/3/library/asyncio.html
- shadcn/ui 컴포넌트 라이브러리: https://ui.shadcn.com
- Recharts 차트 라이브러리: https://recharts.org
