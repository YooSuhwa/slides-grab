# PPT Team Agent의 작동 원리

## 메타 정보
- **주제**: PPT Team Agent - Claude Code 기반 프레젠테이션 자동 생성 시스템의 아키텍처와 작동 원리
- **대상 청중**: 개발자, AI 도구에 관심 있는 기술 전문가
- **톤/분위기**: 기술적이지만 직관적, 미니멀하고 세련된 디자인 (Modern Dark 테마)
- **슬라이드 수**: 13장
- **비율**: 16:9

## 엑시큐티브 서머리
PPT Team Agent는 Claude Code의 에이전트 + 스킬 시스템을 활용하여 프레젠테이션 제작을 자동화하는 도구입니다. "주제만 말하면 PPTX가 나온다"는 비전 아래, Planning - Design - Conversion의 3단계 Stage-Gated 파이프라인으로 설계되었습니다. HTML을 중간 포맷으로 활용하여 시각적 충실도를 보장하고, 매 단계마다 사용자 승인을 거쳐 품질을 관리합니다. Playwright 스크린샷 + Sharp 리사이즈 + PptxGenJS 조합으로 어떤 HTML 디자인이든 PPTX로 변환합니다.

## 슬라이드 구성

### Slide 1 - 표지
- **타입**: Cover
- **제목**: PPT Team Agent
- **부제**: Claude Code 기반 프레젠테이션 자동 생성 시스템
- **비주얼 가이드**: Modern Dark 배경(#0f0f0f). 중앙에 큰 타이틀 "PPT Team Agent" (72pt, white, -0.02em). 부제는 16pt #b0b0b0. 좌상단 로고 영역, 우하단에 날짜/작성자 정보 그리드. 미니멀하고 임팩트 있는 표지.

### Slide 2 - 프레젠테이션은 왜 아직도 고통인가
- **타입**: Content
- **핵심 메시지**: 프레젠테이션 제작은 콘텐츠 기획, 시각 디자인, 포맷 변환의 3중 고통이다
- **세부 내용**:
  - 콘텐츠 기획: 자료 조사에 수 시간, 스토리라인 구성에 수 시간
  - 시각 디자인: 레이아웃 배치, 색상 선택, 폰트 조정에 대부분의 시간 소모
  - 포맷 호환성: 디자인 도구와 PPT 간 변환 시 깨지는 레이아웃
  - 반복 수정: "이 부분 좀 바꿔주세요" 한 마디에 전체 작업 재시작
- **비주얼 가이드**: 다크 배경 위 3개 컬럼 카드 레이아웃. 각 카드에 고통 포인트를 아이콘과 함께 표현. 리서치/디자인/변환 세 단계의 시간 소모를 시각적으로 표현. 강조색으로 핵심 수치 하이라이트.

### Slide 3 - 솔루션: 주제만 말하면 PPTX가 나온다
- **타입**: Quote
- **핵심 메시지**: PPT Team Agent는 "주제"만 입력하면 리서치부터 PPTX 파일 생성까지 전 과정을 AI가 자동 수행한다
- **세부 내용**:
  - 사용자는 주제와 요구사항만 전달
  - AI 에이전트가 자료 조사, 구조 설계, HTML 디자인, PPTX 변환을 순차 수행
  - 매 단계마다 사용자가 검토하고 피드백 가능
  - 최종 결과: 발표에 바로 쓸 수 있는 고품질 PPTX 파일
- **비주얼 가이드**: 다크 배경 중앙 정렬. 큰 따옴표 아이콘과 함께 핵심 메시지를 28pt로 표시. "주제 입력 --> PPTX 출력"의 심플한 Before/After를 한 줄로. 미니멀한 인용문 스타일.

### Slide 4 - 3단계 파이프라인 전체 흐름
- **타입**: Timeline
- **핵심 메시지**: Planning - Design - Conversion의 3단계 Stage-Gated 파이프라인이 전체 워크플로우를 구성한다
- **세부 내용**:
  - Stage 1 - Planning: research-agent(자료 조사) + organizer-agent(구조 설계) + plan-skill(감독/승인 관리) --> slide-outline.md
  - Stage 2 - Design: design-skill이 아웃라인을 HTML 슬라이드로 변환 --> slides/slide-*.html --> viewer.html로 미리보기
  - Stage 3 - Conversion: pptx-skill이 HTML을 PPTX로 변환 --> Playwright 렌더링 --> Sharp 리사이즈 --> PptxGenJS 생성
  - 각 단계 사이에 사용자 승인 게이트 존재
- **비주얼 가이드**: 수평 타임라인 3단계. 각 단계를 원형 노드와 연결선으로 표현. Stage 1은 "Planning", Stage 2는 "Design", Stage 3은 "Conversion". 각 노드 아래에 입력/출력 파일명 표시. 단계 사이에 체크마크 아이콘으로 승인 게이트 표현.

### Slide 5 - Stage 1: Planning
- **타입**: Content
- **핵심 메시지**: plan-skill이 감독자로서 research-agent와 organizer-agent를 조율하여 사용자 승인된 아웃라인을 생성한다
- **세부 내용**:
  - plan-skill (감독자 역할): 사용자 소통, 품질 관리, 피드백 루프 관리. 직접 아웃라인을 작성하지 않고 에이전트에게 위임
  - research-agent (Claude Sonnet): WebSearch/WebFetch로 웹 자료 수집, 통계/사례/트렌드 정리, 출처 검증
  - organizer-agent (Claude Sonnet): 리서치 결과를 MECE/피라미드 원칙에 따라 스토리라인으로 구조화, slide-outline.md 생성
  - 피드백 루프: 사용자 피드백 --> organizer-agent 재호출 --> 수정된 아웃라인 --> 사용자 재검토 (승인까지 반복)
- **비주얼 가이드**: 2단 그리드 레이아웃. 왼쪽에 plan-skill을 중심으로 한 에이전트 관계도 (plan-skill이 상위, research-agent와 organizer-agent가 하위). 오른쪽에 피드백 루프를 순환 화살표로 표현. 최종 출력 slide-outline.md 아이콘.

### Slide 6 - Stage 2: Design
- **타입**: Content
- **핵심 메시지**: design-skill이 아웃라인을 10가지 템플릿과 5가지 컬러 팔레트를 활용해 HTML 슬라이드로 변환한다
- **세부 내용**:
  - 슬라이드 규격: 720pt x 405pt (16:9), Pretendard 웹폰트
  - 10가지 슬라이드 템플릿: Cover, Contents, Section Divider, Content, Statistics, Split Layout, Team, Quote, Timeline, Closing
  - 5가지 컬러 팔레트: Executive Minimal, Sage Professional, Modern Dark, Corporate Blue, Warm Neutral
  - build-viewer.js: 모든 slide-*.html을 하나의 viewer.html로 통합, 브라우저에서 키보드 네비게이션으로 미리보기
  - 수정 루프: 사용자 피드백 --> 해당 HTML만 수정 --> 뷰어 재빌드 --> 재검토
- **비주얼 가이드**: 왼쪽에 템플릿 종류를 작은 카드 그리드로 표현 (2x5 또는 3열). 오른쪽에 컬러 팔레트 5종을 색상 스와치로 나열. 하단에 viewer.html 미리보기 흐름을 간략히 도식화.

### Slide 7 - Stage 3: Conversion
- **타입**: Content
- **핵심 메시지**: HTML 슬라이드를 Playwright 스크린샷 + Sharp 리사이즈 + PptxGenJS 조합으로 완벽한 PPTX로 변환한다
- **세부 내용**:
  - Step 1 - Playwright 렌더링: Chrome/Chromium으로 HTML을 실제 브라우저에서 렌더링, DOM 요소의 위치/크기/스타일을 정밀 추출
  - Step 2 - 요소 변환: 텍스트(p, h1-h6, ul, ol) --> PptxGenJS addText, DIV(bg/border) --> addShape, IMG --> addImage
  - Step 3 - 검증: 오버플로우 체크, 레이아웃 불일치 감지, CSS 그라데이션 경고 등 모든 오류를 한번에 수집/리포트
  - Step 4 - PPTX 생성: PptxGenJS로 슬라이드 조립, 색상은 # 없이 6자리 HEX, LAYOUT_WIDE(16:9) 기본
- **비주얼 가이드**: 수직 플로우차트. HTML --> [Playwright] --> DOM 데이터 추출 --> [html2pptx.js] --> 요소별 변환 --> [PptxGenJS] --> .pptx 파일. 각 단계를 박스와 화살표로 연결. 핵심 라이브러리명을 각 박스에 표기.

### Slide 8 - HTML을 중간 포맷으로 쓰는 이유
- **타입**: Split Layout
- **핵심 메시지**: HTML을 중간 표현 포맷으로 사용하면 디자인 자유도와 변환 정확도를 동시에 확보할 수 있다
- **세부 내용**:
  - 왜 HTML인가:
    - CSS Flexbox/Grid로 어떤 레이아웃이든 표현 가능
    - 웹 브라우저가 곧 렌더링 엔진 - 별도 디자인 도구 불필요
    - 브라우저에서 바로 미리보기 가능 (viewer.html)
    - AI(LLM)가 가장 잘 생성하는 마크업 언어
  - 왜 직접 PPTX가 아닌가:
    - OOXML은 복잡하고 오류 발생 확률이 높음
    - 시각적 확인 없이 XML만으로 레이아웃 디버깅 불가
    - LLM이 OOXML을 정확하게 생성하기 어려움
  - 핵심 장점: "What You See Is What You Get" - 브라우저에서 본 그대로 PPTX에 반영
- **비주얼 가이드**: 좌우 분할 레이아웃. 왼쪽: HTML 코드 스니펫 + 브라우저 미리보기 아이콘. 오른쪽: PPTX 파일 아이콘 + "WYSIWYG" 키워드 강조. 중앙에 화살표로 변환 흐름 표시.

### Slide 9 - Stage-Gated Workflow
- **타입**: Content
- **핵심 메시지**: 매 단계마다 사용자 승인을 필수로 거치는 Stage-Gated 방식이 품질을 보장한다
- **세부 내용**:
  - Gate 1 - 아웃라인 승인: slide-outline.md를 사용자가 검토, "승인/OK/진행" 명시적 의사 표시 필요
  - Gate 2 - 디자인 승인: viewer.html에서 모든 슬라이드를 브라우저로 확인, 개별 슬라이드 단위 수정 가능
  - Gate 3 - 변환 요청: "PPTX로 변환해줘" 등 명시적 변환 요청이 있어야만 최종 변환 실행
  - 절대 규칙: 승인 없이 다음 단계로 자동 진행하지 않음 - 각 스킬의 SKILL.md에 명시적으로 규정
  - 효과: 중간 산출물 검토로 불필요한 재작업 방지, 사용자 의도와 결과물 간 괴리 최소화
- **비주얼 가이드**: 수평 3단계 프로세스 다이어그램. 각 단계 사이에 "Gate" 체크포인트를 잠금/체크 아이콘으로 표현. 각 Gate 아래에 승인 조건 텍스트. 전체적으로 파이프라인 흐름 강조.

### Slide 10 - 에이전트와 스킬의 역할 분담
- **타입**: Content
- **핵심 메시지**: 에이전트는 실무를, 스킬은 감독과 워크플로우 관리를 담당하는 이중 구조가 시스템의 핵심이다
- **세부 내용**:
  - 에이전트 (.claude/agents/): 특정 작업에 특화된 실행자. Claude Sonnet 모델 사용, 제한된 도구 접근
    - research-agent: WebSearch, WebFetch, Read, Grep, Glob 도구 사용
    - organizer-agent: Read, Write, Edit 도구 사용
  - 스킬 (.claude/skills/): 워크플로우 관리자. 사용자와의 소통, 품질 관리, 단계 전환 규칙 정의
    - plan-skill: 에이전트 호출/조율, 피드백 루프 관리
    - design-skill: HTML 생성 규칙, 템플릿/팔레트 시스템 정의
    - pptx-skill: 변환 파이프라인, 검증 규칙, 스크립트 사용법 정의
  - 설계 원칙: 스킬은 "무엇을, 어떻게" 정의하고, 에이전트는 "실행"에 집중
- **비주얼 가이드**: 2행 구조. 상단 행에 스킬 3개를 가로 배치 (plan-skill, design-skill, pptx-skill). 하단 행에 에이전트 2개 배치 (research-agent, organizer-agent). 스킬에서 에이전트로의 호출 관계를 점선 화살표로 연결. 각 항목에 역할 키워드 표기.

### Slide 11 - 기술 스택
- **타입**: Statistics
- **핵심 메시지**: 4개의 핵심 기술이 파이프라인의 각 단계를 구동한다
- **세부 내용**:
  - Claude Code: AI 에이전트 런타임 - Sub-Agent 시스템과 Skill 시스템의 기반 플랫폼
  - Playwright: 헤드리스 브라우저 자동화 - HTML 렌더링과 DOM 요소 위치/스타일 추출
  - Sharp: Node.js 고성능 이미지 처리 - 스크린샷 리사이즈, 아이콘/그라데이션 래스터화
  - PptxGenJS: JavaScript PowerPoint 생성 라이브러리 - 텍스트, 이미지, 도형, 차트를 PPTX로 조립
  - 보조 기술: Pretendard 웹폰트, build-viewer.js(뷰어 빌드), thumbnail.py(썸네일 그리드)
- **비주얼 가이드**: 4개 통계 카드 스타일. 각 카드에 기술명을 큰 글씨로, 역할을 작은 글씨로 표시. 다크 카드와 라이트 카드를 교차 배치. 보조 기술은 하단에 작게 나열.

### Slide 12 - 실제 사용 흐름 데모
- **타입**: Timeline
- **핵심 메시지**: 사용자 관점에서 주제 입력부터 PPTX 파일 수령까지의 전체 과정을 5단계로 체험한다
- **세부 내용**:
  - Step 1: 사용자가 Claude Code에 주제와 요구사항 전달 ("AI 시대의 개인 도구에 대한 PPT 만들어줘, 13장, 다크 테마")
  - Step 2: plan-skill이 research-agent + organizer-agent를 호출하여 slide-outline.md 생성 --> 사용자 검토/승인
  - Step 3: design-skill이 슬라이드를 HTML로 생성, build-viewer.js 실행 --> 사용자가 open slides/viewer.html로 브라우저 미리보기
  - Step 4: 사용자 피드백 ("5번 슬라이드 수정해줘") --> 해당 슬라이드만 수정 --> 뷰어 재빌드 --> 재검토
  - Step 5: 사용자 승인 후 "PPTX로 변환해줘" --> pptx-skill이 html2pptx.js 실행 --> 최종 .pptx 파일 생성
- **비주얼 가이드**: 세로 타임라인 5단계. 각 단계에 사용자 액션과 시스템 반응을 좌우로 나누어 표시. 사용자 쪽은 말풍선 스타일, 시스템 쪽은 박스 스타일. 번호 매겨진 원형 노드로 순서 표현.

### Slide 13 - 마무리
- **타입**: Closing
- **메시지**: AI는 도구가 아니라 동료다 - PPT Team Agent가 보여주는 에이전트 협업의 미래
- **세부 내용**:
  - 핵심 키워드: Agent + Skill + Stage-Gate = 자동화된 고품질 프레젠테이션
  - GitHub 링크 또는 프로젝트 참고 정보
  - 작성자 정보
- **비주얼 가이드**: 다크 배경(#0f0f0f). 큰 타이틀 "Thank You" 또는 "AI는 도구가 아니라 동료다" (56pt, white). 하단에 연락처/링크 정보 그리드. 표지와 동일한 톤으로 마무리.
