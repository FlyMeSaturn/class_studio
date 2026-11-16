# 수업공방

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Delegated by the user: choose a maintainable static stack after inspecting the repository. The repository was empty on 2026-11-15. Use Node.js built-in modules to generate static HTML, with plain CSS and progressive JavaScript. No production dependencies or paid APIs. Host on GitHub Pages at /class_studio/.

## Users

Teachers finding teaching resources by subject and grade, and visitors reading about the teachers' shared work.

## Product Purpose

Make the workshop's teaching records findable through 1부 개념 기반 탐구학습 and 2부 교과융합. A lesson card leads to a unique resource page with author, overview and activities on the left and one unified vertical resource-button list on the right.

## Capabilities and Constraints

Public, no login. Part jump links, static lesson URLs, collection and introduction pages, keyboard and mobile access, useful empty and 404 states. No comments, analytics, visitor uploads, admin interface or AI features.

On 2026-11-16 the user authorized publishing the five Part 1 lessons from the compiled HWPX: per-lesson reading pages, HWPX downloads and galleries of the images in 수업 장면. Part 2 and the whole collection remain in preparation. Do not invent missing resources or licenses. Verified lesson metadata may be published. The user confirmed two Part 2 projects and directed us to the Jeonbuk Education issue 71 manuscript: the Jagyeongnu science/history project and the constellation-myth history/science/art project. Grade 3 is cross-checked against the workshop's development-material leaflet.

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

Remove the lesson URL-copy controls and the duplicate hero browse button. Use the actual workshop pen symbol as the browser favicon, in the same brown as the header logo.

Latest explicit user copy: the logo caption reads 교단지원 자료개발 교육연구회. Center the exact slogan on the homepage: 장인이 정성껏 물건을 만들 듯, 선생님들이 모여 정성스럽게 수업 자료를 빚어내는 공간. This requested slogan supersedes the earlier no-slogan direction; do not add other promotional copy.

The user removed the lesson-level 출처·이용 안내 block and its unconfirmed usage placeholder. Manuscripts used for editorial verification are internal evidence, not the provenance of the eventual downloadable teaching resources. Preserve verification records without displaying them as public attribution.

## Resource publication · 2026-11-16

Publish the five Part 1 lessons from the explicitly selected compilation. Each lesson has 지도안 바로 보기, 지도안 hwpx 다운받기 and 수업 사진. Reading and gallery pages return directly to the owning lesson. The reading view uses paginated images rendered from the HWPX via Hancom PDF so it works without a browser PDF plugin; the original PDF remains available. Galleries support enlargement, previous/next, arrow keys and Escape. The two exact user-supplied Padlet links belong to pressure-and-weather. Keep future PPT, student-work files and external resources in the catalog, without adding an upload/admin service.

## Compact lesson layout · 2026-11-16

Keep subject, grade and lesson title on one line when they fit. The desktop lesson view has two columns: author/overview/activities on the left, all reading/download/gallery/external links on the right. Use identical button styling with no visible 수업 자료 or 함께 쓰는 자료 headings. Label the primary actions 지도안 바로 보기, 지도안 다운받기, 수업 사진 보기. Keep spacing compact. Narrow screens stack the resource actions above the overview.

Resource icons follow destination type: right arrow for an internal viewer, download icon for a file download, chain-link icon for an external URL.

The homepage is a single non-scrolling hero screen. Introduction (/about/), lesson library (/library/) and collection (/collection/) are independent pages reached through the top navigation. The home has no footer, lesson sections or floating HOME link. This decision supersedes the earlier scroll-through homepage.

The desktop Part 1 library shows five compact cards in one row (above 1050px). Remove the repeated 자료 공개/자료 보기 card footer. Whole cards are links with a pointer cursor, directional icon, tinted background, stronger border and subtle lift on hover/focus; respect reduced motion. Smaller screens reflow to three or one column.

## Student face redaction · 2026-11-16

The user requires mosaics over visible student faces in classroom photos. Preserve existing adequate mosaics, add redaction to unmasked/weakly blurred frontal or profile faces, and keep gallery, HWPX, PDF and reading-page versions consistent. Publish the processed assets under fresh URLs. Do not republish unredacted originals from the local manuscript.
