# 시영과민수 공식 사이트

- **라이브 주소** — https://h4jshd-boop.github.io/siyoong-minsoo-site/
- **GitHub 저장소** — https://github.com/h4jshd-boop/siyoong-minsoo-site
- **사이트 관리 시트** — https://docs.google.com/spreadsheets/d/1Db2Zl-JH4MA8RLVC6tQpbZHfO5zUHA3VgbBZdUjIi00/edit
- **네이버 스마트스토어** — https://smartstore.naver.com/siyoung_minsoo (가격·구성은 이 스마트스토어 판매 기준)

## 이제 시트만 고치면 됩니다
사이트는 열릴 때마다 **구글 스프레드시트 「시영과민수 사이트 관리」**에서 값을 읽어 그립니다.
시트에서 글자·가격·사진·영상을 고치고 사이트를 새로고침하면 바로 반영됩니다. GitHub에 다시 올리거나 코드를 고칠 필요가 없습니다.

| 탭 | 고치는 것 |
| --- | --- |
| `기본설정` | 첫 화면 문구·사진, 소개 글, 서비스 소개, 공지 배너, 공식 링크, 문의 채널, 하단 사업자 정보 (항목키 / 위치·설명 / 값) |
| `상품가격` | 본식 DVD 4종, 추가 옵션, 식전영상 3종, 아이폰 스냅과 옵션 (카테고리 / 상품명 / 부제 / 가격 / 할인가·프로모션 / 설명 / 특징 / 배지 / 노출여부) |
| `포트폴리오` | 영상·사진 카드 한 줄이 카드 하나 (노출여부 / 카테고리 / 제목 / 베뉴·설명 / 유튜브URL / 사진URL) |
| `자주묻는질문` | 질문과 답변 (노출여부 / 질문 / 답변) |
| `사용법` | 위 내용을 폰에서 보기 쉽게 정리한 안내 |

- **줄을 추가**하면 포트폴리오 카드·상품 카드·FAQ가 그대로 늘어납니다. **노출여부**를 `N`으로 바꾸면 숨겨집니다.
- **사진**은 구글 드라이브에 올리고 '링크가 있는 모든 사용자(뷰어)'로 공유한 뒤 그 링크를 사진 칸에 그대로 붙여넣으면 됩니다. (`drive.google.com/...` → `lh3.googleusercontent.com/...` 자동 변환)
- **유튜브**는 주소만 붙여넣으면 썸네일·재생이 자동 연결됩니다.
- 시트 공유 범위는 **링크가 있는 모든 사용자 · 뷰어**로 두어야 사이트가 읽습니다. 좁히면 사이트는 `site-config.js`의 기본값으로 돌아갑니다.
- 시트를 읽지 못하면(인터넷 오류·탭 이름 변경 등) `site-config.js`의 기본값으로 계속 동작합니다.

## 파일 구성
- `site-config.js` — 시트를 못 읽을 때 쓰는 기본값. 모든 문구·가격·영상의 원본 데이터.
- `assets/js/sheet-loader.js` — 시트 ID와 읽기 로직 (`gviz` JSON, CORS 없이 동작).
- `assets/js/app.js` — 시트 값을 받아 화면을 다시 그리는 코드.
- `assets/js/edit.js` — 예전 화면 편집 모드. 시트 연동 중에는 꺼지고, 하단 버튼이 시트로 연결됩니다.

## 배포 (코드를 고쳤을 때만)
1. ```
   git add -A
   git commit -m "가격 수정"
   git push
   ```
2. 1~2분 뒤 라이브 주소를 새로고침하면 반영됩니다.
3. GitHub Pages 설정: Settings → Pages → Source `Deploy from a branch` / Branch `main` / Folder `/(root)`.

> `preview_desktop.png`·`preview_mobile.png`는 화면 확인용 이미지라 사이트 배포에는 포함되지 않습니다(.gitignore).
