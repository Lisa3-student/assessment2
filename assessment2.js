'use strict';
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivision = document.getElementById('result-area');
const tweetDivision = document.getElementById('tweet-area');

assessmentButton.addEventListener(
    'click',
    () => {
        // function(){
        // }　アロー関数=>で代用できる
        const userName = userNameInput.value;
        if (userName.length === 0) {
            resultDivision.innerText = '名前を入力してください。';
            return;
        }
        const selectedPersonality = document.querySelector('input[name="personality"]:checked');
        if (!selectedPersonality) {
            resultDivision.innerText = '性格を一つ選んでください。';
            return;
        }

        resultDivision.innerText = ''; // ボタンが押されるとdivタグを空文字で上書きする
        // while (resultDivision.firstChile) {
        //     resultDivision.removeChild(resultDivision.firstChild);
        // }
        // headerDivisionの作成
        const headerDivision = document.createElement('div');
        headerDivision.setAttribute('class', 'card-header text-bg-primary');
        headerDivision.innerText = '診断結果';

        // bodyDivisionの作成
        const bodyDivision = document.createElement('div');
        bodyDivision.setAttribute('class', 'card-body');

        const paragraph = document.createElement('p');
        paragraph.setAttribute('class', 'card-text');
        const result = assessment(userName, selectedPersonality.value);
        paragraph.innerText = result;
        bodyDivision.appendChild(paragraph);

        // resultDivisionにBootstrapのスタイルを適用する
        resultDivision.setAttribute('class', 'card');

        // headerDivisionとbodyDivisionをresultDivisionに差し込む
        resultDivision.appendChild(headerDivision);
        resultDivision.appendChild(bodyDivision);

        // TODO ツイートエリアの作成
        tweetDivision.innerText = ''; // ツイートエリアの初期化
        const anchor = document.createElement('a');
        const hrefValue = 'https://x.com/intent/tweet?button_hashtag=' + encodeURIComponent('あなたに似ている動物') + '&ref_src=twsrc%5Etfw';
        anchor.setAttribute('href', hrefValue);
        anchor.setAttribute('class', 'twitter-hashtag-button');
        anchor.setAttribute('data-text', result);
        anchor.innerText = 'Tweet #あなたに似ている動物';
        tweetDivision.appendChild(anchor);

        const script = document.createElement('script');
        script.setAttribute('src', 'https://platform.x.com/widgets.js');
        tweetDivision.appendChild(script);


    }
);

userNameInput.addEventListener(
    'keydown',
    (event) => {
        if(event.code === 'Enter') {
            assessmentButton.dispatchEvent(new Event('click'));
        }
    }
)

const answers = {
    active: { animal: 'イルカ', description: '明るく社交的なあなたは、周りを笑顔にするイルカタイプです。' },
    calm: { animal: 'フクロウ', description: '冷静で慎重なあなたは、知恵と観察力にすぐれたフクロウタイプです。' },
    curious: { animal: 'ネコ', description: '好奇心旺盛なあなたは、自由に新しい世界を楽しむネコタイプです。' },
    kind: { animal: 'イヌ', description: '優しく思いやりのあるあなたは、みんなに信頼されるイヌタイプです。' }
};

/** 
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} userName ユーザの名前
 * @param {string} personality 選択した性格
 * @return {string} 診断結果
 * 
 */
function assessment(userName, personality) {
    const answer = answers[personality];
    return `${userName}さんは${answer.animal}に似ています！\n${answer.description}`;
}
