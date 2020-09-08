# W3C Workshop on Web and Machine Learning

![Agenda header image][header]

# Agenda for Live Sessions

## September 16, 2020, 2pm UTC [🗓️](https://www.timeanddate.com/worldclock/fixedtime.html?iso=20200916T14)

>🔎 **Scope:** Opportunities and Challenges of Browser-Based Machine Learning
>
>✅ **Goal:** Determine what are the unique opportunities of browser-based ML, what are the obstacles hindering adoption

👋 Introduction to the workshop - @anssiko @dontcallmedom

[💡 "Opportunities and Challenges" discussion topics](https://github.com/w3c/machine-learning-workshop/issues?q=is%3Aissue+is%3Aopen+label%3A%22Opportunities+and+Challenges%22+sort%3Acomments-desc):

ℹ️ [WebGPU fitness for ML frameworks #66](https://github.com/w3c/machine-learning-workshop/issues/66) - @jasonmayes @Kangz @grorg
- ❓ Does WebGPU expose the right API surface to support ML frameworks interactions with GPUs?
- ✔️ Proposal: New WebGPU extensions for subgroups, cooperative matrix multiply.

ℹ️ [Applicability to non-browser JS environments #62](https://github.com/w3c/machine-learning-workshop/issues/62) - @jasonmayes @phoddie @huningxin @WenheLI
- ❓ Pay attention to the applicability of the browser-targeted work to non-browser JS environments, in particular Node.js.
- ✔️ Proposal: Extend W3C coordination to TC53 and non-browser projects.

ℹ️ [Protecting ML models #67](https://github.com/w3c/machine-learning-workshop/issues/67) - @jasonmayes @tidoust @pyu10055 @jbingham
- ❓ Some ML providers need to ensure their ML models cannot be extracted from a browser app.
- ✔️ Proposal: Investigate existing access control mechanisms for video, learnings from 3D assets.

ℹ️ [Support for Float16 in JS & Wasm environments #64](https://github.com/w3c/machine-learning-workshop/issues/64) - @cynthia @jasonmayes
- ❓ Lack of support for float16 in JS and Wasm environments problematic for quantized models.
- ✔️ Proposal: TBD

ℹ️ [In-browser training #82](https://github.com/w3c/machine-learning-workshop/issues/82) and [Training across devices #83](https://github.com/w3c/machine-learning-workshop/issues/83) - @irealva @cynthia
- ❓ The current in-browser efforts are focused on inference rather than training.
- ✔️ Proposal: Understand successful real-world usages (e.g. Teachable Machine) and target transfer learning as the initial training use case for related browser API work.

ℹ️ [Memory copies #93](https://github.com/w3c/machine-learning-workshop/issues/93) - @aboba @wchao1115
- ❓ Machine learning apps within the browser using the media pipeline trigger many more memory copies compared with native applications hindering performance.
- ✔️ Proposal: Introduce a more direct way to feed a video frame, possibly captured from a camera, to a ML model.

ℹ️ [Permission model for Machine Learning APIs #72](https://github.com/w3c/machine-learning-workshop/issues/72) - @cynthia @dontcallmedom @anssiko
- ❓ How to design a forward-looking permission model for ML APIs?
- ✔️ Proposal: TBD

## September 22, 2020, 2pm UTC [🗓️](https://www.timeanddate.com/worldclock/fixedtime.html?iso=20200922T14)

>🔎 **Scope:** Web Platform Foundations for Machine Learning
>
>✅ **Goal:** Understand how machine learning fits into the Web technology stack

- [💡 "Web Platform Foundations" discussion topics](https://github.com/w3c/machine-learning-workshop/issues?q=is%3Aissue+is%3Aopen+label%3A%22Web+Platform+Foundations%22+sort%3Acomments-desc) 

## September 23, 2020, 2pm UTC [🗓️](https://www.timeanddate.com/worldclock/fixedtime.html?iso=20200923T14)

>🔎 **Scope:** Machine Learning Experiences on the Web: A **Developer’s** Perspective
>
>✅ **Goal:** Authoring ML experiences on the Web; challenges and opportunities of reusing existing ML models on the Web; on-device training, known technical solutions, gaps

- [💡 "Developer's Perspective" discussion topics](https://github.com/w3c/machine-learning-workshop/issues?q=is%3Aissue+is%3Aopen+label%3A%22Developer%27s+Perspective%22+sort%3Acomments-desc)

## September 29, 2020, 2pm UTC [🗓️](https://www.timeanddate.com/worldclock/fixedtime.html?iso=20200929T14)

>🔎 **Scope:** Machine Learning Experiences on the Web: A **User’s** Perspective
>
>✅ **Goal:** Web & ML for all: education, learning, accessibility, cross-industry experiences, cross-disciplinary ML: music, art, and media meet ML; Share learnings and best practices across industries

- [💡 "User's Perspective" discussion topics](https://github.com/w3c/machine-learning-workshop/issues?q=is%3Aissue+is%3Aopen+label%3A%22User%27s+Perspective%22+sort%3Acomments-desc)
- 👍 Conclusions & Next Steps


[header]: https://www.w3.org/comm/assets/graphics/web-ML/workshop-bg.png "W3C Workshop on Web and Machine Learning header"
