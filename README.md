# ajsTheme

A modern, responsive Hugo theme designed for blogging, with built-in dark/light mode, accessible navigation, and clean code highlighting.

---

## Screenshot

![Theme Screenshot](docs/screenshot.png)

*Add your screenshot to `docs/screenshot.png`*

---

## Features
- Responsive design using Bootstrap 5
- Dark/Light/Auto color mode toggle
- Accessible navigation and skip links
- Customizable metadata and SEO tags
- Syntax highlighting for code blocks (Chroma)
- Easy-to-edit partials for header, footer, and metadata

---

## Installation
1. Add this theme to your Hugo site:
   ```sh
   git submodule add <repo-url> themes/ajsTheme
   ```
2. Set the theme in your `config.toml`:
   ```toml
   theme = "ajsTheme"
   ```

---

## Usage
- Place your content in the `content/` directory as usual.
- Customize navigation menus in your site config:
  ```toml
  [menu]
    [[menu.main]]
      name = "Home"
      url = "/"
      weight = 1
    [[menu.main]]
      name = "About"
      url = "/about/"
      weight = 2
  ```
- Add a site description and social/SEO params in `config.toml`:
  ```toml
  [params]
    description = "A modern Hugo blog theme."
    og_image = "/images/og-default.png"
    twitter_site = "your_twitter_handle"
  ```

---

## Customization
- Edit partials in `layouts/partials/` for header, footer, and metadata.
- Add or override CSS in `static/css/`.
- Add your favicon as `static/favicon.png` and Apple touch icon as `static/apple-touch-icon.png`.

---

## License
MIT
