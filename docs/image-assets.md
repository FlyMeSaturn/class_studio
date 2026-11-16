# 이미지 출처

## 수업공방 로고

- 원본: 사용자가 지정한 로고 폴더의 `수업공방_가로형_289B6E_투명.png`.
- 사이트 파일: `public/assets/class-studio-logo.png`.
- 원본 크기: 1983 × 793. 원본 PNG를 변경 없이 복사했습니다.
- SHA-256: `6a02419688238f64debae0343029aced4440e6cd63c1a966efc39abcf7b72b50`.
- 실제 그림 영역은 (306, 194)–(1777, 629)입니다. CSS 표시 창으로 투명 여백을 제외합니다. 원본 PNG는 보존하고, 사용자 요청에 따라 원본 알파 영역을 CSS 마스크로 사용해 브라운(#6b4b36)으로 표시합니다. 비율과 형태는 유지합니다.
- PC 표시 너비 214px, 모바일 166px. 모든 페이지 상단의 홈 링크에 사용합니다.

## 메인 작업실 이미지

- 사이트 파일: `public/assets/workshop-hero.webp`.
- 2026-11-15에 연결된 기본 imagegen 도구로 생성했습니다. 도구에 모델 버전 선택 항목이 없어 특정 모델 버전을 확정하지 않습니다.
- 가상의 수업 공방을 표현한 이미지이며 실제 연구회 공간이나 수업 장면을 촬영한 사진이 아닙니다. 사용자 요청에 따라 사이트 화면의 AI 이미지 문구는 제거하고, 제작 경위와 프롬프트는 이 기록에 보관합니다.
- 생성 원본은 이미지 도구의 저장 위치에 보존하고, 프로젝트에는 WebP로 인코딩한 파일을 포함했습니다. 장면을 합성하거나 내용물을 바꾸지 않았습니다.
- 생성 프롬프트 원문: [hero-prompt.txt](hero-prompt.txt).
- 인물·로고·문자 없는 작업대, 부드러운 햇빛, 종이·교구 카드·필기도구를 요청했습니다.

## 디자인 참고

[Collective Gallery](https://www.collective-edinburgh.art/)의 실제 홈페이지를 브라우저로 확인했습니다. 첫 화면을 채우는 사진, 간결한 메뉴, 넓은 여백과 목록의 위계를 참고했습니다. 해당 사이트의 사진·로고·디자인 파일은 사용하지 않았습니다.

## 브라우저 탭 아이콘

- 원본: 로고 폴더의 `수업공방_심벌_289B6E_투명.png`(1254×1254).
- 원본 SHA-256: `e2b2ad316fd44d448724fa16049c2cdbc45b64f91794ba72a128929620669e2c`.
- `public/assets/favicon.svg` 안에 원본 PNG 바이트를 포함합니다. SVG 필터로 브라운을 입히고 실제 심벌에 맞춰 표시 여백을 줄였습니다. 작은 탭에서 읽히도록 가로형 글자 대신 공식 심벌을 사용합니다.


## 학생 얼굴 모자이크 · 2026-11-16

사용자의 명시적 요청으로 수학 1장, 음악 2장, 영어 1장, 중3 과학 2장의 노출·약한 흐림 얼굴을 처리했습니다. 나머지 사진의 기존 충분한 모자이크, 얼굴이 나오지 않는 사진·활동지는 유지했습니다.

기본 제공 image_gen 편집 도구로 얼굴 모자이크를 만들었습니다. 생성형 편집이 주변 글씨나 사물을 바꾸지 않도록, 결과 전체를 게시하지 않고 얼굴 패치만 원본에 합성했습니다. 얼굴 영역 밖의 원본 RGB 픽셀이 달라지지 않았음을 비교했습니다. 공개 WebP는 무손실 인코딩입니다. HWPX의 내장 사진에도 같은 패치를 반영한 뒤 한글 2024에서 PDF를 재생성했습니다.

최종 사진 파일:

- `public/files/linear-functions/photo-09-mosaic.webp`
- `public/files/folk-song/photo-01-mosaic.webp`
- `public/files/folk-song/photo-03-mosaic.webp`
- `public/files/language-and-culture/photo-02-mosaic.webp`
- `public/files/pressure-and-weather/photo-01-mosaic.webp`
- `public/files/pressure-and-weather/photo-03-mosaic.webp`

위 네 수업의 `lesson-plan-mosaic.hwpx`, `lesson-plan-mosaic.pdf`, `page-XX-mosaic.webp`가 대응 지도안입니다. 수정 전 공개 파일 48개는 현재 배포 목록과 public에서 제외했습니다. OneDrive 원고는 변경하지 않았습니다.

공통 편집 프롬프트: “Privacy redaction only. Apply STRONG coarse square-pixel mosaic censorship covering each visible student's WHOLE face from forehead to chin and ear to ear with a safety margin, including profiles and partial faces. Features must be completely unrecognizable at full resolution. Preserve the original composition, aspect ratio, people, poses, clothing, background, laptops, worksheets, colors and original text outside the face regions. No face reconstruction, crop, beautification or other visual changes.”

개별 보충: 수학은 왼쪽·오른쪽 학생의 얼굴과 큰 앞쪽 학생의 옆얼굴, 음악 첫 사진은 고개를 숙인 학생과 우측 상단 일부 얼굴, 음악 셋째 사진은 배경의 작은 얼굴까지 전부, 중3 과학 첫 사진은 모든 전면·배경 얼굴, 셋째 사진은 전경 오른쪽과 뒤쪽의 옆얼굴을 포함하도록 지정했습니다.

최종 검수에서 영어 두 번째 사진의 가장자리·고개를 숙인 학생의 옆얼굴 네 영역도 추가로 처리했습니다. 같은 공통 프롬프트에 왼쪽 가장자리와 앞쪽 좌우 학생의 옆얼굴을 빠뜨리지 않도록 지정했습니다. 얼굴 영역 밖 RGB 픽셀 동일성과 영어 지도안 7쪽의 반영을 확인했습니다.


## 학생 이름·학번 가림 · 2026-11-16

취합본 내 이미지 72개와 갤러리 이미지를 시각적으로 검토했습니다. 수학 이미지 image21, image22, image25, image26, image27, image28, image31, image33, image35에서 식별 정보를 확인하고, 작은 서명·겹친 종이와 게시판 사진의 표기까지 23개 영역을 불투명하게 가렸습니다. 빈 이름/학번 칸, 교사 작성자명, 수학적 숫자와 학습 답안은 처리 대상에서 제외했습니다.

기본 제공 image_gen 편집 도구로 불투명 회색 가림 패치를 만들고, 해당 패치만 지정한 식별 정보 영역에 원본 크기로 합성했습니다. 영역 밖 RGB 픽셀의 동일성을 확인했습니다. 실제 학생 이름과 번호는 작업 기록에 옮겨 적지 않습니다.

저장 파일은 `public/files/linear-functions/`의 `photo-01-private.webp`, `photo-02-private.webp`, `photo-05-private.webp`, `photo-06-private.webp`, `photo-07-private.webp`, `photo-08-private.webp`, `photo-11-private.webp`, `photo-13-private.webp`, `photo-15-private.webp`입니다. 대응 지도안은 `lesson-plan-private.hwpx`, `lesson-plan-private.pdf`, `page-01-private.webp`부터 `page-09-private.webp`입니다.

공통 편집 프롬프트: “Privacy redaction on this exact student work photograph. Completely conceal handwritten student names and student IDs/class numbers with solid, fully opaque light-gray rectangles. No blur, transparency or replacement text. Preserve the original composition, aspect ratio, paper edges, printed text, handwritten mathematical solutions, graphs and colors outside the identity fields. Do not crop, restyle, repair or rewrite any learning content.”

개별 지정: image21/22는 우상단 식별 정보 칸, image25는 상단 우측·하단 좌측·맨 아래에 겹친 종이의 서명 세 곳, image26은 아래 우측 여백, image27은 위아래 두 산출물의 이름·번호, image28은 붙여 놓은 열 장의 표기와 겹친 여백 두 곳, image31/33/35는 상단 학번·이름 칸입니다.

사용자가 원본 수정을 명시적으로 요청하여 개념기반 지도안 폴더의 원본 취합본 HWPX를 갱신했습니다. 이름·학번 이미지 9개와 이전 얼굴 모자이크 6개를 원본에도 반영했습니다. 수정 전 원본은 같은 폴더의 `원본 백업`에 사본으로 보존했습니다. 웹사이트에는 이 백업이나 원본 취합본을 추가로 게시하지 않았습니다.
