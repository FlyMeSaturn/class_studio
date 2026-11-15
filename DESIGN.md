---
name: "수업공방"
description: "함께 공부하고 시도한 수업을 찾는 두 부분의 교육 자료 아카이브"
colors:
  ink: "#202b27"
  muted: "#58655e"
  green: "#17634d"
  green-dark: "#104c3a"
  tint: "#edf3ef"
  line: "#d6dfd8"
  paper: "#fcfdfb"
  white: "#fff"
  focus: "#9c4b13"
  control-border: "#9caea2"
  card-hover: "#f6faf5"
  card-active: "#e8f0e7"
typography:
  display:
    fontFamily: "Pretendard, 'Noto Sans KR', 'Malgun Gothic', sans-serif"
    fontSize: "2.5rem"
    fontWeight: 740
    lineHeight: 1.3
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Pretendard, 'Noto Sans KR', 'Malgun Gothic', sans-serif"
    fontSize: "1.5rem"
    fontWeight: 700
    lineHeight: 1.35
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Pretendard, 'Noto Sans KR', 'Malgun Gothic', sans-serif"
    fontSize: "1.2rem"
    fontWeight: 650
    lineHeight: 1.45
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Pretendard, 'Noto Sans KR', 'Malgun Gothic', sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "Pretendard, 'Noto Sans KR', 'Malgun Gothic', sans-serif"
    fontSize: "0.8rem"
    fontWeight: 650
    lineHeight: 1.65
rounded:
  control: "4px"
spacing:
  inline-tight: "6px"
  compact: "12px"
  control-gap: "14px"
  text-gap: "16px"
  card-gap: "18px"
  notice: "20px"
  card: "24px"
  section-gap: "28px"
  medium: "30px"
  section: "36px"
  wide: "40px"
  introduction: "56px"
components:
  button-primary:
    backgroundColor: "{colors.green}"
    textColor: "{colors.white}"
    rounded: "{rounded.control}"
    padding: "10px 18px"
  button-primary-hover:
    backgroundColor: "{colors.green-dark}"
  button-share:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
  button-share-hover:
    backgroundColor: "{colors.tint}"
  button-reset:
    backgroundColor: "transparent"
    textColor: "{colors.muted}"
    padding: "12px 4px"
  input-search:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "10px 12px"
    height: "47px"
  lesson-card:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "24px"
  lesson-card-hover:
    backgroundColor: "{colors.card-hover}"
  lesson-card-active:
    backgroundColor: "{colors.card-active}"
  resource-pending:
    backgroundColor: "{colors.tint}"
    textColor: "{colors.green-dark}"
    padding: "24px"
---

# Design System: 수업공방

## Overview

**Creative North Star: "두 부분의 교육 자료 아카이브"**

밝은 종이 위에 교사들의 수업 기록을 차분히 정리한다. 짙은 녹색의 탐색 요소, 얇은 구분선, 한국어 산세리프와 절제된 사각형 카드를 사용한다. 장식보다 제목과 교과·학년 정보가 먼저 읽히는 밀도다.

목록은 탐색하기 쉽고, 상세 화면은 자료의 공개 상태를 먼저 확인한 다음 수업 이야기를 읽도록 구성한다. 실제 자료가 없는 상태는 준비 안내문으로 표현한다. 자료집의 책 모양 패널도 이미지 대신 HTML과 활자로 만든다.

**Key Characteristics:**
- 밝은 바탕과 짙은 녹색의 한 가지 강조 계열.
- 한국어 제목의 자연스러운 줄바꿈과 충분한 본문 행간.
- 얇은 선, 작은 모서리, 그림자 없는 평면 구성.
- 두 부분의 구분과 자료 공개 상태를 유지하는 의미 있는 탐색.

## Colors

옅은 녹색을 머금은 종이색과 녹색 계열의 글자·선·상태색을 사용한다. 정확한 값은 앞의 토큰을 기준으로 한다.

### Primary
- **숲 녹색 — green:** 주요 링크, 현재 메뉴, 교과 정보, 버튼과 자료 영역의 상단 선.
- **깊은 숲 녹색 — green-dark:** 버튼의 호버와 준비 안내문의 글자.
- **옅은 숲빛 — tint:** 준비 안내와 보조 버튼의 호버 바탕.

### Neutral
- **녹색 먹색 — ink:** 제목과 기본 본문.
- **차분한 회녹색 — muted:** 설명, 학년, 보조 정보.
- **종이 — paper / 흰색 — white:** 페이지 바탕과 카드·헤더·입력 영역.
- **경계선 — line / 입력 경계 — control-border:** 구획을 나누는 선과 입력 요소의 더 선명한 테두리.
- **카드 상태 — card-hover / card-active:** 링크 카드의 호버와 누름 바탕.

### Interaction
- **황갈색 — focus:** 키보드 포커스 전용 강조. 선택·현재 위치의 녹색과 구분한다.

**The State Is Text Rule.** 공개 여부는 읽을 수 있는 문구로 표시한다. 색상만으로 자료 상태를 전달하지 않는다.

## Typography

**Display Font:** Pretendard, Noto Sans KR, Malgun Gothic, sans-serif.
**Body Font:** 같은 한국어 산세리프 계열. 로컬 Pretendard 가변 폰트(100–900)를 `font-display: swap`으로 제공한다.

고정된 비율의 스케일보다는 제목·본문·보조 정보의 역할에 맞춰 크기를 조정한다. 제목은 `word-break: keep-all`과 `overflow-wrap: anywhere`를 함께 사용한다. 과도하게 긴 제목도 잘리지 않아야 한다.

### Hierarchy
- **Display:** 첫 목록 제목은 display 토큰. 모바일에서는 (2rem), 상세 제목은 (2.15rem → 1.7rem), 읽기 화면 제목은 (2.2rem → 1.85rem).
- **Headline:** 기본 2단계 제목은 headline 토큰. 목록의 부분 제목은 (1.6rem → 1.4rem).
- **Title:** 카드 제목은 title 토큰. 모바일에서 (1.15rem), 위쪽 간격은 (17px → 15px).
- **Body:** 기본 body 토큰. 모바일 기본값은 (15px). 수업 이야기의 문단은 행간 (1.9), 소개 글은 (1.95; 모바일 1.9).
- **Label:** 필터 레이블은 label 토큰. 카드의 교과 표기는 같은 크기에 굵기 (600), 학년은 (450). 카드 설명과 주요 입력 글자는 (0.9rem), 작은 보조 정보는 (0.75–0.85rem).
- **Wordmark:** 로고 활자는 (1.75rem / 800 / -0.04em), 모바일은 (1.5rem). 보조 문구는 모바일에서 숨긴다.

## Layout

가운데 정렬한 전체 컨테이너의 최대 너비는 (1240px). 좌우 안쪽 여백은 기본 (40px), 너비 (1050px 이하)에서 (30px), (640px 이하)에서 (20px)다. 간격은 앞의 spacing 토큰을 중심으로 사용하되, 모든 값을 단일 격자에 강제하지 않는다.

목록 소개는 (1.1fr / 1fr) 두 열과 간격 (80px)에서 시작한다. (1050px 이하)에서 간격이 (35px), (640px 이하)에서 한 열과 간격 (25px)이 된다. 필터는 데스크톱에서 검색·세 가지 선택·초기화를 같은 줄에 배치하고, (1050px 이하)에서 3열, (640px 이하)에서 2열로 재배치한다. 모바일의 검색과 자료집 구성은 각각 전체 너비를 쓴다.

일반 수업 카드는 3열, (1050px 이하) 2열, (640px 이하) 1열이다. 카드 간격은 (18px → 14px). 교과융합 목록은 (900px 이상) 2열과 최소 카드 높이 (230px)를 사용한다. 다른 카드는 최소 (268px), 모바일에서 (238px)다. 카드는 같은 행에서 높이를 맞추고 하단 행동 문구를 아래쪽에 고정한다.

상세 본문은 유연한 읽기 열과 (250px) 정보 열, 간격 (85px; 1050px 이하 40px)로 구성한다. 모바일에서는 한 열로 바꾸고 수업 정보를 본문보다 앞에 둔다. 전체 자료집은 (280px) 책 패널과 본문, 간격 (65px)이며 모바일에서 한 열로 바뀐다. 모바일 책 패널은 너비 (235px), 최대 (100%)다. 소개 본문은 최대 (740px), 수업 이야기 영역은 최대 (720px)로 제한한다.

**The Reading Order Rule.** 상세 화면의 자료 영역은 수업 본문 앞에 유지하고, 모바일에서도 자료 공개 상태와 수업 정보를 쉽게 확인할 수 있게 한다.

## Elevation & Depth

그림자는 사용하지 않는다. 흰색과 종이색의 면 차이, 옅은 안내 바탕, 얇은 경계선으로 구조를 구분한다. 카드의 호버는 바탕과 테두리만 바꾸며 들어 올리는 이동 효과는 없다. 카드 상태 전환은 (0.15s)이고, `prefers-reduced-motion: reduce`에서는 전환을 제거한다.

## Shapes

입력 요소·버튼·수업 카드의 모서리는 작고 일정하다(rounded.control). 주요 구획은 얇은 실선(1px)으로 나누고, 자료 영역의 상단만 녹색 선(2px)으로 강조한다. 둥근 알약 배지나 장식적 곡선을 사용하지 않는다. 자료집 패널은 모서리를 둥글리지 않은 세로 사각형(3:4)이다.

## Components

### Buttons

기능을 짧은 동사로 표현한다. 기본 버튼은 녹색 바탕·흰 글자, 최소 높이 (46px), 글자 (0.9rem / 600)다. 호버는 깊은 녹색이다. 주소 복사는 흰 바탕·입력 경계색 테두리·최소 높이 (45px), 호버는 옅은 숲빛이다. 필터 초기화는 밑줄 있는 텍스트 버튼이며 모바일에서 오른쪽 끝의 별도 줄을 쓴다. 현재 화면에 없는 파일의 다운로드 버튼을 준비 상태에 표시하지 않는다.

### Inputs / Fields

검색과 선택은 각각 보이는 레이블, 흰 바탕, 입력 경계색의 선(1px), 작은 모서리를 사용한다. 높이는 (47px; 모바일 46px), 안쪽 여백은 (10px 12px)이다. 선택은 네이티브 select다. 키보드 포커스는 모든 버튼·링크·입력·선택에 황갈색 외곽선(3px), 간격(4px)을 적용한다. 오류·비활성 시각 변형은 현재 구현하지 않았다.

### Navigation

메인 메뉴는 문자 링크이며 현재 위치는 `aria-current="page"`, 녹색, 굵기(700), 아래 선(2px)으로 표시한다. 호버는 녹색이다. 모바일에서는 메뉴를 로고 아래 전체 너비로 내리고 글자 크기를 줄인다. 두 부분의 바로가기와 자료집 목차는 선으로 구분한 행 링크다. 본문 바로가기 링크는 포커스를 받으면 화면에 나타난다.

### Lesson Cards

목록의 `ul > li` 안에서 카드 전체가 한 개의 링크다. 교과와 학년, 제목, 설명, 공개 상태, 이동 문구 순으로 읽는다. 내부 여백은 (24px; 모바일 22px). 호버는 녹색 테두리와 card-hover 바탕, 누름은 card-active 바탕이다. 화살표는 장식용 인라인 SVG이며 보조 기술에서 숨긴다. 별도 중첩 버튼이나 의미 없는 배지를 추가하지 않는다.

### Resources and Empty States

자료 영역은 제목과 공개 상태를 함께 표시하고 상단 선으로 구분한다. 준비 상태는 옅은 바탕과 실제 안내 문장으로 표현한다. 현재 준비 상태에는 파일명·형식·용량·다운로드가 없다. 추후 실제 공개 상태의 파일 행에는 파일명과 확인된 형식·크기, 열기·내려받기를 제공하는 템플릿이 있다.

검색 결과 수는 `role="status"`와 `aria-live="polite"`로 알린다. 전체 결과가 없으면 설명과 조건 초기화 버튼을 보여 준다. 부분별 결과가 없을 때도 해당 부분의 안내문을 사용한다. 숨긴 상태에는 `hidden`을 적용한다. 주소 복사는 상태 문구와 읽기 전용 주소 입력의 대체 경로를 제공한다.

### Collection and Reading Pages

책 패널은 연녹색 바탕과 얇은 선에 연도·제목·두 부분 이름·수업공방을 활자로 배치한 HTML이다. 표지 이미지나 파일 미리보기로 오인시키지 않는다. 자료집 목차는 부분별 제목과 구분선 있는 수업 링크로 구성한다. 소개 페이지는 상자보다 적절한 행간과 문단 간격으로 읽기 흐름을 만든다.

## Do's and Don'ts

### Do:
- **Do** 로컬 Pretendard와 한국어 줄바꿈 규칙을 유지한다.
- **Do** 선과 바탕의 차이로 구획을 구분하고 카드에만 필요한 경계를 준다.
- **Do** 키보드 포커스, 보이는 레이블, 현재 위치, 상태 문구를 유지한다.
- **Do** 목록·상세·자료집에서 두 부분의 제목과 순서를 일관되게 보여 준다.
- **Do** 실제로 공개된 파일이 있을 때만 확인된 파일 정보와 다운로드를 표시한다.

### Don't:
- **Don't** 장식적 그라데이션·그림자·배지·불필요한 애니메이션을 추가한다.
- **Don't** 준비 상태를 비활성 다운로드나 가짜 파일 정보로 표현한다.
- **Don't** 긴 한국어 제목의 핵심 정보를 생략하거나 모바일 가로 스크롤을 추가한다.
- **Don't** 검색 결과나 수업 공개 상태를 색상만으로 구분한다.
