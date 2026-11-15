# 수업공방

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Delegated by the user: choose a maintainable static stack after inspecting the repository. The repository was empty on 2026-11-15. Use Node.js built-in modules to generate static HTML, with plain CSS and progressive JavaScript. No production dependencies or paid APIs. Host on GitHub Pages at /class_studio/.

## Users

Teachers finding teaching resources by subject and grade, and visitors reading about the teachers' shared work.

## Product Purpose

Make the workshop's teaching records findable through 1부 개념 기반 탐구학습 and 2부 교과융합. A lesson card leads to a unique resource page with downloads at the top.

## Capabilities and Constraints

Public, no login. Part jump links, static lesson URLs, collection and introduction pages, keyboard and mobile access, useful empty and 404 states. No comments, analytics, visitor uploads, admin interface or AI features.

The user's current instruction forbids uploading actual teaching files. Show an honest preparation state, with no invented file formats, sizes, downloads or license. Verified lesson metadata may be published. The user confirmed two Part 2 projects and directed us to the Jeonbuk Education issue 71 manuscript: the Jagyeongnu science/history project and the constellation-myth history/science/art project. Grade 3 is cross-checked against the workshop's development-material leaflet.

## Brand Commitments

Korean educational-resource copy, modest descriptions of teachers studying and trying lessons together. Preserve the two-part structure. Avoid exaggerated claims, decorative gradients, shadows, badges and needless animation. Lesson cards are explicitly required; other sections need not be boxes.

## Evidence on Hand

PRD v0.2: https://app.notion.com/p/419acf57be0f818d9bcde9df4eec1b50 . Current user instructions override its proposals. Local compiled concept-based lesson manuscript confirms five lessons (science grades 1 and 3, mathematics grade 2, music grade 2, English grade 3). It is unfinished. November 8 variants exist, while the compilation was modified later on November 11; modification time alone does not establish finality. Source files and local paths are not shipped.

## Product Principles

- Find a lesson before reading long explanations.
- Show real availability, without fake download controls.
- Keep lesson data separate from rendering code.
- Publish only explicitly selected public assets.

## Accessibility & Inclusion

Mobile layout, keyboard navigation, visible focus, labeled controls, semantic headings, no forced motion.

## Latest user decisions · 2026-11-15

Use the actual workshop logo from the local logo folder. Always spell out 개념 기반 탐구학습, never the abbreviation. Remove search and all filters at the current scale. Delete promotional filler and shorten explanatory copy with humanizer-kr while preserving verified lesson facts. Use Collective Gallery as a design reference: a full-viewport, people-free workshop image, generated with the available built-in imagegen tool, with quiet navigation and generous spacing. The tool exposes no model-version selector; do not claim a specific image model version.

The latest refinement uses a brown rendition of the actual logo, a translucent fixed header with navigation ordered 소개 → 수업자료 → 자료집, and a persistent bottom-right HOME link. The introduction keeps only the workshop description; usage/source sections and the image-generation label are removed from that page. Image provenance stays in repository documentation, and lesson-level sources remain with each lesson.
