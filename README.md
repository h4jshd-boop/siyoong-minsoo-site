# 시영과민수 공식 사이트

- **라이브 주소** — https://h4jshd-boop.github.io/siyoong-minsoo-site/
- **GitHub 저장소** — https://github.com/h4jshd-boop/siyoong-minsoo-site
- **네이버 스마트스토어** — https://smartstore.naver.com/siyoung_minsoo (가격·구성은 이 스마트스토어 판매 기준)

## 문구·가격 고치는 방법
1. **파일로 고치기** — `site-config.js`를 메모장으로 열어 따옴표 안의 글자와 숫자만 고치고 저장하면 바로 반영됩니다. (가격은 `390000`처럼 숫자만)
2. **화면에서 고치기** — 사이트 주소 끝에 `?edit=1`을 붙여 열고 글자를 눌러 고친 뒤, [site-config.js 내려받기]로 받은 파일을 이 폴더의 같은 파일에 덮어쓰세요.
3. **사진** — `assets/img/`에 넣고 `site-config.js`의 `image` 경로만 바꿔 주세요. **유튜브** — `url` 칸에 주소를 붙여넣으면 썸네일·재생이 자동 연결됩니다.

## 수정한 내용을 사이트에 올리는 방법
1. GitHub 저장소에서 바꾼 파일을 올리거나(웹에서 Upload files), 아래처럼 푸시합니다.
   ```
   git add -A
   git commit -m "가격 수정"
   git push
   ```
2. 1~2분 뒤 라이브 주소를 새로고침하면 반영됩니다.
3. GitHub Pages 설정: Settings → Pages → Source `Deploy from a branch` / Branch `main` / Folder `/(root)`.

> `preview_desktop.png`·`preview_mobile.png`는 화면 확인용 이미지라 사이트 배포에는 포함되지 않습니다(.gitignore).
