# AI Security Lab — Myongji University

명지대학교 AI Security Lab 홈페이지입니다.

**Website:** https://cstriker.github.io/ai-security-lab/

## Content updates

- `js/data.js`: news, publications, patents, projects, education, and members
- HTML pages: Korean and English introduction and contact text
- `css/style.css`: shared styles and responsive layouts
- `HOW_TO_UPDATE.md`: detailed maintenance instructions

Keep the Korean and English versions in sync. Update the corresponding asset version in all six HTML files after changing CSS or JavaScript.

## Publish

GitHub Pages uses GitHub Actions. After committing changes to `main`, open **Actions → Deploy lab website to GitHub Pages → Run workflow**.

The workflow prepares only the public HTML, CSS, JavaScript, images, sitemap, and robots files. Maintenance files and the workflow itself are excluded from the deployed website. Canonical and sharing URLs are generated from the actual Pages address.

## Local preview

```sh
python -m http.server 8765 --bind 127.0.0.1
```

Open http://127.0.0.1:8765/.
