# W3C Workshop on Web and Machine Learning

![Agenda header image][header]

# Agenda for Live Sessions

## September 16, 2020, 2pm UTC [🗓️](https://www.timeanddate.com/worldclock/fixedtime.html?iso=20200916T14)

>🔎 **Scope:** Opportunities and Challenges of Browser-Based Machine Learning
>
>✅ **Goal:** Determine what are the unique opportunities of browser-based ML, what are the obstacles hindering adoption

👋 Introduction to the workshop - @anssiko @dontcallmedom

[💡 "Opportunities and Challenges" discussion topics](https://github.com/w3c/machine-learning-workshop/issues?q=is%3Aissue+is%3Aopen+label%3A%22Opportunities+and+Challenges%22+sort%3Acomments-desc):

## Improving existing web platform capabilities

ℹ️ [WebGPU fitness for ML frameworks #66](https://github.com/w3c/machine-learning-workshop/issues/66) - @jasonmayes @Kangz @grorg @mehmetoguzderin @wchao1115
- ❓ Does WebGPU expose the right API surface to support ML frameworks interactions with GPUs?
- ✔️ Proposal: New WebGPU extensions for subgroups, cooperative matrix multiply.

ℹ️ [Support for Float16 in JS & Wasm environments #64](https://github.com/w3c/machine-learning-workshop/issues/64) - @cynthia @jasonmayes
- ❓ Lack of support for float16 in JS and Wasm environments problematic for quantized models.
- ✔️ Proposal: TBD

ℹ️ [Memory copies #93](https://github.com/w3c/machine-learning-workshop/issues/93) - @aboba @wchao1115
- ❓ Machine learning apps within the browser using the media pipeline trigger many more memory copies compared with native applications hindering performance.
- ✔️ Proposal: Introduce a more direct way to feed a video frame, possibly captured from a camera, to a ML model.

ℹ️ [Permission model for Machine Learning APIs #72](https://github.com/w3c/machine-learning-workshop/issues/72) - @cynthia @dontcallmedom @anssiko
- ❓ How to design a forward-looking permission model for ML APIs?
- ✔️ Proposal: TBD

## Extending beyond the browser

ℹ️ [Applicability to non-browser JS environments #62](https://github.com/w3c/machine-learning-workshop/issues/62) - @jasonmayes @phoddie @huningxin @WenheLI
- ❓ Pay attention to the applicability of the browser-targeted work to non-browser JS environments, in particular Node.js.
- ✔️ Proposal: Extend W3C coordination to TC53 and non-browser projects.

## September 22, 2020, 2pm UTC [🗓️](https://www.timeanddate.com/worldclock/fixedtime.html?iso=20200922T14)

>🔎 **Scope:** Web Platform Foundations for Machine Learning
>
>✅ **Goal:** Understand how machine learning fits into the Web technology stack

- [💡 "Web Platform Foundations" discussion topics](https://github.com/w3c/machine-learning-workshop/issues?q=is%3Aissue+is%3Aopen+label%3A%22Web+Platform+Foundations%22+sort%3Acomments-desc) 

## Considerations for creating and deploying models

ℹ️ [ML model format #74](https://github.com/w3c/machine-learning-workshop/issues/74) - @cynthia @jbingham @wchao1115
- ❓ There is no standard format for packaging and shipping ML models, model formats evolve rapidly.
- ✔️ Proposal: Initially focus on defining a Web API for accelerating established reusable ML operations instead of standardizing a model format.

ℹ️ [Protecting ML models #67](https://github.com/w3c/machine-learning-workshop/issues/67) - @jasonmayes @tidoust @pyu10055 @jbingham
- ❓ Some ML providers need to ensure their ML models cannot be extracted from a browser app.
- ✔️ Proposal: Investigate existing access control mechanisms for video, learnings from 3D assets.

ℹ️ [In-browser training #82](https://github.com/w3c/machine-learning-workshop/issues/82) - @irealva @hapticdata @cynthia
- ❓ The current in-browser efforts are focused on inference rather than training.
- ✔️ Proposal: Understand successful real-world usages (e.g. Teachable Machine) and target transfer learning as the initial training use case for related browser API work.

ℹ️ [Training across devices #83](https://github.com/w3c/machine-learning-workshop/issues/83) - @wmaass @Nov1102 @EmmaNingMS @zolkis @jaykishigami @shoniko
- ❓ Understand the role of edge computing in training and interactions with the web platform.
- ✔️ Proposal: Work with Web & Networks IG to understand edge computing use cases and ensure input from ML usages is considered.

## September 23, 2020, 2pm UTC [🗓️](https://www.timeanddate.com/worldclock/fixedtime.html?iso=20200923T14)

>🔎 **Scope:** Machine Learning Experiences on the Web: A **Developer’s** Perspective
>
>✅ **Goal:** Authoring ML experiences on the Web; challenges and opportunities of reusing existing ML models on the Web; on-device training, known technical solutions, gaps

- [💡 "Developer's Perspective" discussion topics](https://github.com/w3c/machine-learning-workshop/issues?q=is%3Aissue+is%3Aopen+label%3A%22Developer%27s+Perspective%22+sort%3Acomments-desc)

## Applying web design principles to ML

ℹ️ [Progressive Enhancement / Graceful degradation #68](https://github.com/w3c/machine-learning-workshop/issues/68) - @dontcallmedom  @jbingham @wchao1115 @huningxin
- ❓ How to bring more ML features as optional improvements on more powerful devices and browsers without breaking web compatibility?
- ✔️ Proposal: TBD

ℹ️ [Conformance testing of ML APIs for the Web #80](https://github.com/w3c/machine-learning-workshop/issues/80) - @wchao1115  @Kangz
- ❓ Robust conformance testing is a cornerstone of the interoperable web platform, how to scale that to the ML APIs and formats?
- ✔️ Proposal: TBD

## Improving web developer ergonomics

ℹ️ [JS Operator overloading for Machine Learning #73](https://github.com/w3c/machine-learning-workshop/issues/73) - @cynthia @huningxin
- ❓ Limitations in ECMAScript expressiveness impose ergonomics limitations for JS APIs on the web platform e.g. in vector matrix or tensor operations.
- ✔️ Proposal: TBD

ℹ️ [WebGL garbage collection #63](https://github.com/w3c/machine-learning-workshop/issues/63) - @jasonmayes @Kangz @wchao1115 @huningxin
- ❓ Garbage collection in the WebGL API affects multiple ML libraries through side effects.
- ✔️ Proposal: Identify any improvements in graphics APIs to alleviate the GC issue, ensure purpose-built APIs designed around computational graph abstraction (e.g. WebNN) optimize GC from library usage perspective.

ℹ️ [Neural network-oriented graph database #102](https://github.com/w3c/machine-learning-workshop/issues/102) - @WenheLI
- ❓ Understand model storage issues on the client, research the feasibility of a neural network-oriented graph database for the web.
- ✔️ Proposal: TBD

## September 29, 2020, 2pm UTC [🗓️](https://www.timeanddate.com/worldclock/fixedtime.html?iso=20200929T14)

>🔎 **Scope:** Machine Learning Experiences on the Web: A **User’s** Perspective
>
>✅ **Goal:** Web & ML for all: education, learning, accessibility, cross-industry experiences, cross-disciplinary ML: music, art, and media meet ML; Share learnings and best practices across industries

- [💡 "User's Perspective" discussion topics](https://github.com/w3c/machine-learning-workshop/issues?q=is%3Aissue+is%3Aopen+label%3A%22User%27s+Perspective%22+sort%3Acomments-desc)

## Web & ML for all

ℹ️ [Bias and model transparency #108](https://github.com/w3c/machine-learning-workshop/issues/108) - @dontcallmedom @JohnRochfordUMMS Jutta
- ❓ Model bias and lack of ML model transparency impact minorities and underrepresented groups, could the Web help mitigate this issue by providing a browser-assisted mechanism to detail an ML model's limitations and performance characteristics?
- ✔️ Proposal: TBD

ℹ️ [Speech recognition privacy issues and solutions #99](https://github.com/w3c/machine-learning-workshop/issues/99) - @kdavis-mozilla
- ❓ Standardization of the Web Speech API and its speech recognition part has been challenging due to privacy issues. What obstracles could be lifted to help make speech resognition an ubiquitous interoperable web capability?
- ✔️ Proposal: TBD

ℹ️ [Designing privacy-preserving ML APIs #90](https://github.com/w3c/machine-learning-workshop/issues/90) - @HelloFillip @XapaJIaMnu @kpu Jutta
- ❓ We build the web platform with responsibility to our global user base, how to ensure the tight feedback loop and productive joint effort between ML ecosystem and privacy experts?
- ✔️ Proposal: TBD

ℹ️ [Building an extensible web platform for ML, one abstraction at a time #109](https://github.com/w3c/machine-learning-workshop/issues/109) - @jasonmayes @annxingyuan @yining1023 @kdavis-mozilla
- ❓ Are we in agreement that advancing with standardization of low-level capabilities e.g. WebNN API is the pragmatic first step?
- ✔️ Proposal: TBD

## Conclusions & Next Steps

ℹ️  👍 Present a shared view of the proposed future directions - @anssiko @dontcallmedom

## MM DD, 2020, 2pm UTC

Discussion topics that were scheduled but we did not have time to cover in the four scheduled sessions are priority candidates for a possible additional live session:

## Developing interactive web experiences with ML

ℹ️ [Action-Response Cycle bottlenecks in interactive music apps #97](https://github.com/w3c/machine-learning-workshop/issues/97) - @teropa @Louismac
- ❓ Action-Response Cycle in interactive (music) apps must execute within 20 ms. Today, web developers need to do some API gymnastics to meet the requirement.
- ✔️ Proposal: Investigate inference in AudioWorklet context and media integration e.g. fast streaming inputs from MediaStream.

ℹ️ [Noise suppression with DSP+DNN, WebNN and Web Audio API feature gaps #100](https://github.com/w3c/machine-learning-workshop/issues/100) - @jmvalin @teropa @huningxin
- ❓ What areas needs work on the web platform to ensure noise suppression models perform? The need for primitives like Basic Linear Algebra Subprograms, Web Audio API enhancements to allow better analysis of waveforms?
- ✔️ Proposal: TBD

## Extending the web foundations for ML

ℹ️ [Targeting WASI-NN and WebNN together #96](https://github.com/w3c/machine-learning-workshop/issues/96) - @mehmetoguzderin @mingqiusun @abrown
- ❓ Should libraries for browsers and/or Wasm execution environments be able to target WebNN and WASI-NN together?
- ✔️ Proposal: TBD

ℹ️ [Heterogeneous parallel computing for the web #92](https://github.com/w3c/machine-learning-workshop/issues/92) - @jeffhammond @Kangz
- ❓ How do the heterogeneous parallel computing abstractions fit in with the web platform?
- ✔️ Proposal: TBD


[header]: https://www.w3.org/comm/assets/graphics/web-ML/workshop-bg.png "W3C Workshop on Web and Machine Learning header"
