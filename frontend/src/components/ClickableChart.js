import React from 'react';
import './ClickableChart.css';

const characters = [
  // First row
  { hiragana: 'あ', katakana: 'ア', x: 55, y: 65 },
  { hiragana: 'い', katakana: 'イ', x: 128, y: 65 },
  { hiragana: 'う', katakana: 'ウ', x: 201, y: 65 },
  { hiragana: 'え', katakana: 'エ', x: 274, y: 65 },
  { hiragana: 'お', katakana: 'オ', x: 347, y: 65 },
  // k row
  { hiragana: 'か', katakana: 'カ', x: 55, y: 128 },
  { hiragana: 'き', katakana: 'キ', x: 128, y: 128 },
  { hiragana: 'く', katakana: 'ク', x: 201, y: 128 },
  { hiragana: 'け', katakana: 'ケ', x: 274, y: 128 },
  { hiragana: 'こ', katakana: 'コ', x: 347, y: 128 },
  // s row
  { hiragana: 'さ', katakana: 'サ', x: 55, y: 191 },
  { hiragana: 'し', katakana: 'シ', x: 128, y: 191 },
  { hiragana: 'す', katakana: 'ス', x: 201, y: 191 },
  { hiragana: 'せ', katakana: 'セ', x: 274, y: 191 },
  { hiragana: 'そ', katakana: 'ソ', x: 347, y: 191 },
  // t row
  { hiragana: 'た', katakana: 'タ', x: 55, y: 254 },
  { hiragana: 'ち', katakana: 'チ', x: 128, y: 254 },
  { hiragana: 'つ', katakana: 'ツ', x: 201, y: 254 },
  { hiragana: 'て', katakana: 'テ', x: 274, y: 254 },
  { hiragana: 'と', katakana: 'ト', x: 347, y: 254 },
  // n row
  { hiragana: 'な', katakana: 'ナ', x: 55, y: 317 },
  { hiragana: 'に', katakana: 'ニ', x: 128, y: 317 },
  { hiragana: 'ぬ', katakana: 'ヌ', x: 201, y: 317 },
  { hiragana: 'ね', katakana: 'ネ', x: 274, y: 317 },
  { hiragana: 'の', katakana: 'ノ', x: 347, y: 317 },
  // h row
  { hiragana: 'は', katakana: 'ハ', x: 55, y: 380 },
  { hiragana: 'ひ', katakana: 'ヒ', x: 128, y: 380 },
  { hiragana: 'ふ', katakana: 'フ', x: 201, y: 380 },
  { hiragana: 'へ', katakana: 'ヘ', x: 274, y: 380 },
  { hiragana: 'ほ', katakana: 'ホ', x: 347, y: 380 },
  // m row
  { hiragana: 'ま', katakana: 'マ', x: 55, y: 443 },
  { hiragana: 'み', katakana: 'ミ', x: 128, y: 443 },
  { hiragana: 'む', katakana: 'ム', x: 201, y: 443 },
  { hiragana: 'め', katakana: 'メ', x: 274, y: 443 },
  { hiragana: 'も', katakana: 'モ', x: 347, y: 443 },
  // y row
  { hiragana: 'や', katakana: 'ヤ', x: 55, y: 506 },
  { hiragana: 'ゆ', katakana: 'ユ', x: 201, y: 506 },
  { hiragana: 'よ', katakana: 'ヨ', x: 347, y: 506 },
  // r row
  { hiragana: 'ら', katakana: 'ラ', x: 55, y: 569 },
  { hiragana: 'り', katakana: 'リ', x: 128, y: 569 },
  { hiragana: 'る', katakana: 'ル', x: 201, y: 569 },
  { hiragana: 'れ', katakana: 'レ', x: 274, y: 569 },
  { hiragana: 'ろ', katakana: 'ロ', x: 347, y: 569 },
  // w row
  { hiragana: 'わ', katakana: 'ワ', x: 55, y: 632 },
  { hiragana: 'を', katakana: 'ヲ', x: 347, y: 632 },
  // n row
  { hiragana: 'ん', katakana: 'ン', x: 55, y: 695 },
];




const ClickableChart = ({ onCharacterSelect }) => {
  return (
    <div className="chart-container">
      <img src="/chart.jpeg" alt="Hiragana Katakana Chart" className="chart-image" />
      {characters.map((char, index) => (
        <React.Fragment key={index}>
          <div
            className="clickable-area"
            style={{ left: `${char.x}px`, top: `${char.y}px` }}
            onClick={() => onCharacterSelect(char.hiragana)}
          >
            {char.hiragana}
          </div>
          <div
            className="clickable-area"
            style={{ left: `${char.x + 30}px`, top: `${char.y}px` }} /* Adjust as necessary */
            onClick={() => onCharacterSelect(char.katakana)}
          >
            {char.katakana}
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default ClickableChart;