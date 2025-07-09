# MBTI 여행 스타일 분석 웹앱 개발 가이드라인

## 프로젝트 개요

### 목적

- 16가지 MBTI 타입별 여행 스타일 분석 웹앱
- React + TypeScript + Tailwind CSS 기반
- 모바일 우선 반응형 디자인
- 애니메이션 트랜지션 효과 포함
- 소셜 공유 기능 제공

### 기술 스택

- **Frontend**: React 18+ with TypeScript
- **Styling**: Tailwind CSS only
- **Animation**: Framer Motion
- **State Management**: React Hooks (useState, useReducer)
- **Build Tool**: Vite
- **Package Manager**: npm

## 프로젝트 아키텍처

### 디렉토리 구조

```
src/
├── components/          # 재사용 가능한 UI 컴포넌트
├── pages/              # 페이지별 컴포넌트
├── data/               # MBTI 데이터, 질문 데이터
├── types/              # TypeScript 타입 정의
├── hooks/              # 커스텀 훅
├── utils/              # 유틸리티 함수
├── constants/          # 상수 정의
└── assets/             # 정적 자원
public/
└── images/             # 캐릭터/상황 그림
```

### 핵심 모듈

- **MBTI Test Engine**: 질문-답변 로직
- **Result Calculator**: MBTI 타입 계산
- **Character Display**: 캐릭터 및 결과 표시
- **Social Share**: 소셜 공유 기능
- **Animation System**: 페이지 트랜지션

## 코드 표준

### 파일 네이밍 규칙

- **컴포넌트 파일**: PascalCase.tsx (예: `MBTITest.tsx`, `ResultCard.tsx`)
- **페이지 파일**: kebab-case.tsx + page suffix(예: `mbti-test-page.tsx`, `result-page.tsx`)
- **훅 파일**: use로 시작하는 camelCase (예: `useMBTILogic.ts`, `useAnimation.ts`)
- **유틸리티 파일**: camelCase.ts (예: `shareUtils.ts`, `mbtiCalculator.ts`)
- **타입 파일**: `types.ts` 또는 `index.ts`

### TypeScript 규칙

- 모든 컴포넌트는 TypeScript로 작성 **필수**
- Props 인터페이스를 컴포넌트 상단에 정의
- any 타입 사용 **금지**
- 함수 컴포넌트는 React.FC 타입 명시적 사용 **금지** (일반 함수로 정의)

### 컴포넌트 구조 규칙

```typescript
// 올바른 컴포넌트 구조
interface ComponentProps {
  // props 정의
}

export default function ComponentName({ prop1, prop2 }: ComponentProps) {
  // 상태 정의
  // 이벤트 핸들러 정의
  // 렌더링
}
```

## 기능 구현 표준

### MBTI 데이터 관리

- **MBTI 타입 데이터**: `/src/data/mbtiTypes.ts`에 중앙화 **필수**
- **질문 데이터**: `/src/data/questions.ts`에 정의 **필수**
- **텍스트 메시지**: `/src/data/messages.ts`에 다국어 대응 구조로 정의
- 모든 데이터는 TypeScript 인터페이스로 타입 정의

### 상태 관리 규칙

- React 기본 훅 우선 사용: `useState`, `useReducer`
- 전역 상태가 필요한 경우에만 Zustand 사용 고려
- 테스트 진행 상태는 로컬 스토리지에 저장
- 개인정보 수집 **금지**

### 애니메이션 구현

- Framer Motion 라이브러리만 사용 **필수**
- CSS 애니메이션 사용 **금지**
- 페이지 전환은 fade, slide 효과 활용
- 컴포넌트 마운트/언마운트 시 애니메이션 적용

## 프레임워크/라이브러리 사용 표준

### 허용된 라이브러리

- **Framer Motion**: 애니메이션 전용
- **React Router**: 페이지 라우팅
- **Lucide React**: 아이콘 (필요시)

### 금지된 라이브러리

- jQuery 또는 DOM 조작 라이브러리 **금지**
- Bootstrap, Material-UI 등 UI 프레임워크 **금지**
- Redux, MobX 등 복잡한 상태 관리 **금지**
- 외부 MBTI API **금지** (모든 데이터는 로컬 관리)

### Tailwind CSS 사용 규칙

- 인라인 스타일 사용 **금지**
- Tailwind 클래스만 사용
- 커스텀 색상은 `tailwind.config.js`에 정의
- 반응형 디자인: mobile-first 접근법 **필수**

## 워크플로우 표준

### 개발 순서

1. `/src/types/index.ts`에 필요한 타입 정의
2. `/src/data/`에 데이터 구조 생성
3. 컴포넌트 구현
4. 애니메이션 적용
5. 소셜 공유 기능 구현

### 기능 추가 워크플로우

```
새 기능 요청
↓
타입 정의 (types/index.ts)
↓
데이터 구조 확인/수정 (data/)
↓
컴포넌트 구현 (components/)
↓
페이지 통합 (pages/)
↓
애니메이션 적용
```

## 핵심 파일 상호작용 표준

### 동시 수정 필요 파일

- **`mbtiTypes.ts` 수정 시**: `types/index.ts`와 관련 컴포넌트들 동시 업데이트 **필수**
- **`questions.ts` 수정 시**: `MBTITest` 컴포넌트와 테스트 로직 확인 **필수**
- **새 컴포넌트 생성 시**: `types/index.ts`에 필요한 인터페이스 먼저 정의 **필수**
- **라우팅 변경 시**: `App.tsx`와 관련 네비게이션 컴포넌트 동시 수정 **필수**

### 이미지 관리 규칙

- 이미지 경로는 `/src/constants/imagePaths.ts`에 상수로 정의
- placeholder 이미지 사용 (실제 MBTI 캐릭터 이미지는 별도 제공 예정)
- 이미지 최적화: WebP 형식 우선, PNG 폴백

## AI 의사결정 표준

### 우선순위 판단 기준

1. **타입 안정성**: TypeScript 에러 최우선 해결
2. **모바일 반응형**: 모든 컴포넌트는 모바일 우선 설계
3. **접근성**: aria-label, semantic HTML 사용
4. **성능**: React.memo, useMemo 적절히 활용

### 기능 구현 결정 트리

```
새 기능 요청
├── 타입 정의 필요? → Yes: types/index.ts 먼저 수정
├── 데이터 구조 변경? → Yes: data/ 폴더 파일들 확인
├── 애니메이션 필요? → Yes: Framer Motion 사용
├── 외부 API 필요? → No: 로컬 데이터만 사용
└── UI 컴포넌트? → Yes: Tailwind CSS로 구현
```

### 문제 해결 우선순위

1. **타입 에러** → 즉시 해결
2. **빌드 에러** → 즉시 해결
3. **레이아웃 깨짐** → 모바일 우선 확인
4. **성능 문제** → 프로파일링 후 최적화
5. **애니메이션 버그** → Framer Motion 설정 재확인

## 금지 행동

### 절대 금지 사항

- **인라인 CSS 스타일 사용 금지**
- **jQuery나 기타 DOM 조작 라이브러리 사용 금지**
- **외부 MBTI API 호출 금지**
- **사용자 개인정보 수집 금지**
- **Redux 등 복잡한 상태 관리 라이브러리 도입 금지**

### 코딩 금지 사항

- `any` 타입 사용
- `document.getElementById` 등 직접 DOM 조작
- `fetch`를 이용한 외부 API 호출
- 로컬 스토리지에 민감한 정보 저장
- CSS-in-JS 라이브러리 사용

### 설계 금지 사항

- 복잡한 컴포넌트 구조 (3레벨 이상 중첩 피하기)
- 하나의 컴포넌트에서 여러 책임 처리
- Props drilling (3레벨 이상 props 전달 시 context 사용)

**⚠️ 중요**: 모든 결정은 위 가이드라인을 엄격히 준수하여 이루어져야 함
