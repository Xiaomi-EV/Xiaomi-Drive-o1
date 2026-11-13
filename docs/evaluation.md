# Evaluation

> **Evidence status:** This page summarizes values printed in the current manuscript draft. The evaluation text also marks some comparisons as pending and several table cells as `TBD`. Treat all values as draft evidence until the release protocol, checkpoints, scorer revision, and dataset version are frozen.

## Protocol

The draft evaluates on NVIDIA PhysicalAI--Autonomous--Vehicles and LingoQA, with open-loop trajectory, closed-loop simulation, semantic/causal, candidate-value, and computation measurements. Train, validation, and test clips are intended to be disjoint; thresholds are calibrated on validation data. The closed-loop table references 916 AlpaSim scenarios with PAI-AV-NuRec version 26.02. The high-quality planning split contains 2,574 examples in the ablation tables. A 298-case human CoC evaluation uses critical test cases involving interaction with the ego vehicle.

## Reported draft results

### CoC human evaluation

The draft reports the following accuracy on 298 curated critical cases:

| Model | CoC accuracy |
| --- | ---: |
| Qwen-Drive-1.0-SFT | 68.1% |
| Alpamayo2-Super | 78.5% |
| Ours | **84.2%** |

### LingoQA

Zero-shot Lingo-Judge scores in the draft are GPT-4V 59.6, Qwen2-VL-7B 52.6, Qwen2.5-VL-7B 62.2, InternVL3.5-8B 58.6, DeepSeek-VL-7B 46.4, Alpamayo-R1 66.2, and Ours 71.5. In the trained comparison, Alpamayo 1.5 is 74.2, Alpamayo 2 Super is 79.2, and Ours is 76.8; the draft therefore does **not** support claiming that Ours exceeds Alpamayo 2 Super on this trained table.

### Open-loop planning

For the PhysicalAI-NV split, the draft reports Xiaomi-Drive-o1-9B minADE@6 of 0.18 m at 3 s and 0.56 m at 5 s, average ADE of 0.30 m and 0.88 m, and ADE@1 of 0.29 m and 0.71 m. On the high-quality split, the corresponding 9B values are 0.25 m and 0.43 m, 0.37 m and 0.95 m, and 0.36 m and 0.83 m. The 0.8B row is also included in the manuscript tables, but model size, split, and scorer details should be retained when quoting it.

### Closed-loop planning

The draft reports the following PhysicalAI/AlpaSim rows:

| Model | Close encounter (all / at-fault) | Off-road | Progress | AlpaSim (all / at-fault) |
| --- | ---: | ---: | ---: | ---: |
| Xiaomi-Drive-o1-0.8B | 19.1% / 10.6% | 15.4% | 44.9% | 0.23 / 0.27 km |
| Xiaomi-Drive-o1-9B | 18.6% / 9.4% | **8.0%** | 56.8% | 0.29 / 0.40 km |

The table also contains baselines and `TBD` cells for Alpamayo 2.0; those entries should not be silently converted into complete comparisons.

### Dynamic reasoning and modular ablations

The quality-compute ablation reports minADE@6 at 3 s / 5 s, close encounter, off-road, and AlpaSim score as follows:

| Policy | Route | minADE@6 | Close encounter | Off-road | AlpaSim |
| --- | --- | ---: | ---: | ---: | ---: |
| System 1 | direct | 0.66 / 1.65 m | 43.6% | 23.9% | 0.10 |
| Joint training | System-1 only | 0.35 / 0.89 m | 30.8% | 19.7% | 0.18 |
| Joint training | Adaptive | **0.26 / 0.64 m** | **19.1%** | **15.4%** | **0.23** |

The cumulative modular table reports minADE@1 at 3 s / 5 s and collision rate: Planning 0.66 / 1.93 m, 17.05%; +Perception 0.60 / 1.61 m, 16.77%; +CoC 0.55 / 1.57 m, 16.07%; +Value 0.57 / 1.52 m, 13.17%; +World 0.53 / 1.47 m, 11.40%.

### World model comparison

The world-model table reports FID 6.6, FVD 80.0, and a maximum generation of 4 s / 8 frames for DriveFoundry, with the table's listed comparison methods and metrics. These values are draft table entries, not a standalone release benchmark claim.

## Open items

- The manuscript contains pending numerical comparisons and `TBD` cells.
- Final checkpoints, preprocessing, scorer revisions, candidate counts, inference budgets, and hardware are not specified here as a release contract.
- Road-test quantitative entries remain `TBD`; the signalized-intersection example is described as a planned qualitative case.
- The final author list, contribution taxonomy, licenses, data governance, and vehicle-test approvals must be added by the project owners.
