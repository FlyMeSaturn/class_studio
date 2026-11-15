---
name: "수업공방"
description: "수업 자료실 · 2026-11-15 사용자 수정 반영"
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
  selection: "#d7ead7"
  selection-ink: "#173d2b"
  book-paper: "#e4eee4"
typography:
  display:
    fontFamily: "Pretendard, 'Noto Sans KR', 'Malgun Gothic', sans-serif"
    fontSize: "2.65rem"
    fontWeight: 680
    lineHeight: 1.4
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Pretendard, 'Noto Sans KR', 'Malgun Gothic', sans-serif"
    fontSize: "1.65rem"
    fontWeight: 620
    lineHeight: 1.4
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Pretendard, 'Noto Sans KR', 'Malgun Gothic', sans-serif"
    fontSize: "1.4rem"
    fontWeight: 600
    lineHeight: 1.5
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Pretendard, 'Noto Sans KR', 'Malgun Gothic', sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.7
  label:
    fontFamily: "Pretendard, 'Noto Sans KR', 'Malgun Gothic', sans-serif"
    fontSize: "0.82rem"
    fontWeight: 550
    lineHeight: 1.7
rounded:
  control: "0px"
spacing:
  compact: "12px"
  text-gap: "16px"
  mobile-gutter: "22px"
  medium: "24px"
  section-gap: "32px"
  gutter: "48px"
  section: "64px"
  library: "76px"
components:
  button-primary:
    backgroundColor: "{colors.green}"
    textColor: "{colors.white}"
    rounded: "{rounded.control}"
    padding: "11px 20px"
  button-share:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "9px 14px"
  lesson-card:
    textColor: "{colors.ink}"
    padding: "24px 0 28px"
  resource-pending:
    backgroundColor: "{colors.tint}"
    textColor: "{colors.green-dark}"
    padding: "22px 24px"
---

# Design System: 수업공방

## Overview

메인 화면은 사용자가 요청한 작업실 이미지로 채운다. 실제 수업공방 로고와 간결한 메뉴를 이미지 위에 배치한다. 아래에는 두 부의 수업 카드를 둔다. 홍보 문구와 검색·필터는 사용하지 않는다.

참고: [Collective Gallery](https://www.collective-edinburgh.art/). 사진이 화면을 채우는 구성과 여백을 참고했으며 원본 자산은 사용하지 않는다.

## Colors

기존 녹색과 밝은 바탕을 유지한다. 로고는 원본의 #289B6E를 그대로 쓴다. 이미지의 나무색을 별도의 UI 강조색으로 확대하지 않는다.

공개 상태는 문구로 표시하며 색상에만 의존하지 않는다.

## Typography

로컬 Pretendard 가변 글꼴을 사용한다. 모바일 제목은 2rem, 상세 제목은 1.8rem, 카드 제목은 1.25rem, 본문은 15px이다. 긴 한글 제목은 단어 단위로 줄을 바꾸되 넘침이 생기면 문자 단위 줄바꿈을 허용한다.

## Layout

- 최대 컨테이너 1376px, 기본 좌우 여백 48px. 1050px 이하 32px, 640px 이하 22px.
- 메인 이미지 높이 100svh, 최소 620px. 모바일 최소 600px. object-fit: cover, 모바일 가로 중심 58%.
- 홈 헤더는 이미지 위에 놓으며 스크롤에 고정하지 않는다. 다른 페이지는 흰 바탕 헤더를 쓴다.
- 실제 로고의 보이는 영역은 1471:435 비율. PC 너비 214px, 모바일 176px. 원본 PNG를 수정하지 않고 CSS로 투명 여백만 제외한다.
- 수업 목록은 3열 → 1050px 이하 2열 → 640px 이하 1열. 2부는 900px 이상에서 2열.
- 상세의 자료 영역은 개요와 활동보다 앞에 둔다. 본문과 260px 정보 열 사이 간격은 96px, 중간 너비에서는 48px. 모바일은 한 열이며 수업 정보를 개요보다 먼저 배치한다.
- 자료집 패널은 HTML과 글자로 표시하며 완성된 실제 표지 이미지처럼 소개하지 않는다.

## Elevation & Depth

그라데이션·그림자·장식용 움직임을 사용하지 않는다. 카드 상단 선과 여백으로 수업을 구분하고 마우스를 올리면 제목에 밑줄을 표시한다.

## Shapes

모서리는 각지게 유지한다. 수업 카드는 각각 하나의 링크이며, 별도 중첩 버튼은 넣지 않는다.

## Components

### Logo

public/assets/class-studio-logo.png를 모든 페이지의 홈 링크에 사용한다. 이미지 설명과 홈 링크 이름을 유지한다. 자세한 출처는 docs/image-assets.md에 있다.

### Main image

public/assets/workshop-hero.webp는 AI로 만든 가상의 작업실 장면이다. 인물은 없다. 이미지의 AI 생성 표기와 수업 목록 바로가기를 하단에 배치한다. 검색이나 홍보 문구를 이미지 위에 추가하지 않는다.

### Navigation

주 메뉴는 ‘수업 자료 · 전체 자료집 · 소개’. 모바일에서도 숨김 메뉴 없이 표시한다. 본문 바로가기는 홈에서 수업 목록으로 이동한다. 부별 바로가기와 기존 상세 URL을 유지한다.

### Lesson cards

교과·학년, 실제 수업명, 짧은 소개, 공개 상태, 자료 보기 순서로 읽는다. ‘1부 개념 기반 탐구학습’과 ‘2부 교과융합’으로만 표기한다.

### Resources

파일이 없으면 ‘자료 준비 중입니다.’ 한 문장으로 알린다. 공개한 파일에만 형식·크기·다운로드를 표시한다. 개요·활동·출처·이용 안내는 필요한 사실만 적는다.

### Accessibility

포커스는 3px 외곽선과 5px 간격으로 표시한다. 주소 복사는 성공 문구와 직접 복사할 수 있는 입력란을 제공한다. 등록된 수업이 없으면 빈 상태를, 없는 주소에는 404 안내와 목록 링크를 표시한다.

## Do's and Don'ts

- 실제 로고와 확인된 수업명·작성자·교과·학년을 유지한다.
- 상투적인 도입, 추상적인 홍보 문장, 같은 내용을 반복하는 설명을 추가하지 않는다.
- 이미지가 실제 연구회 공간을 촬영한 사진이라고 설명하지 않는다.
- 미완성 수업 파일이나 가짜 다운로드를 게시하지 않는다.
