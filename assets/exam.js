class Exam {
    constructor(selector) {
        this.feedback = [];
        this.feedbackConfig = {};
        this.$main = $(selector).addClass('exam-questions');
    }

    section(name, questions) {
        const exam = this;
        const $container = $('<dl></dl>');

        this.$main
            .append(`<h2>${name}</h2>`)
            .append($container);

        questions.forEach(function (entry) {
            const qnum = exam.feedback.length;
            exam.feedback.push(null);

            $(`<dt id="_${qnum}_">${entry.q}</dt>`).appendTo($container);

            if (entry.snippet !== undefined) {
                $('<pre></pre>').appendTo($container)
                    .text(entry.snippet.code)
                    .wrap('<dd></dd>');
            }

            const $answersList = $('<ol type="a"></ol>');
            $('<dd></dd>').appendTo($container)
                .append($answersList);

            entry.answers.forEach(function (answer, i) {
                $('<li></li>').appendTo($answersList)
                    .append(`<input type="radio" name="_${qnum}_"> `)
                    .click(function () {
                        this.firstElementChild.checked = true;
                        exam.feedback[qnum] = String.fromCharCode(i + 65);
                    })
                    .append(document.createTextNode(answer));
            });
        });
    }

    setupFeedback(config) {
        if (config instanceof Object) {
            const fbConfig = this.feedbackConfig;
            fbConfig.button   = config.button   || fbConfig.button;
            fbConfig.warning  = config.warning  || fbConfig.warning;
            fbConfig.filename = config.filename || fbConfig.filename;
        }
    }

    end() {
        const feedback = this.feedback;
        const fbConfig = this.feedbackConfig;

        const buttonText  = fbConfig.button   || 'Finish the exam';
        const warningText = fbConfig.warning  || 'The question {} was not answered!';
        const filename    = fbConfig.filename || 'answers.csv';

        $('<button></button>')
            .css('cursor', 'pointer')
            .text(buttonText)
            .click(function () {
                const qnum = feedback.indexOf(null);

                if (qnum !== -1) {
                    alert(warningText.replace('{}', qnum + 1));
                    location.hash = `#_${qnum}_`;
                    return false;
                }

                const link = document.createElement('a');
                link.href = "data:text/csv," + encodeURI(feedback.join('\n'));
                link.download = filename;
                link.style.display = 'none';

                document.body.appendChild(link);
                link.click();
            })
            .appendTo(this.$main);
    }
}

// Set a counter to show the question numbers
(function () {
    const css = document.styleSheets[document.styleSheets.length - 1];
    css.insertRule('.exam-questions { counter-reset: exam-counter; }');
    css.insertRule('.exam-questions dt:before { content: counter(exam-counter); counter-increment: exam-counter; }');
})();
