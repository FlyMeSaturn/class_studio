---
name: "수업공방"
description: "수업 자료실 · 2026-11-15 사용자 수정 반영"
colors:
  ink: "#332c26"
  muted: "#71665c"
  accent: "#6b4b36"
  accent-dark: "#513728"
  tint: "#f1ece5"
  line: "#dfd6cb"
  paper: "#fcfaf7"
  white: "#fff"
  focus: "#91571f"
  selection: "#e8d6c2"
  selection-ink: "#4b3425"
  book-paper: "#e9dfd2"
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
    backgroundColor: "{colors.accent}"
    textColor: "{colors.white}"
    rounded: "{rounded.control}"
    padding: "11px 20px"
  lesson-card:
    textColor: "{colors.ink}"
    padding: "24px 0 28px"
  resource-pending:
    backgroundColor: "{colors.tint}"
    textColor: "{colors.accent-dark}"
    padding: "22px 24px"
---

# Design System: 수업공방

## Overview

메인 화면은 사용자가 요청한 작업실 이미지로 채운다. 실제 수업공방 로고와 간결한 메뉴를 이미지 위에 배치한다. 아래에는 두 부의 수업 카드를 둔다. 메인 중앙에는 사용자가 제공한 슬로건만 배치하며 검색·필터는 사용하지 않는다.

참고: [Collective Gallery](https://www.collective-edinburgh.art/). 사진이 화면을 채우는 구성과 여백을 참고했으며 원본 자산은 사용하지 않는다.

## Colors

따뜻한 종이색 바탕과 브라운 강조색을 사용한다. 로고는 원본의 형태와 비율을 보존하고 CSS 마스크로 브라운을 입힌다.

공개 상태는 문구로 표시하며 색상에만 의존하지 않는다.

## Typography

본문과 메뉴는 로컬 Pretendard 가변 글꼴을 사용한다. 메인 슬로건은 자체 호스팅 Noto Serif KR 400 서브셋으로 표시하며, PC24–34px·모바일18–23px와 넉넉한 줄 간격을 사용한다. 모바일 제목은 2rem, 상세 제목은 1.8rem, 카드 제목은 1.25rem, 본문은 15px이다. 긴 한글 제목은 단어 단위로 줄을 바꾸되 넘침이 생기면 문자 단위 줄바꿈을 허용한다.

## Layout

- 최대 컨테이너 1376px, 기본 좌우 여백 48px. 1050px 이하 32px, 640px 이하 22px.
- 메인 이미지 높이 100svh, 최소 620px. 모바일 최소 600px. object-fit: cover, 모바일 가로 중심 58%.
- 홈 헤더는 이미지 위에 고정하며 스크롤하면 반투명 종이색 배경을 표시한다. 다른 페이지는 상단 고정 헤더를 쓴다. 메뉴는 은은한 반투명 배경과 흐림 효과를 사용한다.
- 실제 로고의 보이는 영역은 1471:435 비율. PC 너비 214px, 모바일 166px. 원본 PNG를 수정하지 않고 CSS로 투명 여백을 제외하고 원본 알파 영역에 강조색을 입힌다.
- 수업 목록은 3열 → 1050px 이하 2열 → 640px 이하 1열. 2부는 900px 이상에서 2열.
- 상세의 자료 영역은 개요와 활동보다 앞에 둔다. 본문과 260px 정보 열 사이 간격은 96px, 중간 너비에서는 48px. 모바일은 한 열이며 수업 정보를 개요보다 먼저 배치한다.
- 자료집 패널은 HTML과 글자로 표시하며 완성된 실제 표지 이미지처럼 소개하지 않는다.

## Elevation & Depth

그라데이션과 장식용 움직임을 사용하지 않는다. HOME 버튼에만 작은 그림자로 떠 있는 위치를 표시한다. 카드 상단 선과 여백으로 수업을 구분하고 마우스를 올리면 제목에 밑줄을 표시한다.

## Shapes

자료 영역과 수업 카드는 각지게 유지한다. 주 메뉴와 HOME 버튼은 둥근 작은 컨트롤로 구분한다. 수업 카드는 각각 하나의 링크이며, 별도 중첩 버튼은 넣지 않는다.

## Components

### Logo

public/assets/class-studio-logo.png를 모든 페이지의 홈 링크에 사용한다. 로고 왼쪽 위에는 ‘교단지원자료개발 교사연구회’를 작은 고딕체로 표시한다. 이미지 설명과 홈 링크 이름을 유지한다. 자세한 출처는 docs/image-assets.md에 있다.

### Main image

public/assets/workshop-hero.webp는 AI로 만든 가상의 작업실 장면이다. 인물은 없다. 수업 목록 이동은 상단의 수업자료 메뉴로 통일한다. 사용자의 요청에 따라 이미지 제작 문구는 화면에 표시하지 않고 출처 기록은 저장소에 보관한다. 이미지 중앙에는 사용자가 제공한 슬로건을 Noto Serif KR 400으로 세 줄 표시한다. 임의의 홍보 문장은 덧붙이지 않는다.

### Navigation

주 메뉴는 ‘소개 · 수업자료 · 자료집’ 순서다. 모바일에서도 숨김 메뉴 없이 표시한다. 본문 바로가기는 홈에서 수업 목록으로 이동한다. 부별 바로가기와 기존 상세 URL을 유지한다. 모든 페이지 우하단의 HOME 버튼은 메인 페이지로 이동한다. 모바일 안전 영역과 마지막 본문 여백을 확보해 버튼이 다른 행동을 가리지 않게 한다.

### Lesson cards

교과·학년, 실제 수업명, 짧은 소개, 공개 상태, 자료 보기 순서로 읽는다. ‘1부 개념 기반 탐구학습’과 ‘2부 교과융합’으로만 표기한다.

### Resources

파일이 없으면 ‘자료 준비 중입니다.’ 한 문장으로 알린다. 공개한 파일에만 형식·크기·다운로드를 표시한다. 개요·활동·출처·이용 안내는 필요한 사실만 적는다.

### Accessibility

포커스는 3px 외곽선과 5px 간격으로 표시한다. 본문 바로가기는 고정 헤더보다 앞에 표시하고 앵커 도착 위치는 헤더 높이를 고려한다. 등록된 수업이 없으면 빈 상태를, 없는 주소에는 404 안내와 목록 링크를 표시한다.

## Do's and Don'ts

- 실제 로고와 확인된 수업명·작성자·교과·학년을 유지한다.
- 상투적인 도입, 추상적인 홍보 문장, 같은 내용을 반복하는 설명을 추가하지 않는다.
- 이미지가 실제 연구회 공간을 촬영한 사진이라고 설명하지 않는다.
- 미완성 수업 파일이나 가짜 다운로드를 게시하지 않는다.
