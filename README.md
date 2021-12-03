# 직업 가치관 테스트

## 프로젝트 소개

[직업심리검사 API](https://www.career.go.kr/cnet/front/openapi/openApiTestCenter.do)를 사용하여 사용자의 직업 적합도를 확인할 수 있는 웹 서비스입니다.

## 사용기술

- Javascript
- Functional Components + Hooks
- React
- react-router-dom
- axios
- styled-components
- react-query

## 프로젝트 구조

>

```
src
├── App.css
├── App.js
├── components // 5개의 라우터 페이지
│   ├── IntroPage
│   │   └── IntroPage.jsx
│   ├── LandingPage
│   │   ├── LandingPage.jsx
│   │   ├── UserForm.jsx
│   │   ├── UserGender.jsx
│   │   └── UserName.jsx
│   ├── TestCompletedPage
│   │   ├── TestCompletedPage.jsx
│   │   └── TestResultSummary.jsx
│   ├── TestPage
│   │   └── TestPage.jsx
│   ├── TestResultPage
│   │   ├── JobTable.jsx
│   │   ├── TestResultChart.jsx
│   │   ├── TestResultChartBar.jsx
│   │   ├── TestResultPage.jsx
│   │   └── UserInfoTable.jsx
│   ├── commons // 여러 페이지에서 사용되는 컴포넌트
│   │   ├── Button.jsx
│   │   ├── Loading.jsx
│   │   ├── ProgressBar.jsx
│   │   └── Question.jsx
│   └── hooks // 커스텀훅
│       └── testPagehook.jsx
├── index.css
├── index.js
├── provider // context 관련코드
│   └── testProvider.js
└── utils
    ├── api.js
    ├── contents.js
    └── settingData.js
```

## 기능

- **검사 시작 시, 유저 설정**

  - 이름을 입력할 수 있는 input form을 구현합니다.
  - 성별을 선택할 수 있는 input form을 구현합니다.
  - 이름 혹은 성별을 기입하지 않거나 선택하지 않을 경우 검사 시작 버튼이 비활성화 되어야 합니다.
  - 이름을 올바르게 입력하지 않았을 경우, 이에 대한 안내 메세지를 출력합니다.
  - 성별을 선택하지 않았을 경우, 이에 대한 안내 메세지를 출력합니다.

- **검사 예시 페이지**

  - 검사를 시작하기 전 앞으로의 진행 방식에 대해서 설명하는 페이지를 구현합니다.
  - 진행 방식에 대한 검사 예제 문항이 한 문항을 화면에 표시합니다.
  - 검사 시작 버튼을 구현합니다.
  - 검사 예제 문항을 진행하지 않으면 검사 시작 버튼이 비활성화 되어야 합니다.
  - 검사 예시 페이지부터는 진행 표시줄(Progress bar)가 포함 되어야 있어야 하며, 검사 예시 페이지는 0%로 측정되어야 합니다.(진행 표시줄의 형태는 무관합니다.)

- **검사 진행 페이지**

  - 페이지 당 5개의 문항이 보여야 합니다.
  - 페이지 내 문항을 모두 진행하기 전까지는 "다음" 버튼이 비활성화 상태여야 합니다.
  - 각 문항을 선택할 때 마다 진행 표시줄과 퍼센트(%)가 갱신되어야 합니다.
  - "이전" 버튼을 클릭했을 때, 이전 페이지 문항에서 선택한 값이 유지된 상태여야 합니다.

- **검사 완료 페이지**

  - 검사가 완료되었다는 문구를 포함해야 하며, 검사결과에 대한 간단한 문장을 포함해야 합니다.
  - 데이터 통신시 Loading ui를 표시합니다.

- **결과표 페이지**
  - 유저의 기본 정보를 포함해야 합니다. (이름, 성별, 검사일)
  - 직업가치관결과에 대하여 항목 별로 수치를 표기해야 합니다. (ex. 막대 그래프)
  - 가치관과 관련이 높은 직업을 결과에 따라 분류하여 표기해야 합니다.
  - "다시 검사하기" 버튼 클릭 시, 진행했던 항목에 대한 기록은 모두 초기화되어야 합니다.

## 이 프로젝트를 하면서 배운 것들

### 1. context API 사용

> Context API를 사용하여 중복되는 코드를 줄이고 props로 데이터를 주고 받는 과정을 줄일 수 있었습니다.

초기 프로젝트를 시작할 때는 컴포넌트들의 깊이가 깊게 들어가지 않을 것 같다는 생각에 context나 redux를 사용하지 않고 시작하였습니다.

1. LandingPage에서 입력한 유저정보를 TestCompletePage와 TestResultPage에서 사용
2. TestCompletePage와 TestResultPage에서 테스트 결과와 관련된 여러 데이터가 동시에 쓰이게 되면서 중복되는 코드를 사용

하지만 프로젝트 진행 후반이 될수록 위와 같이 중복되게 사용되는 코드가 많아지고 있다는 것을 느껴 context를 사용하여 문제점을 해결할 수 있었습니다.

### 2. custom hook

textPage 컴포넌트에서 테스트 문항 데이터와 사용자의 답변 관련 데이터를 처리하는 코드가 복잡하게 있었습니다. 복잡한 코드를 커스텀 훅을 사용하여 관련된 코드들과 묶어 어떤 코드인지 구분되는 코드로 작성할 수 있었습니다. 또한 커스텀 훅에 대한 내용을 공부하며 클로저를 공부할 수 있었습니다.
