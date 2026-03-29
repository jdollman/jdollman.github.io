# Feature Requests

## Narrow left-aligned post body (Tufte style)

The post body column should be narrower and pushed to the left, with margin notes in a right column — like Tufte CSS or the Edward Tufte handout style. We achieved this once when rendering a single post outside the Quarto project context (with `margin-width: 350px` in the post frontmatter), but couldn't replicate it when rendering within the project.

The goal: body text ~550-600px wide, left-aligned (not centered), with a 250-350px margin column on the right for sidenotes.

What to try next:
- Investigate how `_quarto.yml` grid settings interact with per-post grid settings
- Check if `title-block-banner: false` (now set in `_metadata.yml`) changed the grid behavior
- May need to override Quarto's CSS grid template directly in `theme-minimal.scss`
- Test by rendering a single post in isolation vs. within the project and diffing the HTML/CSS output to see what the project context adds
