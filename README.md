# ⛅ 기상 및 환경 통합 관제 대시보드 (Weather Monitoring Dashboard)

> Vue.js(Composition API)와 Vite, Pinia, Element Plus를 활용하여 구축한 **프론트엔드 모니터링 시스템 프로토타입**입니다.  
> 전 세계 주요 도시의 실시간 날씨 조회부터 향후 24시간 시계열 데이터 시각화, 이상 징후 알림 기능까지 엔터프라이즈 환경을 고려하여 설계되었습니다.

---

## Tech Stack (기술 스택)

- **Core:** Vue.js 3 (Composition API, `<script setup>`), Vite
- **State Management:** Pinia (Setup Store 패턴)
- **Routing:** Vue Router (Lazy Loading, Dynamic & Catch-all Routing)
- **HTTP Client:** Axios (인스턴스 모듈화 및 에러 전파 처리)
- **UI Framework:** Element Plus
- **Data Visualization:** Chart.js (`vue-chartjs`)
- **Deployment:** Vercel (SPA 라우팅 대응 설정 완료)

---

## 주요 기능 및 핵심 아키텍처 (Key Features)

### 1. 비동기 병렬 처리 및 데이터 정제 (Service Layer)

- `Promise.all`을 활용하여 다중 도시의 API 데이터를 동시에 고속 로딩함으로써 네트워크 대기 시간을 최소화했습니다.
- 외부 API의 복잡한 원본 응답 데이터를 프론트엔드 UI에 최적화된 규격으로 가공하는 **Data Mapping** 계층을 분리했습니다.

### 2. 컴포넌트 모듈화 및 Composable 패턴

- UI 컴포넌트와 비즈니스 로직을 철저히 분리하기 위해 **Custom Hook(Composable)** 패턴(`useWeatherSearchDeploy.js`)을 도입하여 코드의 재사용성과 유지보수성을 극대화했습니다.
- Fallback Content가 포함된 **Slot**과 이벤트 버블링 방지(`.stop`) 등 견고한 컴포넌트 설계를 적용했습니다.

### 3. 전역 상태 관리 및 영속성 (Pinia & LocalStorage)

- **Pinia Setup Store** 패턴을 적용하여 컴포넌트 스크립트와의 문법적 통일성을 맞추었습니다.
- `watch`를 활용한 반응형 상태 자동 동기화로, 사용자가 설정한 온도 단위(℃/℉)와 관심 도시(즐겨찾기)를 로컬 스토리지에 영구 저장(`Persistence`)합니다.

### 4. 시계열 데이터 시각화 및 이상 탐지

- **Chart.js**를 연동하여 향후 24시간의 기온 변화(Line Chart)와 시간별 강수량(Bar Chart)을 직관적으로 시각화했습니다.
- 설비 모니터링 시스템의 이상 탐지(Anomaly Detection) 개념을 응용하여, 임계치(폭염/한파)를 초과하는 기온 감지 시 실시간 경보(`ElNotification`)를 발생시킵니다.

---

## 📂 Project Structure (디렉토리 구조)

```text
src/
├── assets/          # 정적 리소스 파일
├── components/      # UI 컴포넌트 (SearchBar, WeatherCard, UnitToggler 등)
├── composables/     # 비즈니스 로직 캡슐화 (useWeatherSearchDeploy.js)
├── router/          # 라우터 설정 (index.js - 지연 로딩 및 404 예외 처리)
├── stores/          # Pinia 전역 스토어 및 API 서비스 계층 (configStore.js, openweather.js)
├── views/           # 페이지 단위 뷰 컴포넌트 (Home, About, Detail, Forecast 등)
├── App.vue          # 최상위 루트 컴포넌트 및 GNB
└── main.js          # 애플리케이션 엔터프라이즈 진입점
```

---

## 💡 성능 최적화 및 기술적 성과 (Technical Highlights)

- **초기 로딩 속도 개선 (FCP):** 모든 페이지에 지연 로딩(Lazy Loading)을 적용하고, 불필요한 번들 사이즈를 줄여 초기 렌더링 성능을 극대화했습니다.
- **렌더링 최적화:** 대시보드 리스트 렌더링 시 `v-memo`를 적용하여 상태가 변경되지 않은 카드 컴포넌트의 불필요한 리렌더링을 방지했습니다.
- **사용자 경험(UX) 중심 예외 처리:** 404 Not Found 페이지, API 통신 실패 대응(`try-catch-finally`), 로컬 스토리지 기반 상태 영속성을 통해 견고한 예외 처리 흐름을 구축했습니다.

---
