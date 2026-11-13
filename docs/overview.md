# Project Overview

## Motivation

Production autonomous driving is a constrained, partially observed decision problem. Routine fleet data is broad, but rare critical events contain the capability gaps that matter most. A useful iteration engine must therefore do two things at once: extract decision-relevant causal structure from scarce experience and allocate model computation where the current decision is uncertain.

DriveFoundry couples these two objectives. Its **structured data-learning loop** turns failures and critical scenarios into linked supervision. Its **adaptive model-cognition loop** reuses that structure during each decision and invokes more reasoning only when the candidate needs it.

## Unified decision unit

The basic unit is a scene at a decision time together with one or more candidate behaviors. Each candidate keeps the connection between:

- **World:** observable facts, attributes, relations, constraints, and candidate-relevant evidence;
- **Policy:** discrete intent, meta-actions, targets, and continuous trajectory realization;
- **Value:** feasibility, safety, legal/rule compatibility, interaction quality, preference, provenance, and confidence.

Alternative candidates remain separate records even when they share the same scene. This makes it possible to compare actions and outcomes, and to distinguish a bad decision from a reasonable decision executed with poor timing or clearance.

## Coupled loops

### Data loop

Critical clips enter a production cycle of failure mining, automatic pre-labeling, targeted human correction, quality assessment, publishing, and retraining. Detector, tracker, OCR, topology, and rule modules can propose observable facts. Human review focuses on uncertain associations and candidate-specific causal relations. Verified records are also used to improve the annotation model and the annotation guidance, so corrections can transfer beyond the individual frame.

### Model loop

Xiaomi-Drive-o1 uses a shared multimodal backbone and task-specific latent interfaces. Perception represents the current scene, Causal Reasoning (CoC) identifies factors and constraints, Action produces a decision and trajectory, World predicts an action-conditioned future, and Value evaluates the candidate and the need for more computation. Block-wise autoregressive latent refill exposes realized upstream task outputs to downstream blocks, rather than treating explanations as post-hoc text.

## Adaptive execution

The manuscript defines three execution paths over the same model:

| Path | Route | Intended role |
| --- | --- | --- |
| System 1 | `A -> V` | Fast candidate generation and acceptance. |
| System 2 | `P -> C -> A -> V` | Add scene evidence and causal relations before regenerating and scoring. |
| Full reasoning | `P -> C -> A -> W -> V` | Verify candidate-specific predicted consequences before selecting an admissible trajectory. |

Value-guided scheduling chooses whether another task block, candidate, or repeated call is worth its compute cost. Rule-based post-processing and a safety fallback remain available when the learned candidate is not accepted.

## Training stages

1. **Language and discrete visual sequence pretraining** learns scene-to-factor, factor-to-decision, action-to-consequence, and consequence-to-value links through a common sequence interface.
2. **Structured supervised fine-tuning** grounds Perception, CoC, planning, World, and Value targets in task latents, discrete actions, continuous motion, and future visual tokens.
3. **Behavior and computation feedback** optimizes driving return while pricing average inference compute, using execution feedback, violations, counterfactual preferences, and scheduler statistics.

## Design principle

The same scene, candidate, time range, evidence, and provenance identifiers are shared by the data and model loops. A failure can therefore be traced to a missing fact, an incorrect factor-decision relation, an uncovered candidate, a consequence prediction error, or a value-selection error. The intended outcome is not merely a larger annotation set or a larger model, but more closed-loop driving return per unit of data and computation.
