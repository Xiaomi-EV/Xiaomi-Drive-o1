# Xiaomi-Drive-o1

## DriveFoundry

`DriveFoundry: Co-Evolving Data and Model for Efficient Closed-Loop Iteration in Autonomous Driving` describes a closed-loop engine for turning critical driving experience into reusable decision capability. The model at the center of the engine is **Xiaomi-Drive-o1**, a shared vision-language foundation model with Perception, Causal Reasoning, Action, World, and Value interfaces.

This repository is being prepared as the project home for the paper and its future release. The current source material is a manuscript and figure set under active development; it is not a claim that training code, checkpoints, datasets, or deployment software are already released.

> **Status:** Release soon.

## What is in this repository

- [`docs/overview.md`](docs/overview.md) - the problem, two coupled loops, and system flow.
- [`docs/data_and_model.md`](docs/data_and_model.md) - scene-candidate records, causal annotations, model interfaces, training, and inference paths.
- [`docs/evaluation.md`](docs/evaluation.md) - evaluation protocol, draft results, ablations, and open verification items.

The project page is maintained separately on the `page` branch as a static research presentation. This `main` branch is intended to hold the normal repository documentation and, when released, implementation or reproducibility artifacts.

## Core idea

The data loop links a scene, candidate behavior, and outcome in one record:

```text
failure mining -> structured annotation -> expert/VLM verification
       -> published records -> training and closed-loop evaluation
```

The model loop uses the same causal structure at inference time:

```text
Perception -> Causal Reasoning -> Action -> World -> Value
```

The scheduler can stop after a fast `Action -> Value` pass, add `Perception -> Causal Reasoning`, or run the full path when the candidate needs additional verification.

## Scope and release notes

The manuscript identifies Xiaomi EV as the project affiliation and does not provide a final individual author list in the current project record. No author names, download endpoint, code endpoint, or license should be inferred from this repository until the project owners publish them.

The evaluation page deliberately distinguishes values present in the current manuscript draft from results that are still marked `TBD` or described as pending in the text. See [`docs/evaluation.md`](docs/evaluation.md) for the protocol and caveats.

## Citation

The paper title currently used by the manuscript is:

> DriveFoundry: Co-Evolving Data and Model for Efficient Closed-Loop Iteration in Autonomous Driving

A release-ready BibTeX entry and the final author/contribution statement should be added by the project owners when the paper is published.
