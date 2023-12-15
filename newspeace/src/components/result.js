import {React, useState} from 'react';
import '../css/result.css'; // CSS 파일 import
import scrap from '../img/빈책갈피.png';
import scrapcomp from'../img/찬책갈피.png';

function Dashboard() {
    const positiveWidth = '30%'; // 긍정 비율
    const negativeWidth = '70%'; // 부정 비율
    const [scrapped, setScrapped] = useState({}); // 스크랩 상태 관리 (스크랩 완료 시 이미지 변경)

    // 스크랩 상태 토글 함수
    const toggleScrap = (articleId) => {
        setScrapped(prev => ({ ...prev, [articleId]: !prev[articleId] }));
    };

    return (

        <div className="result_container mx-auto p-4">
            <div className="flex-1 text-center">    
                {/* <h1 className='Test'> 키워드 : </h1> */}
                <h2 className="text-2xl font-bold mb-4">뉴스피스</h2>
                <h1 className='Test1'>긍정의견 {positiveWidth} 부정의견 {negativeWidth} </h1>

            </div>
            <div className='contents'>
                <div className="mb-4">
                    <div className="bar-container mb-2" style={{ width: '100%' }}>
                        <div className="positive-bar" style={{ width: positiveWidth }}>{positiveWidth}</div>
                        <div className="negative-bar" style={{ width: negativeWidth }}>{negativeWidth}</div>
                    </div>
                </div>
                <div className="list-container md:flex" style={{ width: '100%' }}>
                    <div className="list-box" style={{ width: '100%' }}>
                        <h3 className="list-title">positive</h3>
                        <div className="article-list">
                            <div className="article-item">
                                <a href="link_to_article_1" className="article-link">한-네덜란드, ‘반도체 동맹 구축’ 명문화…전략적 동반자관계 구체화</a>
                                {/* <button className="scrap-button"><img src ={scrap}  style={{width:'20px', height:'20px'}}></img></button> */}
                                <button className="scrap-button" onClick={() => toggleScrap('article1')}>
                                    <img src={scrapped['article1'] ? scrapcomp: scrap} style={{ width: '20px', height: '20px' }} alt="Scrap"/>
                                </button>
                            </div>
                            <div className="article-item">
                                <a href="link_to_article_1" className="article-link">한-네덜란드, ‘반도체 동맹 구축’ 명문화…전략적 동반자관계 구체화</a>
                                <button className="scrap-button"><img src ={scrap}  style={{width:'20px', height:'20px'}}></img></button>
                            </div>
                            <div className="article-item">
                                <a href="link_to_article_1" className="article-link">한-네덜란드, ‘반도체 동맹 구축’ 명문화…전략적 동반자관계 구체화</a>
                                <button className="scrap-button"><img src ={scrap}  style={{width:'20px', height:'20px'}}></img></button>
                            </div>
                            {/* 다른 기사들에 대한 링크 및 스크랩 버튼 */}
                        </div>
                    </div>
                    <div className="list-box_ng" style={{ width: '100%' }}>
                        <h3 className="list-title">negative</h3>
                        <div className="article-list">
                            <div className="article-item">
                                <a href="link_to_article_3" className="article-link">윤 대통령 “한국·네덜란드 반도체 ”</a>
                                <button className="scrap-button" ><img src ={scrap}  style={{width:'20px', height:'20px'}}></img></button>
                            </div>
                            <div className="article-item">
                                <a href="link_to_article_3" className="article-link">윤 대통령 “한국·네덜란드 반도체 ”</a>
                                <button className="scrap-button" ><img src ={scrap}  style={{width:'20px', height:'20px'}}></img></button>
                            </div>   
                            <div className="article-item">
                                <a href="link_to_article_3" className="article-link">윤 대통령 “한국·네덜란드 반도체 ”</a>
                                <button className="scrap-button" ><img src ={scrap}  style={{width:'20px', height:'20px'}}></img></button>
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