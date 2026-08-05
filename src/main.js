/* 
==============================================
 * [최종 배포용 파일] main.js
 * 
 * 💡 파일 역할: Vue.js 애플리케이션이 구동되는 최초 진입점(Entry Point). 최상위 컴포넌트(App.vue)를 초기화하고, 라우터(Vue Router), 전역 상태 관리(Pinia), UI 프레임워크(Element Plus) 등 필수 전역 플러그인들을 앱 인스턴스에 주입하는 역할을 함.
 * 
 * 📊 주요 객체(Objects) 정리
 * - app: createApp(App)을 통해 생성된 Vue 애플리케이션의 핵심 인스턴스. 이 인스턴스를 통해 프로젝트 전역에 걸친 설정과 플러그인 등록을 수행함.
 * 
 * 🛠 주요 함수(Functions) & 메서드(Methods) 정리
 * - createApp(App): 최상위 루트 컴포넌트(App.vue)를 기반으로 새로운 Vue 애플리케이션 인스턴스를 생성함.
 * - app.use(): 애플리케이션 전역에서 공통으로 사용할 플러그인을 등록함. (상태 관리를 위한 Pinia, 페이지 라우팅을 위한 router, UI 렌더링을 위한 ElementPlus가 여기서 주입됨)
 * - app.mount('#app'): 구성이 완료된 Vue 애플리케이션(Virtual DOM)을 실제 HTML 문서(index.html) 내의 `<div id="app">` 요소에 렌더링(부착)하여 사용자 화면에 최종적으로 표시함.
============================================== 
*/
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.use(ElementPlus)

app.mount('#app')
