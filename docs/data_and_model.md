# Data and Model Contract

## Scene-candidate records

Each record is anchored to a scene history and decision time. It can contain multiple candidate behaviors, with stable identifiers for the scene, candidate, target objects, time ranges, evidence, confidence, provenance, and annotation version. A validity mask records which supervision items are available; partial records are allowed when annotation effort should focus on decision-critical information.

### World Description

World Description is organized as grounded QA over five domains: traffic agents, road topology and lanes, temporary occupancy or road anomalies, traffic lights, and signs. The hierarchy progresses from raw geometry/OCR, to object attributes and visible states, to relations such as object-lane or signal-lane associations, and finally to candidate-specific relevance, constraints, and information gaps.

### Policy Description

Policy Description binds a discrete behavior to its physical realization. It records decision segments, lateral and longitudinal meta-actions, target associations, continuous trajectories, and alternative interaction hypotheses. A single intent can have multiple realizations; candidate IDs preserve differences in timing, clearance, and speed profile.

### Value Description

Value Description evaluates the complete scene-candidate outcome:

| Level | Criterion |
| --- | --- |
| V0 | Physical feasibility |
| V1 | Safety margin |
| V2 | Legal and traffic-rule compatibility |
| V3 | Interaction and social quality |
| V4 | Preference among acceptable candidates |

These fields are distinct from the model-facing five ordinal Value scores and from the causal trace that explains why a decision was made.

## Causal annotation

The Chain of Causation (CoC) is represented as a factor-decision graph. Factor nodes describe states or relations that can affect a decision; decision nodes describe lateral or longitudinal behavior. Edges carry a role (`MOTIVE` or `CONSTRAINT`), valid time interval, and evidence reference. Counterfactual branches can intervene on a factor or candidate action and retain their provenance separately from observed outcomes.

The production flow is:

```text
pre-label facts and relations
        -> identify decision segments and candidates
        -> forward CoC and decision graph
        -> rollout/rule/counterfactual verification
        -> World-Policy-Value quality review
        -> publish record with provenance and version
```

Joint quality requires the required World, Policy, Value, and cross-description relationships to be correct. Reference-based metrics cover structured fields; a VLM critic and sampled human review assess open-ended grounding and causal consistency. Source-clip separation is retained between evaluation references and corrective training examples.

## Model interfaces

Xiaomi-Drive-o1 receives multi-camera observations, ego state, navigation, traffic-light state, speed limits, and metadata. The manuscript describes a Qwen3.8-VL 27B multimodal backbone with task queries for:

- `P`: Perception and current world-state evidence;
- `C`: Causal Reasoning / CoC factors, constraints, and decisions;
- `A`: Action, including semantic decision tokens and a 6.4-second trajectory at 10 Hz;
- `W`: action-conditioned future visual evidence;
- `V`: candidate outcome scores and a value-of-computation signal.

Task-specific latent interfaces and block-wise autoregressive refill allow downstream blocks to consume the upstream outputs produced on the selected path. The Action decoder's autoregressive meta-actions and diffusion trajectory decoder are separate from the inter-task refill mechanism.

## Data-to-model mapping

| Record supervision | Model computation |
| --- | --- |
| World facts, objects, and relations | Perception and CoC |
| Decisions, meta-actions, and trajectories | Action |
| Executed future visual targets | World |
| Ratings, outcome evidence, and preferences | Value |
| Physical, collision, and rule checks | Feasibility filtering and verification |

## Reproducibility boundary

This document describes the manuscript's design, not a released implementation contract. Checkpoints, preprocessing code, exact training schedules, deployment hardware, data licenses, and a final contribution statement are not supplied here and must be published or specified by the project owners before a reproducibility claim is made.
