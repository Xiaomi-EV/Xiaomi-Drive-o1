# DriveFoundry Page Assets

Staged from `Transfer/MiMo-WAM_2.0/figs` for the Xiaomi-Drive-o1 `page` branch. Originals are untouched.
WebP images use quality 85 with a 2400px maximum edge; the selected PDF is rendered from page 1 at 190 DPI and retained as PNG for text fidelity.

| Source | Staged file | Dimensions | Size | Intended use |
| --- | --- | ---: | ---: | --- |
| `main_page.png` | `hero.webp` | 1672 x 941 | 130 KB | Hero visual: DriveFoundry token-edit model overview. |
| `main_structure.png` | `model-architecture.webp` | 1815 x 866 | 89 KB | Architecture: unified Perception, Causation, Action, World and Value interfaces. |
| `pipeline.png` | `training-pipeline.webp` | 2400 x 714 | 118 KB | Training pipeline: pretraining, structured SFT and post-training. |
| `infer_frame.jpg` | `adaptive-inference.webp` | 2400 x 650 | 57 KB | Adaptive inference: System 1, System 2 and full reasoning paths. |
| `ch4_annotation_overview.png` | `annotation-overview.webp` | 2400 x 1248 | 130 KB | Structured scene-candidate record and annotation hierarchy. |
| `ch4_annotation_pipeline.png` | `annotation-pipeline.webp` | 2400 x 1080 | 81 KB | Data-production and annotation pipeline. |
| `ch4_coc_production.png` | `coc-production.webp` | 2400 x 1095 | 103 KB | Decision-centric Chain of Causation production workflow. |
| `ch4_annotation_feedback.png` | `annotation-feedback.webp` | 2400 x 1125 | 110 KB | Quality assurance and human feedback loop for published records. |
| `coc_examples/coc_three_compare_1.jpeg` | `coc-example-1.webp` | 932 x 788 | 79 KB | Qualitative CoC example: candidate comparison. |
| `coc_examples/coc_three_compare_2.jpeg` | `coc-example-2.webp` | 922 x 868 | 90 KB | Qualitative CoC example: decision evidence at an intersection. |
| `pareto.png` | `efficiency-pareto.webp` | 1448 x 1086 | 73 KB | Results visual: compute-performance Pareto comparison. |
| `compare.png` | `qualitative-comparison.webp` | 1356 x 676 | 30 KB | Results visual: qualitative benchmark comparison. |
| `planning-viz.pdf (page 1)` | `planning-visual.png` | 2400 x 1311 | 2474 KB | Planning/value qualitative visualization. |

## Selection rationale

The set provides a complete project-page narrative: a hero, architecture, training and adaptive-inference overviews, the data and CoC production loop, two qualitative explanations, and planning/benchmark evidence. The hero and explanatory diagrams remain wide enough for desktop presentation; the responsive page should use `loading="lazy"` below the first viewport.
