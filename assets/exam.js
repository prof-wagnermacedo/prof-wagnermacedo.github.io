class Exam {
    constructor() {
        this.sheets = {};
        this.feedback = [];
    }

    section(name, questions) {
        this.sheets[name] = questions.slice();
        for (let i in questions) {
            this.feedback.push(null);
        }
    }

    render(selector) {
        const exam = this;
        const $mainContainer = $(selector);

        $mainContainer.addClass('exam-questions');

        let questionNumber = 0;

        for (let name in exam.sheets)  {
            const questions = exam.sheets[name];
            const $container = $('<dl></dl>');

            $mainContainer.append(`<h2>${name}</h2>`);
            $mainContainer.append($container);

            questions.forEach(function (entry) {
                const qnum = questionNumber++;

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
                        .append(`<input type="radio" id="_${qnum}-${i}_" name="_${qnum}_"> `)
                        .click(function () {
                            document.getElementById(`_${qnum}-${i}_`).checked = true;
                            exam.feedback[qnum] = String.fromCharCode(i + 65);
                        })
                        .append(`<label for="_${qnum}-${i}_"></label>`).find('label')
                        .append(document.createTextNode(answer));
                });
            });
        }

        if (exam.answersLink !== undefined) {
            $(exam.answersLink)
                .css('cursor', 'pointer')
                .click(function () {
                    const num = exam.feedback.indexOf(null);

                    if (num !== -1) {
                        document.getElementById(`_${num}_`).scrollIntoView();
                        alert(`A questão ${num + 1} não foi respondida`);
                        return false;
                    }

                    this.setAttribute('href', "data:text/csv," + encodeURI(exam.feedback.join('\n')));
                });
        }
    }
}

// Set a counter to show the question numbers
(function () {
    const css = document.styleSheets[document.styleSheets.length - 1];
    css.insertRule('.exam-questions { counter-reset: exam-counter; }');
    css.insertRule('.exam-questions dt:before { content: counter(exam-counter); counter-increment: exam-counter; }');
})();
