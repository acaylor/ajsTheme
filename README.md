# ajsTheme

This is a hugo theme. It is HTML templates along with css and javascript to make the site responsive for desktop and mobile usage.

## Custom css

Most CSS here is leveraging Bootstrap classes.

The chroma library can be used to configure syntax highlighting for code blocks

```md
Code comes out as 

```html
<code>echo foo</code>
```

```

This is configured in `./static/css/style.css`

---

# chapgpt instruction
Creating a new Hugo theme involves several steps. Hugo is a static site generator, and themes in Hugo are essentially a collection of layouts, partials, static assets, and configurations that define the structure and styling of a website. Here's a step-by-step guide to creating a new Hugo theme:

### Step 1: Set Up a New Hugo Site

1. Install Hugo: Make sure you have Hugo installed on your machine. You can download it from the [Hugo releases page](https://github.com/gohugoio/hugo/releases) or use a package manager like Homebrew.

   ```bash
   brew install hugo
   ```

2. Create a New Hugo Site: Run the following command to create a new Hugo site.

   ```bash
   hugo new site myhugosite
   ```

3. Change Directory: Move into the newly created site directory.

   ```bash
   cd myhugosite
   ```

### Step 2: Initialize a New Theme

1. Inside your Hugo site directory, create a new theme directory.

   ```bash
   mkdir themes/mynewtheme
   ```

2. Navigate to the new theme directory.

   ```bash
   cd themes/mynewtheme
   ```

3. Create a `layouts` directory. This is where you'll define the HTML templates for different content types.

   ```bash
   mkdir layouts
   ```

### Step 3: Create Layouts and Partials

1. Inside the `layouts` directory, create files for different content types (e.g., `index.html`, `single.html`, `list.html`). These templates will define how your site looks.

2. Use Hugo template tags to dynamically generate content. Refer to the [Hugo documentation](https://gohugo.io/templates/introduction/) for details on template syntax.

3. Create a `partials` directory if you have reusable components that will be used across multiple templates.

### Step 4: Add Static Assets

1. Create a `static` directory in your theme. This is where you'll put static assets like CSS, JavaScript, images, etc.

   ```bash
   mkdir static
   ```

2. Add your theme's stylesheets and other assets to the `static` directory.

### Step 5: Configure Theme

1. Create a `theme.toml` or `theme.yaml` file at the root of your theme directory to provide metadata and configuration for your theme.

   Example `theme.toml`:

   ```toml
   name = "mynewtheme"
   license = "MIT"
   licenselink = "https://github.com/yourusername/mynewtheme/blob/main/LICENSE.md"
   description = "A custom Hugo theme"
   homepage = "https://github.com/yourusername/mynewtheme"
   tags = ["hugo", "theme"]
   ```

### Step 6: Test Your Theme

1. Go back to the root of your Hugo site.

   ```bash
   cd ..
   ```

2. Edit the `config.toml` file to set your new theme.

   ```toml
   theme = "mynewtheme"
   ```

3. Run Hugo to see your site with the new theme.

   ```bash
   hugo server -D
   ```

Visit `http://localhost:1313` in your browser to see your Hugo site using the new theme. Customize and iterate on your theme by modifying layouts, styles, and other assets as needed.

### Step 7: Publish Your Theme

1. Commit your theme to a version control system (e.g., Git).

   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. Publish your theme to a repository on a platform like GitHub.

Now, your Hugo theme is ready to be used by others. Other Hugo users can add your theme as a submodule or download it to use in their projects.

Adding a search functionality to a Hugo static site involves creating an index of your content and implementing a search feature on your website. Here are the general steps to add search functionality to a Hugo site:

### 1. Generate a Search Index:

#### Option 1: Lunr.js

1. **Install Hugo Pipes (if not already installed):**

   ```bash
   hugo mod get -u -t hugoThemes
   ```

2. **Install Lunr.js and Create a Search Index:**

   - Install Lunr.js using npm:

     ```bash
     npm install lunr
     ```

   - Create a script to generate a search index. Create a new file, e.g., `generate-search-index.js`:

     ```javascript
     const fs = require('fs');
     const lunr = require('lunr');
     const { execSync } = require('child_process');

     // Run Hugo to generate the JSON representation of the content
     execSync('hugo -t yourtheme');

     // Load the generated JSON file
     const content = require('./public/index.json');

     // Create Lunr.js index
     const idx = lunr(function () {
       this.ref('uri');
       this.field('title', { boost: 2 });
       this.field('content');

       content.forEach((page) => {
         this.add({
           uri: page.permalink,
           title: page.title,
           content: page.content,
         });
       });
     });

     // Save the index to a file
     fs.writeFileSync('./static/js/search-index.json', JSON.stringify(idx));
     ```

   - Run the script:

     ```bash
     node generate-search-index.js
     ```

#### Option 2: Algolia or Other Search Services

Alternatively, you can use a third-party search service like Algolia. Refer to their documentation for instructions on integrating with Hugo.

### 2. Implement the Search UI:

1. **Create a Search Page:**

   Create a new content file for your search page, e.g., `content/search/index.md`:

   ```markdown
   ---
   title: "Search"
   layout: "search"
   ---

   <!-- Additional content or instructions for the search page -->
   ```

2. **Create a Search Layout:**

   Create a new layout file, e.g., `layouts/search/single.html`:

   ```html
   <!-- layouts/search/single.html -->

   {{ define "main" }}
     <div class="container">
       <h1>{{ .Title }}</h1>
       <input type="text" id="search-input" placeholder="Search...">
       <ul id="search-results"></ul>
     </div>

     <script src="{{ "js/search.js" | relURL }}"></script>
   {{ end }}
   ```

3. **Implement JavaScript for Search:**

   Create a new JavaScript file, e.g., `static/js/search.js`:

   ```javascript
   // static/js/search.js

   document.addEventListener('DOMContentLoaded', function () {
     const searchInput = document.getElementById('search-input');
     const searchResults = document.getElementById('search-results');

     searchInput.addEventListener('input', function () {
       const query = searchInput.value.toLowerCase();

       // Fetch the search index
       fetch('/js/search-index.json')
         .then((response) => response.json())
         .then((index) => {
           const results = index.filter((item) =>
             item.title.toLowerCase().includes(query) ||
             item.content.toLowerCase().includes(query)
           );

           // Update the search results list
           searchResults.innerHTML = results
             .map((result) => `<li><a href="${result.uri}">${result.title}</a></li>`)
             .join('');
         });
     });
   });
   ```

4. **Style the Search Page (Optional):**

   Style your search page and results to fit your site's design. Add the necessary styles to your CSS files.

### 3. Test Your Search Functionality:

1. Start your Hugo development server:

   ```bash
   hugo server -D
   ```

2. Visit the search page on your local server, usually at `http://localhost:1313/search/`.

By following these steps, you should have added a basic search functionality to your Hugo static site. Keep in mind that this is a simple example, and you may need to adapt it based on your specific requirements and design preferences.