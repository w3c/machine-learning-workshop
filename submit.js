/*jshint esversion: 6 */
(() => {
    document.querySelector('#submit-button').onclick = () => {
        const name = document.querySelector('#speaker-name').value;
        const bio = document.querySelector('#speaker-bio').value;
        const title = document.querySelector('#talk-title').value;
        const abstract = document.querySelector('#talk-abstract').value;

        const subject = `[workshop proposal] ${title}`;
        const body = `Hi Program Committee,` +
        `\n\n` +
        `I would like to submit a talk proposal for the W3C Workshop on Web and Machine Learning.` +
        `\n\n` +
        `Name: ${name}` +
        `\n\n` +
        `Bio: ${bio}` +
        `\n\n` +
        `Talk title: ${title}` +
        `\n\n` +
        `Talk abstract: ${abstract}`+
        `\n\n` +
        `Best regards,\n${name}`;

        window.location.href =
            'mailto:group-machine-learning-pc@w3.org' +
            '?subject=' + encodeURIComponent(subject) +
            '&body=' + encodeURIComponent(body);
    };
})();
  