import {React, useState} from 'react';
import '../css/result.css'; // CSS 파일 import
import scrap from '../img/빈책갈피.png';
import scrapcomp from'../img/찬책갈피.png';
import news_1 from '../img/신문배경.png';
import article from '../img/기사배경.png';

function Dashboard() {

    const content = '키워드입력'
    const positiveWidth = '40%'; // 긍정 비율
    const negativeWidth = '60%'; // 부정 비율
    const [scrapped, setScrapped] = useState({}); // 스크랩 상태 관리 (스크랩 완료 시 이미지 변경)

    const isPositiveHigh = parseFloat(positiveWidth) > 50;
    const isNegativeHigh = parseFloat(negativeWidth) > 50;
    
    // 긍정,부정률에 따른 테두리 색 변화
    let positiveBoxShadowClass = '';
    let negativeBoxShadowClass = '';

    if (isPositiveHigh && isNegativeHigh) {
    positiveBoxShadowClass = '';
    negativeBoxShadowClass = '';
    } else if (isPositiveHigh) {  // 긍정 50% 이상
    positiveBoxShadowClass = 'green-shadow';
    negativeBoxShadowClass = '';
    } else if (isNegativeHigh) {  // 부정 50%이상
    positiveBoxShadowClass = '';
    negativeBoxShadowClass = 'red-shadow';
    } else {
    positiveBoxShadowClass = '';
    negativeBoxShadowClass = '';
    }

    // 스크랩 상태 토글 함수
    const toggleScrap = (articleId) => {
        setScrapped(prev => ({ ...prev, [articleId]: !prev[articleId] }));
    };

    return (
        <div className="result_container mx-auto p-4" style={{height:'100%',backgroundImage: `url(${news_1})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="flex-1 text-center">     
                {/* <h1 className='Test'> 키워드 : </h1> */}
                <h2 className="text-2xl font-bold mb-4">뉴스피스</h2><hr></hr>
                <div className="introduction-text">
                    <b>{content}</b> 에 대한 기사의 긍정, 부정 의견 분석 결과입니다 
                </div>
                <h1 className='Test1'>
                    <span>긍정 의견 (%)</span>
                    <span>부정 의견 (%)</span></h1>
            </div>
            <div className='contents'>
                <div className="mb-4">
                    <div className="bar-container mb-2" style={{ width: '100%' }}>
                        <div className="positive-bar" style={{ width: positiveWidth }}>{positiveWidth}</div>
                        <div className="negative-bar" style={{ width: negativeWidth }}>{negativeWidth}</div>
                    </div>
                </div>
                <div className="list-container md:flex" style={{ width: '100%' }}>
                <div className={`list-box ${positiveBoxShadowClass}`} style={{ width: '100%', backgroundImage: `url(${article})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                        <h3 className="list-title">positive</h3><hr></hr>
                        <div className="article-list">
                            <div className="article-item">
                                <a href="link_to_article_1" className="article-link">기사 ‘반도체 동맹 구축’ 동반자관계 구체화 111</a>
                                {/* <button className="scrap-button"><img src ={scrap}  style={{width:'20px', height:'20px'}}></img></button> */}
                                <button className="scrap-button" onClick={() => toggleScrap('article1')}>
                                    <img src={scrapped['article1'] ? scrapcomp: scrap} style={{ width: '20px', height: '20px' }} alt="Scrap"/>
                                </button>
                            </div>
                            <div className="article-item">
                                <a href="link_to_article_2" className="article-link">기사 ‘반도체 동맹 구축’ 동반자관계 구체화 222</a>
                                <button className="scrap-button" onClick={() => toggleScrap('article2')}>
                                    <img src={scrapped['article2'] ? scrapcomp: scrap} style={{ width: '20px', height: '20px' }} alt="Scrap"/>
                                </button>
                            </div>
                            <div className="article-item">
                                <a href="link_to_article_3" className="article-link">기사 ‘반도체 동맹 구축’ 동반자관계 구체화 333</a>
                                <button className="scrap-button" onClick={() => toggleScrap('article3')}>
                                    <img src={scrapped['article3'] ? scrapcomp: scrap} style={{ width: '20px', height: '20px' }} alt="Scrap"/>
                                </button>
                            </div>
                            {/* 다른 기사들에 대한 링크 및 스크랩 버튼 */}
                        </div>
                    </div>
                    <div className={`list-box_ng ${negativeBoxShadowClass}`} style={{ width: '100%', backgroundImage: `url(${article})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                        <h3 className="list-title">negative</h3><hr></hr>
                        <div className="article-list">
                            <div className="article-item">
                                <a href="link_to_article_4" className="article-link">기사 “한국·네덜란드 반도체 ” 444</a>
                                <button className="scrap-button" onClick={() => toggleScrap('article4')}>
                                    <img src={scrapped['article4'] ? scrapcomp: scrap} style={{ width: '20px', height: '20px' }} alt="Scrap"/>
                                </button>
                            </div>
                            <div className="article-item">
                                <a href="link_to_article_5" className="article-link">기사 “한국·네덜란드 반도체 ” 555</a>
                                <button className="scrap-button" onClick={() => toggleScrap('article5')}>
                                    <img src={scrapped['article5'] ? scrapcomp: scrap} style={{ width: '20px', height: '20px' }} alt="Scrap"/>
                                </button>
                            </div>   
                            <div className="article-item">
                                <a href="link_to_article_6" className="article-link">기사 “한국·네덜란드 반도체 ” 666</a>
                                <button className="scrap-button" onClick={() => toggleScrap('article6')}>
                                    <img src={scrapped['article6'] ? scrapcomp: scrap} style={{ width: '20px', height: '20px' }} alt="Scrap"/>
                                </button>
                            </div>
                            {/* 다른 기사들에 대한 링크 및 스크랩 버튼 */}
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    );
}

export default Dashboard;